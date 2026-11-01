const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lessons = storeData.courses[0].lessons;
const seen = new Set();
const uniqueLessons = [];

for (let i = lessons.length - 1; i >= 0; i--) {
    if (!seen.has(lessons[i].id)) {
        seen.add(lessons[i].id);
        uniqueLessons.unshift(lessons[i]);
    }
}

storeData.courses[0].lessons = uniqueLessons;
storeData.courses[0].lessonCount = uniqueLessons.length;
storeData.feeds['kk-reading'].itemCount = uniqueLessons.length;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已移除重复记录，剩余', uniqueLessons.length, '篇课文');