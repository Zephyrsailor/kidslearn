import { useRef, useEffect } from "react";
import { getStars, getWordsCorrect, getStreak, getTotalWords } from "../store/progress";
import { words as allWords } from "../data/words";

interface ParentDashboardProps {
  onClose: () => void;
}

export function ParentDashboard({ onClose }: ParentDashboardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const stars = getStars();
  const wordsCorrect = getWordsCorrect();
  const streak = getStreak();
  const totalWords = getTotalWords();
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <dialog
      ref={dialogRef}
      style={styles.dialog}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div style={styles.content}>
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 style={styles.title}>Parent Dashboard</h2>

        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={styles.statValue}>⭐ {stars}</div>
            <div style={styles.statLabel}>Today</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statValue}>🔥 {streak}</div>
            <div style={styles.statLabel}>Streak</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statValue}>📚 {totalWords}</div>
            <div style={styles.statLabel}>All Time</div>
          </div>
        </div>

        {/* Today's words */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Words Learned Today ({wordsCorrect.length})
          </h3>
          {wordsCorrect.length === 0 ? (
            <div style={styles.empty}>No words yet today. Start learning!</div>
          ) : (
            <div style={styles.wordGrid}>
              {wordsCorrect.map((w) => {
                const wordData = allWords.find((aw) => aw.word === w);
                return (
                  <div key={w} style={styles.wordChip}>
                    <span>{wordData?.emoji || "?"}</span>
                    <span>{w}</span>
                    <span style={styles.check}>✓</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Last active */}
        <div style={styles.footer}>
          Last session: {now}
        </div>
      </div>
    </dialog>
  );
}

const styles: Record<string, React.CSSProperties> = {
  dialog: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    maxWidth: "100vw",
    maxHeight: "100vh",
    margin: 0,
    padding: 0,
    border: "none",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  content: {
    background: "white",
    borderRadius: "24px",
    padding: "28px 24px",
    width: "min(92vw, 420px)",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif",
    animation: "bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    fontSize: "22px",
    color: "#636e72",
    background: "#dfe6e9",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
  },
  title: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#2d3436",
    marginBottom: "16px",
    textAlign: "center",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  stat: {
    textAlign: "center",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#2d3436",
  },
  statLabel: {
    fontSize: "13px",
    color: "#636e72",
    fontWeight: 600,
    marginTop: "2px",
  },
  section: {
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#636e72",
    marginBottom: "10px",
  },
  wordGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  wordChip: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    borderRadius: "12px",
    background: "#dfe6e9",
    fontSize: "14px",
    fontWeight: 600,
  },
  check: {
    color: "#00b894",
    fontWeight: 800,
  },
  empty: {
    fontSize: "14px",
    color: "#b2bec3",
    fontStyle: "italic",
  },
  footer: {
    fontSize: "12px",
    color: "#b2bec3",
    textAlign: "center",
    marginTop: "8px",
  },
};
