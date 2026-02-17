export interface Word {
  word: string;
  emoji: string;
  category: string;
  difficulty: 1 | 2 | 3;
  chinese: string;
}

export const words: Word[] = [
  // Animals (difficulty 1-2)
  { word: "cat", emoji: "🐱", category: "animals", difficulty: 1, chinese: "猫" },
  { word: "dog", emoji: "🐶", category: "animals", difficulty: 1, chinese: "狗" },
  { word: "fish", emoji: "🐟", category: "animals", difficulty: 1, chinese: "鱼" },
  { word: "bird", emoji: "🐦", category: "animals", difficulty: 1, chinese: "鸟" },
  { word: "duck", emoji: "🦆", category: "animals", difficulty: 1, chinese: "鸭子" },
  { word: "pig", emoji: "🐷", category: "animals", difficulty: 1, chinese: "猪" },
  { word: "cow", emoji: "🐮", category: "animals", difficulty: 1, chinese: "牛" },
  { word: "rabbit", emoji: "🐰", category: "animals", difficulty: 2, chinese: "兔子" },
  { word: "monkey", emoji: "🐵", category: "animals", difficulty: 2, chinese: "猴子" },
  { word: "elephant", emoji: "🐘", category: "animals", difficulty: 3, chinese: "大象" },

  // Food (difficulty 1-2)
  { word: "apple", emoji: "🍎", category: "food", difficulty: 1, chinese: "苹果" },
  { word: "banana", emoji: "🍌", category: "food", difficulty: 2, chinese: "香蕉" },
  { word: "milk", emoji: "🥛", category: "food", difficulty: 1, chinese: "牛奶" },
  { word: "egg", emoji: "🥚", category: "food", difficulty: 1, chinese: "鸡蛋" },
  { word: "bread", emoji: "🍞", category: "food", difficulty: 1, chinese: "面包" },
  { word: "rice", emoji: "🍚", category: "food", difficulty: 1, chinese: "米饭" },
  { word: "cake", emoji: "🎂", category: "food", difficulty: 1, chinese: "蛋糕" },
  { word: "cookie", emoji: "🍪", category: "food", difficulty: 2, chinese: "饼干" },
  { word: "orange", emoji: "🍊", category: "food", difficulty: 2, chinese: "橙子" },
  { word: "grape", emoji: "🍇", category: "food", difficulty: 1, chinese: "葡萄" },

  // Colors (difficulty 1)
  { word: "red", emoji: "🔴", category: "colors", difficulty: 1, chinese: "红色" },
  { word: "blue", emoji: "🔵", category: "colors", difficulty: 1, chinese: "蓝色" },
  { word: "green", emoji: "🟢", category: "colors", difficulty: 1, chinese: "绿色" },
  { word: "yellow", emoji: "🟡", category: "colors", difficulty: 2, chinese: "黄色" },
  { word: "pink", emoji: "🩷", category: "colors", difficulty: 1, chinese: "粉色" },

  // Body parts (difficulty 1-2)
  { word: "eye", emoji: "👁️", category: "body", difficulty: 1, chinese: "眼睛" },
  { word: "nose", emoji: "👃", category: "body", difficulty: 1, chinese: "鼻子" },
  { word: "mouth", emoji: "👄", category: "body", difficulty: 1, chinese: "嘴巴" },
  { word: "hand", emoji: "✋", category: "body", difficulty: 1, chinese: "手" },
  { word: "foot", emoji: "🦶", category: "body", difficulty: 1, chinese: "脚" },
  { word: "ear", emoji: "👂", category: "body", difficulty: 1, chinese: "耳朵" },
  { word: "hair", emoji: "💇", category: "body", difficulty: 1, chinese: "头发" },

  // Family (difficulty 1-2)
  { word: "mom", emoji: "👩", category: "family", difficulty: 1, chinese: "妈妈" },
  { word: "dad", emoji: "👨", category: "family", difficulty: 1, chinese: "爸爸" },
  { word: "baby", emoji: "👶", category: "family", difficulty: 1, chinese: "宝宝" },
  { word: "grandma", emoji: "👵", category: "family", difficulty: 2, chinese: "奶奶" },
  { word: "grandpa", emoji: "👴", category: "family", difficulty: 2, chinese: "爷爷" },

  // Nature (difficulty 1-2)
  { word: "sun", emoji: "☀️", category: "nature", difficulty: 1, chinese: "太阳" },
  { word: "moon", emoji: "🌙", category: "nature", difficulty: 1, chinese: "月亮" },
  { word: "star", emoji: "⭐", category: "nature", difficulty: 1, chinese: "星星" },
  { word: "tree", emoji: "🌳", category: "nature", difficulty: 1, chinese: "树" },
  { word: "flower", emoji: "🌸", category: "nature", difficulty: 2, chinese: "花" },
  { word: "rain", emoji: "🌧️", category: "nature", difficulty: 1, chinese: "雨" },
  { word: "snow", emoji: "❄️", category: "nature", difficulty: 1, chinese: "雪" },
  { word: "water", emoji: "💧", category: "nature", difficulty: 2, chinese: "水" },

  // Objects (difficulty 1-2)
  { word: "ball", emoji: "⚽", category: "objects", difficulty: 1, chinese: "球" },
  { word: "book", emoji: "📚", category: "objects", difficulty: 1, chinese: "书" },
  { word: "car", emoji: "🚗", category: "objects", difficulty: 1, chinese: "车" },
  { word: "house", emoji: "🏠", category: "objects", difficulty: 1, chinese: "房子" },
  { word: "shoe", emoji: "👟", category: "objects", difficulty: 1, chinese: "鞋子" },
  { word: "hat", emoji: "🎩", category: "objects", difficulty: 1, chinese: "帽子" },
];
