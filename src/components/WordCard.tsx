import type { Word } from "../data/words";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";

interface WordCardProps {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function WordCard({ word, onNext, onPrev, hasPrev, hasNext }: WordCardProps) {
  const { speak } = useSpeechSynthesis();

  return (
    <div style={styles.card}>
      <div style={styles.emoji} onClick={() => speak(word.word)}>
        {word.emoji}
      </div>
      <div style={styles.word} onClick={() => speak(word.word)}>
        {word.word}
      </div>
      <div style={styles.chinese}>{word.chinese}</div>
      <button style={styles.speakBtn} onClick={() => speak(word.word)}>
        🔊 Listen
      </button>
      <div style={styles.nav}>
        <button
          style={{ ...styles.navBtn, opacity: hasPrev ? 1 : 0.3 }}
          onClick={onPrev}
          disabled={!hasPrev}
        >
          ⬅️
        </button>
        <button
          style={{ ...styles.navBtn, opacity: hasNext ? 1 : 0.3 }}
          onClick={onNext}
          disabled={!hasNext}
        >
          ➡️
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "32px",
    background: "white",
    borderRadius: "32px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    width: "min(90vw, 400px)",
    animation: "fadeIn 0.3s ease",
  },
  emoji: {
    fontSize: "120px",
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 0.2s",
  },
  word: {
    fontSize: "80px",
    fontWeight: 800,
    color: "#2d3436",
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    lineHeight: 1.1,
  },
  chinese: {
    fontSize: "28px",
    color: "#636e72",
    marginTop: "-4px",
  },
  speakBtn: {
    fontSize: "24px",
    padding: "12px 32px",
    borderRadius: "50px",
    border: "none",
    background: "#6c5ce7",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: "8px",
  },
  nav: {
    display: "flex",
    gap: "24px",
    marginTop: "8px",
  },
  navBtn: {
    fontSize: "40px",
    padding: "8px 24px",
    borderRadius: "20px",
    border: "none",
    background: "#dfe6e9",
    cursor: "pointer",
  },
};
