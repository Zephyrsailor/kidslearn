import { useState, useCallback, useEffect, useRef } from "react";
import { words } from "./data/words";
import { alphabet } from "./data/alphabet";
import { WordCard } from "./components/WordCard";
import { ListeningBanner } from "./components/ListeningBanner";
import { FeedbackBubble } from "./components/FeedbackBubble";
import { StarCounter } from "./components/StarCounter";
import { ParentDashboard } from "./components/ParentDashboard";
import { useClaudeAI } from "./hooks/useClaudeAI";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { getStars, addStar, isMilestone } from "./store/progress";
import confetti from "canvas-confetti";

type Phase = "showing" | "speaking" | "listening" | "evaluating" | "feedback";

const LISTEN_TIMEOUT = 7; // seconds — wait for child to speak
const MAX_RETRIES = 3;    // auto-advance after N missed turns

const categories = [
  { id: "abc",     label: "🔤 ABC",  color: "#e84393" },
  { id: "all",     label: "🌈 All",  color: "#6c5ce7" },
  { id: "animals", label: "🐾",      color: "#e17055" },
  { id: "food",    label: "🍎",      color: "#00b894" },
  { id: "colors",  label: "🎨",      color: "#fdcb6e" },
  { id: "body",    label: "🧍",      color: "#74b9ff" },
  { id: "family",  label: "👨‍👩‍👧",    color: "#fd79a8" },
  { id: "nature",  label: "🌿",      color: "#55efc4" },
  { id: "objects", label: "🧸",      color: "#a29bfe" },
];

const bgGradients: Record<string, string> = {
  abc:     "linear-gradient(160deg, #ffecd2 0%, #ffd3e8 100%)",
  all:     "linear-gradient(160deg, #c3b1e1 0%, #ffeaa7 40%, #fab1a0 100%)",
  animals: "linear-gradient(160deg, #ffecd2 0%, #fcb69f 100%)",
  food:    "linear-gradient(160deg, #a8edea 0%, #fed6e3 100%)",
  colors:  "linear-gradient(160deg, #ffeaa7 0%, #dfe6e9 50%, #fab1a0 100%)",
  body:    "linear-gradient(160deg, #a1c4fd 0%, #c2e9fb 100%)",
  family:  "linear-gradient(160deg, #fbc2eb 0%, #a6c1ee 100%)",
  nature:  "linear-gradient(160deg, #d4fc79 0%, #96e6a1 100%)",
  objects: "linear-gradient(160deg, #a18cd1 0%, #fbc2eb 100%)",
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("all");
  const [stars, setStars] = useState(getStars);
  const [showParent, setShowParent] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [phase, setPhase] = useState<Phase>("showing");
  const [retryCount, setRetryCount] = useState(0);

  const { loading, feedback, evaluatePronunciation, clearFeedback } = useClaudeAI();
  const { speak } = useSpeechSynthesis();
  const { result, startListening } = useSpeechRecognition();
  const { playCorrect, playTryAgain } = useSoundEffects();

  // "abc" = just letters; "all" = ABC first, then words sorted by difficulty; else filter by category
  const filteredWords =
    category === "abc"
      ? alphabet
      : category === "all"
      ? [...alphabet, ...[...words].sort((a, b) => a.difficulty - b.difficulty)]
      : words.filter((w) => w.category === category);
  const currentWord = filteredWords[currentIndex];

  // ── Refs for stale-closure-safe callbacks ──────────────────────
  const phaseRef = useRef<Phase>("showing");
  const retryRef = useRef(0);
  const currentWordRef = useRef(currentWord);
  const filteredLenRef = useRef(filteredWords.length);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Function refs — always point to latest implementation
  const speakRef = useRef(speak);
  const startListeningRef = useRef(startListening);
  const evaluateRef = useRef(evaluatePronunciation);
  const clearFeedbackRef = useRef(clearFeedback);

  // Keep all refs in sync every render
  phaseRef.current = phase;
  retryRef.current = retryCount;
  currentWordRef.current = currentWord;
  filteredLenRef.current = filteredWords.length;
  speakRef.current = speak;
  startListeningRef.current = startListening;
  evaluateRef.current = evaluatePronunciation;
  clearFeedbackRef.current = clearFeedback;

  // ── Helpers (stable, use refs internally) ─────────────────────
  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  // Forward-declared — assigned after definition
  const actionsRef = useRef({ speakAndListen: () => {}, goNext: () => {} });

  actionsRef.current.goNext = () => {
    clearTimer();
    clearFeedbackRef.current();
    retryRef.current = 0;
    setRetryCount(0);
    setPhase("showing");
    setCurrentIndex((i) => Math.min(i + 1, filteredLenRef.current - 1));
  };

  actionsRef.current.speakAndListen = () => {
    const word = currentWordRef.current;
    if (!word) return;

    setPhase("speaking");
    clearFeedbackRef.current();

    speakRef.current(word.word, 0.6, () => {
      // Guard: only proceed if we're still in speaking phase
      if (phaseRef.current !== "speaking") return;

      setPhase("listening");
      startListeningRef.current();

      // Timeout: if child doesn't speak within LISTEN_TIMEOUT, replay
      clearTimer();
      timerRef.current = setTimeout(() => {
        if (phaseRef.current !== "listening") return;
        retryRef.current += 1;
        setRetryCount(retryRef.current);

        if (retryRef.current >= MAX_RETRIES) {
          actionsRef.current.goNext();
        } else {
          actionsRef.current.speakAndListen();
        }
      }, LISTEN_TIMEOUT * 1000);
    });
  };

  // ── Trigger on word change ────────────────────────────────────
  useEffect(() => {
    clearTimer();
    clearFeedbackRef.current();
    retryRef.current = 0;
    setRetryCount(0);
    setPhase("showing");

    const t = setTimeout(() => actionsRef.current.speakAndListen(), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord?.word]);

  // ── Handle speech recognition result ─────────────────────────
  useEffect(() => {
    if (!result || phaseRef.current !== "listening") return;
    clearTimer();
    const word = currentWordRef.current;
    if (!word) return;

    setPhase("evaluating");

    evaluateRef.current(word.word, result.transcript).then((res) => {
      speakRef.current(res.message, 0.9);
      setPhase("feedback");

      if (res.isCorrect) {
        playCorrect();
        const newStars = addStar(word.word);
        setStars(newStars);
        if (isMilestone(newStars)) fireMilestone();
        timerRef.current = setTimeout(() => actionsRef.current.goNext(), 2500);
      } else {
        playTryAgain();
        // Replay after TTS feedback ends (~2.5s for short message)
        timerRef.current = setTimeout(() => actionsRef.current.speakAndListen(), 2800);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  // ── Milestone confetti ────────────────────────────────────────
  const fireMilestone = useCallback(() => {
    setCelebration(true);
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({
        particleCount: 30, angle: 60 + Math.random() * 60, spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
        colors: ["#6c5ce7", "#00b894", "#fdcb6e", "#e17055", "#74b9ff", "#fd79a8"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => setCelebration(false), 3000);
  }, []);

  // ── Manual nav (swipe / arrow) ────────────────────────────────
  const handleNav = useCallback((dir: 1 | -1) => {
    clearTimer();
    clearFeedbackRef.current();
    retryRef.current = 0;
    setRetryCount(0);
    setPhase("showing");
    setCurrentIndex((i) => Math.max(0, Math.min(i + dir, filteredLenRef.current - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    clearTimer();
    clearFeedbackRef.current();
    setCategory(cat);
    setCurrentIndex(0);
    retryRef.current = 0;
    setRetryCount(0);
    setPhase("showing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!currentWord) {
    return (
      <div style={{ ...styles.screen, background: bgGradients.all }}>
        <div style={{ fontSize: "32px", textAlign: "center" }}>No words here yet!</div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.screen, background: bgGradients[category] || bgGradients.all }}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.topRow}>
          <StarCounter stars={stars} />
          <div style={styles.progress}>{currentIndex + 1} / {filteredWords.length}</div>
          <button style={styles.parentBtn} onClick={() => setShowParent(true)}>👨‍👩‍👧</button>
        </div>
        <div style={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              style={{
                ...styles.catBtn,
                background: category === cat.id ? cat.color : "rgba(255,255,255,0.5)",
                color: category === cat.id ? "white" : "#2d3436",
                boxShadow: category === cat.id ? `0 2px 12px ${cat.color}66` : "none",
              }}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Word card */}
      <WordCard
        word={currentWord}
        onNext={() => handleNav(1)}
        onPrev={() => handleNav(-1)}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredWords.length - 1}
        phase={phase}
      />

      {/* Feedback */}
      <div style={styles.feedbackArea}>
        {(phase === "evaluating" || (phase === "feedback" && feedback)) && (
          <FeedbackBubble
            message={feedback?.message || ""}
            isCorrect={feedback?.isCorrect || false}
            loading={loading || phase === "evaluating"}
          />
        )}
      </div>

      {/* Listening banner — slides up when it's the child's turn */}
      {phase === "listening" && (
        <ListeningBanner
          word={currentWord.word}
          emoji={currentWord.emoji}
          durationSeconds={LISTEN_TIMEOUT}
          retryCount={retryCount}
        />
      )}

      {/* Overlays */}
      {showParent && (
        <ParentDashboard
          onClose={() => setShowParent(false)}
          onReset={() => setStars(0)}
        />
      )}
      {celebration && (
        <div style={styles.celebrationOverlay}>
          <div style={styles.celebrationText}>🌟 {stars} Stars! 🌟</div>
          <div style={styles.celebrationSub}>Amazing job today!</div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100dvh",
    padding: "env(safe-area-inset-top, 12px) 16px 0",
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive, sans-serif",
    overflow: "hidden",
    transition: "background 0.4s ease",
    position: "relative",
  },
  topBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    width: "100%",
    flexShrink: 0,
    paddingTop: "8px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "500px",
    padding: "0 8px",
  },
  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    justifyContent: "center",
  },
  catBtn: {
    fontSize: "18px",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: 700,
    transition: "all 0.2s",
    backdropFilter: "blur(8px)",
  },
  progress: {
    fontSize: "16px",
    color: "rgba(45,52,54,0.6)",
    fontWeight: 700,
  },
  parentBtn: {
    fontSize: "22px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
  },
  feedbackArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    paddingBottom: "8px",
    minHeight: "80px",
    justifyContent: "flex-end",
  },
  celebrationOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.3)",
    zIndex: 999,
    animation: "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    pointerEvents: "none",
  },
  celebrationText: {
    fontSize: "min(15vw, 72px)",
    fontWeight: 900,
    color: "white",
    textShadow: "3px 3px 8px rgba(0,0,0,0.3)",
  },
  celebrationSub: {
    fontSize: "min(7vw, 32px)",
    fontWeight: 700,
    color: "white",
    marginTop: "8px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
};

export default App;
