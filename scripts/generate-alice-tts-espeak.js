#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ALICE_TEXT = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peered over the edge of the garden, but when she looked back she saw the rabbit-hare going towards the door. She thought that she would just go and see what was in the garden, so she climbed up a tree, and peered over the hedge. But when she was looking at the top of the tree, she saw a rabbit-hole just then go past the edge of the garden, and she wondered whether she could climb down, but it was not the right sort of hole, for there were several little doors and mosaics. The moment that Alice fell, she wondered whether she would have been able to climb down, but it was not the right sort of hole, for there were several little doors and mosaics. When she had fallen a good way down, she looked round and saw the garden growing larger, and the trees and flowers appeared to be very close. She tried to get up again, but found it quite impossible: she was caught fast, and there was no way to get down. Alice called out, 'What a curious thing! This is very strange indeed!' She thought she had been dreaming all the time, but when she looked round, she saw the garden growing larger, and the trees and flowers appeared to be very close. When she had fallen a good way down, she looked round and saw the garden growing larger, and the trees and flowers appeared to be very close. She tried to get up again, but found it quite impossible: she was caught fast, and there was no way to get down. Alice called out, 'What a curious thing! This is very strange indeed!' She thought she had been dreaming all the time.`;

const OUTPUT_PATH = 'E:/speakwise-android-parity/data/audio/alice-adventures-wonderland-1.mp3';
const AUDIO_DIR = path.dirname(OUTPUT_PATH);
const TTS_BINARY = process.env.ESPEAK_PATH || 'espeak-ng';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  console.log('🎙️ 正在使用离线TTS生成爱丽丝音频...');
  console.log(`文本字符数: ${ALICE_TEXT.length}`);
  
  ensureDir(AUDIO_DIR);
  
  try {
    console.log('正在生成音频...');
    execSync(`${TTS_BINARY} -v en-us -s 150 "${ALICE_TEXT}" -o "${OUTPUT_PATH}"`, {
      stdio: 'inherit',
      timeout: 60000
    });
    
    console.log('✅ 完成！');
    
    const stats = fs.statSync(OUTPUT_PATH);
    console.log(`📁 文件: ${OUTPUT_PATH}`);
    console.log(`📁 大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
    if (stats.size < 1024) {
      console.warn('⚠️ 文件过小，可能是占位文件');
      return false;
    }
    return true;
  } catch (error) {
    console.error('❌ TTS生成失败:');
    console.error(error.message);
    return false;
  }
}

main();