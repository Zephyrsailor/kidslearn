const STORAGE_KEY = "kidslearn_progress";

interface ProgressData {
  stars: number;
  date: string; // YYYY-MM-DD, reset daily
  wordsCorrect: string[]; // words answered correctly today
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { stars: 0, date: todayStr(), wordsCorrect: [] };
    const data: ProgressData = JSON.parse(raw);
    // Reset if it's a new day
    if (data.date !== todayStr()) {
      return { stars: 0, date: todayStr(), wordsCorrect: [] };
    }
    return data;
  } catch {
    return { stars: 0, date: todayStr(), wordsCorrect: [] };
  }
}

function save(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStars(): number {
  return load().stars;
}

export function getWordsCorrect(): string[] {
  return load().wordsCorrect;
}

/** Add a star for a correct word. Returns the new star count. */
export function addStar(word: string): number {
  const data = load();
  if (!data.wordsCorrect.includes(word)) {
    data.wordsCorrect.push(word);
    data.stars += 1;
    save(data);
  }
  return data.stars;
}

/** Check if a milestone was just reached (every 5 stars). */
export function isMilestone(stars: number): boolean {
  return stars > 0 && stars % 5 === 0;
}
