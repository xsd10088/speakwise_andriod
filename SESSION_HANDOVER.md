# 项目交接文档

## 当前工作状态

### 已完成工作
1. **travel.json 文件创建**
   - 位置：`dialog_data/travel.json`
   - 包含 100 条 travel 对话数据
   - 说话人：Alex / Mia
   - 格式：`[说话人, 英文文本, 中文翻译, 语法笔记]`

2. **lib/data.ts travel array 更新**
   - 行号：140-241
   - 说话人从 "Traveler"/"Agent" 变更为 "Alex"/"Mia"
   - 移除了重复的 "Take care." 文本
   - 100 条对话，数据完整

### 变更摘要
| 项目 | 旧值 | 新值 |
|------|------|------|
| 说话人 | Traveler / Agent | Alex / Mia |
| 重复文本 | travel-39, travel-40 都有 "Take care." | 无重复 |
| 对话数量 | 100 条 | 100 条 |

### Git 状态
```
Changes not staged for commit:
  modified:   lib/data.ts
  modified:   PROJECT_SNAPSHOT.md
  modified:   gradle/wrapper/gradle-wrapper.properties
  modified:   kilo.json

Untracked files:
  dialog_data/travel.json
  lib/data.ts.travel.bak
```

## 下一步工作计划

### 1. 其他场景数组的 JSON 文件化
根据项目结构，建议为以下场景创建对应的 JSON 文件：
- `dialog_data/greetings.json` - 当前 greetings.txt 不完整，需要更新
- `dialog_data/business.json` - 从 data.ts 提取
- `dialog_data/housing.json` - 从 data.ts 提取
- `dialog_data/medical.json` - 从 data.ts 提取
- `dialog_data/banking.json` - 从 data.ts 提取
- `dialog_data/shopping.json` - 从 data.ts 提取
- `dialog_data/transit.json` - 从 data.ts 提取
- `dialog_data/government.json` - 从 data.ts 提取
- `dialog_data/school.json` - 从 data.ts 提取
- `dialog_data/restaurant.json` - 从 data.ts 提取
- `dialog_data/emergency.json` - 从 data.ts 提取

### 2. 数据一致性验证
- 验证所有 JSON 文件与 data.ts 中的数据完全匹配
- 确保没有遗漏或重复的对话

### 3. 备份文件清理
- `lib/data.ts.greetings.bak`
- `lib/data.ts.travel.bak`
- 考虑是否需要保留或删除

## 技术参考

### JSON 文件格式
```json
[
  ["Alex", "I'm leaving for Portland early tomorrow, so I'm making a packing list.", "我明天一早就去波特兰，所以正在列行李清单。", "leave for + 地点表示动身前往某地。"],
  ["Mia", "Start with your passport, ticket, and any visa documents you need.", "先从护照、机票和所需签证文件开始。", "start with 表示先从……开始。"],
  ...
]
```

### data.ts 结构
```typescript
export type PracticeLine = { 
  id: string; 
  speaker: Speaker; 
  text: string; 
  translation: string; 
  note: string 
};
export type ListeningLine = PracticeLine;
```

## 联系信息
- 项目：speakwise-android-parity
- 分支：main
- 最近修改：travel array (feature/android-parity-xsd10088)