import { useState, useCallback } from "react";
import { words } from "./data/words";
import { WordCard } from "./components/WordCard";
import { SpeechInput } from "./components/SpeechInput";
import { FeedbackBubble } from "./components/FeedbackBubble";
import { useClaudeAI } from "./hooks/useClaudeAI";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

const categories = [
  { id: "all", label: "🌈 All", color: "#6c5ce7" },
  { id: "animals", label: "🐾", color: "#e17055" },
  { id: "food", label: "🍎", color: "#00b894" },
  { id: "colors", label: "🎨", color: "#fdcb6e" },
  { id: "body", label: "🧍", color: "#74b9ff" },
  { id: "family", label: "👨‍👩‍👧", color: "#fd79a8" },
  { id: "nature", label: "🌿", color: "#55efc4" },
  { id: "objects", label: "🧸", color: "#a29bfe" },
];

// Background gradients per category
const bgGradients: Record<string, string> = {
  all: "linear-gradient(160deg, #c3b1e1 0%, #ffeaa7 40%, #fab1a0 100%)",
  animals: "linear-gradient(160deg, #ffecd2 0%, #fcb69f 100%)",
  food: "linear-gradient(160deg, #a8edea 0%, #fed6e3 100%)",
  colors: "linear-gradient(160deg, #ffeaa7 0%, #dfe6e9 50%, #fab1a0 100%)",
  body: "linear-gradient(160deg, #a1c4fd 0%, #c2e9fb 100%)",
  family: "linear-gradient(160deg, #fbc2eb 0%, #a6c1ee 100%)",
  nature: "linear-gradient(160deg, #d4fc79 0%, #96e6a1 100%)",
  objects: "linear-gradient(160deg, #a18cd1 0%, #fbc2eb 100%)",
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("all");
  const { loading, feedback, evaluatePronunciation, clearFeedback } = useClaudeAI();
  const { speak } = useSpeechSynthesis();

  const filteredWords =
    category === "all" ? words : words.filter((w) => w.category === category);

  const currentWord = filteredWords[currentIndex];

  const handleNext = useCallback(() => {
    clearFeedback();
    setCurrentIndex((i) => Math.min(i + 1, filteredWords.length - 1));
  }, [filteredWords.length, clearFeedback]);

  const handlePrev = useCallback(() => {
    clearFeedback();
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, [clearFeedback]);

  const handleSpeechResult = useCallback(
    async (transcript: string) => {
      if (!currentWord) return;
      const result = await evaluatePronunciation(currentWord.word, transcript);
      speak(result.message, 0.85);
      if (result.isCorrect) {
        setTimeout(() => {
          if (currentIndex < filteredWords.length - 1) {
            clearFeedback();
            setCurrentIndex((i) => i + 1);
          }
        }, 3000);
      }
    },
    [currentWord, evaluatePronunciation, speak, currentIndex, filteredWords.length, clearFeedback]
  );

  const handleCategoryChange = useCallback(
    (cat: string) => {
      setCategory(cat);
      setCurrentIndex(0);
      clearFeedback();
    },
    [clearFeedback]
  );

  if (!currentWord) {
    return (
      <div style={{ ...styles.screen, background: bgGradients.all }}>
        <div style={{ fontSize: "32px", textAlign: "center" }}>
          No words here yet!
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.screen, background: bgGradients[category] || bgGradients.all }}>
      {/* Top bar: categories + progress */}
      <div style={styles.topBar}>
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
        <div style={styles.progress}>
          {currentIndex + 1} / {filteredWords.length}
        </div>
      </div>

      {/* Main content: word card fills middle */}
      <WordCard
        word={currentWord}
        onNext={handleNext}
        onPrev={handlePrev}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredWords.length - 1}
      />

      {/* Bottom area: feedback + mic */}
      <div style={styles.bottomArea}>
        {(feedback || loading) && (
          <FeedbackBubble
            message={feedback?.message || ""}
            isCorrect={feedback?.isCorrect || false}
            loading={loading}
          />
        )}
        <SpeechInput onResult={handleSpeechResult} disabled={loading} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100dvh",
    padding: "env(safe-area-inset-top, 12px) 16px env(safe-area-inset-bottom, 12px)",
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive, sans-serif",
    overflow: "hidden",
    transition: "background 0.4s ease",
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
    color: "rgba(45, 52, 54, 0.6)",
    fontWeight: 700,
  },
  bottomArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
    paddingBottom: "12px",
  },
};

export default App;
