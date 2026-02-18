import { useCallback, useRef } from "react";

export function useSpeechSynthesis() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, rate = 0.7, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to pick a friendly English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes("Samantha") || v.name.includes("Google US English")
    );
    if (preferred) utterance.voice = preferred;

    if (onEnd) {
      let fired = false;
      const safeEnd = () => { if (!fired) { fired = true; onEnd(); } };
      utterance.onend = safeEnd;
      // onerror: only trigger for real errors, NOT for cancel/interrupted
      utterance.onerror = (e: Event & { error?: string }) => {
        const err = e.error ?? "";
        if (err === "interrupted" || err === "canceled") return; // caused by cancel(), ignore
        safeEnd();
      };
      // Fallback: fire after estimated speech duration (handles silent/headless browsers)
      const estimatedMs = Math.max(2000, text.length * 150);
      setTimeout(safeEnd, estimatedMs);
    }

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}
