import { useEffect, useState } from "react";

interface ListeningBannerProps {
  word: string;
  emoji: string;
  durationSeconds: number;
  retryCount: number; // how many times we've replayed
}

export function ListeningBanner({ word, emoji, durationSeconds, retryCount }: ListeningBannerProps) {
  const [elapsed, setElapsed] = useState(0);

  // Reset + start countdown whenever it mounts or retryCount changes
  useEffect(() => {
    setElapsed(0);
    const interval = setInterval(() => {
      setElapsed((e) => Math.min(e + 0.1, durationSeconds));
    }, 100);
    return () => clearInterval(interval);
  }, [durationSeconds, retryCount]);

  const progress = elapsed / durationSeconds; // 0 → 1
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * progress; // shrinks as time passes

  const encouragements = [
    ["大声说出来！", "Say it out loud!"],
    ["再试一次！", "Try again!"],
    ["你能行！", "You can do it!"],
  ];
  const [zh, en] = encouragements[Math.min(retryCount, encouragements.length - 1)];

  return (
    <div style={styles.banner}>
      {/* Word hint */}
      <div style={styles.wordHint}>
        <span style={styles.hintEmoji}>{emoji}</span>
        <span style={styles.hintWord}>{word}</span>
      </div>

      {/* Mic + ripples */}
      <div style={styles.micWrap}>
        {/* Ripple rings */}
        <div style={{ ...styles.ring, animationDelay: "0s" }} />
        <div style={{ ...styles.ring, animationDelay: "0.4s" }} />
        <div style={{ ...styles.ring, animationDelay: "0.8s" }} />

        {/* Countdown SVG circle */}
        <svg style={styles.countdownSvg} viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 44 44)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>

        {/* Mic icon */}
        <div style={styles.micIcon}>🎤</div>
      </div>

      {/* Text prompt */}
      <div style={styles.zhText}>{zh}</div>
      <div style={styles.enText}>{en}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(160deg, #6c5ce7 0%, #a29bfe 100%)",
    borderRadius: "32px 32px 0 0",
    padding: "28px 24px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 -8px 40px rgba(108,92,231,0.5)",
    animation: "slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    zIndex: 100,
  },
  wordHint: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50px",
    padding: "6px 20px 6px 10px",
  },
  hintEmoji: {
    fontSize: "28px",
    lineHeight: 1,
  },
  hintWord: {
    fontSize: "24px",
    fontWeight: 900,
    color: "white",
    letterSpacing: "-1px",
    fontFamily: "'Comic Sans MS', cursive",
  },
  micWrap: {
    position: "relative",
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.4)",
    animation: "expandRing 1.4s ease-out infinite",
  },
  countdownSvg: {
    position: "absolute",
    width: "88px",
    height: "88px",
  },
  micIcon: {
    fontSize: "44px",
    position: "relative",
    zIndex: 2,
    animation: "pulse 1s ease-in-out infinite",
  },
  zhText: {
    fontSize: "22px",
    fontWeight: 900,
    color: "white",
    fontFamily: "'Comic Sans MS', cursive",
    textShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  enText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 600,
  },
};
