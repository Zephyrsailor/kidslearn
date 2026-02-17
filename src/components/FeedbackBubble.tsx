interface FeedbackBubbleProps {
  message: string;
  isCorrect: boolean;
  loading?: boolean;
}

export function FeedbackBubble({ message, isCorrect, loading }: FeedbackBubbleProps) {
  if (loading) {
    return (
      <div style={{ ...styles.bubble, background: "#ffeaa7" }}>
        🤔 Thinking...
      </div>
    );
  }

  return (
    <div
      style={{
        ...styles.bubble,
        background: isCorrect ? "#55efc4" : "#fab1a0",
      }}
    >
      <span style={styles.icon}>{isCorrect ? "🎉" : "💪"}</span>
      <span style={styles.text}>{message}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bubble: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 28px",
    borderRadius: "24px",
    fontSize: "22px",
    fontWeight: 600,
    width: "min(90vw, 400px)",
    boxSizing: "border-box",
    animation: "bounceIn 0.4s ease",
  },
  icon: {
    fontSize: "36px",
    flexShrink: 0,
  },
  text: {
    lineHeight: 1.4,
  },
};
