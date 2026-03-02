---
title: Vibe Coding
description: Vibe 是一种基于 AI 的代码生成和协作方式，旨在通过自然语言提示帮助开发者快速生成代码片段、自动化任务和提升编程效率。
original_path: _ai/vibe.md
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

### 设计思维

- [玩具化设计思维](/maps/_ai/vibe/playful-ai) - 将复杂 AI 能力转化为情感化、游戏化体验

### 暗面与风险

#### VibeScamming：AI 降低了诈骗的技术门槛

Vibe coding 不仅被用于正当开发，也正被滥用为"VibeScamming"——
利用 AI 工具几乎零技术门槛地创建专业级垃圾邮件和诈骗方案。

诈骗者只需几个提示词，就能生成窃取信用卡信息、钓鱼 Office365 凭证等的完整方案。
Anthropic 的报告指出，即使是"无代码"的勒索软件，现在也能由完全不会编程的人通过 LLM 构建，并以高达 1200 美元的价格出售。

这种趋势带来了双重问题：垃圾邮件的视觉质量提升使传统识别方法失效；
而 vibe-coded 应用的特定视觉风格（过多的 chrome、颜色和表情符号）
反而可能让正当的 AI 辅助开发作品看起来不可信。

见：[Why Email Spam Looks Better Than Usual These Days](https://tedium.co/2026/02/25/vibe-coded-email-spam/)

#### LLM 写作的身份认同危机？

读者对 LLM 生成内容的厌恶，本质上是对**作者身份丧失**的反感。

作者 Ibrahim Diallo 用 Seth Godin 书中的寓言说明这一点：Godin 在书中虚构了一个叫 Mo Samuels 的代笔人，
告诉读者"这本书其实是 Mo 写的，不是我"。读者瞬间感到被欺骗——他们买的是 Godin 的视角和声音，
而非冷冰冰的信息。最后 Godin 揭示这只是个玩笑，但读者已深刻体会到**作者身份的价值**。

Diallo 发现，用 LLM 辅助写作的文章都有相似的"声音"——相同的句式套路（"It's not just X, but Y"、
"The irony is not lost on me"）、相似的俏皮话。所有 AI 生成的内容仿佛都是 Mo Samuels 代笔的。
更糟的是，当他回头引用自己以前用 LLM 写的文章时，**认不出自己的声音**——那些词不是他会用的，
那些 clever 的句子不像他写的。

这揭示了一个深层问题：当 AI 成为"共同作者"，我们失去的不只是独特性，还有与读者的信任关系，
以及与过去自己的连续性。

见：[Why we feel an aversion towards LLM articles](https://idiallo.com/blog/why-we-hate-llm-articles)

## Links

#### 余额查询

* [Copilot](https://github.com/settings/billing/budgets)
* [Trae](https://www.trae.ai/account-setting?user_id=7473336841417851912&username=Lionad-Morotar#usage)
