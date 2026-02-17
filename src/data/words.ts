export interface Word {
  word: string;
  emoji: string;
  category: string;
  difficulty: 1 | 2 | 3;
  chinese: string;
  videoId?: string; // YouTube video ID for learning clips
}

export const words: Word[] = [
  // Animals (difficulty 1-2) — videos from kids vocabulary channels
  { word: "cat", emoji: "🐱", category: "animals", difficulty: 1, chinese: "猫", videoId: "nG2wZKBao_E" },
  { word: "dog", emoji: "🐶", category: "animals", difficulty: 1, chinese: "狗", videoId: "SE5Ip60_HJk" },
  { word: "fish", emoji: "🐟", category: "animals", difficulty: 1, chinese: "鱼", videoId: "fGqWkaYJyBU" },
  { word: "bird", emoji: "🐦", category: "animals", difficulty: 1, chinese: "鸟", videoId: "IJjHueaSjnQ" },
  { word: "duck", emoji: "🦆", category: "animals", difficulty: 1, chinese: "鸭子", videoId: "pZw9veQ76fo" },
  { word: "pig", emoji: "🐷", category: "animals", difficulty: 1, chinese: "猪" },
  { word: "cow", emoji: "🐮", category: "animals", difficulty: 1, chinese: "牛", videoId: "JbNQsVw1Rfs" },
  { word: "rabbit", emoji: "🐰", category: "animals", difficulty: 2, chinese: "兔子" },
  { word: "monkey", emoji: "🐵", category: "animals", difficulty: 2, chinese: "猴子", videoId: "b0NHrFNZWh0" },
  { word: "elephant", emoji: "🐘", category: "animals", difficulty: 3, chinese: "大象", videoId: "b0NHrFNZWh0" },

  // Food (difficulty 1-2)
  { word: "apple", emoji: "🍎", category: "food", difficulty: 1, chinese: "苹果", videoId: "r1jJPOEk9IU" },
  { word: "banana", emoji: "🍌", category: "food", difficulty: 2, chinese: "香蕉", videoId: "r1jJPOEk9IU" },
  { word: "milk", emoji: "🥛", category: "food", difficulty: 1, chinese: "牛奶", videoId: "RE5tvaveVak" },
  { word: "egg", emoji: "🥚", category: "food", difficulty: 1, chinese: "鸡蛋" },
  { word: "bread", emoji: "🍞", category: "food", difficulty: 1, chinese: "面包" },
  { word: "rice", emoji: "🍚", category: "food", difficulty: 1, chinese: "米饭" },
  { word: "cake", emoji: "🎂", category: "food", difficulty: 1, chinese: "蛋糕", videoId: "dEBMnJBrphw" },
  { word: "cookie", emoji: "🍪", category: "food", difficulty: 2, chinese: "饼干" },
  { word: "orange", emoji: "🍊", category: "food", difficulty: 2, chinese: "橙子", videoId: "r1jJPOEk9IU" },
  { word: "grape", emoji: "🍇", category: "food", difficulty: 1, chinese: "葡萄" },

  // Colors (difficulty 1)
  { word: "red", emoji: "🔴", category: "colors", difficulty: 1, chinese: "红色", videoId: "tRNy2i75tCc" },
  { word: "blue", emoji: "🔵", category: "colors", difficulty: 1, chinese: "蓝色", videoId: "tRNy2i75tCc" },
  { word: "green", emoji: "🟢", category: "colors", difficulty: 1, chinese: "绿色", videoId: "tRNy2i75tCc" },
  { word: "yellow", emoji: "🟡", category: "colors", difficulty: 2, chinese: "黄色", videoId: "tRNy2i75tCc" },
  { word: "pink", emoji: "🩷", category: "colors", difficulty: 1, chinese: "粉色" },

  // Body parts (difficulty 1-2)
  { word: "eye", emoji: "👁️", category: "body", difficulty: 1, chinese: "眼睛", videoId: "QA48wTGbU0A" },
  { word: "nose", emoji: "👃", category: "body", difficulty: 1, chinese: "鼻子", videoId: "QA48wTGbU0A" },
  { word: "mouth", emoji: "👄", category: "body", difficulty: 1, chinese: "嘴巴", videoId: "QA48wTGbU0A" },
  { word: "hand", emoji: "✋", category: "body", difficulty: 1, chinese: "手" },
  { word: "foot", emoji: "🦶", category: "body", difficulty: 1, chinese: "脚" },
  { word: "ear", emoji: "👂", category: "body", difficulty: 1, chinese: "耳朵", videoId: "QA48wTGbU0A" },
  { word: "hair", emoji: "💇", category: "body", difficulty: 1, chinese: "头发" },

  // Family (difficulty 1-2)
  { word: "mom", emoji: "👩", category: "family", difficulty: 1, chinese: "妈妈" },
  { word: "dad", emoji: "👨", category: "family", difficulty: 1, chinese: "爸爸" },
  { word: "baby", emoji: "👶", category: "family", difficulty: 1, chinese: "宝宝", videoId: "cCnXsCQNkr0" },
  { word: "grandma", emoji: "👵", category: "family", difficulty: 2, chinese: "奶奶" },
  { word: "grandpa", emoji: "👴", category: "family", difficulty: 2, chinese: "爷爷" },

  // Nature (difficulty 1-2)
  { word: "sun", emoji: "☀️", category: "nature", difficulty: 1, chinese: "太阳" },
  { word: "moon", emoji: "🌙", category: "nature", difficulty: 1, chinese: "月亮" },
  { word: "star", emoji: "⭐", category: "nature", difficulty: 1, chinese: "星星", videoId: "yCjJyiqpAuU" },
  { word: "tree", emoji: "🌳", category: "nature", difficulty: 1, chinese: "树" },
  { word: "flower", emoji: "🌸", category: "nature", difficulty: 2, chinese: "花" },
  { word: "rain", emoji: "🌧️", category: "nature", difficulty: 1, chinese: "雨", videoId: "LFrKYjrIDs8" },
  { word: "snow", emoji: "❄️", category: "nature", difficulty: 1, chinese: "雪" },
  { word: "water", emoji: "💧", category: "nature", difficulty: 2, chinese: "水" },

  // Objects (difficulty 1-2)
  { word: "ball", emoji: "⚽", category: "objects", difficulty: 1, chinese: "球" },
  { word: "book", emoji: "📚", category: "objects", difficulty: 1, chinese: "书" },
  { word: "car", emoji: "🚗", category: "objects", difficulty: 1, chinese: "车", videoId: "w3K3cFSqBMU" },
  { word: "house", emoji: "🏠", category: "objects", difficulty: 1, chinese: "房子" },
  { word: "shoe", emoji: "👟", category: "objects", difficulty: 1, chinese: "鞋子" },
  { word: "hat", emoji: "🎩", category: "objects", difficulty: 1, chinese: "帽子" },
];
