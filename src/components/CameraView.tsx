import { useRef, useEffect, useState } from "react";
import { useCamera } from "../hooks/useCamera";

interface CameraViewProps {
  onIdentify: (word: string) => void;
  onClose: () => void;
}

export function CameraView({ onIdentify, onClose }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isActive, error, startCamera, stopCamera, capturePhoto } = useCamera();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      startCamera(videoRef.current);
    }
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = async () => {
    const dataUrl = capturePhoto();
    if (!dataUrl) return;

    setAnalyzing(true);
    setResult(null);

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      setResult("Need API key for camera mode");
      setAnalyzing(false);
      return;
    }

    // Strip the data URI prefix to get raw base64
    const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20241022",
          max_tokens: 50,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg",
                    data: base64,
                  },
                },
                {
                  type: "text",
                  text: "This is a photo taken by a 3-year-old child. What is the main object in this image? Answer with just one simple English word (noun) that a toddler would know. Only the word, nothing else.",
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const word = (data.content?.[0]?.text || "").toLowerCase().trim();

      if (word) {
        setResult(word);
        // Small delay so user can see the result before navigating
        setTimeout(() => {
          onIdentify(word);
        }, 1200);
      } else {
        setResult("Could not identify");
      }
    } catch (err) {
      console.error("Vision API error:", err);
      setResult("Error identifying object");
    }

    setAnalyzing(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Close button */}
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Camera feed */}
        <video
          ref={videoRef}
          style={styles.video}
          playsInline
          muted
        />

        {/* Status */}
        {error && <div style={styles.status}>{error}</div>}
        {analyzing && <div style={styles.status}>🔍 Looking...</div>}
        {result && !analyzing && (
          <div style={styles.resultBubble}>
            I see: <strong>{result}</strong>
          </div>
        )}

        {/* Capture button */}
        {isActive && !analyzing && (
          <button style={styles.captureBtn} onClick={handleCapture}>
            📸
          </button>
        )}

        <div style={styles.hint}>
          Point at something and tap 📸
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeSlideIn 0.3s ease",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "min(95vw, 500px)",
    padding: "20px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "-8px",
    right: "0",
    fontSize: "28px",
    color: "white",
    background: "rgba(255,255,255,0.15)",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  video: {
    width: "100%",
    maxHeight: "60vh",
    borderRadius: "24px",
    objectFit: "cover",
    background: "#000",
  },
  captureBtn: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "white",
    fontSize: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  status: {
    fontSize: "22px",
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
  resultBubble: {
    fontSize: "24px",
    color: "#2d3436",
    background: "#55efc4",
    padding: "12px 24px",
    borderRadius: "20px",
    fontWeight: 700,
    animation: "bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  hint: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },
};
