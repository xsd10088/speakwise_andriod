// Fix curly quotes in voa.ts
const fs = require('fs');

const filePath = 'E:/speakwise-android-parity/lib/voa.ts';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Before:', content.includes('\u201c') ? 'has curly quotes' : 'no curly quotes');

// Replace curly quotes with straight quotes
content = content.replace(/\u201c/g, '"');  // Left double quotation mark
content = content.replace(/\u201d/g, '"');  // Right double quotation mark

// Also handle any remaining issues
content = content.replace(/"l"/g, '\\"l\\"')  // Protect the "l" quote
  .replace(/\\"l\\"/g, '"l"');  // Then restore it properly

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed!');