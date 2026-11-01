#!/usr/bin/env node
/**
 * 为《悉达多》全文剧集生成 TTS 音频（Windows System.Speech / Microsoft Zira）
 * 流程: transcript -> WAV (PowerShell) -> MP3 (ffmpeg) -> 复制到 server/data/audio
 * 支持断点续传（已存在的 MP3 跳过），并回填 durationSec 到 store.json。
 * 清理: 每集合成后删除临时 txt/ps1 与 WAV，运行结束删除 .tts-tmp 临时目录。
 *
 * 用法:
 *   node scripts/generate-siddhartha-tts.js            # 生成全部缺失剧集
 *   node scripts/generate-siddhartha-tts.js --only siddhartha-4   # 仅生成指定剧集
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = 'E:/speakwise-android-parity';
const STORE_FILE = path.join(ROOT, 'data/keke-reading/store.json');
const AUDIO_DIR = path.join(ROOT, 'data/audio');
const SERVER_AUDIO_DIR = path.join(ROOT, 'server/data/audio');
const TMP_DIR = path.join(AUDIO_DIR, '.tts-tmp');

function removeFileIfExists(p) {
  try {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  } catch {
    // 忽略单个文件删除失败
  }
}

function removeDirIfExists(p) {
  try {
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  } catch {
    // 忽略目录删除失败
  }
}

const FFmpeg_CANDIDATES = [
  'E:/sdk/ffmpeg.exe',
  'C:/Users/DELL/.devin/extensions/kilocode.kilo-code-7.8.14/bin/ffmpeg.exe',
  'ffmpeg',
];

function findFfmpeg() {
  for (const candidate of FFmpeg_CANDIDATES) {
    if (candidate === 'ffmpeg') {
      try {
        execSync('ffmpeg -version', { stdio: 'pipe' });
        return 'ffmpeg';
      } catch {
        continue;
      }
    }
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error('ffmpeg not found');
}

function runFfmpegInfo(audioPath, ffmpeg) {
  const cmd = `"${ffmpeg}" -i "${audioPath}"`;
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString();
  } catch (e) {
    // ffmpeg -i 无输出文件时以非 0 退出，但信息仍在 stdout/stderr 中
    return [
      e.stdout ? e.stdout.toString() : '',
      e.stderr ? e.stderr.toString() : '',
    ].join('\n');
  }
}

function getDurationSec(audioPath, ffmpeg) {
  try {
    const out = runFfmpegInfo(audioPath, ffmpeg);
    const m = out.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (m) {
      return Math.round(parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseFloat(m[3]));
    }
  } catch {
    // ignore
  }
  return 0;
}

function generateWav(lessonId, text) {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
  const txtPath = path.join(TMP_DIR, `${lessonId}.txt`);
  const psPath = path.join(TMP_DIR, `${lessonId}.ps1`);
  const wavPath = path.join(AUDIO_DIR, `${lessonId}.wav`);

  fs.writeFileSync(txtPath, text, 'utf8');

  const psScript = [
    "Add-Type -AssemblyName System.Speech",
    "$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer",
    "try { $speak.SelectVoice('Microsoft Zira Desktop') } catch { Write-Host 'VOICE_FALLBACK' }",
    "Write-Host ('VOICE=' + $speak.Voice.Name)",
    `$speak.SetOutputToWaveFile('${wavPath}')`,
    `$speak.Speak((Get-Content '${txtPath}' -Raw -Encoding UTF8))`,
    "$speak.Dispose()",
    "Write-Host 'TTS_DONE'",
  ].join('\r\n');
  fs.writeFileSync(psPath, psScript, 'utf8');

  const t0 = Date.now();
  const psOutput = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, {
    stdio: ['pipe', 'pipe', 'pipe'],
    timeout: 3600000,
  }).toString();
  const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
  const voiceLine = psOutput.split('\r\n').join('\n').split('\n').find(l => l.startsWith('VOICE='));
  if (voiceLine) console.log(`    [VOICE] ${voiceLine}`);
  if (!psOutput.includes('TTS_DONE')) {
    throw new Error(`TTS process did not complete for ${lessonId}`);
  }

  if (!fs.existsSync(wavPath)) {
    throw new Error(`WAV not generated for ${lessonId}`);
  }
  const sizeMB = (fs.statSync(wavPath).size / 1024 / 1024).toFixed(1);
  console.log(`    [WAV] ${sizeMB} MB, 合成耗时 ${elapsed}s`);

  // 清理临时文本与 PowerShell 脚本
  removeFileIfExists(txtPath);
  removeFileIfExists(psPath);
  return wavPath;
}

function convertToMp3(wavPath, mp3Path, ffmpeg) {
  execSync(`"${ffmpeg}" -y -i "${wavPath}" -acodec libmp3lame -b:a 128k "${mp3Path}"`, {
    stdio: 'pipe',
    timeout: 600000,
  });
  if (!fs.existsSync(mp3Path)) {
    throw new Error(`MP3 not generated for ${path.basename(mp3Path)}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf('--only');
  const onlyId = onlyIdx !== -1 ? args[onlyIdx + 1] : null;

  const ffmpeg = findFfmpeg();
  console.log(`[INFO] ffmpeg: ${ffmpeg}`);

  // 清理上次运行中断残留的临时目录
  removeDirIfExists(TMP_DIR);

  const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
  const course = store.courses[0];
  const story = (course.stories || []).find(s => s.id === 'siddhartha');
  if (!story) {
    console.error('[FAIL] story "siddhartha" not found in store.json');
    process.exit(1);
  }

  let lessons = story.lessons;
  if (onlyId) {
    lessons = lessons.filter(l => l.id === onlyId);
    if (lessons.length === 0) {
      console.error(`[FAIL] lesson ${onlyId} not found`);
      process.exit(1);
    }
  }

  console.log('='.repeat(64));
  console.log(`《悉达多》全文剧集 TTS 生成 (${lessons.length} 集)`);
  console.log('='.repeat(64));

  let generated = 0;
  let skipped = 0;
  const t0 = Date.now();

  for (const lesson of lessons) {
    const id = lesson.id;
    const mp3Path = path.join(AUDIO_DIR, `${id}.mp3`);
    const serverMp3Path = path.join(SERVER_AUDIO_DIR, `${id}.mp3`);

    if (fs.existsSync(mp3Path) && fs.statSync(mp3Path).size > 0) {
      if (lesson.durationSec === 0) {
        lesson.durationSec = getDurationSec(mp3Path, ffmpeg);
      }
      console.log(`[SKIP] ${id} - MP3 已存在 (${lesson.durationSec}s)`);
      skipped++;
      continue;
    }

    const text = (lesson.transcript || []).join(' ');
    console.log(`\n[GEN] ${id} "${lesson.title}" (${text.length} 字符, ${lesson.transcript.length} 句)`);

    try {
      const wavPath = generateWav(id, text);
      convertToMp3(wavPath, mp3Path, ffmpeg);
      const duration = getDurationSec(mp3Path, ffmpeg);
      lesson.durationSec = duration;
      const mp3MB = (fs.statSync(mp3Path).size / 1024 / 1024).toFixed(1);
      console.log(`    [MP3] ${mp3MB} MB, 时长 ${duration}s (~${Math.round(duration / 60)} 分钟)`);

      if (!fs.existsSync(SERVER_AUDIO_DIR)) fs.mkdirSync(SERVER_AUDIO_DIR, { recursive: true });
      fs.copyFileSync(mp3Path, serverMp3Path);
      console.log(`    [OK] 已复制到 server/data/audio/`);

      fs.unlinkSync(wavPath);
      generated++;
    } catch (e) {
      console.log(`    [FAIL] ${id}: ${e.message}`);
      // 失败时清理残留的 WAV 与临时文件
      removeFileIfExists(path.join(AUDIO_DIR, `${id}.wav`));
      removeFileIfExists(path.join(TMP_DIR, `${id}.txt`));
      removeFileIfExists(path.join(TMP_DIR, `${id}.ps1`));
    }
  }

  // 清理临时目录（每集已清理临时文件，此处兜底删除目录本身）
  removeDirIfExists(TMP_DIR);

  // 保存 durationSec 回填结果
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf8');

  const totalMin = ((Date.now() - t0) / 1000 / 60).toFixed(1);
  console.log('\n' + '='.repeat(64));
  console.log(`完成: 新生成 ${generated} 集, 跳过 ${skipped} 集, 总耗时 ${totalMin} 分钟`);
  const durations = story.lessons.map(l => `${l.id}=${l.durationSec}s`).join(' ');
  console.log(`时长: ${durations}`);
}

main();
