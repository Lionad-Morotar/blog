---
title: 🔧 Claude Code MCP 集体报错的排查记录
description: 记录一次 Claude Code 所有 MCP server 报 Connection closed 的排查过程。根因是项目 .node-version 锁定 Node 16，经 fnm 传递给 Claude Code，导致依赖 Node 18+ 的 MCP server 启动即崩溃。中间走了改 command 绝对路径的弯路，最终用 wrapper 脚本统一修复。
---

## 现象

某天打开 Claude Code，跑 `/doctor`，一排 MCP server 报错：

```
- MCP server 'plugin:context7:context7': failed — Skipping connection
- MCP server 'glm-image-mcp-server': failed — MCP error -32000: Connection closed
- MCP server 'open-websearch': failed — MCP error -32000: Connection closed
- MCP server 'kimi-tools-mcp': failed — MCP error -32000: Connection closed
```

四个 server，三种启动方式（plugin、`npx`、`pnpm dlx`），全挂。但另外几个（`claude-code-guide`、`zai-mcp-server`、`zread` 等）是好的。

第一反应：是不是 Node 版本的问题？

## 环境

先交代环境，后面所有判断都依赖它：

- 项目：`bs-admin-js-ms`（Vue 2 老后台，webpack 4）
- 项目根有 `.node-version` 文件，内容是 `16`
- 本机用 `fnm` 管理 Node，`fnm default` 是 `v22.22.1`
- shell 配了 fnm 的 `--use-on-cd`：进入项目目录会自动读 `.node-version` 切版本

所以即便 default 是 22，只要 `cd` 进这个项目，当前 shell 的 `node` 就被切到了 **16.20.2**。而 Claude Code 是从这个 shell 里启动的，它继承了这一刻的环境。

## 验证猜想：Node 16 vs Node 22

四个失败的 server 都是现代 ESM server，普遍依赖 Node 18+ 才内置的全局 Web API（`Request`、`fetch`、`ReadableStream` 等）。Node 16 没有这些。

直接拿其中一个做对照实验。

Node 16 下启动 `open-websearch`：

```
$ npx -y open-websearch@latest
TypeError: Class extends value undefined is not a constructor or null
    at @hono/node-server/dist/index.mjs:23
```

`@hono/node-server` 里写着 `class Request extends GlobalRequest`，而 Node 16 没有 `GlobalRequest`，拿到 `undefined`，当场崩溃。

换 Node 22 启动 `context7`：

```
$ fnm exec --using=22 -- npx -y @upstash/context7-mcp
Context7 Documentation MCP Server v3.2.1 running on stdio
{"result":{"protocolVersion":"2024-11-05", ...}}
```

正常启动，正常响应 `initialize`。

猜想成立。根因就是 Node 版本。

## 第一次尝试：换 command 的绝对路径（失败）

既然要用 Node 22，那把 MCP 配置里 `command` 从 `npx` 改成 Node 22 目录下的 `npx` 绝对路径不就行了？

```json
{
  "command": "/Users/.../fnm/node-versions/v22.22.1/installation/bin/npx",
  "args": ["-y", "@upstash/context7-mcp"]
}
```

改完重启。context7 还是红的。

手动验证这条路到底有没有生效：

```
$ /Users/.../fnm/node-versions/v22.22.1/installation/bin/npx -y @upstash/context7-mcp
npm warn cli npm v10.9.8 does not support Node.js v16.20.2.
ReferenceError: ReadableStream is not defined
```

npm 自己在警告：当前 Node 是 16.20.2。然后照样崩在 `ReadableStream`。

**解释器根本没换成。**

## 真正的机制：npx 的 shebang

`npx` 不是二进制，是个 JS 脚本，文件头是：

```
#!/usr/bin/env node
```

`env node` 的意思是：按 `PATH` 顺序找第一个叫 `node` 的可执行文件。我虽然指定了 Node 22 目录下的 `npx` 文件，但它启动时找解释器，还是回到 `PATH` 里——
而 `PATH` 里的 `node` 是 fnm 切好的 16。

所以光换 `npx` 的文件路径没用，`pnpm` 同理（也是 `#!/usr/bin/env node`）。要换的是 `npx`/`pnpm` 启动时**看到的那个 `node`**，也就是 `PATH` 本身。

附带一个发现：之前在 Node 16 下失败的安装，把 npx 缓存目录写坏了（context7 的 `hono` 子目录 rename 冲突）。清掉那个损坏的缓存子目录，npx 才能正常重建。

## 正解：wrapper 脚本

写一个 wrapper，把 Node 22 的 bin 目录前置到 `PATH`，再 `exec` 透传命令：

```bash
#!/usr/bin/env bash
# ~/.claude/mcp-node22.sh
export PATH="/Users/.../fnm/node-versions/v22.22.1/installation/bin:$PATH"
exec "$@"
```

MCP 配置里，`command` 指向这个 wrapper，`args` 首位放 `npx`：

```json
{
  "command": "/Users/lionad/.claude/mcp-node22.sh",
  "args": ["npx", "-y", "@upstash/context7-mcp"]
}
```

wrapper 内部前置 `PATH` 后 `exec npx`，这时 npx 的 `env node` 命中的是 Node 22。

验证：

```
$ echo '<initialize 请求>' | ~/.claude/mcp-node22.sh npx -y @upstash/context7-mcp
Context7 Documentation MCP Server v3.2.1 running on stdio
{"result":{...}}
```

同样验证 `open-websearch`（之前在 Node 16 下崩的那个 hono）：

```
$ echo '<initialize>' | ~/.claude/mcp-node22.sh npx -y open-websearch@latest
🔍 Default search engine: bing
🔍 Search mode: AUTO ...
```

正常启动，没再崩。

把 `context7`、`open-websearch`、`glm-image-mcp-server` 三个都改成走 wrapper，重启，三个变绿。

## kimi-tools 的额外问题

第四个 `kimi-tools-mcp` 用的也是 wrapper + npx，但重启后它还是红的。

手动跑：

```
$ ~/.claude/mcp-node22.sh npx -y @lionad/kimi-tools-mcp@latest
（60 秒无任何输出，被 timeout 杀掉）
```

完全静默卡住，npx 缓存里也没有这个包。

但这个包其实很小：

```
$ npm view @lionad/kimi-tools-mcp
version = '0.3.0'
engines = { node: '>=18' }
dist.unpackedSize = 133463   # 130KB
dependencies = { '@modelcontextprotocol/sdk': '^1.6.1', zod: '^3.23.8' }
```

130KB，不该下载慢。用 `npm pack` 直接下 tarball：

```
$ npm pack @lionad/kimi-tools-mcp
lionad-kimi-tools-mcp-0.3.0.tgz   # 2 秒，成功
```

tarball 能下。那 npx 卡在哪？

卡在 `@latest` 这个 dist-tag 的解析上。本机 registry 是国内镜像 `npmmirror.com`，对这个 4 月才发的小众包，dist-tag 元数据同步不完整，npx 查 `@latest` 一直卡。
换成官方源（`registry.npmjs.org`）裸连，国内没配代理，一样卡。

context7/open-websearch/glm-image 能成功，是因为它们是成熟大包，镜像同步充分。`@lionad/kimi-tools-mcp` 这种新包正好踩中。

解决办法：本地装，彻底绕开 npx。

```bash
$ mkdir -p ~/.claude/mcp-packages/kimi-tools
$ npm install --prefix ~/.claude/mcp-packages/kimi-tools \
    @lionad/kimi-tools-mcp@0.3.0 \
    --registry=https://registry.npmmirror.com
added 95 packages in 2s
```

指定版本号（不查 `@latest`），2 秒装完。这反过来证明了之前卡的不是下载，是 npx 的元数据解析。

配置改成直接 `node` 跑入口文件：

```json
{
  "command": "/Users/lionad/.claude/mcp-node22.sh",
  "args": ["node", "/Users/lionad/.claude/mcp-packages/kimi-tools/node_modules/@lionad/kimi-tools-mcp/dist/index.js"],
  "env": { "KIMI_TOOLS": "all" }
}
```

验证：

```
$ echo '<initialize>' | KIMI_TOOLS=all ~/.claude/mcp-node22.sh node .../dist/index.js
kimi-tools-mcp Server 正在通过 stdio 运行
{"result":{"protocolVersion":"2024-11-05", ...}}
```

重启，四个全绿。

## 根因总结

整条链路：

```
项目 .node-version = 16
  → fnm --use-on-cd 把 shell 切到 Node 16
    → Claude Code 继承这个环境
      → 用 Node 16 启动所有 MCP server
        → 依赖 Node 18+ 的 ESM server 启动即崩 → Connection closed
```

两个层次的问题：

1. **Node 版本**：现代 MCP server 需要 Node 18+ 的全局 Web API，Node 16 跑不动。
2. **包分发**：`@lionad/kimi-tools-mcp` 这种新包，国内镜像的 dist-tag 元数据没同步好，npx 解析 `@latest` 卡死。

## 最终方案

| server | 启动方式 | 说明 |
| --- | --- | --- |
| `context7` | wrapper + `npx` | plugin 配置 |
| `open-websearch` | wrapper + `npx` | 顶层配置 |
| `glm-image-mcp-server` | wrapper + `npx` | 顶层配置 |
| `kimi-tools-mcp` | wrapper + `node` 本地路径 | 绕开 npx |

核心就是那个 wrapper 脚本。它的两个关键点：

- **继承 + 前置**：`export PATH="node22bin:$PATH"`，先继承父 `PATH`（保留系统工具），再把 Node 22 顶到最前。比在配置里写死整个 `env.PATH` 健壮。
- **`exec "$@"` 透明转发**：wrapper 对 args 无感知，任何 `npx`/`pnpm`/`node` 命令都能套，以后加新 server 零改动复用。

## 维护备忘

几个需要记住的点：

1. **context7 是 plugin 配置**，路径在 `~/.claude/plugins/cache/.../context7/<sha>/.mcp.json`。插件更新（`gitCommitSha` 变）
会把它覆盖回原版 `npx`，到时 context7 又会失败。要么重新套用 wrapper，要么挪到 `~/.claude.json` 顶层 `mcpServers` 持久化。
2. **wrapper 里写死了 `v22.22.1` 路径**。这是 `fnm default`，稳定。但以后 fnm 升默认版本，wrapper 要跟着改一行。
3. **kimi 升级**：`@lionad/kimi-tools-mcp` 发新版本时，手动更新本地包：
   ```bash
   npm install --prefix ~/.claude/mcp-packages/kimi-tools \
     @lionad/kimi-tools-mcp@latest --registry=https://registry.npmmirror.com
   ```
4. **别动 npmmirror registry**。中间为了试 kimi 临时注释过 npmmirror 切官方源——但 context7/open-websearch/glm-image 还靠 npx 实时下载，官方源国内裸连慢，
会让它们重新超时变红。kimi 已经本地化不受影响，所以 npmmirror 保持开着最稳。

## 复现要点

- 想复现 Node 16 的崩溃：`fnm exec --using=16 -- npx -y open-websearch@latest`，会崩在 `GlobalRequest undefined`。
- 想验证 wrapper 生效：`echo '<initialize JSON-RPC>' | ~/.claude/mcp-node22.sh npx -y @upstash/context7-mcp`，应返回 server 信息。
- MCP 的 initialize 请求体：
  ```json
  {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"
  name":"t","version":"1"}}}
  ```

