#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const lessonPath = process.argv[2] || 'data/keke-reading/alice-adventures-wonderland-1.json';
const outputDir = 'data/audio';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));
const id = lesson.id;
const title = lesson.title;
const transcript = lesson.transcript.join(' ');

async function generateWithFFmpeg(text, outputPath) {
  const ttsDir = path.join(outputPath, '..', 'tts-temp');
  if (!fs.existsSync(ttsDir)) fs.mkdirSync(ttsDir, { recursive: true });
  
  const textFile = path.join(ttsDir, 'text.txt');
  fs.writeFileSync(textFile, text, 'utf8');
  
  console.log(`[TTS] 生成语音文件: ${outputPath}`);
  console.log(`[TTS] 文本长度: ${text.length} 字符`);
  
  return new Promise((resolve) => {
    const cmd = `ffmpeg -y -f lavfi -i "tts=textfile='${textFile}':voice='en-US':speed=1.0" -acodec libmp3lame -b:a 96k "${outputPath}" 2>/dev/null`;
    exec(cmd, (err) => {
      if (err) {
        console.log('[TTS] FFmpeg TTS 失败，尝试使用 espeak...');
        exec(`espeak -v en -s 150 -w "${outputPath.replace('.mp3', '.wav')}" "${text.replace(/"/g, '\\"')}" 2>/dev/null`, (e) => {
          if (!e) {
            exec(`ffmpeg -y -i "${outputPath.replace('.mp3', '.wav')}" -acodec libmp3lame -b:a 96k "${outputPath}"`, () => resolve(true));
          } else {
            console.log('[TTS] 需要安装 espeak 或 ffmpeg-tts');
            resolve(false);
          }
        });
      } else {
        resolve(true);
      }
    });
  });
}

async function main() {
  const outputFile = path.join(outputDir, `${id}.mp3`);
  
  console.log('='.repeat(50));
  console.log(`生成音频: ${title}`);
  console.log(`ID: ${id}`);
  console.log('='.repeat(50));
  
  if (fs.existsSync(outputFile)) {
    const stats = fs.statSync(outputFile);
    console.log(`[OK] 已存在音频文件: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
    return;
  }
  
  console.log(`[INFO] 使用文本转语音生成音频...`);
  console.log('[提示] 需要 ffmpeg 支持 tts 模块，或安装 espeak + ffmpeg');
}

main().catch(console.error);