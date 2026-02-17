import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useEffect } from "react";

interface SpeechInputProps {
  onResult: (transcript: string, confidence: number) => void;
  disabled?: boolean;
}

export function SpeechInput({ onResult, disabled }: SpeechInputProps) {
  const { isListening, result, startListening, supported } =
    useSpeechRecognition();

  useEffect(() => {
    if (result) {
      onResult(result.transcript, result.confidence);
    }
  }, [result, onResult]);

  if (!supported) {
    return (
      <div style={styles.unsupported}>
        🎤 Please use Chrome for voice!
      </div>
    );
  }

  const listening = isListening;

  return (
    <button
      style={{
        ...styles.micBtn,
        background: listening ? "#e74c3c" : "#e74c3c",
        animation: listening ? "ripple 1.2s infinite, pulse 0.8s infinite" : "none",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={startListening}
      disabled={disabled || isListening}
    >
      <span style={styles.micIcon}>🎤</span>
      {listening && <span style={styles.micLabel}>Listening...</span>}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  micBtn: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 24px rgba(231, 76, 60, 0.5)",
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
