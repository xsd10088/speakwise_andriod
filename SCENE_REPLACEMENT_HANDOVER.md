# 听力场景替换交接：有效方法与陷阱

## 适用范围

本方法用于替换 `lib/data.ts` 中 `SCENE_CONTENT` 的单个场景数组。当前已验证适用于 `greetings`，后续场景按同一流程执行。

## 已验证流程

### 1. 先备份

替换前保存当前数据源：

```powershell
Copy-Item -LiteralPath "lib/data.ts" -Destination "lib/data.ts.<scene>.bak" -Force
```

备份只用于回滚，不纳入运行时提交。

### 2. 用 TypeScript AST 定位数组

不要依赖行号或只匹配 `scene-100`。使用 `typescript` 解析 `lib/data.ts`，找到变量 `SCENE_CONTENT`，再找到目标属性（例如 `greetings`）及其 `ArrayLiteralExpression`。

必须同时确认：

- 目标数组存在且是数组字面量；
- 当前元素数量；
- 第一个 ID 为 `<scene>-1`；
- 最后一个 ID 为 `<scene>-100`；
- 目标数组后面的下一个场景属性仍然存在；
- `SCENE_CONTENT` 的所有场景键仍存在。

### 3. 生成候选数组

候选数据必须是 100 个完整对象，每个对象严格包含：

```typescript
{
  id: "<scene>-<1..100>",
  speaker: "<角色>",
  text: "<英文>",
  translation: "<中文>",
  note: "<语言点或语用说明>"
}
```

建议按 10 个连续的 10 句主题单元组织，避免把多个互相矛盾的微型对话硬拼在一起。每个单元内部应有明确的时间线、角色回应和自然收尾。

### 4. 生成 TypeScript 片段

候选数据先在临时目录生成，不要直接写入 `lib/data.ts`。片段只包含数组元素，不包含 `greetings:`、`[` 或 `]`。ID 由生成步骤按数组索引生成，避免手工编号错误。

### 5. 严格边界替换

替换时必须保留目标数组后面的闭合 `]` 和下一个场景的起始边界。有效边界逻辑是：

1. 找到 `  <scene>: [`；
2. 找到下一个场景属性（例如 `  travel: [`）；
3. 在两个边界之间确认目标数组元素；
4. 用候选元素替换整个区间；
5. 显式写入目标数组的闭合 `]`；
6. 保留下一个场景原有内容。

不要使用只查找 `<scene>-100` 的脚本作为最终写入工具。现有 `replace_scene.py` 会把 `<scene>-100` 所在行当作结束位置，容易丢失数组闭合边界，且无法可靠处理重复 ID 或异常数组。

### 6. 替换后立即做 AST 校验

至少运行：

```powershell
node validate-data-scene.js <scene>
```

并额外检查：

- TypeScript parse diagnostics 为 0；
- 数组长度严格为 100；
- ID 从 `<scene>-1` 连续到 `<scene>-100`；
- ID 无重复；
- 角色符合该场景约定；
- `id`、`speaker`、`text`、`translation`、`note` 均非空；
- 英文文本无重复；
- 中文翻译无重复；
- `note` 无重复；
- 英文文本做大小写、标点和空白归一化后仍无重复；
- 目标场景后面的下一个场景 ID 仍从 1 开始。

### 7. 做内容审查

结构通过不等于内容通过。逐场景检查：

- 是否在不应结束的位置提前道别；
- 是否出现多次无意义的 `See you`、`Goodbye`、`By the way` 或固定问答；
- 是否有中文式英语、生硬搭配或事实性错误；
- 中文是否自然且准确表达英文语气；
- `note` 是否解释实际语言点，而不是重复句子表面意思；
- 10 个主题单元之间是否有合理过渡；
- 角色说话风格是否一致。

### 8. 项目级验证

每个场景完成后运行：

```powershell
pnpm typecheck
pnpm test
pnpm test:components
git diff --check
```

只有四项全部通过，才进入暂存和提交。提交前再次确认：

```powershell
git diff -- lib/data.ts
git diff --name-only
git status --short
```

本次任务要求只暂存并提交听力数据变更，推荐只暂存 `lib/data.ts`，不要带入 `kilo.json`、备份文件或候选生成文件。

## 本次 `greetings` 的有效结果

- `greetings` 已完整替换为 100 条；
- `greetings-1` 到 `greetings-100` 连续；
- Alex/Mia 严格交替；
- `validate-data-scene.js greetings` 通过；
- TypeScript AST parse 通过；
- 英文、中文、注释均无重复；
- `pnpm typecheck`、`pnpm test`、用户确认的 `pnpm test:components` 和 `git diff --check` 均通过；
- `lib/data.ts` 当前尚未暂存或提交。

## 已知陷阱

- `replace_scene.py` 只按 `scene-1` 和 `scene-100` 所在行定位，不能验证数组尾部边界；本次未将其作为最终写入方案。
- 生成候选时如果临时数组超过 100 条，必须在写入前截断并重新校验，不能把多余条目写进运行时数据。
- 替换脚本若删除目标数组的闭合 `]`，TypeScript 会把后续场景解析成错误内容；写入后必须先用 AST 检查 parse diagnostics。
- PowerShell 5.1 不支持 `&&`；依赖命令应使用 `; if ($?) { ... }` 或分别执行。
- `git diff --check` 只检查空白和冲突标记，不替代内容质量审查。
