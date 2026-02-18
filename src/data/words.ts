export interface Word {
  word: string;
  emoji: string;
  category: string;
  difficulty: 1 | 2 | 3;
  chinese: string;
}

// Sorted within each category: easy (1) → medium (2) → hard (3)
export const words: Word[] = [
  // Animals — difficulty 1
  { word: "cat",      emoji: "🐱", category: "animals", difficulty: 1, chinese: "猫"   },
  { word: "dog",      emoji: "🐶", category: "animals", difficulty: 1, chinese: "狗"   },
  { word: "pig",      emoji: "🐷", category: "animals", difficulty: 1, chinese: "猪"   },
  { word: "cow",      emoji: "🐮", category: "animals", difficulty: 1, chinese: "牛"   },
  // Animals — difficulty 2
  { word: "fish",     emoji: "🐟", category: "animals", difficulty: 2, chinese: "鱼"   },
  { word: "bird",     emoji: "🐦", category: "animals", difficulty: 2, chinese: "鸟"   },
  { word: "duck",     emoji: "🦆", category: "animals", difficulty: 2, chinese: "鸭子" },
  { word: "frog",     emoji: "🐸", category: "animals", difficulty: 2, chinese: "青蛙" },
  // Animals — difficulty 3
  { word: "rabbit",   emoji: "🐰", category: "animals", difficulty: 3, chinese: "兔子" },
  { word: "monkey",   emoji: "🐵", category: "animals", difficulty: 3, chinese: "猴子" },
  { word: "tiger",    emoji: "🐯", category: "animals", difficulty: 3, chinese: "老虎" },
  { word: "elephant", emoji: "🐘", category: "animals", difficulty: 3, chinese: "大象" },

  // Food — difficulty 1
  { word: "egg",    emoji: "🥚", category: "food", difficulty: 1, chinese: "鸡蛋" },
  { word: "milk",   emoji: "🥛", category: "food", difficulty: 1, chinese: "牛奶" },
  { word: "rice",   emoji: "🍚", category: "food", difficulty: 1, chinese: "米饭" },
  { word: "cake",   emoji: "🎂", category: "food", difficulty: 1, chinese: "蛋糕" },
  // Food — difficulty 2
  { word: "apple",  emoji: "🍎", category: "food", difficulty: 2, chinese: "苹果" },
  { word: "grape",  emoji: "🍇", category: "food", difficulty: 2, chinese: "葡萄" },
  { word: "bread",  emoji: "🍞", category: "food", difficulty: 2, chinese: "面包" },
  // Food — difficulty 3
  { word: "banana", emoji: "🍌", category: "food", difficulty: 3, chinese: "香蕉" },
  { word: "orange", emoji: "🍊", category: "food", difficulty: 3, chinese: "橙子" },
  { word: "cookie", emoji: "🍪", category: "food", difficulty: 3, chinese: "饼干" },

  // Colors — difficulty 1
  { word: "red",    emoji: "🔴", category: "colors", difficulty: 1, chinese: "红色" },
  { word: "blue",   emoji: "🔵", category: "colors", difficulty: 1, chinese: "蓝色" },
  { word: "pink",   emoji: "🩷", category: "colors", difficulty: 1, chinese: "粉色" },
  // Colors — difficulty 2
  { word: "green",  emoji: "🟢", category: "colors", difficulty: 2, chinese: "绿色" },
  { word: "black",  emoji: "⚫", category: "colors", difficulty: 2, chinese: "黑色" },
  { word: "white",  emoji: "⚪", category: "colors", difficulty: 2, chinese: "白色" },
  // Colors — difficulty 3
  { word: "yellow", emoji: "🟡", category: "colors", difficulty: 3, chinese: "黄色" },
  { word: "purple", emoji: "🟣", category: "colors", difficulty: 3, chinese: "紫色" },
  { word: "orange", emoji: "🟠", category: "colors", difficulty: 3, chinese: "橙色" },

  // Body — difficulty 1
  { word: "eye",   emoji: "👁️", category: "body", difficulty: 1, chinese: "眼睛" },
  { word: "ear",   emoji: "👂", category: "body", difficulty: 1, chinese: "耳朵" },
  { word: "nose",  emoji: "👃", category: "body", difficulty: 1, chinese: "鼻子" },
  { word: "hand",  emoji: "✋", category: "body", difficulty: 1, chinese: "手"   },
  { word: "foot",  emoji: "🦶", category: "body", difficulty: 1, chinese: "脚"   },
  // Body — difficulty 2
  { word: "mouth", emoji: "👄", category: "body", difficulty: 2, chinese: "嘴巴" },
  { word: "head",  emoji: "🤔", category: "body", difficulty: 2, chinese: "头"   },
  { word: "hair",  emoji: "💇", category: "body", difficulty: 2, chinese: "头发" },

  // Family — difficulty 1
  { word: "mom",     emoji: "👩", category: "family", difficulty: 1, chinese: "妈妈" },
  { word: "dad",     emoji: "👨", category: "family", difficulty: 1, chinese: "爸爸" },
  { word: "baby",    emoji: "👶", category: "family", difficulty: 1, chinese: "宝宝" },
  // Family — difficulty 2
  { word: "grandma", emoji: "👵", category: "family", difficulty: 2, chinese: "奶奶" },
  { word: "grandpa", emoji: "👴", category: "family", difficulty: 2, chinese: "爷爷" },

  // Nature — difficulty 1
  { word: "sun",    emoji: "☀️", category: "nature", difficulty: 1, chinese: "太阳" },
  { word: "moon",   emoji: "🌙", category: "nature", difficulty: 1, chinese: "月亮" },
  { word: "star",   emoji: "⭐", category: "nature", difficulty: 1, chinese: "星星" },
  { word: "rain",   emoji: "🌧️", category: "nature", difficulty: 1, chinese: "雨"   },
  // Nature — difficulty 2
  { word: "tree",   emoji: "🌳", category: "nature", difficulty: 2, chinese: "树"   },
  { word: "water",  emoji: "💧", category: "nature", difficulty: 2, chinese: "水"   },
  { word: "snow",   emoji: "❄️", category: "nature", difficulty: 2, chinese: "雪"   },
  // Nature — difficulty 3
  { word: "flower", emoji: "🌸", category: "nature", difficulty: 3, chinese: "花"   },
  { word: "cloud",  emoji: "☁️", category: "nature", difficulty: 3, chinese: "云"   },

  // Objects — difficulty 1
  { word: "car",   emoji: "🚗", category: "objects", difficulty: 1, chinese: "车"   },
  { word: "ball",  emoji: "⚽", category: "objects", difficulty: 1, chinese: "球"   },
  { word: "hat",   emoji: "🎩", category: "objects", difficulty: 1, chinese: "帽子" },
  // Objects — difficulty 2
  { word: "book",  emoji: "📚", category: "objects", difficulty: 2, chinese: "书"   },
  { word: "shoe",  emoji: "👟", category: "objects", difficulty: 2, chinese: "鞋子" },
  { word: "cup",   emoji: "☕", category: "objects", difficulty: 2, chinese: "杯子" },
  // Objects — difficulty 3
  { word: "house", emoji: "🏠", category: "objects", difficulty: 3, chinese: "房子" },
  { word: "train", emoji: "🚂", category: "objects", difficulty: 3, chinese: "火车" },
  { word: "plane", emoji: "✈️", category: "objects", difficulty: 3, chinese: "飞机" },
];
