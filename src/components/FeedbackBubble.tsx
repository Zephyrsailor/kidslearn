import { useEffect } from "react";
import confetti from "canvas-confetti";

interface FeedbackBubbleProps {
  message: string;
  isCorrect: boolean;
  loading?: boolean;
}

export function FeedbackBubble({ message, isCorrect, loading }: FeedbackBubbleProps) {
  // Fire confetti on correct answer
  useEffect(() => {
    if (isCorrect && !loading) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#6c5ce7", "#00b894", "#fdcb6e", "#e17055", "#74b9ff"],
      });
    }
  }, [isCorrect, loading]);

  if (loading) {
    return (
      <div style={{ ...styles.bubble, background: "rgba(253, 203, 110, 0.9)" }}>
        <span style={styles.icon}>🤔</span>
        <span style={styles.text}>Thinking...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        ...styles.bubble,
        background: isCorrect
          ? "rgba(0, 184, 148, 0.9)"
          : "rgba(250, 177, 160, 0.9)",
      }}
    >
      <span style={{ ...styles.icon, animation: isCorrect ? "wiggle 0.5s ease 2" : "none" }}>
        {isCorrect ? "🎉" : "💪"}
      </span>
      <span style={styles.text}>{message}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bubble: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 24px",
    borderRadius: "24px",
    fontSize: "min(5vw, 22px)",
    fontWeight: 700,
    width: "min(92vw, 440px)",
    boxSizing: "border-box",
    animation: "bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    color: "#2d3436",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  icon: {
    fontSize: "36px",
    flexShrink: 0,
  },
  text: {
    lineHeight: 1.4,
  },
};
