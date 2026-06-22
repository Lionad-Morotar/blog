---
title: Claude Agent SDK
description: Anthropic Claude Agent SDK 的使用方式、调用栈与 User-Agent 机制
---

#### Claude Agent SDK 的调用栈本质

Claude Agent SDK 并非直接调用 Anthropic API 的 HTTP 客户端，而是把 Claude Code CLI 当作子进程启动的可编程封装层。TypeScript SDK 通过 `query()` 等 API 启动本地 Claude Code 二进制，由 CLI 子进程自治执行 Read、Edit、Bash 等内置工具，并维护会话持久化。因此它的能力边界、升级节奏和 bug 行为与 Claude Code CLI 强绑定。

见：[Agent SDK overview - Claude Code Docs](https://code.claude.com/docs/en/agent-sdk)

#### Claude Agent SDK 的 User-Agent 结构

通过 Agent SDK 发起的请求，其 User-Agent 由 Claude Code CLI 子进程生成，模板为：

`claude-cli/<version>(external, <entrypoint>, agent-sdk/<sdk-version>[, client-app/<app-id>])`

其中 `external` 标记请求来自外部客户端；`<entrypoint>` 由 `CLAUDE_CODE_ENTRYPOINT` 环境变量决定，TypeScript SDK 默认 `sdk-ts`，Python SDK 默认 `sdk-py`，Claude Desktop Code tab 为 `local-agent`；`agent-sdk/<sdk-version>` 由 SDK 强制写入 `CLAUDE_AGENT_SDK_VERSION`；`client-app/<app-id>` 可通过 `options.env` 中的 `CLAUDE_AGENT_SDK_CLIENT_APP` 自定义。

见：[Environment variables - Claude Code Docs](https://code.claude.com/docs/en/env-vars)

#### CLAUDE_CODE_ENTRYPOINT 的入口点映射

`CLAUDE_CODE_ENTRYPOINT` 不仅影响 User-Agent 括号内的字符串，也决定 Anthropic 内部遥测对客户端类别的归类。常见入口点与 telemetry 分类的映射包括：`cli` → `claude_code_cli`、`sdk-ts`/`sdk-py` → `claude_code_sdk`、`local-agent` → `claude_code_local_agent`、`claude-vscode` → `claude_code_vscode`、各类 `remote_*` → `claude_code_remote`、`mcp` → `claude_code_mcp`。SDK 用户可在 `options.env` 中显式覆盖入口点，但未知入口点会落入默认分类。

#### Agent SDK 与 Vercel AI SDK 的调用栈差异

Vercel AI SDK 的 `@ai-sdk/anthropic` 是进程内直接调用 Anthropic API，其 User-Agent 以 `ai/`、`ai-sdk/provider-utils/` 和 `ai-sdk/anthropic/` 为前缀；Agent SDK 则是进程内托管 Claude Code CLI，由 CLI 再发出 API 请求。前者适合单次模型调用，后者适合需要自动读写文件、执行命令、管理多轮会话的自主任务。两者在鉴权头、模型 ID 映射、工具执行位置和会话状态管理上也存在显著差异。

见：[Agent SDK reference - TypeScript](https://code.claude.com/docs/en/agent-sdk/typescript)
