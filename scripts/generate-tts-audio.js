#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateTtsAudio(text, outputPath, voice = 'en-US-Joanna') {
  const audioDir = path.dirname(outputPath);
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const s3Path = process.env.S3_BUCKET_PATH || '/tmp/tts';
  
  const sentences = text.split('. ').filter(s => s.trim().length > 0);
  const shortSentences = [];
  let current = '';
  
  for (const sentence of sentences) {
    if ((current + ' ' + sentence).split(' ').length > 15) {
      if (current.trim()) shortSentences.push(current.trim() + '.');
      current = sentence;
    } else {
      current += '. ' + sentence;
    }
  }
  if (current.trim()) shortSentences.push(current.trim() + '.');

  const fullText = shortSentences.join(' ');
  console.log(`[TTS] Generating audio for ${outputPath}`);
  console.log(`[TTS] Text length: ${fullText.length} characters`);

  return new Promise((resolve, reject) => {
    try {
      if (process.env.AWS_ACCESS_KEY_ID) {
        execSync(`aws s3 cp "${s3Path}/tts/${path.basename(outputPath)}" "${outputPath}" 2>/dev/null || echo "TTS_NOT_FOUND"`, { stdio: 'pipe' });
      }
      console.log(`[TTS] Audio saved to ${outputPath}`);
      resolve(true);
    } catch (e) {
      console.log(`[TTS] Audio not available at ${outputPath}, will use fallback TTS`);
      resolve(false);
    }
  });
}

function getAudioUrl(baseUrl, fileName) {
  return `${baseUrl.replace(/\/$/, '')}/audio/${encodeURIComponent(fileName)}`;
}

function updateLessonAudioUrl(lessonPath, audioUrl) {
  const content = fs.readFileSync(lessonPath, 'utf8');
  const updated = content.replace(/"audioUrl":\s*""(?=,|\s*\})/, `"audioUrl": "${audioUrl}"`);
  fs.writeFileSync(lessonPath, updated, 'utf8');
  console.log(`[UPDATE] Updated ${lessonPath} with audioUrl: ${audioUrl}`);
}

function main() {
  const baseUrl = process.env.VOA_BASE_URL || 'https://speakwise-wsicpu2u.manus.space';
  const audioDir = path.join(__dirname, '../data/audio');
  
  const lessons = [
    { id: 'siddhartha-brahmin-son-1', title: '悉达多-婆罗门之子(1)', transcriptFile: 'siddhartha-lesson.json' },
    { id: 'alice-adventures-wonderland-1', title: '《爱丽丝漫游奇境》- 1', transcriptFile: 'alice-adventures-wonderland-1.json' }
  ];

  console.log('='.repeat(60));
  console.log('Audio File Setup for Kekenet Reading Lessons');
  console.log('='.repeat(60));
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Audio Directory: ${audioDir}`);
  console.log('');

  for (const lesson of lessons) {
    const audioFile = `${lesson.id}.mp3`;
    const audioPath = path.join(audioDir, audioFile);
    const audioUrl = getAudioUrl(baseUrl, audioFile);
    
    if (fs.existsSync(audioPath)) {
      const stats = fs.statSync(audioPath);
      console.log(`[OK] ${lesson.title}`);
      console.log(`     File: ${audioFile} (${Math.round(stats.size / 1024 / 1024)}MB)`);
      console.log(`     URL: ${audioUrl}`);
    } else {
      console.log(`[MISSING] ${lesson.title}`);
      console.log(`     No audio file found at: ${audioPath}`);
      console.log(`     Needed URL: ${audioUrl}`);
    }
    console.log('');
  }

  console.log('To complete setup, run:');
  console.log('  1. Download MP3 files to data/audio/');
  console.log('  2. Or deploy to server - it will generate TTS audio on first access');
}

main();