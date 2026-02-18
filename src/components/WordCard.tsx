import { useRef, useState } from "react";
import type { Word } from "../data/words";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";

type Phase = "showing" | "speaking" | "listening" | "evaluating" | "feedback";

interface WordCardProps {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  phase?: Phase;
}

export function WordCard({ word, onNext, onPrev, hasPrev, hasNext, phase }: WordCardProps) {
  const { speak } = useSpeechSynthesis();
  const touchStartX = useRef(0);
  const [animKey, setAnimKey] = useState(0);

  const isSpeaking = phase === "speaking";
  const isListening = phase === "listening";

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) {
      if (dx < 0 && hasNext) { setAnimKey((k) => k + 1); onNext(); }
      else if (dx > 0 && hasPrev) { setAnimKey((k) => k + 1); onPrev(); }
    }
  };

  return (
    <div
      key={animKey}
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Emoji — pulses when app is speaking */}
      <div
        style={{
          ...styles.emoji,
          animation: isSpeaking
            ? "pulse 0.6s ease-in-out infinite"
            : "float 3s ease-in-out infinite",
        }}
        onClick={() => speak(word.word, 0.6)}
      >
        {word.emoji}
      </div>

      {/* Word text — shakes when listening to prompt child */}
      <div
        style={{
          ...styles.word,
          animation: isListening ? "shakeWord 0.5s ease 1" : "none",
          color: isSpeaking ? "#6c5ce7" : "#2d3436",
          textShadow: isSpeaking
            ? "3px 3px 0 rgba(108,92,231,0.3)"
            : "3px 3px 0 rgba(108,92,231,0.15)",
        }}
        onClick={() => speak(word.word, 0.6)}
      >
        {word.word}
      </div>

      <div style={styles.chinese}>{word.chinese}</div>

      {/* Difficulty dots — only for word cards (not ABC) */}
      {word.category !== "abc" && (
        <div style={styles.dots}>
          {[1, 2, 3].map((d) => (
            <span
              key={d}
              style={{
                ...styles.dot,
                background: d <= word.difficulty ? "#6c5ce7" : "rgba(108,92,231,0.2)",
              }}
            />
          ))}
        </div>
      )}

      {/* Replay button */}
      <div style={styles.actions}>
        <button
          style={{
            ...styles.listenBtn,
            animation: isSpeaking ? "pulse 0.6s ease-in-out infinite" : "none",
          }}
          onClick={() => speak(word.word, 0.6)}
          title="Hear the word"
        >
          🔊
        </button>
      </div>

      {/* Nav arrows */}
      <div style={styles.nav}>
        <button
          style={{ ...styles.navBtn, opacity: hasPrev ? 1 : 0.2 }}
          onClick={() => { setAnimKey((k) => k + 1); onPrev(); }}
          disabled={!hasPrev}
        >
          ◀
        </button>
        <button
          style={{ ...styles.navBtn, opacity: hasNext ? 1 : 0.2 }}
          onClick={() => { setAnimKey((k) => k + 1); onNext(); }}
          disabled={!hasNext}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    flex: 1,
    width: "100%",
    animation: "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    userSelect: "none",
    paddingBottom: "8px",
  },
  emoji: {
    fontSize: "min(30vw, 150px)",
    cursor: "pointer",
    lineHeight: 1.2,
  },
  word: {
    fontSize: "min(20vw, 88px)",
    fontWeight: 900,
    cursor: "pointer",
    textAlign: "center",
    lineHeight: 1.1,
    letterSpacing: "-2px",
    transition: "color 0.3s",
  },
  chinese: {
    fontSize: "min(7vw, 30px)",
    color: "#636e72",
    fontWeight: 600,
  },
  dots: {
    display: "flex",
    gap: "8px",
    marginTop: "2px",
    marginBottom: "4px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  actions: {
    display: "flex",
    gap: "16px",
    marginTop: "8px",
  },
  listenBtn: {
    fontSize: "32px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#6c5ce7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(108, 92, 231, 0.4)",
  },
  nav: {
    display: "flex",
    gap: "40px",
    marginTop: "4px",
  },
  navBtn: {
    fontSize: "28px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    color: "#2d3436",
    fontWeight: 700,
  },
};
