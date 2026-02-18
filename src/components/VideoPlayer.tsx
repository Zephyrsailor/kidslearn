interface VideoPlayerProps {
  videoId: string;
  word: string;
  onClose: () => void;
}

export function VideoPlayer({ videoId, word, onClose }: VideoPlayerProps) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        {/* YouTube thumbnail as preview */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={`${word} song`}
          style={styles.thumbnail}
        />

        <div style={styles.title}>🎵 Watch & Learn!</div>
        <div style={styles.subtitle}>"{word}" song from Super Simple Songs</div>

        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={styles.openBtn}>
          ▶ Open on YouTube
        </a>

        <div style={styles.hint}>
          Opens YouTube app on your phone
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  card: {
    background: "white",
    borderRadius: "24px",
    padding: "24px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    width: "min(90vw, 360px)",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#f0f0f0",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    color: "#636e72",
    fontWeight: 700,
  },
  thumbnail: {
    width: "100%",
    borderRadius: "16px",
    objectFit: "cover" as const,
    aspectRatio: "16/9",
    background: "#f0f0f0",
  },
  title: {
    fontSize: "22px",
    fontWeight: 900,
    color: "#2d3436",
    fontFamily: "'Comic Sans MS', cursive",
  },
  subtitle: {
    fontSize: "14px",
    color: "#636e72",
    textAlign: "center" as const,
  },
  openBtn: {
    background: "#e74c3c",
    color: "white",
    padding: "14px 32px",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: 900,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 16px rgba(231,76,60,0.4)",
    fontFamily: "'Comic Sans MS', cursive",
  },
  hint: {
    fontSize: "12px",
    color: "#b2bec3",
  },
};
