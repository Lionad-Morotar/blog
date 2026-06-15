---
title: 🔧 Claude Code MCP 集体报错排查记录
description: 记录一次因 Node.js 版本导致 Claude Code 多个 MCP server 报 Connection closed 的排查过程
---

## 现象

今天在某项目打开 CC 时提示了 MCP server 报错，整整一排：

```
- MCP server 'plugin:context7:context7': failed — Skipping connection
- MCP server 'glm-image-mcp-server': failed — MCP error -32000: Connection closed
- MCP server 'open-websearch': failed — MCP error -32000: Connection closed
- MCP server 'kimi-tools-mcp': failed — MCP error -32000: Connection closed
```

重新启动也还是这 4 个报错，而且诡异的是，似乎和环境无关，因为有的是用 `npx`，有的用 `pnpm dlx`，但都挂了。

而除了这 4 个 MCP Server 以外剩下的所有都能正常运行。这就奇怪了。

## 是环境问题吗？

直觉告诉我是 Node 版本问题，可能跟我的环境配置有关。

因为在一些老项目，我通过 fnm 维护项目级别的 Node.js 版本：

- 全局使用 `fnm` 管理 Node，默认 `v22.22.1`
- 项目根有 `.node-version` 文件，Node.js 版本锁定 `16`

所以当我在项目的 Terminal 启动 CC 时，理论上使用 16 版本的 Node.js 去加载这些 MCP Server。

验证过程非常简单，直接使用 npx 启动某个 MCP Server 即可。

Node 16 下启动 `open-websearch`，会发现报错。

```
$ npx -y open-websearch@latest
TypeError: Class extends value undefined is not a constructor or null
    at @hono/node-server/dist/index.mjs:23
```

换 Node 22 就好了。猜想成立，根因就是 Node 版本。

## 怎么修改呢？

所以我第一反应是：直接指定某个 Node.js 版本的 npx 路径就行，比如：

```json
{
  "command": "/Users/.../fnm/node-versions/v22.22.1/installation/bin/npx",
  "args": ["-y", "@upstash/context7-mcp"]
}
```

改完重启发现 MCP Server 还是报错。

一时间没反应过来，但是手动执行指令时，发现了异常日志：

```
$ /Users/.../fnm/node-versions/v22.22.1/installation/bin/npx -y @upstash/context7-mcp
npm warn cli npm v10.9.8 does not support Node.js v16.20.2.
ReferenceError: ReadableStream is not defined
```

就算使用 22 版本的 npm 执行脚本，日志提示的 Node.js 还是 16.20.2，这里就触及到知识盲区了。

## 隐藏机制：shebang

`npx` 本身也是 Node.js 脚本。

如果你打开 `npx-cli.js`（比如在我的电脑中指向 `~/Library/pnpm/nodejs/22.22.1/lib/node_modules/npm/bin/npx-cli.js`），能看到以下内容。

```
#!/usr/bin/env node
const cli = require('../lib/cli.js')
...
```

要讲的是第一行，`env node` 会按 `PATH` 顺序找到第一个 `node`。所以这里解析出来的环境，并不一定等同于我指定路径的 npx 所对应的 Node.js。

简单来说，光换 `npx` 的路径没用，需要把整个执行环境的 Node.js 切换过来才行。

## 最终方案：mcp start up wrapper

这种情况只能写一个 shell 脚本了，把所有要执行的内容放到脚本里，然后在脚本顶部定义好我们需要的环境变量，这样就能锁定 Node.js 版本（cc-switch 也是类似的思路）。

wrapper 的内容可以写死 PATH，exec 则用来透传剩下的所有参数。

```bash
#!/usr/bin/env bash
export PATH="/Users/.../fnm/node-versions/v22.22.1/installation/bin:$PATH"
exec "$@"
```

回到 MCP 配置，只需要把 `command` 指向 wrapper 脚本。

```json
{
  "command": "/Users/lionad/.claude/mcp-node22.sh",
  "args": ["npx", "-y", "@upstash/context7-mcp"]
}
```

最后改好配置验证一下 `open-websearch`：

```
$ ~/.claude/mcp-node22.sh npx -y open-websearch@latest
🔍 Default search engine: bing
🔍 Search mode: AUTO ...
```

OK，搞定了。
