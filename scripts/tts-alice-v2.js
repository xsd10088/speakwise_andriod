#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const JSON_PATH = 'E:/speakwise-android-parity/data/keke-reading/alice-adventures-wonderland-1.json';
const OUTPUT_WAV = 'E:/speakwise-android-parity/data/audio/alice-adventures-wonderland-1.wav';
const OUTPUT_MP3 = 'E:/speakwise-android-parity/data/audio/alice-adventures-wonderland-1.mp3';

// Read JSON using file read and parse
const rawContent = fs.readFileSync(JSON_PATH, 'utf8');
let transcriptArr;
try {
  const parsed = JSON.parse(rawContent);
  transcriptArr = parsed.transcript;
} catch (e) {
  // Manual extraction if JSON fails
  const lines = rawContent.split('\n').filter(l => l.includes('"'));
  transcriptArr = lines
    .map(l => l.replace(/^.*"[^"]*"\s*:\s*"(\w.*)".$/, '$1').replace(/^.*"([^"]*)",$/, '$1'))
    .filter(s => s.length > 0 && !s.startsWith('"'));
}

const text = (transcriptArr || []).join(' ');
console.log(`文本字符数: ${text.length}`);

if (!fs.existsSync('E:/speakwise-android-parity/data/audio')) {
  fs.mkdirSync('E:/speakwise-android-parity/data/audio', { recursive: true });
}

// Create PowerShell script with escaped content
const escapedText = text.replace(/\\/g, '\\\\').replace(/'/g, "''").replace(/`/g, '``');
const psScript = `
Add-Type -AssemblyName System.Speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.SelectVoice('Microsoft Zira Desktop')
$speak.Rate = 1
$speak.Volume = 100
$speak.SetOutputToWaveFile('${OUTPUT_WAV}')
$speak.Speak('${escapedText}')
`;

fs.writeFileSync('E:/speakwise-android-parity/data/audio/gen-alice.ps1', psScript);

console.log('正在生成音频...');
try {
  execSync('powershell -ExecutionPolicy Bypass -File "E:/speakwise-android-parity/data/audio/gen-alice.ps1"', {
    stdio: 'inherit',
    timeout: 120000,
    maxBuffer: 50 * 1024 * 1024
  });
  
  const stats = fs.statSync(OUTPUT_WAV);
  console.log(`WAV 大小: ${(stats.size / 1024).toFixed(2)} KB`);
  
  if (stats.size > 10000) {
    console.log('音频生成成功！');
    // Rename to mp3 (will be used as wav file with mp3 extension for app compatibility)
    fs.copyFileSync(OUTPUT_WAV, OUTPUT_MP3);
    console.log('已复制到 data/audio/alice-adventures-wonderland-1.mp3');
    
    // Copy to server
    const serverDir = 'E:/speakwise-android-parity/server/data/audio';
    if (!fs.existsSync(serverDir)) fs.mkdirSync(serverDir, { recursive: true });
    fs.copyFileSync(OUTPUT_MP3, `${serverDir}/alice-adventures-wonderland-1.mp3`);
    console.log('已复制到 server/data/audio/ 目录');
  } else {
    console.log('Warning: Generated audio too small, may be invalid');
  }
} catch (e) {
  console.error('Error:', e.message);
}

// Cleanup
try { fs.unlinkSync('E:/speakwise-android-parity/data/audio/gen-alice.ps1'); } catch {}