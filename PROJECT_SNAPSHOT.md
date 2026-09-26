# 项目快照：Speakwise Android 听力数据重构

## 快照时间

2026-09-25 12:55（当前工作区状态）

## 仓库状态

- 当前分支：`main`
- 基线提交：`7b972c6e256a1617e7e17ace00ec52e64cef457d`（`merge: resolve .gitignore conflict and merge origin/main`）
- 工作区：存在未提交变更；当前运行时数据变更仅涉及 `lib/data.ts` 的 `greetings` 数组。
- `lib/data.ts` 当前 diff：101 行新增、100 行删除；与 `lib/data.ts.greetings.bak` 对比，仅覆盖 `greetings` 数组。
- `lib/data.ts.travel.bak` 已创建，作为 `travel` 替换前备份；`travel` 尚未写入运行时数据。
- `kilo.json` 存在与本任务无关的既有修改，不应纳入听力数据提交。
- 既有未跟踪生成/修复脚本、候选文本、`.gradle/` 和 `__pycache__/` 未纳入本次提交范围。

## 已完成场景

### `greetings`

- 位置：`lib/data.ts:37`
- 状态：完整重写为 100 条高质量日常问候对话。
- 角色：`greetings-1` 至 `greetings-100` 严格交替使用 `Alex` / `Mia`。
- 内容单元：10 个连续 10 句主题单元，依次为睡眠与阅读、通勤、周末烘焙店、设计评审、雨后散步、咖啡馆与艺术展、摄影、餐厅、日本旅行规划、出发前准备。
- 结构：每个对象包含 `id`、`speaker`、`text`、`translation`、`note`。
- 质量：已消除原数组中提前道别后继续对话、重复道别、机械问答、中文式英语和事实性注释错误。

## 当前进行场景

### `travel`

- 位置：`lib/data.ts:140`
- 状态：旧数组仍在运行时文件中，尚未替换。
- 当前审计：`travel: validation failed - duplicate English text found`。
- 已完成候选：`C:\Users\xsd\AppData\Local\Temp\kilo\travel-records.json`。
- TypeScript 候选：`C:\Users\xsd\AppData\Local\Temp\kilo\travel-records.ts`，文件带 UTF-16 BOM，当前 AST 解析未用于写入。
- 候选校验：100 条；`travel-1..travel-100`；`Alex` / `Mia` 严格交替；`id`、`speaker`、`text`、`translation`、`note` 完整；英文、中文、注释均无重复；10 个连续主题单元。
- 当前阻塞：临时候选文件编码解析问题；下一步改用已验证 JSON，按 `travel-1` 与 `travel-100` 的唯一数组边界写入。

## 其他场景状态

`business`、`housing`、`medical`、`banking`、`shopping`、`transit`、`government`、`school`、`restaurant`、`emergency` 当前均保留原有 100 条数组，但本轮未对它们做内容替换。后续场景必须逐场景完成内容审查、替换和验证，不能仅凭数量判断质量。

## 验证结果

### `greetings`

```text
node validate-data-scene.js greetings
greetings: PASS (100 objects, continuous IDs, complete fields, unique English text, no forbidden templates)
```

额外 AST/结构校验通过：

```text
TypeScript parse: PASS
100 continuous IDs: PASS
strict Alex/Mia alternation: PASS
complete id/speaker/text/translation/note fields: PASS
unique English text: PASS
unique translations: PASS
unique notes: PASS
zero normalized duplicate English lines: PASS
```

项目命令：

```text
pnpm typecheck       PASS
pnpm test            PASS（2 个测试文件，8 个测试）
pnpm test:components PASS（用户随后确认命令已通过）
git diff --check     PASS
```

### `travel`

```text
node validate-data-scene.js travel
travel: validation failed - duplicate English text found
```

临时 JSON 候选校验：

```text
count: 100
firstId: travel-1
lastId: travel-100
strictAlternation: true
fields: id, speaker, text, translation, note
uniqueEnglish: true
uniqueChinese: true
uniqueNotes: true
arcs: 10
linesPerArc: 10
```

## 当前数据审计

TypeScript AST 审计结果：

```text
greetings: 100 elements, greetings-1..greetings-100
travel: 100 elements, travel-1..travel-100
business: 100 elements, business-1..business-100
housing: 100 elements, housing-1..housing-100
medical: 100 elements, medical-1..medical-100
banking: 100 elements, banking-1..banking-100
shopping: 100 elements, shopping-1..shopping-100
transit: 100 elements, transit-1..transit-100
government: 100 elements, government-1..government-100
school: 100 elements, school-1..school-100
restaurant: 100 elements, restaurant-1..restaurant-100
emergency: 100 elements, emergency-1..emergency-100
```

`SCENE_CONTENT` 仍包含全部 12 个键；`SCENES.slice(0, 10)` 的听力页数据入口未修改。

## 关键文件

- 运行时唯一数据源：`lib/data.ts`
- 听力页面：`app/(tabs)/listening.tsx`（本轮未修改）
- 数据测试：`lib/data.test.ts`
- 场景校验器：`validate-data-scene.js`
- `greetings` 替换前备份：`lib/data.ts.greetings.bak`
- `travel` 替换前备份：`lib/data.ts.travel.bak`
- `travel` JSON 候选：`C:\Users\xsd\AppData\Local\Temp\kilo\travel-records.json`
- `travel` TypeScript 候选：`C:\Users\xsd\AppData\Local\Temp\kilo\travel-records.ts`
- 旧交接记录：`SCENE_REPLACEMENT_HANDOVER.md`

## 提交与交接状态

- `greetings` 变更尚未暂存或提交。
- `travel` 尚未写入、校验或提交。
- 用户要求仅在全部验证通过后暂存并提交听力数据变更。
- `greetings` 提交前必须再次确认 `git diff -- lib/data.ts` 只包含 `greetings`，并排除 `kilo.json`、备份文件和未跟踪候选文件。
- 推荐提交范围：仅 `lib/data.ts`。
- 推荐提交信息：`refactor: replace greetings listening dialogues`。
- `travel` 写入并通过项目级验证后，再按相同范围提交，推荐提交信息：`refactor: replace travel listening dialogues`。

## 下一步

1. 用 `travel-records.json` 严格替换 `SCENE_CONTENT.travel`，保持 `business` 数组边界不变。
2. 运行 `node validate-data-scene.js travel`。
3. 运行 `pnpm typecheck`、`pnpm test`、`pnpm test:components` 和 `git diff --check`。
4. 确认 diff 仅涉及预期场景，排除无关文件。
5. 仅暂存并提交 `lib/data.ts`，然后等待确认后再处理 `business`。
