const STORAGE_KEY = "kidslearn_progress";
const HISTORY_KEY = "kidslearn_history";

interface ProgressData {
  stars: number;
  date: string; // YYYY-MM-DD, reset daily
  wordsCorrect: string[]; // words answered correctly today
}

interface HistoryData {
  totalWords: number; // lifetime unique words learned
  allWords: string[]; // all unique words ever answered correctly
  streak: number; // consecutive days with at least 1 star
  lastActiveDate: string; // YYYY-MM-DD
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { stars: 0, date: todayStr(), wordsCorrect: [] };
    const data: ProgressData = JSON.parse(raw);
    if (data.date !== todayStr()) {
      return { stars: 0, date: todayStr(), wordsCorrect: [] };
    }
    return data;
  } catch {
    return { stars: 0, date: todayStr(), wordsCorrect: [] };
  }
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadHistory(): HistoryData {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return { totalWords: 0, allWords: [], streak: 0, lastActiveDate: "" };
    return JSON.parse(raw);
  } catch {
    return { totalWords: 0, allWords: [], streak: 0, lastActiveDate: "" };
  }
}

function saveHistory(data: HistoryData) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
}

export function getStars(): number {
  return loadProgress().stars;
}

export function getWordsCorrect(): string[] {
  return loadProgress().wordsCorrect;
}

export function getStreak(): number {
  const hist = loadHistory();
  const today = todayStr();
  // Streak is valid if last active was today or yesterday
  if (hist.lastActiveDate === today || hist.lastActiveDate === yesterdayStr()) {
    return hist.streak;
  }
  return 0;
}

export function getTotalWords(): number {
  return loadHistory().totalWords;
}

/** Add a star for a correct word. Returns the new star count. */
export function addStar(word: string): number {
  const data = loadProgress();
  if (!data.wordsCorrect.includes(word)) {
    data.wordsCorrect.push(word);
    data.stars += 1;
    saveProgress(data);

    // Update lifetime history
    const hist = loadHistory();
    const today = todayStr();
    if (!hist.allWords.includes(word)) {
      hist.allWords.push(word);
      hist.totalWords = hist.allWords.length;
    }
    // Update streak
    if (hist.lastActiveDate === yesterdayStr()) {
      hist.streak += 1;
    } else if (hist.lastActiveDate !== today) {
      hist.streak = 1;
    }
    hist.lastActiveDate = today;
    saveHistory(hist);
  }
  return data.stars;
}

/** Clear today's progress (stars + words). Lifetime history is preserved. */
export function clearToday(): void {
  saveProgress({ stars: 0, date: todayStr(), wordsCorrect: [] });
}

/** Check if a milestone was just reached (every 5 stars). */
export function isMilestone(stars: number): boolean {
  return stars > 0 && stars % 5 === 0;
}
