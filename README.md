# Kids Learn English

An interactive English learning app for 3-year-old children. Built with React + TypeScript + Vite.

## Features

- **Word Cards**: 50 common English words with emoji, pronunciation, and Chinese translation
- **Text-to-Speech**: Tap any word or emoji to hear it spoken aloud
- **Speech Recognition**: Children speak into the microphone to practice pronunciation
- **AI Feedback**: Claude AI provides encouraging, age-appropriate feedback (optional)
- **Category Browsing**: Words organized into 7 categories (animals, food, colors, body parts, family, nature, objects)
- **Child-Friendly UI**: Large fonts, bright colors, big touch targets, fun animations

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in Chrome (recommended for speech recognition support).

## With AI Feedback (Optional)

```bash
VITE_ANTHROPIC_API_KEY=sk-ant-xxx npm run dev
```

Without an API key, the app uses simple local feedback. With a key, Claude provides more natural, encouraging responses.

## Word Categories

| Category | Count | Examples |
|----------|-------|---------|
| Animals  | 10    | cat, dog, fish, bird, elephant |
| Food     | 10    | apple, banana, milk, cake, cookie |
| Colors   | 5     | red, blue, green, yellow, pink |
| Body     | 7     | eye, nose, mouth, hand, foot |
| Family   | 5     | mom, dad, baby, grandma, grandpa |
| Nature   | 8     | sun, moon, star, tree, flower |
| Objects  | 6     | ball, book, car, house, shoe |

## Tech Stack

- React + TypeScript + Vite
- Web Speech API (STT + TTS)
- Claude API (claude-haiku-4-5) for AI feedback
- No external image dependencies (emoji-based)

## Install as App

Open in Chrome/Safari on mobile, then tap "Add to Home Screen" for a full-screen app experience with offline caching.

## Browser Support

Speech recognition works best in Chrome/Edge. Safari has partial support. Firefox does not support the Web Speech Recognition API.
