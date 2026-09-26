# Skill Definition: generate-dialogue-scene

## 1. 技能概述
* **目标**：为英语口语/听力练习应用批量生成高质量的双人对话数据集（默认 100 条），并自动完成数据注入、AST 校验与单元测试。
* **角色设定**：Alex 与 Mia。
* **数据结构**：包含 id、speaker、text、translation、note 5 个核心字段。

## 2. 一键自动化与验证流程
参考前文提供的 Node.js/PowerShell 脚本，实现自动注入数据、运行 AST 校验和单元测试。