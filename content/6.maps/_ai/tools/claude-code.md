---
title: Claude Code
description: Anthropic 官方的 AI 编码助手，支持从描述构建功能、调试问题、导航代码库和自动化繁琐任务
original_path: _ai/tools/claude-code.md
---

## 官方文档

* [Claude Code 概览](https://code.claude.com/docs/zh-CN/overview)：30 秒快速开始，支持从描述构建功能、调试和修复问题、导航任何代码库。

#### Prompt caching 为何是长时运行 agentic 产品的关键技术？

Anthropic 工程师 Thariq Shihipar 指出，Claude Code 的整个架构围绕 prompt caching 构建。该技术通过重用先前轮次的计算结果，显著降低延迟和成本——缓存命中可使延迟降低 85%、
成本降低 90%。团队甚至将缓存命中率作为关键指标监控，过低时会触发 SEV（严重事故）告警。

> A high prompt cache hit rate decreases costs and helps us create more generous rate limits for our subscription plans,
so we run alerts on our prompt cache hit rate and declare SEVs if they're too low.

见：[A quote from Thariq Shihipar](https://simonwillison.net/2026/Feb/20/thariq-shihipar/)

## 从零实现 Claude Code

通过 11 个渐进式会话构建类 Claude Code 的 Agent，从简单的 bash 循环到完整的自主团队系统。涵盖 Tools、TodoWrite、Subagents、Skills、Compact、Tasks、
Background Tasks、Agent Teams 等核心机制。

* [Learn Claude Code](https://github.com/shareAI-lab/learn-claude-code)：从零构建 AI Agent 的 11 个渐进式教程，从简单循环到自主团队系统

## 相关工具

* [Straion](https://straion.com/?ref=producthunt)：AI Coding Agent 规则管理工具，统一管理编码规范，支持 Claude Code、Cursor 和 GitHub Copilot
* [Ruflo](https://github.com/ruvnet/ruflo)：Claude 多智能体编排平台，支持分布式智能体集群、RAG 集成、原生 Claude Code / Codex 集成

#### claude-code-ultimate-guide-mcp（已从全局下线，备份配置）

[Claude Code Ultimate Guide](https://cc.bruniaux.com/guide/) 的 MCP server，提供 Claude Code 用法速查（cheatsheet、官方文档快照 diff、示例模板、安全威胁库等约 30 个工具）。全局接入后工具 schema 预扣 token 太多，2026-09 已从 `~/.claude.json` 顶层 `mcpServers` 移除，需要时按会话临时挂载：

```json
"claude-code-guide": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "claude-code-ultimate-guide-mcp"]
}
```

#### 十七个工具按四类问题分组：用法检索、官方快照、版本影响、模板与安全

该 MCP 把 Claude Code Ultimate Guide（2 万+ 行策展文档、1809 条索引、29 类目）接入任意 MCP 客户端。与 Context7 的通用文档检索及官方原始文档不同，它是策展层：观点性最佳实践、官方文档快照 diff、可抄模板与安全威胁库的打包。十七个工具按要回答的问题分四组：查用法与最佳实践走 `search_guide` 语义检索加 `read_section` 锚点精读，`list_topics` 先看全景（deep dive 独占 1636 条）；核对官方文档现状走 `search_official_docs` 加 `init/refresh/diff_official_docs` 快照三件套；评估版本升级影响走 `get_release`、`compare_versions`、`get_changelog`、`get_digest` 四个时间轴工具；找可抄模板与安全评估走 `list/search/get_example`（agents、commands、hooks、skills、scripts 五类生产模板，语义搜索按意图匹配）和 `list/get_threats` 威胁库（CVE 与技法 ID 双索引）。

见：[mcp-server README](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/mcp-server/README.md)：工具表由 machine-readable/mcp-product.json 渲染

#### 能力面不止工具清单：还有 Resources、Prompt 与伴生命令

server 实际暴露的能力远大于「17 个工具」：6 个 MCP Resource（`claude-code-guide://` 前缀的 agent-harnesses、distribution-channels、llms、reference、releases、translations）、1 个 `claude-code-expert` Prompt 与 5 个 `/ccguide:*` 斜杠命令（daily、diff-docs、init-docs、refresh-docs、search-docs）。Resources 是被动数据端点，成本只在被列出或读取时产生，但宿主若自动列出资源清单，token 账本里就多一笔不算进工具 schema 的隐性预扣；伴生命令则把最常用的调用序列固化为入口，省去每次手拼工具参数。

见：[mcp-server README](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/mcp-server/README.md)「Generated capabilities」节

#### 离线索引加按需联网的混合架构：搜索与精读是两条可用性曲线

包内只捆绑约 130KB 压缩的结构化索引，`search_guide`、`list_topics`、`get_cheatsheet` 纯离线可跑；但 `read_section` 读大文件需从 GitHub 按需拉取（24h 本地缓存），`init/refresh_official_docs` 需从 Anthropic 拉约 1.2MB 的 llms-full.txt。断网或 GitHub 不可达的会话里，检索结果照常返回、精读却可能超时失败，表现为工具调用挂起而非干净报错；挂载前先手测一次 `read_section` 再决定去留。

见：[npm 包描述](https://www.npmjs.com/package/claude-code-ultimate-guide-mcp)：结构化索引随包分发，正文按需拉取带 24h 本地缓存

#### Claude Code 的 MCP 扩展与远程连接

Claude Code 支持通过 MCP 连接外部工具，并提供四种传输方式：HTTP（推荐远程）、SSE、WebSocket 和 stdio。
可以通过 `claude mcp add --transport http <name> <url>` 或 `claude mcp add --transport sse <name> <url>` 连接局域网内的远程 MCP server
，HTTP/SSE server 断线时还会自动重连。Claude Code 也可以自身作为 MCP server 运行：`claude mcp serve` 会以 stdio 方式启动一个 MCP server，供其他应用调用。
结合一个 stdio-to-HTTP 桥接，理论上可以把远程 Claude Code 实例暴露给本地 Claude Code 作为 tool 使用。

见：[Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)

#### tweakcc 对 Claude Code 的扩展与解锁

* [tweakcc v4 发布](https://piebald.ai/blog/tweakcc-v4)：第三方 Claude Code 定制工具，v4 新增 Node.js API、`adhoc-patch` 临时补丁、`unpack`/`repack` 原生二进制 JS、AGENTS.md 支持、swarm mode 解锁、输入框正则高亮、MCP 并行启动优化等
* [Session Memory 与 /remember](https://piebald.ai/blog/session-memory-is-coming-to-claude-code)：Claude Code 会在会话达到 10k tokens + 3 次工具调用后，自动在 `~/.claude/projects/.../session-memory/summary.md` 维护高密度笔记；`/remember` 技能据此更新 `CLAUDE.md`
* [tweakcc 源码](https://github.com/Piebald-AI/tweakcc)：安装检测优先用 `which('claude')` 查 PATH，失败后回退到覆盖 npm/pnpm/Yarn/Bun/Volta/fnm/nvm/nodenv/nvs/asdf/mise 及多平台系统目录的硬编码候选路径表
* [node-lief](https://www.npmjs.com/package/node-lief)：tweakcc 用于修改原生 Claude Code 可执行文件的 Node.js 绑定，支持在 ELF/PE/Mach-O 二进制中抽取和重新嵌入 JS bundle

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

- L1: 2025年12月27日，Anthropic 首席工程师 Boris Cherny 在 X 上表示过去30天内他100%的 Claude Code 贡献由 Claude Code 自身完成：259 个 PR、497 次提交、
40,000 行新增代码。
- L1: 2026年3月31日，打包失误导致 512,000 行 Claude Code 源码泄露。泄露文件显示极端膨胀：`print.ts` 单函数 3,167 行、486 个分支点、12 层嵌套；
`QueryEngine.ts` 46,000 行；`Tool.ts` 29,000 行；`commands.ts` 25,000 行；`main.tsx` 入口文件 785 KB；
`userPromptKeywords.ts` 中包含粗俗用语正则情绪分析。
- L2: 有分析认为这些指标揭示了纯 AI 生成代码库在缺乏人类深度重构时，倾向于将过多职责塞进单一单元，形成难以维护的"巨型单体"。

见：Denis Stetskov, "The Snake That Ate Itself"（2026-04-01）

#### 子代理也能自动调用

这次对话中，我没有显示指定使用子智能体，但 CC 自动调用了 `ce-web-researcher`。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260428101330624.png)


