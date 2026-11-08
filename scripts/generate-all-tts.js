#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = 'E:/speakwise-android-parity/data/audio';
const SERVER_DIR = 'E:/speakwise-android-parity/server/data/audio';
const LESSONS = [
  'siddhartha-brahmin-son-1',
  'siddhartha-brahmin-son-2',
  'siddhartha-brahmin-son-3',
  'siddhartha-brahmin-son-4',
  'siddhartha-brahmin-son-5',
  'siddhartha-brahmin-son-6',
  'siddhartha-brahmin-son-8',
  'siddhartha-brahmin-son-9',
  'siddhartha-brahmin-son-10',
  'siddhartha-brahmin-son-11',
  'little-prince-1',
  'little-prince-2',
  'little-prince-15',
  'little-prince-16',
  'little-prince-17',
  'little-prince-18',
  'grimm-fairy-tales-1',
  'grimm-fairy-tales-2',
  'romeo-juliet-1'
];

function generateTts(lessonId) {
  const inputPath = `E:/speakwise-android-parity/data/keke-reading/store.json`;
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const lesson = data.courses[0].lessons.find(l => l.id === lessonId);
  if (!lesson) return false;

  const text = lesson.transcript.join(' ');
  const wavPath = path.join(OUTPUT_DIR, `${lessonId}.wav`);
  const mp3Path = path.join(OUTPUT_DIR, `${lessonId}.mp3`);
  const serverMp3Path = path.join(SERVER_DIR, `${lessonId}.mp3`);

  if (fs.existsSync(mp3Path) || fs.existsSync(wavPath)) {
    console.log(`[SKIP] ${lessonId} - audio already exists`);
    return true;
  }

  console.log(`[GEN] ${lessonId} (${text.length} chars)`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(SERVER_DIR)) fs.mkdirSync(SERVER_DIR, { recursive: true });

  const textFile = path.join(OUTPUT_DIR, 'tts-text.txt');
  fs.writeFileSync(textFile, text, 'utf8');

  const psScript = `
Add-Type -AssemblyName System.Speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.SelectVoice('Microsoft Zira Desktop')
$speak.SetOutputToWaveFile('${wavPath}')
$speak.Speak((Get-Content '${textFile}' -Raw))
`;
  const psPath = path.join(OUTPUT_DIR, 'gen.ps1');
  fs.writeFileSync(psPath, psScript, 'utf8');

  try {
    execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, {
      stdio: 'pipe',
      timeout: 300000
    });

    if (fs.existsSync(wavPath)) {
      try {
        execSync(`ffmpeg -y -i "${wavPath}" -acodec libmp3lame -b:a 128k "${mp3Path}"`, { stdio: 'pipe' });
        console.log(`  [OK] MP3 generated`);
        fs.unlinkSync(wavPath);
      } catch (e) {
        console.log(`  [OK] WAV generated (ffmpeg not available)`);
        fs.renameSync(wavPath, mp3Path.replace('.mp3', '.wav'));
      }
    }

    const srcFile = fs.existsSync(mp3Path) ? mp3Path : mp3Path.replace('.mp3', '.wav');
    fs.copyFileSync(srcFile, serverMp3Path);
    console.log(`  [OK] Copied to server`);

    fs.unlinkSync(textFile);
    fs.unlinkSync(psPath);
    return true;
  } catch (e) {
    console.log(`  [FAIL] ${e.message}`);
    return false;
  }
}

console.log('='.repeat(60));
console.log('Generate TTS Audio for All Lessons');
console.log('='.repeat(60));

let success = 0;
for (const id of LESSONS) {
  if (generateTts(id)) success++;
}
console.log(`\nDone: ${success}/${LESSONS.length} lessons processed`);