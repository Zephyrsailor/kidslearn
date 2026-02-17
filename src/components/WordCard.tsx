import { useRef, useState } from "react";
import type { Word } from "../data/words";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";

interface WordCardProps {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPlayVideo?: (videoId: string) => void;
}

export function WordCard({ word, onNext, onPrev, hasPrev, hasNext, onPlayVideo }: WordCardProps) {
  const { speak } = useSpeechSynthesis();
  const touchStartX = useRef(0);
  const [animKey, setAnimKey] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) {
      if (dx < 0 && hasNext) {
        setAnimKey((k) => k + 1);
        onNext();
      } else if (dx > 0 && hasPrev) {
        setAnimKey((k) => k + 1);
        onPrev();
      }
    }
  };

  return (
    <div
      key={animKey}
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={styles.emoji} onClick={() => speak(word.word)}>
        {word.emoji}
      </div>

      <div style={styles.word} onClick={() => speak(word.word)}>
        {word.word}
      </div>

      <div style={styles.chinese}>{word.chinese}</div>

      {/* Action buttons row */}
      <div style={styles.actions}>
        <button style={styles.listenBtn} onClick={() => speak(word.word)}>
          🔊
        </button>
        {word.videoId && onPlayVideo && (
          <button
            style={styles.videoBtn}
            onClick={() => onPlayVideo(word.videoId!)}
          >
            ▶
          </button>
        )}
      </div>

      {/* Nav arrows */}
      <div style={styles.nav}>
        <button
          style={{ ...styles.navBtn, opacity: hasPrev ? 1 : 0.2 }}
          onClick={() => { setAnimKey((k) => k + 1); onPrev(); }}
          disabled={!hasPrev}
        >
          ◀
        </button>
        <button
          style={{ ...styles.navBtn, opacity: hasNext ? 1 : 0.2 }}
          onClick={() => { setAnimKey((k) => k + 1); onNext(); }}
          disabled={!hasNext}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    flex: 1,
    width: "100%",
    animation: "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    userSelect: "none",
  },
  emoji: {
    fontSize: "min(30vw, 160px)",
    cursor: "pointer",
    animation: "float 3s ease-in-out infinite",
    lineHeight: 1.2,
  },
  word: {
    fontSize: "min(20vw, 96px)",
    fontWeight: 900,
    color: "#2d3436",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: 1.1,
    letterSpacing: "-2px",
    textShadow: "3px 3px 0 rgba(108, 92, 231, 0.15)",
  },
  chinese: {
    fontSize: "min(7vw, 32px)",
    color: "#636e72",
    fontWeight: 600,
  },
  actions: {
    display: "flex",
    gap: "16px",
    marginTop: "4px",
  },
  listenBtn: {
    fontSize: "36px",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#6c5ce7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(108, 92, 231, 0.4)",
  },
  videoBtn: {
    fontSize: "28px",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#e74c3c",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(231, 76, 60, 0.4)",
    fontWeight: 900,
  },
  nav: {
    display: "flex",
    gap: "40px",
    marginTop: "4px",
  },
  navBtn: {
    fontSize: "28px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    color: "#2d3436",
    fontWeight: 700,
  },
};
