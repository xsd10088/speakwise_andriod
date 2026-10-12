# 为日常问候场景生成低难度对话

为日常问候（greetings）场景生成真实的低难度对话数据。

## 功能

生成100句日常问候的低难度对话，每句控制在10个单词以内，使用基础英语词汇。

## 特点

- 每句控制在10个单词以内
- 词汇为基础英语（CET-4/6级别）
- 语法简单，多为短句
- 符合美式口语习惯
- 包含常见日常用语：问候、道别、感谢、介绍、时间询问等

## 使用方法

### 方法1：直接运行Python脚本

```bash
cd /c/speakwise-android-parity
python .devin/skills/greetings-beginner/generate.py
```

### 方法2：通过技能调用

在对话中请求：
```
请调用 greetings-beginner 技能为日常问候场景生成低难度对话
```

## 执行内容

脚本会自动执行以下操作：

1. **添加 greetingsLinesBeginner 常量**
   - 在 `lib/data.ts` 的 `LISTENING_LINES` 之后插入完整的100句低难度对话
   - 如果常量已存在则跳过

2. **修改 SCENE_CONTENT.greetings.beginner**
   - 将 `SCENE_CONTENT.greetings.beginner` 从简化生成的数据改为使用 `greetingsLinesBeginner`
   - 如果已更新则跳过

## 输出格式

```typescript
const greetingsLinesBeginner: ListeningLine[] = [
  { id: "greetings-b-1", speaker: "Alex", text: "Hello!", translation: "你好！", note: "basic greeting" },
  { id: "greetings-b-2", speaker: "Mia", text: "Hi there!", translation: "嗨！", note: "friendly greeting" },
  // ... 共100句
];
```

## 注意事项

- 确保对话在Alex和Mia之间交替
- 每条对话包含id、speaker、text、translation、note字段
- id格式为 "greetings-b-{序号}"
- note字段简要说明对话内容类型
- 脚本会检查内容是否已存在，避免重复添加
