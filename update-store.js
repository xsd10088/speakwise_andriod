const fs = require('fs');
const path = require('path');

const outputDir = 'E:/speakwise-android-parity/data/keke-reading';

// Read existing lessons
const existingLessons = [
  'siddhartha-brahmin-son-1.json',
  'alice-adventures-wonderland-1.json',
  'alice-adventures-wonderland-2.json'
];

const lessons = [];
for (const file of existingLessons) {
  const filePath = path.join(outputDir, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    lessons.push(data);
    console.log(`Loaded: ${file} (${data.transcript.length} sentences)`);
  }
}

// Build store.json
const storeData = {
  version: 1,
  feeds: {
    "kk-reading": {
      lastFetched: Date.now(),
      itemCount: lessons.length
    }
  },
  courses: [
    {
      id: "keke-reading-classics",
      title: "可可英语名著精读",
      level: 3,
      description: "可可英语精选经典名著双语对照课文，含英文原文与中文翻译",
      lessonCount: lessons.length,
      updatedAt: Date.now(),
      feedId: "kk-reading",
      lessons: lessons
    }
  ]
};

const storeFile = path.join(outputDir, 'store.json');
fs.writeFileSync(storeFile, JSON.stringify(storeData, null, 2), 'utf8');
console.log(`\nstore.json updated: ${lessons.length} lessons`);