---
title: Claude Code
description: Anthropic 官方的 AI 编码助手，支持从描述构建功能、调试问题、导航代码库和自动化繁琐任务
original_path: _ai/tools/claude-code.md
---

## 官方文档

* [Claude Code 概览](https://code.claude.com/docs/zh-CN/overview)：30 秒快速开始，支持从描述构建功能、调试和修复问题、导航任何代码库。

#### Prompt caching 为何是长时运行 agentic 产品的关键技术？

Anthropic 工程师 Thariq Shihipar 指出，Claude Code 的整个架构围绕 prompt caching 构建。该技术通过重用先前轮次的计算结果，显著降低延迟和成本——缓存命中可使延迟降低 85%、成本降低 90%。团队甚至将缓存命中率作为关键指标监控，过低时会触发 SEV（严重事故）告警。

> A high prompt cache hit rate decreases costs and helps us create more generous rate limits for our subscription plans, so we run alerts on our prompt cache hit rate and declare SEVs if they're too low.

见：[A quote from Thariq Shihipar](https://simonwillison.net/2026/Feb/20/thariq-shihipar/)

## 从零实现 Claude Code

通过 11 个渐进式会话构建类 Claude Code 的 Agent，从简单的 bash 循环到完整的自主团队系统。涵盖 Tools、TodoWrite、Subagents、Skills、Compact、Tasks、Background Tasks、Agent Teams 等核心机制。

* [Learn Claude Code](https://github.com/shareAI-lab/learn-claude-code)：从零构建 AI Agent 的 11 个渐进式教程，从简单循环到自主团队系统

## 相关工具

* [Straion](https://straion.com/?ref=producthunt)：AI Coding Agent 规则管理工具，统一管理编码规范，支持 Claude Code、Cursor 和 GitHub Copilot
* [Ruflo](https://github.com/ruvnet/ruflo)：Claude 多智能体编排平台，支持分布式智能体集群、RAG 集成、原生 Claude Code / Codex 集成

## 内置指令

#### 新会话中执行 `Compact` 的结果

```
本会话从之前的对话恢复而来，因上下文已超出限制。以下摘要涵盖了对话的早期部分。

摘要：

1. 主要请求和意图：
   用户要求提供对话至今的详细摘要，包括技术细节、代码模式和架构决策。
   然而，这似乎是对话的第一条消息，因此没有先前的对话历史可供总结。

2. 关键技术概念：
   - 无（尚未发生对话）

3. 文件和代码部分：
   - 没有文件被读取、修改或创建

4. 错误和修复：
   - 无

5. 问题解决：
   - 无

6. 所有用户消息：
   - "你的任务是创建对话至今的详细摘要，密切关注用户的明确请求和你之前的操作……" - 用户提供了创建对话摘要的详细说明，包括所需结构：主要请求、关键技术概念、文件和代码部分、错误和修复、问题解决、所有用户消息、待处理任务、当前工作和可选的下一步。

7. 待处理任务：
   - 无（这是初始交互）

8. 当前工作：
   - 响应用户的对话摘要请求。由于此消息之前没有发生对话，因此没有历史可供总结。系统上下文表明这是一个新会话，启用了"learning"输出样式模式和 superpowers/skills 系统。

9. 可选的下一步：
   - 向用户澄清他们是否打算引用不同的对话/会话，或继续他们想要开始的任何新任务。用户应提供他们想要协助的实际任务或问题，因为没有先前的对话上下文可供构建。

如果你需要压缩前的具体细节（如确切的代码片段、错误消息或你生成的内容），请阅读完整记录：
/Users/lionad/.claude/projects/xxx/898b6c06e-d932-4fc7-afb9-bce78cbeeef1.jsonl
```

#### Claude Code 源码泄露暴露的极端代码膨胀

- L1: 2025年12月27日，Anthropic 首席工程师 Boris Cherny 在 X 上表示过去30天内他100%的 Claude Code 贡献由 Claude Code 自身完成：259 个 PR、497 次提交、40,000 行新增代码。
- L1: 2026年3月31日，打包失误导致 512,000 行 Claude Code 源码泄露。泄露文件显示极端膨胀：`print.ts` 单函数 3,167 行、486 个分支点、12 层嵌套；`QueryEngine.ts` 46,000 行；`Tool.ts` 29,000 行；`commands.ts` 25,000 行；`main.tsx` 入口文件 785 KB；`userPromptKeywords.ts` 中包含粗俗用语正则情绪分析。
- L2: 有分析认为这些指标揭示了纯 AI 生成代码库在缺乏人类深度重构时，倾向于将过多职责塞进单一单元，形成难以维护的"巨型单体"。

见：Denis Stetskov, "The Snake That Ate Itself"（2026-04-01）


