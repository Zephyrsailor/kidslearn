import { useState, useCallback } from "react";
import { words } from "./data/words";
import { WordCard } from "./components/WordCard";
import { SpeechInput } from "./components/SpeechInput";
import { FeedbackBubble } from "./components/FeedbackBubble";
import { useClaudeAI } from "./hooks/useClaudeAI";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

const categories = [
  { id: "all", label: "🌈 All" },
  { id: "animals", label: "🐾 Animals" },
  { id: "food", label: "🍎 Food" },
  { id: "colors", label: "🎨 Colors" },
  { id: "body", label: "🧍 Body" },
  { id: "family", label: "👨‍👩‍👧 Family" },
  { id: "nature", label: "🌿 Nature" },
  { id: "objects", label: "🧸 Objects" },
];

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
      // Read the feedback aloud
      speak(result.message, 0.85);
      // Auto-advance on correct after a delay
      if (result.isCorrect) {
        setTimeout(() => {
          if (currentIndex < filteredWords.length - 1) {
            clearFeedback();
            setCurrentIndex((i) => i + 1);
          }
        }, 2500);
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
    return <div style={styles.empty}>No words in this category yet!</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Kids Learn English 🌟</h1>

      {/* Category picker */}
      <div style={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            style={{
              ...styles.catBtn,
              background: category === cat.id ? "#6c5ce7" : "#dfe6e9",
              color: category === cat.id ? "white" : "#2d3436",
            }}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={styles.progress}>
        {currentIndex + 1} / {filteredWords.length}
      </div>

      {/* Word Card */}
      <WordCard
        word={currentWord}
        onNext={handleNext}
        onPrev={handlePrev}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredWords.length - 1}
      />

      {/* Speech Input */}
      <SpeechInput onResult={handleSpeechResult} disabled={loading} />

      {/* AI Feedback */}
      {(feedback || loading) && (
        <FeedbackBubble
          message={feedback?.message || ""}
          isCorrect={feedback?.isCorrect || false}
          loading={loading}
        />
      )}

      {/* Footer hint */}
      <div style={styles.hint}>
        Tap the emoji or word to hear it, then press the green button and say it!
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "24px 16px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a29bfe 0%, #ffeaa7 50%, #fab1a0 100%)",
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif",
  },
  title: {
    fontSize: "36px",
    color: "#2d3436",
    textAlign: "center",
    margin: 0,
    textShadow: "2px 2px 0 rgba(255,255,255,0.5)",
  },
  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    maxWidth: "500px",
  },
  catBtn: {
    fontSize: "16px",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s",
  },
  progress: {
    fontSize: "20px",
    color: "#636e72",
    fontWeight: 600,
  },
  hint: {
    fontSize: "16px",
    color: "#636e72",
    textAlign: "center",
    maxWidth: "400px",
    lineHeight: 1.5,
    marginTop: "8px",
  },
  empty: {
    fontSize: "24px",
    textAlign: "center",
    padding: "40px",
  },
};

export default App;
