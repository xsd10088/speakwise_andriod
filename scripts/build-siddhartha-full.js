#!/usr/bin/env node
/**
 * 将 Project Gutenberg 版《悉达多》英文全文（pg2500.txt）
 * 解析为 12 个章节剧集（第一集 ~ 第十二集），写入 store.json 的
 * stories 分组结构（story id: siddhartha），并生成独立课件 JSON 文件。
 * 同时清理旧版（siddhartha-brahmin-son-*）课件 JSON 与音频残留文件。
 *
 * 数据来源: https://www.gutenberg.org/ebooks/2500 (Public Domain, USA)
 * 译者: Gunther Olesch, Anke Dreher, Amy Coulter, Stefan Langer, Semyon Chaichenets
 */

const fs = require('fs');
const path = require('path');

const ROOT = 'E:/speakwise-android-parity';
const SRC_FILE = path.join(ROOT, 'data/keke-reading/siddhartha-gutenberg.txt');
const STORE_FILE = path.join(ROOT, 'data/keke-reading/store.json');
const LESSONS_DIR = path.join(ROOT, 'data/keke-reading');
const AUDIO_BASE_URL = 'https://speakwise-wsicpu2u.manus.space/audio';
const AUDIO_DIR = path.join(ROOT, 'data/audio');
const SERVER_AUDIO_DIR = path.join(ROOT, 'server/data/audio');

const STORY_ID = 'siddhartha';
const STORY_TITLE = '悉达多';
const OLD_STORY_ID = 'siddhartha-brahmin-son';
const OLD_LESSON_PREFIX = 'siddhartha-brahmin-son-';

const CHAPTER_TITLES = [
  'THE SON OF THE BRAHMAN',
  'WITH THE SAMANAS',
  'GOTAMA',
  'AWAKENING',
  'KAMALA',
  'WITH THE CHILDLIKE PEOPLE',
  'SANSARA',
  'BY THE RIVER',
  'THE FERRYMAN',
  'THE SON',
  'OM',
  'GOVINDA',
];

const CN_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function cnNumber(n) {
  if (n <= 10) return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][n];
  if (n < 20) return '十' + (n % 10 ? CN_DIGITS[n % 10] : '');
  const tens = Math.floor(n / 10);
  const rest = n % 10;
  return CN_DIGITS[tens] + '十' + (rest ? CN_DIGITS[rest] : '');
}

function extractBody(text) {
  const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK SIDDHARTHA ***';
  const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK SIDDHARTHA ***';
  const startIdx = text.indexOf(startMarker);
  const endIdx = text.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Gutenberg START/END markers not found');
  }
  return text.slice(startIdx + startMarker.length, endIdx);
}

function findChapterBoundaries(lines) {
  // 正文从顶格的 "FIRST PART" 开始；目录中的条目前带缩进，需排除
  const bodyStart = lines.findIndex(l => l === 'FIRST PART');
  if (bodyStart === -1) {
    throw new Error('Body "FIRST PART" marker not found');
  }
  const boundaries = [];
  for (let i = bodyStart + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line !== line.trim()) continue; // 跳过带缩进的行（目录等）
    if (line === 'SECOND PART') continue;
    if (CHAPTER_TITLES.includes(line)) {
      boundaries.push({ lineIndex: i, title: line });
    }
  }
  if (boundaries.length !== CHAPTER_TITLES.length) {
    throw new Error(
      `Expected ${CHAPTER_TITLES.length} chapter titles, found ${boundaries.length}: ` +
      JSON.stringify(boundaries.map(b => b.title))
    );
  }
  return boundaries;
}

function unwrapParagraphs(lines) {
  const paragraphs = [];
  let current = [];
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length > 0) {
        paragraphs.push(current.join(' '));
        current = [];
      }
    } else {
      current.push(line.trim());
    }
  }
  if (current.length > 0) paragraphs.push(current.join(' '));
  return paragraphs;
}

function cleanText(text) {
  return text
    .replace(/_([^_]+)_/g, '$1')      // 去除 Gutenberg 斜体标记 _..._
    .replace(/\s+/g, ' ')
    .trim();
}

const ABBREVS = ['Mr', 'Mrs', 'Dr', 'St', 'etc', 'viz', 'cf', 'eg', 'ie', 'No'];

function splitSentences(paragraph) {
  let protectedText = paragraph;
  ABBREVS.forEach(abbr => {
    protectedText = protectedText.replace(new RegExp(`\\b${abbr}\\.`, 'g'), `${abbr}<DOT>`);
  });
  const parts = protectedText.split(/(?<=[.!?]["”’')]*)\s+(?=["“'A-Z])/);
  return parts
    .map(p => p.replace(/<DOT>/g, '.').replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0);
}

function buildEpisodes() {
  const raw = fs.readFileSync(SRC_FILE, 'utf8');
  const body = extractBody(raw);
  const lines = body.split(/\r?\n/);

  const endMarkerLine = lines.findIndex(l => l.includes('*** END OF THE PROJECT GUTENBERG'));
  const boundaries = findChapterBoundaries(lines);

  const episodes = [];
  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].lineIndex + 1;
    const end = i + 1 < boundaries.length ? boundaries[i + 1].lineIndex : (endMarkerLine !== -1 ? endMarkerLine : lines.length);
    const chapterLines = lines.slice(start, end).filter(l => {
      const t = l.trim();
      return t !== '' && t !== 'FIRST PART' && t !== 'SECOND PART';
    });
    const paragraphs = unwrapParagraphs(chapterLines);
    const sentences = [];
    paragraphs.forEach(p => {
      splitSentences(cleanText(p)).forEach(s => sentences.push(s));
    });
    const wordCount = sentences.join(' ').split(/\s+/).filter(Boolean).length;
    episodes.push({
      chapterTitle: boundaries[i].title,
      sentences,
      wordCount,
    });
  }
  return episodes;
}

function buildLesson(ep, index) {
  const id = `siddhartha-${index}`;
  return {
    id,
    title: `第${cnNumber(index)}集`,
    audioUrl: `${AUDIO_BASE_URL}/${id}.mp3`,
    durationSec: 0,
    transcript: ep.sentences,
    translation: [],
    source: 'Project Gutenberg #2500',
    category: '经典文学',
    difficulty: 'L3',
  };
}

function main() {
  console.log('='.repeat(64));
  console.log('构建《悉达多》英文全文剧集数据 (Project Gutenberg #2500)');
  console.log('='.repeat(64));

  const episodes = buildEpisodes();
  console.log(`\n解析章节数: ${episodes.length}`);

  const lessons = episodes.map((ep, i) => buildLesson(ep, i + 1));

  let totalWords = 0;
  lessons.forEach((lesson, i) => {
    const ep = episodes[i];
    totalWords += ep.wordCount;
    const estSec = Math.round(ep.wordCount / 150 * 60);
    console.log(
      `  ${lesson.title} | id=${lesson.id} | 章节="${ep.chapterTitle}" | ` +
      `${ep.wordCount} 词 | ${lesson.transcript.length} 句 | 预估音频 ~${Math.round(estSec / 60)} 分钟`
    );
  });
  console.log(`\n总词数: ${totalWords} (Standard Ebooks 标注全书 39,196 词)`);

  // 校验
  const problems = [];
  lessons.forEach(l => {
    if (l.transcript.length === 0) problems.push(`${l.id} 无句子`);
    l.transcript.forEach((s, si) => {
      if (s.includes('_')) problems.push(`${l.id} 句${si + 1} 含未清理斜体标记: ${s.slice(0, 60)}`);
      if (s.includes('***')) problems.push(`${l.id} 句${si + 1} 含 Gutenberg 标记`);
      if (s.length > 1000) problems.push(`${l.id} 句${si + 1} 过长(${s.length}字符), 可能漏切分`);
    });
  });
  if (problems.length > 0) {
    console.log('\n⚠️  发现问题:');
    problems.slice(0, 20).forEach(p => console.log('  - ' + p));
    if (problems.length > 20) console.log(`  ... 共 ${problems.length} 个`);
  } else {
    console.log('\n✅ 校验通过: 无斜体标记残留、无 Gutenberg 标记、无超长句');
  }

  // 更新 store.json
  const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
  const course = store.courses[0];

  // 保留已有 durationSec（重建时不回退已回填的音频时长）
  const existingDurations = {};
  (course.lessons || []).forEach(l => { if (l.durationSec) existingDurations[l.id] = l.durationSec; });
  (course.stories || []).forEach(s => (s.lessons || []).forEach(l => { if (l.durationSec) existingDurations[l.id] = l.durationSec; }));
  lessons.forEach(l => { if (existingDurations[l.id]) l.durationSec = existingDurations[l.id]; });

  // 1) 顶层 lessons: 移除旧悉达多课件与本次重建的课件(幂等), 加入新课件
  const newIds = new Set(lessons.map(l => l.id));
  course.lessons = (course.lessons || []).filter(
    l => !l.id.startsWith(OLD_LESSON_PREFIX) && !newIds.has(l.id)
  );
  course.lessons = [...lessons, ...course.lessons];

  // 2) stories: 移除旧 story, 加入新 story
  course.stories = (course.stories || []).filter(s => s.id !== OLD_STORY_ID && s.id !== STORY_ID);
  course.stories.push({
    id: STORY_ID,
    title: STORY_TITLE,
    lessons: lessons.map(l => ({ ...l })),
  });
  course.stories.sort((a, b) => a.title.localeCompare(b.title));

  // 3) 计数
  course.lessonCount = course.lessons.length;
  store.feeds['kk-reading'].itemCount = course.lessonCount;
  store.feeds['kk-reading'].lastFetched = Date.now();
  course.updatedAt = Date.now();

  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf8');
  console.log(`\n✅ store.json 已更新: 顶层 lessons=${course.lessons.length}, stories=${course.stories.length}`);
  console.log('   stories 列表: ' + course.stories.map(s => `${s.title}(${s.lessons.length}集)`).join(', '));

  // 4) 独立课件 JSON 文件
  lessons.forEach(lesson => {
    const file = path.join(LESSONS_DIR, `${lesson.id}.json`);
    fs.writeFileSync(file, JSON.stringify(lesson, null, 2), 'utf8');
  });
  console.log(`✅ 已写入 ${lessons.length} 个独立课件 JSON (data/keke-reading/siddhartha-*.json)`);

  // 5) 清理旧版悉达多课件残留文件（旧 story 已被全文 12 集版替代）
  const removedFiles = [];
  const removeMatching = (dir, pattern) => {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      if (pattern.test(f)) {
        fs.unlinkSync(path.join(dir, f));
        removedFiles.push(path.join(dir, f));
      }
    }
  };
  removeMatching(LESSONS_DIR, /^siddhartha-brahmin-son-.*\.json$/);
  removeMatching(AUDIO_DIR, /^siddhartha-brahmin-son-.*\.(mp3|wav)$/);
  removeMatching(SERVER_AUDIO_DIR, /^siddhartha-brahmin-son-.*\.(mp3|wav)$/);
  if (removedFiles.length > 0) {
    console.log(`✅ 已清理旧版残留文件 ${removedFiles.length} 个:`);
    removedFiles.forEach(f => console.log('   - ' + path.relative(ROOT, f)));
  } else {
    console.log('✅ 旧版残留文件检查: 无残留');
  }

  // 6) 输出剧集摘要供后续 TTS 脚本使用
  const summary = lessons.map(l => ({ id: l.id, title: l.title, sentences: l.transcript.length }));
  fs.writeFileSync(path.join(ROOT, 'scripts/siddhartha-episodes.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('✅ 剧集摘要: scripts/siddhartha-episodes.json');
}

main();
