---
title: Tools
description: AI 开发工具与平台，包括 Claude Code、浏览器自动化、GitHub Copilot 等编码助手。
original_path: _ai/tools.md
---

## Claude Code

* [Claude Code](/maps/_ai/tools/claude-code) - Anthropic 官方 AI 编码助手

## Browser Automation

* [浏览器自动化](/maps/_ai/tools/browser-automation) - Opendia、Browser-use、Stagehand、Playwright MCP 等工具对比

## Copilot

* [GitHub Copilot](/maps/_ai/tools/copilot) - AI 编码助手与团队协作实践

## Code Review Infrastructure

#### Sashiko：Linux 内核的 AI 补丁审查工具

Sashiko 是 Google 开发并捐赠给 Linux Foundation 的 AI 驱动补丁审查工具，旨在帮助开源维护者处理日益增长的 AI 生成补丁洪流。

核心功能：
- 自动审查内核补丁，标记明显问题
- 提供比人类维护者更快的反馈循环
- 已集成到 Linux 内核审查流程中，公开可用

背景：随着 AI 生成报告质量跃升，维护者面临更大的审查压力。Sashiko 代表了一种"防御性基础设施"——通过 AI 辅助审查来管理 AI 生成的补丁洪流。

各子系统（网络、BPF、DRM、存储等）正在为 Sashiko 添加领域特定的审查规则，形成共享的 AI 审查能力池。

见：[Linux kernel czar says AI bug reports aren't slop anymore - The Register](https://www.theregister.com/2026/03/26/greg_kroahhartman_ai_kernel/)
