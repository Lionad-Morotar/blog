---
title: Peter Steinberger
description: PSPDFKit 创始人、Claudebot 创建者，Agentic Engineering 倡导者
---

#### 简介？

Peter Steinberger 是奥地利资深开发者，PSPDFKit（PDF 框架，用于超 10 亿设备）的创始人。2024 年离开 PSPDFKit 后，创建了 Claudebot——一个开源的个人 AI 助手项目，短期内迅速获得社区关注（GitHub 3k+ stars）。

#### 主要贡献/观点？

**Agentic Engineering 方法论**

区分于随意的 "vibe coding"，提出有意识、架构驱动的 AI 协作方式：
- 单日可合并 600+ commits，秘诀是并行运行 5-10 个 agents
- 与 AI "讨论"而非直接下指令，让它探索多种方案后再决定
- 自己不写代码，但深度把控架构方向

**Closing the Loop 原则**

AI 擅长编码的核心原因是代码可被验证。设计"可验证的架构"让 AI 能自我测试、自我调试，本地测试比 CI 更快。

**从 PR 到 Prompt Request**

将 GitHub PR 重新定义为 "Prompt Request"——重要的不是代码是什么，而是如何得到这段代码的思考过程。

**对 MCP 的批判**

认为 MCP 是"临时拐杖"，CLI 更灵活：可以用 `jq` 精确过滤、管道组合、按需调用，而非预加载所有函数定义污染上下文。

**企业 AI 采用障碍**

现有公司很难高效采用 AI，因为需要重构整个组织和代码库，优化代码库是为了让 agent 易于理解，而非人类工程师的偏好。

见：[The Pragmatic Engineer Podcast 访谈](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1457313865) | [Claudebot GitHub](https://github.com/steipete/claudebot)
