const fs = require('fs');
const content = fs.readFileSync('E:/speakwise-android-parity/lib/voa.ts', 'utf8');
let fixed = content;
// Replace Chinese left double quote (U+201C) with straight double quote
// Replace Chinese right double quote (U+201D) with straight double quote
fixed = fixed.replace(/\u201C/g, '"').replace(/\u201D/g, '"');
fs.writeFileSync('E:/speakwise-android-parity/lib/voa.ts', fixed);
console.log('Fixed');