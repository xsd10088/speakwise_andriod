#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TRANSCRIPT = [
  "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peered over the edge of the garden, but when she looked back she saw the rabbit-hare going towards the door.",
  "She thought that she would just go and see what was in the garden, so she climbed up a tree, and peered over the hedge.",
  "But when she was looking at the top of the tree, she saw a rabbit-hole just then go past the edge of the garden, and she wondered whether she could climb down, but it was not the right sort of hole, for there were several little doors and mosaics.",
  "The moment that Alice fell, she wondered whether she would have been able to climb down, but it was not the right sort of hole, for there were several little doors and mosaics.",
  "When she had fallen a good way down, she looked round and saw the garden growing larger, and the trees and flowers appeared to be very close.",
  "She tried to get up again, but found it quite impossible: she was caught fast, and there was no way to get down.",
  "Alice called out, 'What a curious thing! This is very strange indeed!' She thought she had been dreaming all the time, but when she looked round, she saw the garden growing larger, and the trees and flowers appeared to be very close.",
  "When she had fallen a good way down, she looked round and saw the garden growing larger, and the trees and flowers appeared to be very close.",
  "She tried to get up again, but found it quite impossible: she was caught fast, and there was no way to get down.",
  "Alice called out, 'What a curious thing! This is very strange indeed!' She thought she had been dreaming all the time."
].join(' ');

const OUTPUT_DIR = 'E:/speakwise-android-parity/data/audio';
const OUTPUT_MP3 = path.join(OUTPUT_DIR, 'alice-adventures-wonderland-1.mp3');
const OUTPUT_WAV = path.join(OUTPUT_DIR, 'alice-adventures-wonderland-1.wav');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  console.log('🎙️ 正在生成爱丽丝音频...');
  console.log(`文本字符数: ${TRANSCRIPT.length}`);
  
  ensureDir(OUTPUT_DIR);
  
  // Write PowerShell script to generate WAV
  const psScript = `
Add-Type -AssemblyName System.Speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.SelectVoice('Microsoft Zira Desktop')
${TRANSCRIPT.split('.').map((s, i) => `    # ${i+1}`).join('\n')}
$speak.SetOutputToWaveFile('${OUTPUT_WAV}')
$speak.Speak('${TRANSCRIPT.replace(/'/g, "''")}')
Write-Host "WAV 生成完成: ${OUTPUT_WAV}"
`;
  
  const psPath = path.join(OUTPUT_DIR, 'generate-tts.ps1');
  fs.writeFileSync(psPath, psScript, 'utf8');
  
  try {
    console.log('正在调用系统 TTS...');
    execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, {
      stdio: 'inherit',
      timeout: 120000
    });
    
    if (fs.existsSync(OUTPUT_WAV)) {
      console.log('正在转换为 MP3...');
      try {
        execSync(`ffmpeg -y -i "${OUTPUT_WAV}" -acodec libmp3lame -b:a 96k "${OUTPUT_MP3}"`, {
          stdio: 'pipe'
        });
        console.log('✅ MP3 生成完成！');
      } catch (e) {
        // 如果没有 libmp3lame，只是重命名
        console.log('FFmpeg MP3 编码失败，使用 WAV 格式...');
        fs.renameSync(OUTPUT_WAV, OUTPUT_MP3.replace('.mp3', '.wav'));
      }
    }
    
    const stats = fs.statSync(fs.existsSync(OUTPUT_MP3) ? OUTPUT_MP3 : OUTPUT_WAV.replace('.mp3', '.wav'));
    console.log(`📁 大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`✅ 完成: ${fs.existsSync(OUTPUT_MP3) ? OUTPUT_MP3 : OUTPUT_WAV.replace('.mp3', '.wav')}`);
    
    fs.unlinkSync(psPath);
  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

main();