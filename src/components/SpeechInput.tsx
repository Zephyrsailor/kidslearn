interface SpeechInputProps {
  isListening: boolean;
  onStartListening: () => void;
  disabled?: boolean;
}

export function SpeechInput({ isListening, onStartListening, disabled }: SpeechInputProps) {
  const supported =
    typeof window !== "undefined" &&
    !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  if (!supported) {
    return (
      <div style={styles.unsupported}>
        🎤 Please use Chrome for voice!
      </div>
    );
  }

  return (
    <button
      style={{
        ...styles.micBtn,
        animation: isListening ? "ripple 1.2s infinite, pulse 0.8s infinite" : "none",
        opacity: disabled ? 0.5 : 1,
        boxShadow: isListening
          ? "0 0 0 8px rgba(231,76,60,0.2), 0 6px 24px rgba(231,76,60,0.5)"
          : "0 6px 24px rgba(231,76,60,0.5)",
      }}
      onClick={onStartListening}
      disabled={disabled || isListening}
    >
      <span style={styles.micIcon}>🎤</span>
      {isListening && <span style={styles.micLabel}>Listening...</span>}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  micBtn: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    background: "#e74c3c",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    position: "relative",
    flexShrink: 0,
  },
  micIcon: {
    fontSize: "40px",
    lineHeight: 1,
  },
  micLabel: {
    fontSize: "11px",
    color: "white",
    fontWeight: 700,
    marginTop: "2px",
  },
  unsupported: {
    fontSize: "16px",
    color: "#d63031",
    textAlign: "center" as const,
    padding: "12px",
  },
};
