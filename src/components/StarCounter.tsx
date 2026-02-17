interface StarCounterProps {
  stars: number;
}

export function StarCounter({ stars }: StarCounterProps) {
  if (stars === 0) return null;

  // Show individual stars for small counts, number for larger
  const display = stars <= 10
    ? "⭐".repeat(stars)
    : `⭐ x ${stars}`;

  return (
    <div style={styles.container}>
      <span style={styles.stars}>{display}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
  },
  stars: {
    fontSize: "18px",
    lineHeight: 1.3,
  },
};
