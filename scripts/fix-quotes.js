const fs = require('fs');
const path = require('path');

const filePath = 'E:/speakwise-android-parity/lib/voa.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix curly quotes in transcript/translation strings
// These are the problematic patterns
const fixes = [
  // gamification quotes
  { pattern: /called "gamification"/g, replace: 'called \\"gamification\\"' },
  { pattern: /called\\"gamification\\"/g, replace: 'called \\"gamification\\"' },
  // l quotes  
  { pattern: /letter "l" in/g, replace: 'letter \\"l\\" in' },
  { pattern: /letter\\"l\\" in/g, replace: 'letter \\"l\\" in' },
  // gamify quotes
  { pattern: /to "gamify" /g, replace: 'to \\"gamify\\" ' },
  { pattern: /to\\"gamify\\"/g, replace: 'to \\"gamify\\"' },
  { pattern: /\\"gamify\\".他们/g, replace: '\\"gamify\\".他们' },
  { pattern: /学习"gamify"/g, replace: '学习\\"gamify\\"' },
  { pattern: /学习\\"gamify\\"/g, replace: '学习\\"gamify\\"' },
  // l character quotes
  { pattern: /字母"l"。/g, replace: '字母\\"l\\"。' },
  { pattern: /字母\\"l\\"。/g, replace: '字母\\"l\\"。' },
];

fixes.forEach(({ pattern, replace }) => {
  content = content.replace(pattern, replace);
});

// More aggressive: find and replace all instances of curly quotes with straight quotes
content = content.replace(/""/g, '\\"');  // 左右引号
content = content.replace(/""/g, '\\"');  // 垂直引号
content = content.replace(/""/g, '\\"');  // 更高的引号

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed curly quotes in voa.ts');