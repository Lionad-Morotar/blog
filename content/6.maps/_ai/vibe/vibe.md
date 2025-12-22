---
title: Vibe Coding
description: Vibe 是一个基于 AI 的代码生成和协作平台，旨在通过自然语言提示帮助开发者快速生成代码片段、自动化任务和提升编程效率。
---

## Domain

### 基础配置

- [agents.md](/maps/_ai/vibe/agents-md)

#### 编写 `agents.md` 的关键要点？

- CLAUDE.md 是每次会话默认载入的文件，用来在编码代理启动时把代码库信息传给 Claude。
- LLM 本质上无状态，代理一开始对代码库一无所知。
- CLAUDE.md 应只包含“WHAT/WHY/HOW”：技术栈、项目结构、目的以及如何运行测试等。
- 避免把所有命令和风格规范塞进去，LLM 能跟随的指令数有限（≈150‑200）。
- 保持文件短小，最好 <300 行；更短越好。
- 使用渐进式披露：把任务专属说明拆成单独 Markdown，CLAUDE.md 只列出指向并让 Claude 决定是否读取。
- 别把代码风格规则放进 CLAUDE.md；让 linters/formatters 处理，LLM 用来写代码即可。
- Claude 会在系统提醒中自动忽略不相关内容，越通用的指令越有可能被采纳。
- 切勿自动生成 CLAUDE.md；每一行都要经过精心策划，以免产生错误的实现。

见：[Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

### 规模化

- [Team of Agents](/maps/_ai/vibe/team-of-agents)

### 持续集成

- [Anchoring coding agents to a ref application](/maps/_ai/vibe/anchoring)
- [Complacency in AI-assisted coding](/maps/_ai/vibe/complacency)

