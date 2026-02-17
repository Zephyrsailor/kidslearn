import { getStreak, getTotalWords } from "../store/progress";

interface StarCounterProps {
  stars: number;
}

export function StarCounter({ stars }: StarCounterProps) {
  if (stars === 0) return null;

  const streak = getStreak();
  const totalWords = getTotalWords();

  // Show individual stars for small counts, number for larger
  const starDisplay = stars <= 10
    ? "⭐".repeat(stars)
    : `⭐ x ${stars}`;

  return (
    <div style={styles.container}>
      <span style={styles.stars}>{starDisplay}</span>
      {streak > 1 && (
        <span style={styles.badge} title="Day streak">
          🔥{streak}
        </span>
      )}
      {totalWords > 0 && (
        <span style={styles.badge} title="Total words learned">
          📚{totalWords}
        </span>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
  },
  stars: {
    fontSize: "18px",
    lineHeight: 1.3,
  },
  badge: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#2d3436",
  },
};
