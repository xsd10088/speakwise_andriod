# 低难度对话补齐项目交接文档（v5.2：新会话启动核验全绿 + 负责人已确认开工 extra1，暂停于写入前，lib/data.ts 未改）

**项目：** SpeakWise Android / Expo React Native
**文档日期：** 2026-10-05（晚间暂停；v5.1 为同日 10-5 下午版）
**目标分支：** `feature/android-parity-xsd10088`
**本地工作目录：** `C:\speakwise-android-parity`
**环境：** pnpm 9.15.9，Windows PowerShell
**前置文档（约束全部继续有效）：**
- `10-5低难度对话补齐-提交推送后续写交接文档.md`（v5.1；**主参考**，其第 1/4/5/6/7/8 节继续有效，本文档更新其现状并追加本会话核验记录）
- `10-5低难度对话补齐-进度交接文档.md`（v4）
- `10-4低难度对话补齐-恢复完成续写交接文档.md`（v3，第 1/5/6 节规范继续有效）
- `10-4听力训练难度功能修改交接文档.txt`（难度功能改造）
- `10-4 Manus-SpeakWise-Android-项目交接文档.md`（路由迁移、生词本、CI 构建流程）

---

## 0. 执行摘要（先读这节）

1. **基线不变**：8/10 场景 beginner 完成并经负责人逐场景确认；原 10 场景 advanced ×100 句与基准 `8bc8ea0` 的 `SCENE_CONTENT` 逐字段全等（多次独立核验）；已提交推送 4 个提交（`6ed02f0`/`8d30873`/`769f059`/`eb2c3b7`），HEAD=`eb2c3b7` 与 origin 同步，跟踪文件干净。
2. **本会话（2026-10-05 晚）**：完成会话启动全套核验（git status + 三项测试 + 文件布局/CRLF/锚点复核，**全绿**），向负责人汇报，**负责人确认开工 extra1**；随后按负责人指示**暂停于任何内容写入之前**，`lib/data.ts` 及一切跟踪文件**零改动**，工作区保持干净。本会话**未产生任何提交、未新增任何跟踪文件**。
3. **剩余任务不变**：extra1（低 100 + 高 100）→ extra2（低 100 + 高 100），规范、插入点、验收流程全部沿用 v5.1 第 5 节（本文档第 4/5 节再次给出要点与锚点原文）；顺序不得跳跃。
4. **UI 不变量不变**（`eb2c3b7`，防回退）：tab 顺序 听力训练→口语练习→我的进度、`initialRouteName="listening"`、progress 标签"我的进度"；`app/(tabs)/_layout.tsx` 为 LF 行尾；本任务不触碰该文件。
5. extra1/extra2 完成后的提交推送仍需**负责人指示**（v5.1 §6.7 / 本文档 §6.7）。

---

## 1. 现状矩阵（2026-10-05 晚，复核）

| 场景 | beginner | advanced | 角色 | 待办 |
|---|---|---|---|---|
| greetings / travel / business / housing / medical / banking / shopping / transit / government | ✅ 真实（已提交） | ✅ 真实（与 8bc8ea0 全等） | Alex/Mia | 无 |
| school | ✅ 真实（已提交） | ✅ 真实（与 8bc8ea0 全等） | Alex/Mike | 无 |
| extra1 | 50 句占位 | 100 句占位（Array.from） | Alex/Mia | 低 100 + 高 100 真实 |
| extra2 | 50 句占位 | 100 句占位（Array.from） | Alex/Mia | 低 100 + 高 100 真实 |

**顺序（不得跳跃）**：extra1（低+高一次做完）→ extra2（低+高一次做完）。

---

## 2. Git 状态（截至本文档，本会话已复核）

分支 `feature/android-parity-xsd10088`，HEAD=`eb2c3b7`，**与 `origin/feature/android-parity-xsd10088` 同步**，`git diff --stat` 为空（跟踪文件零改动）。本会话未新增提交。

| 提交 | 信息 | 内容 |
|---|---|---|
| `eb2c3b7` | feat: show listening first in tabs, move practice to second and rename progress tab to 我的进度 | app/(tabs)/_layout.tsx（1 文件，+8/−8） |
| `769f059` | chore: adjust jest timeout for listening screen test and remove old handover doc | tests/listening-screen.component.test.tsx 超时 1 行（5000→15000ms）+ 删除旧文档 |
| `8d30873` | feat: add difficulty selector and dynamic line count for listening | app/(tabs)/listening.tsx（+63/−9） |
| `6ed02f0` | feat: restore original advanced dialogues and complete beginner dialogues for all listening scenes | lib/data.ts + lib/data.test.ts（+2188/−6798） |
| `8bc8ea0` | fix: set initial route to listening and remove tab icon artifacts | （数据恢复基准） |

未跟踪工件（不入库，与 v5.1 §2 一致，本会话核验一致）：`.devin/`、`10-4低难度对话补齐-恢复完成续写交接文档.md`（v3）、`10-5低难度对话补齐-进度交接文档.md`（v4）、`10-5低难度对话补齐-提交推送后续写交接文档.md`（v5.1）、本文档（v5.2）、`app/(tabs)/_layout.tsx.bak`、`_layout.tsx.bak2`、`listening.tsx.bak`、`lib/data.ts.bak`、`pnpm-lock.yaml.before-sync`。**所有 .bak 文件（含 _layout.tsx.bak/.bak2，内含旧 UI）不得作任何参考。**

**已知 CI 工作流（不变）**：`android-preview.yml` 仅 `workflow_dispatch` 触发，必填输入 `api_base_url`；手动触发地址
`https://github.com/xsd10088/speakwise_andriod/actions/workflows/android-preview.yml?ref=feature/android-parity-xsd10088`
（构建基于远端分支，extra1/extra2 提交推送后需重新触发；产物 `speakwise-android-release-apk`，保留 14 天。）

---

## 3. 本会话执行记录（2026-10-05 晚）

### 3.1 会话启动核验（全过）

| 项目 | 结果 |
|---|---|
| git status | HEAD=`eb2c3b7`、与 origin 同步、跟踪文件干净；未跟踪清单与 v5.1 §2 完全一致 |
| `pnpm typecheck` | ✅ `tsc --noEmit` 无输出无报错 |
| `pnpm test`（Vitest） | ✅ 2 文件 / 8 用例全过（Duration 4.07s） |
| `pnpm test:components`（Jest `--runInBand`） | ✅ 2 套件 / 8 用例全过（Time 34.263s；listening-screen 套件 26.671s，与 769f059 的 15000ms 超时调整一致） |
| lib/data.ts 字节核验 | 395410 字节；2279 行；**CRLF=2278 = LF=2278（全部 CRLF，一致）** |
| 布局复核 | schoolLinesBeginner 块行 2061~2165（注释 2061~2063、`const` 行 2064、末行 `];` 行 2165）；行 2166 空行；行 2167 `export const SCENE_CONTENT...`；extra1 占位行 2208~2223；extra2 占位行 2224~2239；`SCENE_CONTENT` 收尾 `};` 行 2240 |

### 3.2 负责人确认

向负责人汇报 3.1 核验结果 → 负责人通过确认选项选择"**开始 extra1**"（2026-10-05 晚）。

### 3.3 开工前风格参考（只读，零改动）

- **advanced 风格样本** `schoolLines`（行 1746~1847）：100 句组织为多段自然交流（教授办公室 1~14 / 图书馆位置 15~20 / 加退课 21~28 / 学习小组 29~42 / 职业中心 43~50 / 宿舍续签 51~60 / 图书馆隔夜借阅 61~70 / 论文延期 71~78 / IT 密码重置 79~86 / 自习室预订 87~96 / 讲座签到 97~100，约 10 段、每段 10~12 句）；text 常见 8~20 词；note 为**简短中文词义/用法说明**（如 "module 意为课程模块"、"选退课申请表（add/drop slip）"）。**既有 advanced 存在部分行无 note**（如 school-3/4/5），但**本任务指示"必带 note" → 新写 100 句全部带中文 note**（满足"必带"且类型兼容，note 在 `ListeningLine` 中可选）。
- **beginner 风格样本** `transitLinesBeginner`（行 1852 起）与 `schoolLinesBeginner`（行 2064~2165）：短句、每句 ≤10 词；note 为**简短英文功能标注**（如 "asking direction"、"direction"、"line info"、"confirmation"、"farewell"、"greeting"、"thanks"、"praise"、"reflection"）。
- **引号规则实证**：既有数据 text 内无英文双引号、无转义引号；撇号（you're / I'll / you'll / it's / you're）正常出现，**可用**。
- **占位锚点复核**：完整复读 extra1/extra2 占位原文（行 2208~2239），与 v5.1 §4 紧凑无空格写法**逐字一致**（extra2 差异字段 `Hobby ${i+1}.` / `爱好 ${i+1}。` / `Extra2 line ${i+1}` / `补充句2-${i+1}` / `extra2 note ${i+1}` 全部确认）。

### 3.4 暂停点

- 未写任何数据内容，未改任何文件（跟踪/未跟踪均无新增，除本交接文档外）；
- 按负责人"暂停"指令停止，落盘本文档（v5.2）。

---

## 4. `lib/data.ts` 现状布局（**2279 行**，CRLF，本会话复核与 v5.1 §4 一致）

```text
行 2      Speaker / 4 ListeningLine / 12 SceneKey / 26 DifficultyLevel / 37 SceneContent
行 42     LISTENING_LINES（100 句兜底，未动）
行 53      greetingsLinesBeginner（100 句，Alex/Mia）
行 159     travelLinesBeginner（100 句，Alex/Mia）
行 265     travelLines（100 句真实，Alex/Mia）
行 371     businessLinesBeginner（100 句）
行 477     businessLines（100 句真实）
行 583     housingLinesBeginner（100 句）
行 689     housingLines（100 句真实）
行 795     medicalLinesBeginner（100 句）
行 901     medicalLines（100 句真实）
行 1007    bankingLinesBeginner（100 句）
行 1113    bankingLines（100 句真实）
行 1219    shoppingLinesBeginner（100 句）
行 1325    shoppingLines（100 句真实）
行 1431    greetingsLines（100 句真实）
行 1536    transitLines（100 句真实）
行 1641    governmentLines（100 句真实）
行 1746    schoolLines（100 句真实，Alex/Mike）
行 1852    transitLinesBeginner（100 句，注释编号 11）
行 1958    governmentLinesBeginner（100 句，注释编号 12）
行 2064    schoolLinesBeginner（100 句，注释编号 13，Alex/Mike；块行 2061~2165）
行 2167    SCENE_CONTENT（嵌套 beginner/advanced；extra1/extra2 仍为占位，待替换）
行 2242    SCENES（12 场景，未动）
行 2257    getSceneLines(sceneKey, difficulty = "advanced")
行 2266    PRACTICE_DIALOGUE（含 "Mike"，勿改）
行 2271    getPracticeDialogue
```

紧凑行格式（全部真实数据常量内部统一）：

```text
  { id: "extra1-b-1", speaker: "Alex", text: "...", translation: "...", note: "..." },
```

**剩余占位（行 2208~2239，Python 锚点照抄以下原文；紧凑无空格写法）：**

extra1 块（行 2208~2223）：

```text
  extra1: {
    beginner: Array.from({ length: 50 }, (_, i) => ({
      id: `extra1-b-${i+1}`,
      speaker: i%2===0?"Alex":"Mia",
      text: `Daily life ${i+1}.`,
      translation: `日常生活 ${i+1}。`,
      note: `extra1 beginner ${i+1}`
    })),
    advanced: Array.from({ length: 100 }, (_, i) => ({
      id: `extra1-${i+1}`,
      speaker: i%2===0?"Alex":"Mia",
      text: `Extra1 line ${i+1}`,
      translation: `补充句1-${i+1}`,
      note: `extra1 note ${i+1}`
    }))
  },
```

extra2 块（行 2224~2239）：

```text
  extra2: {
    beginner: Array.from({ length: 50 }, (_, i) => ({
      id: `extra2-b-${i+1}`,
      speaker: i%2===0?"Alex":"Mia",
      text: `Hobby ${i+1}.`,
      translation: `爱好 ${i+1}。`,
      note: `extra2 beginner ${i+1}`
    })),
    advanced: Array.from({ length: 100 }, (_, i) => ({
      id: `extra2-${i+1}`,
      speaker: i%2===0?"Alex":"Mia",
      text: `Extra2 line ${i+1}`,
      translation: `补充句2-${i+1}`,
      note: `extra2 note ${i+1}`
    }))
  },
```

**替换后目标形态：**

```text
  extra1: {
    beginner: extra1LinesBeginner,
    advanced: extra1Lines
  },
  extra2: {
    beginner: extra2LinesBeginner,
    advanced: extra2Lines
  },
```

**插入点与 4 块模板**：schoolLinesBeginner 块末行（行 2165 `];`）之后、`export const SCENE_CONTENT`（行 2167）之前，按编号 14/15/16/17 顺序插入 4 个块；"空行 + 注释块 + 常量"风格同既有块。**注意：新常量必须在 `SCENE_CONTENT` 之前定义**（`const` 无提升，模块求值时引用必须已定义；插入点正是其前）：

```text
// ==========================================
// 14. 日常生活 (Extra 1) - 低难度 100 句
// ==========================================
const extra1LinesBeginner: ListeningLine[] = [ ...100 行... ];

// ==========================================
// 15. 日常生活 (Extra 1) - 高难度 100 句
// ==========================================
const extra1Lines: ListeningLine[] = [ ...100 行... ];

// ==========================================
// 16. 兴趣爱好 (Extra 2) - 低难度 100 句
// ==========================================
const extra2LinesBeginner: ListeningLine[] = [ ...100 行... ];

// ==========================================
// 17. 兴趣爱好 (Extra 2) - 高难度 100 句
// ==========================================
const extra2Lines: ListeningLine[] = [ ...100 行... ];
```

（每个块前保留一个空行，块与块之间各一个空行；块后接既有空行 + `export const SCENE_CONTENT` 行。）

---

## 5. 剩余任务规范（沿用 v5.1 §5，要点重申）

### 5.1 extra1（日常生活）

**extra1LinesBeginner（注释编号 14，id `extra1-b-N`，N=1~100）：**
1. 100 句；Alex/Mia 严格交替（1=Alex … 100=Mia）；组织为若干段自然对话，不机械重复；
2. 每句 ≤10 词（空格分词）；基础英语（CET-4/6）；美式口语短句；必带中文 `translation` + `note`（**简短英文功能标注**，同既有 beginner 风格）；text 内不得出现英文双引号（撇号可用）；
3. 主题：日常生活（家庭/邻居/天气/买菜做饭/休息/日常闲聊/家务/作息/小事求助等）。

**extra1Lines（注释编号 15，id `extra1-N`，N=1~100）：**
1. 100 句；Alex/Mia 严格交替；真实自然连贯对话（组织为**多段自然交流**，不得机械重复）；
2. 英语略高于 beginner（CET-4/6），美式口语；句长可超 10 词（**无 10 词上限**，常见 8~20 词）；必带中文 `translation` + `note`（**简短中文词义/用法说明**，同既有 advanced 风格，如 "municipal assistance 指市政帮助/协助。"）；text 内不得出现英文双引号；
3. 主题同低难度，内容与低难度**不雷同**、用词与句式更丰富；
4. 段组织参考既有 advanced 样本：8~10 段、每段约 10~12 句、每段一个连贯交流场景（如：周末做饭计划 / 邻居往来 / 天气与户外活动 / 超市采购与烹饪 / 家务与洗衣 / 居家休闲 / 社区活动 / 跑腿与小维修 / 睡眠作息 / 日常寒暄收尾等，自由组合，避免与 beginner 句面重复）。

### 5.2 extra2（兴趣爱好）

**extra2LinesBeginner（注释编号 16，id `extra2-b-N`）**：规则同 extra1LinesBeginner；主题：兴趣爱好（运动/音乐/阅读/电影游戏/做饭烘焙/旅行计划等）。
**extra2Lines（注释编号 17，id `extra2-N`）**：规则同 extra1Lines；主题同上，内容与低难度区分。

### 5.3 每场景完成后固定验收（不变）

```powershell
Set-Location -LiteralPath "C:\speakwise-android-parity"
pnpm typecheck
pnpm test
pnpm test:components
git diff --stat
```

Python 自检（对 4 个常量逐一执行；低难度校验 ≤10 词，高难度不校验词数）：

```python
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = open(r"C:\speakwise-android-parity\lib\data.ts", encoding="utf-8").read().replace("\r\n", "\n")
for name in ["extra1LinesBeginner", "extra1Lines", "extra2LinesBeginner", "extra2Lines"]:
    b = re.search(r"(?s)const " + name + r": ListeningLine\[\] = \[.*?\n\];", c).group(0)
    ids  = re.findall(r'id: "([^"]+)"', b)
    sp   = re.findall(r'speaker: "([^"]+)"', b)
    over = [t for t in re.findall(r'text: "([^"]*)"', b) if len(t.split()) > 10]
    print(name, len(ids), sorted(set(sp)),
          "alt-ok:", all(sp[i] != sp[i+1] for i in range(len(sp)-1)),
          "| over10(仅低难度应为[]):", over if "Beginner" in name else "-",
          "| uniq:", len(set(ids)) == len(ids))
# 期望：每项 100 {'Alex','Mia'} True，Beginner 的 over10 为 []，uniq 全 True
```

advanced 全等复核（**原 10 场景**仍须与 `8bc8ea0` 的 `SCENE_CONTENT` 逐字段全等，防误动；extra1/extra2 改做"占位已移除 + 引用已替换"断言：`Array.from` 在 extra1/extra2 块中为 0 处、`beginner: extra1LinesBeginner,` 等 4 处引用各 1 次；核心逻辑见 v5.1 §5.3 脚本：取 `git show 8bc8ea0:lib/data.ts` 的 SCENE_CONTENT 段，双格式条目正则逐 (id) 比较 (speaker,text,translation,note)）。

**验收通过后报负责人确认，确认后才开始下一场景。** 全部完成后整体复检（三项测试 + 4 常量自检 + 原 10 场景全等复核 + git diff 人工复核）→ 负责人确认 → 提交推送 → 触发 CI。

### 5.4 插入/替换实施要点（Python 字节级）

- 二进制读 `lib/data.ts` → UTF-8 解码 → 全程按字节/字符串拼接写回（保持 `\r\n`，勿以文本模式读写转换行尾）；
- 断言前置条件：文件 CRLF 数 == LF 数（当前 2278/2278）；插入点锚点（`\r\n];\r\n\r\nexport const SCENE_CONTENT`，即行 2165~2167 处）**唯一**；extra1/extra2 占位锚点（§4 原文）**各唯一**；目标 id（`extra1-b-1`…`extra1-100`、`extra1-1`…`extra1-100`、extra2 同理）在改动前**不存在**于全文件；
- 生成 400 行数据前逐行自检：text 无英文双引号、无控制字符；speaker 交替正确；beginner 每句 `len(text.split()) <= 10`；
- 写后断言：CRLF 数 == LF 数；行数 = 2279 + 4×(3 注释 + 1 const 起始 + 100 数据 + 1 收尾 + 1 空行) − 0（即 +408 行左右，以实际块结构核算为准）；SCENE_CONTENT 段中 `Array.from` 出现 0 次、4 处常量引用各 1 次；
- 建议脚本放 `C:\Users\xsd\AppData\Local\Temp\kilo\`（历史脚本 check_advanced.py 等可能已被清理，勿依赖，按需重写）。

---

## 6. 注意事项（务必先读，沿用 v5.1 §6）

1. **CRLF**：`lib/data.ts` 为 CRLF，git diff 的 "CRLF will be replaced by LF" 警告属既有状态，**勿改动行尾**；程序化写文件按字节读写、保持 `\r\n`，写后断言 `CRLF 数 == LF 数`。**`app/(tabs)/_layout.tsx` 相反，为 LF 行尾**，本任务不触碰该文件。
2. **控制台乱码**：PowerShell 直接输出中文可能乱码；**数据核验一律用 Python 脚本**（`io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")`）。
3. **基准来源唯一**：原 10 场景 advanced 只从 `git show 8bc8ea0:lib/data.ts` 取；**不要**从 `lib/data.ts.bak` 取（缺 school-1 且内容过期）。补写时**不得再动任何原 10 场景 advanced 数据**（每场景验收全等复核防意外）。
4. **HEAD 的"双份数据"陷阱**：`8bc8ea0` 中每个 JSON 场景数据有两处——顶层常量（50 句，Alex/Mike，遗留死代码）与 `SCENE_CONTENT` 数组（100 句真实数据，9 场景多行带引号 JSON + school 紧凑单行；`Record<SceneKey, ListeningLine[]>` 扁平结构）。全等复核一律以 `SCENE_CONTENT` 数组为准。
5. **Jest 超时**：`tests/listening-screen.component.test.tsx` 1 个测试超时 15000ms 已随 `769f059` 提交；本环境 `it()` 不支持 `(name, timeout, fn)` 签名。
6. **Jest mock ≠ 真机**：组件测试通过不代表 TTS/录音/AsyncStorage 真机行为正确，最终需 APK 真机验证。
7. **提交策略（extra1/extra2 完成后，需负责人指示）**：
   ```powershell
   git add lib/data.ts
   git commit -m "feat: complete extra1 and extra2 beginner and advanced dialogues"
   git push origin feature/android-parity-xsd10088
   ```
   推送后由负责人在 `android-preview.yml` 手动触发（填 `api_base_url`）重新构建 APK。
8. **断言依赖**：`lib/data.test.ts` 断言前 10 场景 advanced 各 100 句、extra1/extra2 advanced 各 100 句、`PRACTICE_DIALOGUE` 含 Alex 和 Mike；extra1/extra2 换成真实 100 句常量后仍满足。补写时勿破坏。**`PRACTICE_DIALOGUE`（prac-2）的 "Mike" 勿改。**
9. **UI 不变量（防回退）**：tab 顺序 听力训练→口语练习→我的进度、`initialRouteName="listening"`、标签"我的进度"；`app/(tabs)/_layout.tsx` 保持 LF 行尾，不得恢复旧顺序/旧标签"我的"。
10. **插入方式**：Python 脚本字节级精确替换（锚点唯一 + 目标 id 不存在 + CRLF 一致 + 插入后自检）；extra 占位锚点为紧凑无空格写法（`extra1-b-${i+1}`、`i%2===0?"Alex":"Mia"`、`Extra1 line ${i+1}`），照本文档 §4 原文复制，勿与 government/school 的 `${i + 1}` 写法混淆。

---

## 7. 测试清单（更新）

- [x] 原 10 场景 advanced 共 1000 句与 8bc8ea0 逐字段全等（多轮独立核验）
- [x] TypeScript 类型检查通过
- [x] Vitest 通过（12 场景 advanced=100 句断言）
- [x] Jest 组件测试通过（含超时调整）
- [x] 8 场景 beginner 100 句、角色交替、≤10 词（Python 自检）
- [x] UI：听力训练第一屏/口语练习第二屏/"我的进度"标签（`eb2c3b7`，三项测试全绿）
- [x] 4 个提交已推送 origin，本地与远端同步（6ed02f0/8d30873/769f059/eb2c3b7）
- [x] 本会话（2026-10-05 晚）启动核验全绿：git 状态 + 三项测试 + 布局/CRLF/锚点复核；负责人确认开工 extra1（未写入即暂停）
- [ ] extra1：beginner 100 句 + advanced 100 句真实（低高各 100）
- [ ] extra2：beginner 100 句 + advanced 100 句真实（低高各 100）
- [ ] 全 12 场景"低"100 句 / "高"100 句，UI 句数动态显示正确
- [ ] 重新触发 android-preview.yml 构建含 12 场景完整数据的 APK
- [ ] TTS 逐句播放正常（真机）
- [ ] 应用启动首显听力训练、tab 顺序 听力训练/口语练习/我的进度（真机）

---

## 8. 下一步行动（按顺序）

1. 新会话：读本文档（v5.2）→ 快速复核 git 状态（HEAD=`eb2c3b7`、与 origin 同步、跟踪文件干净）→ 跑 `pnpm typecheck` / `pnpm test` / `pnpm test:components`（合计约 1~2 分钟）→ 报负责人。负责人 2026-10-05 晚已确认开工 extra1；若新会话与负责人非连续对话，须再次汇报并获确认后开写。
2. 按 §5 写 extra1（低 100 + 高 100，一次做完；§5.4 字节级插入）→ §5.3 固定验收 → 报负责人 → **获确认后才做 extra2**（不得跳跃）。
3. extra2 同流程 → 整体复检（三项测试 + 4 常量 Python 自检 + 原 10 场景 advanced 全等复核 + git diff 人工复核）→ 报负责人 → 按 §6.7 提交推送 → 负责人触发 `android-preview.yml`（填 `api_base_url`）→ 下载 APK 真机验证（含 §7 真机项）。
4. 红线：未经负责人指示不 git 提交；.bak 文件不作任何参考；不触碰 `app/(tabs)/_layout.tsx`；不改 `PRACTICE_DIALOGUE` 的 "Mike"；不动原 10 场景 advanced。

---

## 9. 新会话提示语（复制使用）

```text
【SpeakWise Android】继续"听力训练 12 场景对话补齐"任务（extra1/extra2，低+高各 100 句）。

项目目录：C:\speakwise-android-parity（分支 feature/android-parity-xsd10088，pnpm 9.15.9，Windows PowerShell 环境）
先读交接文档：C:\speakwise-android-parity\10-5低难度对话补齐-extra1开工前暂停交接文档.md（v5.2；v5.1 文档 10-5低难度对话补齐-提交推送后续写交接文档.md 第 1/4/5/6/7/8 节与同目录 v4、v3 文档约束继续有效）

【现状】
- 高难度：原 10 场景×100 句与基准 8bc8ea0 的 SCENE_CONTENT 逐字段全等，严禁再改动原 10 场景任何 advanced 数据；extra1/extra2 的 advanced 仍为 Array.from(100) 占位，替换为 100 句真实。
- 低难度：8 场景已完成并经负责人确认；extra1/extra2 的 beginner 仍为 50 句占位，替换为 100 句真实。
- 已提交推送 4 个提交：6ed02f0/8d30873/769f059/eb2c3b7，HEAD=eb2c3b7 与 origin 同步，跟踪文件工作区干净（2026-10-05 晚已复核）。
- 上一会话（2026-10-05 晚）：启动核验全绿（三项测试 + 布局/CRLF/锚点复核），负责人已确认开工 extra1，但暂停于任何内容写入之前，lib/data.ts 未改。
- UI 不变量（eb2c3b7，防回退）：底部 tab 顺序 听力训练→口语练习→我的进度，initialRouteName="listening"，progress 标签"我的进度"；app/(tabs)/_layout.tsx 为 LF 行尾。本任务不触碰该文件。
- 剩余 2 场景（角色 Alex/Mia 严格交替、第 1 句 Alex）：
  1) extra1：日常生活 → extra1LinesBeginner（注释编号 14，id extra1-b-N）+ extra1Lines（注释编号 15，id extra1-N）
  2) extra2：兴趣爱好 → extra2LinesBeginner（注释编号 16，id extra2-b-N）+ extra2Lines（注释编号 17，id extra2-N）

【作业规范】
- 低难度：每句 ≤10 词（空格分词）、基础美式口语短句、必带中文 translation + note（简短英文功能标注）；text 内不得出现英文双引号（撇号可用）。
- 高难度：100 句真实自然连贯对话（多段自然交流、不机械重复、与低难度内容/句式区分）；CET-4/6、美式口语；句长常见 8~20 词、无 10 词上限；必带中文 translation + note（简短中文词义/用法说明，同既有 advanced 风格）；text 内不得出现英文双引号。
- 新常量插入点：schoolLinesBeginner 块（行 2061~2165，末行 `];` 行 2165）之后、SCENE_CONTENT（行 2167）之前，按编号 14/15/16/17 顺序 4 个块；"空行 + 注释块 + 常量"风格同既有块；新常量必须在 SCENE_CONTENT 之前定义。
- SCENE_CONTENT 中 extra1 占位（行 2208~2223）与 extra2 占位（行 2224~2239）整段替换为常量引用（beginner: extra1LinesBeginner, advanced: extra1Lines 等）；占位为紧凑无空格写法，锚点原文照 v5.2 文档 §4 复制。
- 用 Python 脚本做字节级精确插入/替换（锚点唯一、目标 id 不存在、写后断言 CRLF 数 == LF 数）；勿动 CRLF 行尾。

【工作模式（务必遵守）】
- 会话启动时：① 核对 git status（HEAD=eb2c3b7、与 origin 同步、跟踪文件无未提交改动）② 跑 pnpm typecheck / pnpm test / pnpm test:components ③ 报负责人，确认后从 extra1 开始（负责人 2026-10-05 晚已确认开工；若为新对话须再报再确认）。
- 每场景流程（一个场景的低+高一次做完）：写 → 固定验收（三项测试 + git diff --stat + Python 自检：4 常量各 100 句/角色集合 {Alex,Mia}/严格交替/低难度 >10 词为 0/id 唯一/原 10 场景 advanced 与 8bc8ea0 全等复核/extra 占位已移除 + 4 处引用断言）→ 报负责人 → 确认后才做下一场景；顺序 extra1→extra2 不得跳跃。
- 未经负责人指示不得 git 提交（前 4 个提交已推送；完成后按 v5.2 §6.7 提交推送，需负责人指示）；.bak 文件不得作参考（含 _layout.tsx.bak，内为旧 UI）；数据核验一律用 Python（PowerShell 直接输出中文会乱码）。
- PRACTICE_DIALOGUE 的 "Mike" 勿改；勿破坏 lib/data.test.ts 的不变量断言；勿动 app/(tabs)/_layout.tsx（tab 顺序/标签/UI 不变量）。
```

---

## 10. 交接时点状态（一句话）

**原 10 场景数据完好（多次核验全等）；8/10 场景 beginner 完成；UI 顺序与标签已定并提交（eb2c3b7）；4 个提交已推送 origin；本会话核验全绿、负责人已确认开工 extra1，但尚未写入任何内容；lib/data.ts 与 HEAD 逐字节一致，跟踪文件工作区干净，随时可中断续写。**
