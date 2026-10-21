const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

require('dotenv').config();

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';

function readArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Microsoft Speech TTS MP3 Generator
Usage: node generate-audio.js "text" [language] [output.mp3]

Examples:
  node generate-audio.js "你好世界" "zh-CN" "hello.mp3"
  node generate-audio.js "Hello World" "en-US"
  
Environment variables:
  AZURE_SPEECH_KEY    Azure Speech subscription key (required)
  AZURE_SPEECH_REGION Azure Speech region (default: eastus)
`);
    process.exit(1);
  }
  
  return {
    text: args[0],
    language: args[1] || 'zh-CN',
    outputFile: args[2] || 'output.mp3'
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateSpeech(text, language, outputFile) {
  if (!AZURE_KEY) {
    console.error('Error: AZURE_SPEECH_KEY not set in environment');
    console.error('Get key from: https://portal.azure.com/#blade/Microsoft_Azure_Communication_Services/SpeechSynthesisBlade');
    process.exit(1);
  }

  if (!fs.existsSync(path.join(__dirname, '@azure'))) {
    console.log('Installing @azure/speech...');
    execSync('npm install @azure/speech', { stdio: 'inherit' });
  }

  const { SpeechSynthesizer, SpeechConfig, AudioConfig } = require('@azure/speech');
  
  const speechConfig = SpeechConfig.fromSubscription({
    subscriptionKey: AZURE_KEY,
    serviceRegion: AZURE_REGION
  });
  
  speechConfig.setSpeechSynthesisLanguage(language);
  
  const audioConfig = AudioConfig.fromAudioFileOutput(outputFile);
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
  
  console.log(`Generating audio (${language})...`);
  
  const result = await synthesizer.speakTextAsync(text);
  
  if (result.reason === 2) {
    console.log(`✓ Saved to: ${outputFile}`);
    console.log(`  Size: ${(fs.statSync(outputFile).size / 1024).toFixed(1)} KB`);
  } else if (result.reason === 1) {
    console.error(`✗ Canceled: ${result.errorDetails}`);
    process.exit(1);
  } else {
    console.error(`✗ Failed. Reason: ${result.reason}`);
    process.exit(1);
  }
  
  synthesizer.close();
}

function isTextValid(text) {
  const chineseRegex = /[\u4e00-\u9fff]/;
  const englishRegex = /[a-zA-Z]/;
  return chineseRegex.test(text) || englishRegex.test(text);
}

async function main() {
  const { text, language, outputFile } = readArgs();
  
  if (!isTextValid(text)) {
    console.error('Error: Input text should contain Chinese or English characters');
    process.exit(1);
  }
  
  await generateSpeech(text, language, outputFile);
}

main().catch(console.error);