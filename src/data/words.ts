export interface Word {
  word: string;
  emoji: string;
  category: string;
  difficulty: 1 | 2 | 3;
  chinese: string;
  videoId?: string; // YouTube video ID — all from Super Simple Songs official channel
}

// Video ID reference (Super Simple Songs official, embedding enabled):
//   l7QHIxqi6kM — I Love My Pet
//   9FcCV286-gA — Animals On The Farm (Make Animal Sounds!)
//   6-Y-q5eql5o — Clara The Cow
//   UXt2bNp77u0 — If You Like Pasta (Bumble Nums food song)
//   8ChQVaEAKsk — This Is My Face (face/body parts song)
//   AIgJJV6-stM — I Love My Family
//   OjmWon9KebI — Can You Please Help Me? (colors, toys, family)
//   dbklZrO5H78 — Do You Have A Crayon? (school objects)
//   j6_CZXNAmAw — I Love My Garbage Truck (vehicles)
//   9PAQzsYmCKU — When We Go Camping (nature/outdoors)
//   yCjJyiqpAuU — Twinkle Twinkle Little Star

export const words: Word[] = [
  // Animals (difficulty 1-2)
  { word: "cat",      emoji: "🐱", category: "animals", difficulty: 1, chinese: "猫",   videoId: "l7QHIxqi6kM" },
  { word: "dog",      emoji: "🐶", category: "animals", difficulty: 1, chinese: "狗",   videoId: "l7QHIxqi6kM" },
  { word: "fish",     emoji: "🐟", category: "animals", difficulty: 1, chinese: "鱼",   videoId: "l7QHIxqi6kM" },
  { word: "bird",     emoji: "🐦", category: "animals", difficulty: 1, chinese: "鸟",   videoId: "9FcCV286-gA" },
  { word: "duck",     emoji: "🦆", category: "animals", difficulty: 1, chinese: "鸭子", videoId: "9FcCV286-gA" },
  { word: "pig",      emoji: "🐷", category: "animals", difficulty: 1, chinese: "猪",   videoId: "9FcCV286-gA" },
  { word: "cow",      emoji: "🐮", category: "animals", difficulty: 1, chinese: "牛",   videoId: "6-Y-q5eql5o" },
  { word: "rabbit",   emoji: "🐰", category: "animals", difficulty: 2, chinese: "兔子", videoId: "l7QHIxqi6kM" },
  { word: "monkey",   emoji: "🐵", category: "animals", difficulty: 2, chinese: "猴子", videoId: "9FcCV286-gA" },
  { word: "elephant", emoji: "🐘", category: "animals", difficulty: 3, chinese: "大象", videoId: "9FcCV286-gA" },

  // Food (difficulty 1-2)
  { word: "apple",  emoji: "🍎", category: "food", difficulty: 1, chinese: "苹果", videoId: "UXt2bNp77u0" },
  { word: "banana", emoji: "🍌", category: "food", difficulty: 2, chinese: "香蕉", videoId: "UXt2bNp77u0" },
  { word: "milk",   emoji: "🥛", category: "food", difficulty: 1, chinese: "牛奶", videoId: "UXt2bNp77u0" },
  { word: "egg",    emoji: "🥚", category: "food", difficulty: 1, chinese: "鸡蛋", videoId: "UXt2bNp77u0" },
  { word: "bread",  emoji: "🍞", category: "food", difficulty: 1, chinese: "面包", videoId: "UXt2bNp77u0" },
  { word: "rice",   emoji: "🍚", category: "food", difficulty: 1, chinese: "米饭", videoId: "UXt2bNp77u0" },
  { word: "cake",   emoji: "🎂", category: "food", difficulty: 1, chinese: "蛋糕", videoId: "UXt2bNp77u0" },
  { word: "cookie", emoji: "🍪", category: "food", difficulty: 2, chinese: "饼干", videoId: "UXt2bNp77u0" },
  { word: "orange", emoji: "🍊", category: "food", difficulty: 2, chinese: "橙子", videoId: "UXt2bNp77u0" },
  { word: "grape",  emoji: "🍇", category: "food", difficulty: 1, chinese: "葡萄", videoId: "UXt2bNp77u0" },

  // Colors (difficulty 1)
  { word: "red",    emoji: "🔴", category: "colors", difficulty: 1, chinese: "红色", videoId: "OjmWon9KebI" },
  { word: "blue",   emoji: "🔵", category: "colors", difficulty: 1, chinese: "蓝色", videoId: "OjmWon9KebI" },
  { word: "green",  emoji: "🟢", category: "colors", difficulty: 1, chinese: "绿色", videoId: "OjmWon9KebI" },
  { word: "yellow", emoji: "🟡", category: "colors", difficulty: 2, chinese: "黄色", videoId: "OjmWon9KebI" },
  { word: "pink",   emoji: "🩷", category: "colors", difficulty: 1, chinese: "粉色", videoId: "OjmWon9KebI" },

  // Body parts (difficulty 1-2)
  { word: "eye",   emoji: "👁️", category: "body", difficulty: 1, chinese: "眼睛", videoId: "8ChQVaEAKsk" },
  { word: "nose",  emoji: "👃", category: "body", difficulty: 1, chinese: "鼻子", videoId: "8ChQVaEAKsk" },
  { word: "mouth", emoji: "👄", category: "body", difficulty: 1, chinese: "嘴巴", videoId: "8ChQVaEAKsk" },
  { word: "hand",  emoji: "✋", category: "body", difficulty: 1, chinese: "手",   videoId: "8ChQVaEAKsk" },
  { word: "foot",  emoji: "🦶", category: "body", difficulty: 1, chinese: "脚",   videoId: "8ChQVaEAKsk" },
  { word: "ear",   emoji: "👂", category: "body", difficulty: 1, chinese: "耳朵", videoId: "8ChQVaEAKsk" },
  { word: "hair",  emoji: "💇", category: "body", difficulty: 1, chinese: "头发", videoId: "8ChQVaEAKsk" },

  // Family (difficulty 1-2)
  { word: "mom",     emoji: "👩", category: "family", difficulty: 1, chinese: "妈妈", videoId: "AIgJJV6-stM" },
  { word: "dad",     emoji: "👨", category: "family", difficulty: 1, chinese: "爸爸", videoId: "AIgJJV6-stM" },
  { word: "baby",    emoji: "👶", category: "family", difficulty: 1, chinese: "宝宝", videoId: "AIgJJV6-stM" },
  { word: "grandma", emoji: "👵", category: "family", difficulty: 2, chinese: "奶奶", videoId: "AIgJJV6-stM" },
  { word: "grandpa", emoji: "👴", category: "family", difficulty: 2, chinese: "爷爷", videoId: "AIgJJV6-stM" },

  // Nature (difficulty 1-2)
  { word: "sun",    emoji: "☀️", category: "nature", difficulty: 1, chinese: "太阳", videoId: "9PAQzsYmCKU" },
  { word: "moon",   emoji: "🌙", category: "nature", difficulty: 1, chinese: "月亮", videoId: "yCjJyiqpAuU" },
  { word: "star",   emoji: "⭐", category: "nature", difficulty: 1, chinese: "星星", videoId: "yCjJyiqpAuU" },
  { word: "tree",   emoji: "🌳", category: "nature", difficulty: 1, chinese: "树",   videoId: "9PAQzsYmCKU" },
  { word: "flower", emoji: "🌸", category: "nature", difficulty: 2, chinese: "花",   videoId: "9PAQzsYmCKU" },
  { word: "rain",   emoji: "🌧️", category: "nature", difficulty: 1, chinese: "雨",   videoId: "9PAQzsYmCKU" },
  { word: "snow",   emoji: "❄️", category: "nature", difficulty: 1, chinese: "雪",   videoId: "9PAQzsYmCKU" },
  { word: "water",  emoji: "💧", category: "nature", difficulty: 2, chinese: "水",   videoId: "9PAQzsYmCKU" },

  // Objects (difficulty 1-2)
  { word: "ball",  emoji: "⚽", category: "objects", difficulty: 1, chinese: "球",   videoId: "OjmWon9KebI" },
  { word: "book",  emoji: "📚", category: "objects", difficulty: 1, chinese: "书",   videoId: "dbklZrO5H78" },
  { word: "car",   emoji: "🚗", category: "objects", difficulty: 1, chinese: "车",   videoId: "j6_CZXNAmAw" },
  { word: "house", emoji: "🏠", category: "objects", difficulty: 1, chinese: "房子", videoId: "OjmWon9KebI" },
  { word: "shoe",  emoji: "👟", category: "objects", difficulty: 1, chinese: "鞋子", videoId: "OjmWon9KebI" },
  { word: "hat",   emoji: "🎩", category: "objects", difficulty: 1, chinese: "帽子", videoId: "OjmWon9KebI" },
];
