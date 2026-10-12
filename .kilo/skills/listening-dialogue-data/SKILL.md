---
name: listening-dialogue-data
description: SpeakWise Android 听力训练对话数据（lib/data.ts）字节级写入与验收工作流。新增场景/新增难度对话行、替换占位、修正句子、或核验数据与基准提交一致性时使用。覆盖 CRLF 保持、Python 锚点插入、固定验收（typecheck/vitest/jest + Python 自检 + 基准全等复核）、git 行尾坑位与提交策略。
---

# 听力训练对话数据写入工作流（lib/data.ts）

适用于：为听力训练模块新增场景、补齐 beginner/advanced 难度对话行、替换 `Array.from` 占位、修正个别句子，以及任何对 CRLF 数据文件的字节级精确编辑。

## 1. 数据契约（先读懂再动手）

- **文件**：`lib/data.ts`，**CRLF 行尾**（工作区与历史约定；仓库 `.gitattributes` 为 `text:auto, eol:lf`，提交时归一化为 LF——工作区必须保持 CRLF，勿改行尾）。
- **行格式**（紧凑，一行一条）：
  ```text
    { id: "<scene>-<N>", speaker: "Alex", text: "...", translation: "...", note: "..." },
  ```
  每行尾 `},`，**块内最后一行 `}` 无逗号**；块以 `];`（含分号）收尾；块前留一个空行。
- **常量与 id 约定**：
  - beginner 常量 `<scene>LinesBeginner`，id `<scene>-b-N`（N=1~100）；
  - advanced 常量 `<scene>Lines`，id `<scene>-N`；
  - 注释块三行：`// ==========================================` / `// <编号>. <主题> (<Scene>) - 低/高难度 100 句` / `// ==========================================`，编号顺延既有最大编号；
  - `const` 定义必须位于 `SCENE_CONTENT` **之前**（const 无提升）。
- **角色**：默认 Alex/Mia 严格交替，第 1 句 Alex（个别场景如 school 为 Alex/Mike，以既有块为准）。
- **字段规则**：
  - text 内**不得出现英文双引号与反斜杠**；撇号（you're / I'll）允许；
  - 中文 translation 必填；
  - beginner：每句 **≤10 词（空格分词）**，美式口语短句，note = **简短英文功能标注**（如 "question" "tip" "plan"）；
  - advanced：真实自然连贯多段对话（8~10 段 × 每段 10~12 句，不机械重复），美式口语 CET-4/6，句长常见 8~20 词（无上限），note = **简短中文词义/用法说明**（如 "risotto 指意大利烩饭"）；
  - 同场景 beginner/advanced 文本不得雷同。
- **SCENE_CONTENT**：`Record<SceneKey, SceneContent>`，每场景 `{ beginner: <const>, advanced: <const> }`；占位为紧凑无空格 `Array.from` 写法（如 `extra1-b-${i+1}`、`i%2===0?"Alex":"Mia"`），替换时锚点必须照原文逐字复制。
- **勿动**：`PRACTICE_DIALOGUE`（含 "Mike"）、`getPracticeDialogue`、`LISTENING_LINES`（Array.from(100) 兜底）、`app/(tabs)/_layout.tsx`（LF 行尾、tab 顺序/UI 不变量）、`lib/data.test.ts` 的不变量断言。

## 2. 会话启动基线

1. `git status`：分支正确、与 origin 同步、跟踪文件干净（未跟踪交接文档/.bak 属既有状态）。
2. `pnpm typecheck`、`pnpm test`（Vitest）、`pnpm test:components`（Jest）全绿。
3. Python 记录文件基线：字节数、`CRLF 数 == LF 数`、行数。
4. 向负责人汇报基线，获确认后再写。

## 3. 字节级写入（Python 脚本，脚本放 `C:\Users\xsd\AppData\Local\Temp\kilo\`）

统一模式（数据 + 生成 + 断言 + 写盘全在一个脚本内）：

```python
# -*- coding: utf-8 -*-
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
P = r"<项目>\lib\data.ts"

BEG = [ (text, translation, note), ... 100 条 ... ]   # 或 ADV
ADV = [ ... ]
assert len(BEG) == 100 and len(ADV) == 100

def spk(i):  return "Alex" if i % 2 == 1 else "Mia"   # 场景角色对可换

def mk_lines(items, prefix_id, beginner):
    out, texts = [], []
    for i, (t, tr, note) in enumerate(items, start=1):
        for f in (t, tr, note):
            assert '"' not in f and "\\" not in f and "\n" not in f, (i, f)
        if beginner:
            assert len(t.split()) <= 10, (i, t)
        texts.append(t)
        comma = "," if i < len(items) else ""          # 关键：行尾逗号，末行无
        out.append('  { id: "%s%d", speaker: "%s", text: "%s", translation: "%s", note: "%s" }%s'
                   % (prefix_id, i, spk(i), t, tr, note, comma))
    assert len(set(texts)) == 100
    return out

def block(header, var, lines):                          # 关键：以 \n]; 收尾（含分号）
    return header + "\nconst " + var + ": ListeningLine[] = [\n" + "\n".join(lines) + "\n];"

c = open(P, "rb").read().decode("utf-8")

# ---- 写盘前断言 ----
assert c.count("\r\n") == c.count("\n")                      # CRLF 一致
assert '<新id-1>"' not in c and '<scene-1>"' not in c        # 目标 id 不存在
INS = "\r\n];\r\n\r\nexport const SCENE_CONTENT"
assert c.count(INS) == 1                                      # 插入锚点唯一
PLACEHOLDER = """  <scene>: { ... 占位原文逐字复制 ... },""".replace("\n", "\r\n")
assert c.count(PLACEHOLDER) == 1                              # 占位锚点唯一
n50, n100 = c.count("Array.from({ length: 50 }"), c.count("Array.from({ length: 100 }")
# 注意：LISTENING_LINES 兜底也含 Array.from(100)，计数预期须计入

# ---- 组装 ----
H = "// ==========================================\n// <编号>. <主题> (<Scene>) - <难度> 100 句\n// =========================================="
b1 = block(H, "<scene>LinesBeginner", mk_lines(BEG, "<scene>-b-", True))
b2 = block(H2, "<scene>Lines", mk_lines(ADV, "<scene>-", False))
new = c.replace(INS, "\r\n];\r\n\r\n" + b1.replace("\n", "\r\n") + "\r\n\r\n"
                + b2.replace("\n", "\r\n") + "\r\n\r\nexport const SCENE_CONTENT")
new = new.replace(PLACEHOLDER,
    "  <scene>: {\r\n    beginner: <scene>LinesBeginner,\r\n    advanced: <scene>Lines\r\n  },\r\n")

# ---- 写盘后断言 ----
assert new.count("\r\n") == new.count("\n")
assert new.count("beginner: <scene>LinesBeginner,\r\n") == 1
assert new.count("advanced: <scene>Lines\r\n") == 1
assert new.count(PLACEHOLDER) == 0
# Array.from 计数 = 基线 − 移除的占位数（逐处核对）
flat = new.replace("\r\n", "\n")
assert len(flat.split("\n")) == <基线行数> + 212 - 12        # 每场景净 +200 行（按实际块数缩放）
for name, pref in [("<scene>LinesBeginner", "<scene>-b-"), ("<scene>Lines", "<scene>-")]:
    b = re.search(r"(?s)const " + name + r": ListeningLine\[\] = \[.*?\n\];", flat).group(0)
    ids = re.findall(r'id: "([^"]+)"', b)
    sp  = re.findall(r'speaker: "([^"]+)"', b)
    assert ids == [pref + str(i) for i in range(1, 101)]
    assert sp[0] == "Alex" and set(sp) == {"Alex", "Mia"}
    assert all(sp[i] != sp[i+1] for i in range(99))
    assert b.count(" },\n") == 99 and b.endswith("\n];")

open(P, "wb").write(new.encode("utf-8"))
print("WRITTEN")
```

要点：
- 占位锚点（`Array.from` 段）**照源文件逐字复制**，勿凭记忆（紧凑写法 `i%2===0?"Alex":"Mia"` 与 `${i + 1}` 带空格写法易混淆）；
- 只替换目标占位，其他场景占位（若有）必须原样保留并断言仍存在；
- 写盘用 `wb` + utf-8 编码，全程不动其他字节。

## 4. 独立复核（重新读盘，勿复用内存对象）

另写一个验证脚本，重新 `open(P,"rb")` 后执行：
- CRLF 一致、行数 = 预期；
- 每个新常量：100 句 / id 有序唯一 / speaker 交替且第 1 句正确 / beginner ≤10 词=0 超 / translation、note 非空 / 三字段无英文双引号；
- 占位已移除、常量引用计数各 1；
- 同场景 beginner/advanced 文本集互不重叠（可选）；
- diff 结构：`git diff --stat` 仅目标文件、hunk 数 = 插入块 + 占位替换，无意外改动。

## 5. 固定验收

```powershell
Set-Location -LiteralPath "<项目>"
pnpm typecheck
pnpm test
pnpm test:components
git diff --stat
```

再加**基准全等复核**（防误伤未改动场景）：

```python
import re, subprocess
head = subprocess.run(["git","-C","<项目>","show","<基准提交>:lib/data.ts"],
                      capture_output=True, check=True).stdout.decode("utf-8", errors="replace").replace("\r\n","\n")
cur  = open(r"<项目>\lib\data.ts","rb").read().decode("utf-8").replace("\r\n","\n")
# 基准文件中 SCENE_CONTENT 数组（Record<SceneKey, ListeningLine[]> 扁平结构；
# 注意：场景键实际顺序可能与声明顺序不同——按 key 出现位置排序后逐段切片）
pat = (r'\{\s*(?:"id"|id)\s*:\s*"([a-z0-9]+-\d+)"\s*,\s*'
       r'(?:"speaker"|speaker)\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
       r'(?:"text"|text)\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
       r'(?:"translation"|translation)\s*:\s*"((?:[^"\\]|\\.)*)"'
       r'(?:\s*,\s*(?:"note"|note)\s*:\s*"((?:[^"\\]|\\.)*)")?\s*\}')
# 逐场景：基准段 vs 当前对应顶层 xxxLines 常量，按 id 比较 (speaker, text, translation, note)，期望全等
```

每个场景/每轮写入后都跑一次全等复核；全部完成后做整体复检（三项测试 + 全常量自检 + 全等复核 + diff 人工复核）。

## 6. 坑位（血泪清单，务必先读）

1. **生成行漏行尾逗号 / 块漏 `;`**：TS 会整文件报 `TS1005 ',' expected`。写盘前必须断言 `block.count(" },\n") == 99` 与 `block.endswith("\n];")`。
2. **`git checkout -- lib/data.ts` 的 LF 陷阱**：仓库 `.gitattributes` 为 `text:auto, eol:lf`，checkout 产出**纯 LF** 文件（字节数 = 基线 − 行数），而工作区约定是 CRLF。恢复：纯 LF 时字节级 `b.replace(b"\n", b"\r\n")`，断言字节数/CRLF 数回到基线，并与 `git show HEAD:<file>` blob 转 CRLF 逐字节比对。
3. **status 假 M**：上述恢复后 `git status` 可能标 `M` 而 `git diff` 为空。确认 diff 为空后 `git add <file>` 刷新 stat（归一化后无实际暂存变更），前后核对 `git diff --cached --stat` 为空，status 即恢复干净。
4. **PowerShell 中文乱码**：数据核验一律 Python + `io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")`。
5. **`.bak` 文件不作任何参考**（含过期数据/旧 UI）。
6. **CRLF 警告**：`git diff` 的 "CRLF will be replaced by LF" 为既有状态，正常。
7. **占位计数**：`LISTENING_LINES`（行 42）自带 `Array.from({ length: 100 }` 兜底，全文件计数时扣除。
8. **基准全等切片**：基准文件 SCENE_CONTENT 内场景键顺序可能 ≠ SceneKey 声明顺序（如 8bc8ea0 中 school 排第一），按键位置排序后再切段。
9. **提交需负责人指示**；`.kilo/` 之外的 `.kilocode/` 不用。
10. **Jest mock ≠ 真机**：组件测试通过不代表 TTS/录音/AsyncStorage 真机行为，最终 APK 真机验证。

## 7. 提交与 CI（需负责人指示）

```powershell
git add lib/data.ts
git commit -m "feat: complete <scene> beginner and advanced dialogues"
git push origin <分支>
```

推送后由负责人手动触发 `android-preview.yml`（`workflow_dispatch`，必填 `api_base_url`，选目标分支）重建 APK；产物 `speakwise-android-release-apk` 保留 14 天。

## 8. 既有项目上下文（SpeakWise Android）

- 项目：`C:\speakwise-android-parity`，分支 `feature/android-parity-xsd10088`，pnpm 9.15.9，Windows PowerShell。
- 数据基准：`8bc8ea0`（原 10 场景 advanced 全等基准）；数据提交线：`6ed02f0`（8 场景 beginner）→ `082f3c6`（extra1/extra2 低+高）。
- 行尾：`lib/data.ts` CRLF；`app/(tabs)/_layout.tsx` LF（tab 顺序 听力训练→口语练习→我的进度、`initialRouteName="listening"`、标签"我的进度"为 UI 不变量，勿回退）。
- 测试：`pnpm typecheck` / `pnpm test`（Vitest，含 12 场景 advanced=100 断言）/ `pnpm test:components`（Jest；listening-screen 套件已 15000ms 超时，本环境 `it()` 不支持 `(name, timeout, fn)` 签名）。
- 交接文档家族：项目根 `10-4*`、`10-5*交接文档.md`（最新 v5.3 `10-5低难度对话补齐-全任务完成交接文档.md`）；历史脚本在 `C:\Users\xsd\AppData\Local\Temp\kilo\`（extra1_insert.py / extra2_insert.py / final_verify.py / check_adv2.py；Temp 可能被清理，按本技能重写）。
