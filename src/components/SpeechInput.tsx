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
        🎤 Voice not supported in this browser. Try Chrome!
      </div>
    );
  }

  return (
    <button
      style={{
        ...styles.micBtn,
        background: isListening ? "#e17055" : "#00b894",
        transform: isListening ? "scale(1.1)" : "scale(1)",
      }}
      onClick={startListening}
      disabled={disabled || isListening}
    >
      {isListening ? (
        <span style={styles.listening}>
          🎤 Listening...
        </span>
      ) : (
        <span>🎤 Your turn! Speak!</span>
      )}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  micBtn: {
    fontSize: "28px",
    padding: "20px 40px",
    borderRadius: "50px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    transition: "all 0.2s",
    width: "min(90vw, 400px)",
  },
  listening: {
    animation: "pulse 1s infinite",
  },
  unsupported: {
    fontSize: "18px",
    color: "#d63031",
    textAlign: "center" as const,
    padding: "16px",
  },
};
