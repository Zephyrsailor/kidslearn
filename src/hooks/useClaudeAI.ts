import { useState, useCallback } from "react";

interface FeedbackResult {
  message: string;
  isCorrect: boolean;
}

export function useClaudeAI() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);

  const evaluatePronunciation = useCallback(
    async (targetWord: string, childSaid: string): Promise<FeedbackResult> => {
      setLoading(true);

      // Check if the child got it roughly right (simple local check first)
      const normalized = childSaid.toLowerCase().trim();
      const target = targetWord.toLowerCase().trim();
      const isCorrect =
        normalized === target || normalized.includes(target) || target.includes(normalized);

      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      if (!apiKey) {
        // Fallback without API: simple local feedback
        const result: FeedbackResult = isCorrect
          ? { message: "Great job! You said it perfectly!", isCorrect: true }
          : {
              message: `Good try! The word is "${targetWord}". Let's try again!`,
              isCorrect: false,
            };
        setFeedback(result);
        setLoading(false);
        return result;
      }

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
            model: "claude-haiku-4-5",
            max_tokens: 100,
            messages: [
              {
                role: "user",
                content: `The child (age 3) tried to say the English word "${targetWord}". They said: "${childSaid}". Give a short (1 sentence), encouraging response in simple English. If they got it right, celebrate! If not, gently encourage them to try again. Use simple words a 3 year old can understand.`,
              },
            ],
          }),
        });

        const data = await response.json();
        const message =
          data.content?.[0]?.text || (isCorrect ? "Great job!" : "Good try!");

        const result: FeedbackResult = { message, isCorrect };
        setFeedback(result);
        setLoading(false);
        return result;
      } catch (err) {
        console.error("Claude API error:", err);
        const result: FeedbackResult = isCorrect
          ? { message: "Great job! You said it perfectly!", isCorrect: true }
          : {
              message: `Good try! The word is "${targetWord}". Let's try again!`,
              isCorrect: false,
            };
        setFeedback(result);
        setLoading(false);
        return result;
      }
    },
    []
  );

  const clearFeedback = useCallback(() => setFeedback(null), []);

  return { loading, feedback, evaluatePronunciation, clearFeedback };
}
