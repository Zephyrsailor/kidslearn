import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

export function VideoPlayer({ videoId, onClose }: VideoPlayerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close if clicking the backdrop (outside the content)
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

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
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={styles.iframe}
          title="Learning video"
        />
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
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  content: {
    position: "relative",
    width: "min(95vw, 700px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  closeBtn: {
    position: "absolute",
    top: "-48px",
    right: "0",
    fontSize: "28px",
    color: "white",
    background: "rgba(255,255,255,0.15)",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    cursor: "pointer",
    border: "none",
  },
  iframe: {
    width: "100%",
    height: "60dvh",
    border: "none",
    borderRadius: "16px",
  },
};
