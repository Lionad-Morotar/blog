---
title: Claude Code
description: Anthropic 官方的 AI 编码助手，支持从描述构建功能、调试问题、导航代码库和自动化繁琐任务。
---

## 官方文档

* [Claude Code 概览](https://code.claude.com/docs/zh-CN/overview)：30 秒快速开始，支持从描述构建功能、调试和修复问题、导航任何代码库。

#### Prompt caching 为何是长时运行 agentic 产品的关键技术？

Anthropic 工程师 Thariq Shihipar 指出，Claude Code 的整个架构围绕 prompt caching 构建。该技术通过重用先前轮次的计算结果，显著降低延迟和成本——缓存命中可使延迟降低 85%、成本降低 90%。团队甚至将缓存命中率作为关键指标监控，过低时会触发 SEV（严重事故）告警。

> A high prompt cache hit rate decreases costs and helps us create more generous rate limits for our subscription plans, so we run alerts on our prompt cache hit rate and declare SEVs if they're too low.

见：[A quote from Thariq Shihipar](https://simonwillison.net/2026/Feb/20/thariq-shihipar/)
