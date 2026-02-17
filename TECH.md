# Tech Stack Decisions

## Frontend
- **React + Vite + TypeScript** — fast dev server, great DX, strong ecosystem

## Speech Recognition (STT)
- **Web Speech API** (browser built-in) — zero cost, good enough for simple words
- Fallback: Whisper API if accuracy is insufficient for children's speech

## Speech Synthesis (TTS)
- **Web Speech Synthesis API** — built-in, no cost, works offline
- Future: ElevenLabs or OpenAI TTS for more natural voice

## AI Feedback
- **Claude API** (claude-haiku-4-5) — fast, cheap, good at encouraging feedback
- Used for: pronunciation assessment, encouragement, gentle corrections

## Vision / VL Model
- **Claude claude-sonnet-4-5 vision** — camera capture -> identify objects -> match words
- MVP: deferred to post-MVP iteration

## Images
- **Emoji-based** for MVP — no external API needed, instant loading
- Future: Unsplash API for real photos

## Video
- **Static assets** for MVP — short animations via CSS/React
- Future: YouTube embeds or custom video content

## Word Database
- **Built-in JSON** — 50 words suitable for 3-year-olds
- Categories: animals, food, colors, body parts, family, nature, objects

## Deployment
- Local dev: `npm run dev`
- Production: Vite build -> any static host
