import { useCallback, useRef } from "react";

// Web Audio API sound effects -- no audio files needed
export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  // Rising "ding ding" for correct answers
  const playCorrect = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // First ding
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523, now); // C5
      osc1.frequency.setValueAtTime(659, now + 0.1); // E5
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc1.connect(gain1).connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Second ding (higher)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(784, now + 0.15); // G5
      osc2.frequency.setValueAtTime(1047, now + 0.25); // C6
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.setValueAtTime(0.3, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.5);
    } catch {
      // Ignore audio errors
    }
  }, [getCtx]);

  // Low "bloop" for try-again
  const playTryAgain = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, now); // E4
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.2); // descending
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore audio errors
    }
  }, [getCtx]);

  // Shutter click for camera capture
  const playShutter = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // White noise burst for click sound
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.3));
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      source.connect(gain).connect(ctx.destination);
      source.start(now);
    } catch {
      // Ignore audio errors
    }
  }, [getCtx]);

  return { playCorrect, playTryAgain, playShutter };
}
