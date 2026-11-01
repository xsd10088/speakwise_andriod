#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INPUT_JSON = 'E:/speakwise-android-parity/data/keke-reading/alice-adventures-wonderland-1.json';
const OUTPUT_DIR = 'E:/speakwise-android-parity/data/audio';
const OUTPUT_WAV = path.join(OUTPUT_DIR, 'alice-adventures-wonderland-1.wav');
const OUTPUT_MP3 = path.join(OUTPUT_DIR, 'alice-adventures-wonderland-1.mp3');

function main() {
  console.log('🎙️ 生成爱丽丝音频...');
  
  try {
    // 读取 JSON
    const data = JSON.parse(fs.readFileSync(INPUT_JSON, 'utf8'));
    const text = data.transcript.join(' ');
    console.log(`文本: ${text.substring(0, 100)}... (${text.length} 字符)`);
    
    // 创建输出目录
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    
    // 写入临时文本文件给 PowerShell
    const textFile = path.join(OUTPUT_DIR, 'tts-text.txt');
    fs.writeFileSync(textFile, text, 'utf8');
    
    // 调用 PowerShell TTS
    const psScript = `
Add-Type -AssemblyName System.Speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.SelectVoice('Microsoft Zira Desktop')
$speak.SetOutputToWaveFile('${OUTPUT_WAV}')
$speak.Speak((Get-Content '${textFile}' -Raw))
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'gen.ps1'), psScript, 'utf8');
    
    console.log('正在生成 WAV 音频...');
    execSync(`powershell -ExecutionPolicy Bypass -File "${OUTPUT_DIR}\\gen.ps1"`, {
      stdio: 'inherit',
      timeout: 180000
    });
    
    if (fs.existsSync(OUTPUT_WAV)) {
      // 转换为 MP3 (如果有 ffmpeg)
      console.log('正在转换为 MP3...');
      try {
        execSync(`ffmpeg -y -i "${OUTPUT_WAV}" -acodec libmp3lame -b:a 96k "${OUTPUT_MP3}"`, { stdio: 'pipe' });
        console.log('✅ MP3 生成完成');
      } catch (e) {
        console.log('FFmpeg 未安装，使用 WAV 格式');
        fs.renameSync(OUTPUT_WAV, OUTPUT_MP3.replace('.mp3', '.wav'));
      }
    }
    
    // 清理临时文件
    fs.unlinkSync(textFile);
    fs.unlinkSync(path.join(OUTPUT_DIR, 'gen.ps1'));
    
    // 复制到 server 目录
    const serverDir = 'E:/speakwise-android-parity/server/data/audio';
    if (!fs.existsSync(serverDir)) fs.mkdirSync(serverDir, { recursive: true });
    const serverFile = path.join(serverDir, 'alice-adventures-wonderland-1.mp3');
    const srcFile = fs.existsSync(OUTPUT_MP3) ? OUTPUT_MP3 : OUTPUT_WAV.replace('.mp3', '.wav');
    fs.copyFileSync(srcFile, serverFile);
    console.log(`✅ 已复制到: ${serverFile}`);
    
    const src = fs.existsSync(OUTPUT_MP3) ? OUTPUT_MP3 : OUTPUT_WAV.replace('.mp3', '.wav');
    const stats = fs.statSync(src);
    console.log(`📁 文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log('✅ 完成！');
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

main();