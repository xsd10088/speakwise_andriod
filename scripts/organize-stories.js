const fs = require('fs');
const path = require('path');

const DATA_FILE = 'E:/speakwise-android-parity/data/keke-reading/store.json';

const STORY_PATTERNS = [
  { key: 'siddhartha', id: 'siddhartha-brahmin-son', title: '悉达多', ids: [1,2,3,4,5,6,8,9,10,11] },
  { key: 'alice', id: 'alice-adventures-wonderland', title: '《爱丽丝漫游奇境》', ids: [1,2] },
  { key: 'little_prince', id: 'little-prince', title: '《小王子》', ids: [1,2] },
  { key: 'grimm', id: 'grimm-fairy-tales', title: '《格林童话》', ids: [1,2] },
  { key: 'jane_eyre', id: 'jane-eyre', title: '《简·爱》', ids: [1] },
  { key: 'pride', id: 'pride-prejudice', title: '《傲慢与偏见》', ids: [1] },
  { key: 'odyssey', id: 'odyssey', title: '《奥德赛》', ids: [1] },
  { key: 'romeo_juliet', id: 'romeo-juliet', title: '《罗密欧与朱丽叶》', ids: [1] },
];

function main() {
  const rawData = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(rawData);
  
  const lessons = data.courses[0].lessons || [];
  
  const storiesMap = {};
  STORY_PATTERNS.forEach(pattern => {
    storiesMap[pattern.key] = {
      id: pattern.key === 'siddhartha' ? pattern.id : pattern.id,
      title: pattern.title,
      lessons: []
    };
  });
  
  lessons.forEach(lesson => {
    for (const pattern of STORY_PATTERNS) {
      const match = lesson.id.match(new RegExp(`^${pattern.id}-(\\d+)$`));
      if (match && pattern.ids.includes(parseInt(match[1]))) {
        const newTitle = pattern.title + 
          (lesson.title.includes('(') ? lesson.title.replace(/^.*- /, '') : 
           lesson.title.includes('—') ? `—${lesson.title.split('—')[1] || ''}` : '');
        storiesMap[pattern.key].lessons.push({
          ...lesson,
          title: newTitle
        });
      }
    }
  });
  
  data.courses[0].stories = Object.values(storiesMap)
    .filter(s => s.lessons.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
  
  data.courses[0].lessonCount = lessons.length;
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated store.json with stories structure');
  console.log('Stories:', data.courses[0].stories.map(s => `${s.title}: ${s.lessons.length} lessons`));
}

main();