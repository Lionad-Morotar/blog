---
title: D2C
description: 智能 Design-to-Code 架构实践
original_path: _ai/skills/d2c.md
---

#### 智能 D2C 架构：基于 AWS Kiro + MCP + Skills

AWS 提出的新一代 Design-to-Code（D2C）解决方案，通过三项核心技术解决传统 D2C 工具无法理解企业组件库的问题：

| 技术 | 作用 | 核心机制 |
|------|------|----------|
| **Skills** | 组件知识工具化 | 将组件封装为 MCP 可调用的工具，渐进式披露（元数据→SKILL.md→References） |
| **Steering** | 策略驱动 AI 编程 | `.kiro/steering/` 目录下的 Markdown 文件控制 AI 行为，强制执行企业规范 |
| **MCP** | 标准化工具接口 | 统一协议集成设计工具、组件库、测试框架，支持动态发现 |

**核心成果**

- 组件库利用率从 ~0% 提升到 **80%+**
- 开发时间从数小时缩短到 **数分钟**
- Token 消耗降低 **95%**（10000+ → 500/请求）

**关键创新：渐进式知识披露**

```
tools/list 返回元数据（50-100 tokens）
    ↓ AI 判断需要时调用
tool call 返回 SKILL.md（200-500 tokens）
    ↓ 需要更详细时读取
references/ 详细文档（按需加载）
```

见：[让 AI 理解你的组件库 - AWS 博客](https://aws.amazon.com/cn/blogs/china/ai-understanding-component-library-intelligent-d2c-architecture-aws-kiro-mcp-skills/)