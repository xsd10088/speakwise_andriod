# Microsoft Speech TTS Audio Generator

## 用法

```bash
node scripts/generate-audio.js "你的文本内容" "zh-CN" "output-filename.mp3"
```

## 参数
- 第一个参数: 文本内容（必需，用双引号包裹）
- 第二个参数: 语音语言代码（默认 zh-CN，可选：en-US, en-GB 等）
- 第三个参数: 输出文件名（默认 output.mp3）

## 依赖
- Node.js 18+
- Microsoft Azure Speech 订阅密钥

## 设置
1. 创建 .env 文件：
```
AZURE_SPEECH_KEY=你的订阅密钥
AZURE_SPEECH_REGION=你的区域 (eastus)
```

2. 安装依赖：
```bash
npm install @azure/speech
```

## Node.js 脚本

### scripts/generate-audio.js
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function generateSpeech(text, language = 'zh-CN', outputFile = 'output.mp3') {
  const { SpeechSynthesizer, SpeechConfig } = require('@azure/speech');
  
  const speechConfig = SpeechConfig.fromSubscription({
    subscriptionKey: process.env.AZURE_SPEECH_KEY,
    serviceRegion: process.env.AZURE_SPEECH_REGION
  });
  
  speechConfig.setSpeechSynthesisLanguage(language);
  
  const synthesizer = new SpeechSynthesizer(speechConfig);
  
  console.log(`Generating audio for: ${text.substring(0, 50)}...`);
  
  const result = await synthesizer.speakTextAsync(
    text,
    (s) => {
      console.log('Speech generation started...');
    },
    (e) => {
      console.error(`Error: ${e}`);
      process.exit(1);
    },
    async (r) => {
      if (r.reason === 2) {
        const audioBuffer = r.resultAudioData;
        fs.writeFileSync(outputFile, Buffer.from(audioBuffer));
        console.log(`Saved to: ${outputFile}`);
      } else {
        console.error(`Speech synthesis failed. Reason: ${r.reason}`);
      }
      synthesizer.close();
    }
  );
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node generate-audio.js "text" [language] [output.mp3]');
  process.exit(1);
}

const text = args[0];
const language = args[1] || 'zh-CN';
const outputFile = args[2] || 'output.mp3';

generateSpeech(text, language, outputFile);
```

## 快速批量处理脚本

### scripts/batch-generate.js
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function batchGenerate(jsonFile, outputDir) {
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const { SpeechSynthesizer, SpeechConfig } = require('@azure/speech');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const speechConfig = SpeechConfig.fromSubscription({
    subscriptionKey: process.env.AZURE_SPEECH_KEY,
    serviceRegion: process.env.AZURE_SPEECH_REGION
  });
  
  const synthesizer = new SpeechSynthesizer(speechConfig);
  
  for (const item of data.lines || []) {
    const text = item.text;
    const id = item.id;
    const outputFile = path.join(outputDir, `${id}.mp3`);
    
    await new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        () => {},
        (e) => reject(e),
        (r) => {
          if (r.reason === 2) {
            fs.writeFileSync(outputFile, Buffer.from(r.resultAudioData));
            console.log(`Generated: ${outputFile}`);
            resolve();
          } else {
            reject(new Error(`Failed: ${r.reason}`));
          }
        }
      );
    });
  }
  
  synthesizer.close();
  console.log('Batch generation complete!');
}

const args = process.argv.slice(2);
batchGenerate(args[0], args[1] || './audio');
```

## 使用示例

```bash
# 生成单个音频
node scripts/generate-audio.js "Hello, I am Alice." "en-US" "alice-hello.mp3"

# 批量从 JSON 生成
node scripts/batch-generate.js data/keke-reading/alice-adventures-wonderland-1.json data/audio/
```

---

## 3. 继续爬取可可英语精读内容的提示语

```
请继续爬取可可英语精读模块的后续内容。需要：

1. **爬取范围**：
   - 更多可可英语经典名著课文
   - 中英文对照文本
   - 音频文件链接/下载地址

2. **数据结构**：
   - JSON 格式包含：
     - id: 唯一标识符
     - title: 课文标题
     - text: 英文原文（逐句）
     - translation: 中文翻译（对应句子）
     - audioUrl: 音频播放链接
     - duration: 课时时长
     - level: 难度等级（beginner/medium/advanced）

3. **目录结构**：
   ```
   data/keke-reading/
   ├── {book-id}.json      # 课文数据
   └── store.json          # 课程索引
   ```

4. **源头**：
   - LibriVox 免费有声书
   - 可可英语官方资源
   - 其他免费公开领域文本

5. **输出**：
   - 提交到 feature/android-parity-xsd10088 分支
   - 同步至 data/audio/ 目录
   - 更新 lib/voa.ts 课程配置

当前项目已集成 Alice 和 Siddhartha 两本书，请继续添加后续书目。
```