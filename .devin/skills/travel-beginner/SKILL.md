# 为出行旅游场景扩展低难度对话

为出行旅游（travel）场景将低难度对话从50句扩展到100句。

## 功能

将 travel 场景的低难度对话从50句扩展到100句，每句控制在10个单词以内，使用基础英语词汇。

## 特点

- 每句控制在10个单词以内
- 词汇为基础英语（CET-4/6级别）
- 语法简单，多为短句
- 符合美式口语习惯
- 包含常见出行场景：问路、机场、酒店、租车、观光、购物等

## 使用方法

### 方法1：直接运行Python脚本

```bash
cd /c/speakwise-android-parity
python .devin/skills/travel-beginner/generate.py
```

### 方法2：通过技能调用

在对话中请求：
```
请调用 travel-beginner 技能为出行旅游场景扩展低难度对话
```

## 执行内容

脚本会自动执行以下操作：

1. **替换 travelLinesBeginner 常量**
   - 删除现有的50句 `travelLinesBeginner` 常量
   - 插入完整的100句低难度对话

2. **更新注释**
   - 将注释从"低难度 50 句"改为"低难度 100 句"

## 输出格式

```typescript
const travelLinesBeginner: ListeningLine[] = [
  { id: "travel-b-1", speaker: "Alex", text: "Where is the station?", translation: "车站在哪里？", note: "asking for location" },
  { id: "travel-b-2", speaker: "Mike", text: "Go straight, then turn left.", translation: "直走，然后左转。", note: "giving directions" },
  // ... 共100句
];
```

## 注意事项

- 确保对话在Alex和Mike之间交替
- 每条对话包含id、speaker、text、translation、note字段
- id格式为 "travel-b-{序号}"
- note字段简要说明对话内容类型
- 脚本会先删除旧的50句数据，再插入新的100句数据
