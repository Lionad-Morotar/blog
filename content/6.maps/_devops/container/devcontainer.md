---
title: Dev Container
description: 速通指南
---

> 目标：在 VS Code / Codespaces / JetBrains Gateway 中一键启动容器化开发环境，并避开项目最常见的性能与安全陷阱。

## 1. 前置条件

- Docker Desktop（macOS/Windows）或 `docker` + `docker-compose`（Linux）
- VS Code 安装 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展
- 可选：安装 Dev Container CLI

```bash
# 官方 CLI 是 npm 包，非 Homebrew
npm install -g @devcontainers/cli

# 验证
devcontainer --version
```

## 2. 最简目录结构

```text
.devcontainer/
├── devcontainer.json   # 核心配置
├── Dockerfile          # 自定义镜像（可选）
├── docker-compose.yml  # 多服务场景（可选）
├── .dockerignore       # 加速 build context（可选但强烈建议）
└── post-create.sh      # 创建后初始化脚本（可选）
```

## 3. devcontainer.json 核心字段

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/devcontainers/spec/main/schemas/devContainer.schema.json",
  "name": "My Project",

  // 二选一：官方镜像 或 自定义 Dockerfile
  "image": "mcr.microsoft.com/devcontainers/typescript-node:22-bookworm",
  // "build": { "dockerfile": "Dockerfile" },

  "remoteUser": "node",
  "updateRemoteUserUID": true,
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",

  // lifecycle：只放短任务；长驻进程不要塞进来
  "postCreateCommand": "bash .devcontainer/post-create.sh",

  "forwardPorts": [5995],
  "portsAttributes": {
    "5995": { "label": "Nuxt Dev", "onAutoForward": "notify" }
  },

  // containerEnv 对容器内所有进程可见；remoteEnv 仅 VS Code Server 进程可见
  "containerEnv": {
    "NUXT_PREVIEW_DIRS": "/workspaces/blog/.data/previews"
  },

  // node_modules 与 pnpm store 用命名卷隔离，避免 bind mount 跨文件系统同步小文件
  "mounts": [
    "source=${localWorkspaceFolderBasename}-node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume",
    "source=pnpm-store,target=/home/node/.local/share/pnpm/store,type=volume"
  ],

  "features": {
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },

  "customizations": {
    "vscode": {
      "extensions": [
        "Vue.volar",
        "dbaeumer.vscode-eslint",
        "bradlc.vscode-tailwindcss",
        "yoavbls.pretty-ts-errors"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "[vue]": { "editor.defaultFormatter": "Vue.volar" },
        "typescript.tsdk": "node_modules/typescript/lib",
        "eslint.validate": ["javascript", "typescript", "vue"],
        "files.watcherExclude": {
          "**/node_modules/**": true,
          "**/.nuxt/**": true,
          "**/.output/**": true,
          "**/.data/**": true,
          "**/dist/**": true
        },
        "search.exclude": {
          "**/.nuxt": true,
          "**/.output": true
        }
      }
    }
  }
}
```

## 4. Dockerfile 常用片段

```dockerfile
FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm

# pnpm（不依赖 corepack）
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN curl -fsSL https://get.pnpm.io/install.sh | PNPM_HOME=$PNPM_HOME sh -

# 原生模块 fallback 到源码编译所需（node-gyp），如 better-sqlite3
# sharp / esbuild 优先走预编译二进制，一般无需系统 libvips
RUN apt-get update && apt-get install -y \
    python3 python-is-python3 make g++ \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# 让运行用户拥有 pnpm 目录写入权限
RUN chown -R node:node $PNPM_HOME
USER node
```

## 5. .devcontainer/.dockerignore

```text
node_modules
.nuxt
.output
.data
.git
dist
```

## 6. 生命周期脚本执行顺序

1. `initializeCommand` —— 容器构建前，在**宿主机**执行
2. `onCreateCommand` —— 容器首次创建后执行
3. `updateContentCommand` —— 内容更新后执行
4. `postCreateCommand` —— 容器创建或重建后执行（最常用，装依赖）
5. `postStartCommand` —— 每次启动容器后执行（**短任务**，不要放 dev server 等长驻进程）
6. `postAttachCommand` —— 每次附加到容器后执行

> lifecycle 命令默认以 `remoteUser` 执行；需要 root 权限时（如 apt-get）用 `sudo`，官方镜像的 node 用户通常已配免密 sudo。

## 7. 常用 CLI 命令

```bash
# 在当前目录以 Dev Container 启动
devcontainer up --workspace-folder .

# 改了 devcontainer.json 后强制重建容器
devcontainer up --workspace-folder . --remove-existing-container

# 直接在容器内执行命令
devcontainer exec --workspace-folder . pnpm dev

# 用 VS Code 打开容器（从外部终端）
devcontainer open --workspace-folder .

# 构建并本地打 tag
devcontainer build --workspace-folder . --image-name ghcr.io/user/repo-devcontainer:latest

# 构建并推送（需先 docker login）
devcontainer build --workspace-folder . --image-name ghcr.io/user/repo-devcontainer:latest --push
```

## 8. Nuxt / Vite 项目特别注意事项

| 问题 | 原因 | 解决方案 |
|---|---|---|
| HMR 不生效 | bind mount 上 inotify 事件透传不可靠 | Vite 配置 `server.watch.usePolling: true` 或 `CHOKIDAR_USEPOLLING=true`；新版 Docker Desktop Vir
tioFS 通常无需额外配置 |
| 端口无法本地访问 | 未转发或只绑 127.0.0.1 | `forwardPorts` + Nuxt 配置 `devServer: { host: '0.0.0.0' }` |
| install 极慢 | `node_modules` 小文件经宿主机文件系统同步 | 用命名卷隔离 `node_modules` |
| pnpm 不可用 | corepack 未启用或权限问题 | 用独立脚本安装 pnpm |
| 文件权限混乱 | root 与 node 用户混用 | 统一 `remoteUser` 并加 `updateRemoteUserUID: true` |
| 编辑器卡顿 | VS Code 监听 `node_modules` / `.nuxt` | `files.watcherExclude` 排除这些目录 |

### Nuxt 配置示例

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: parseInt(process.env.NUXT_PORT || '5995')
  }
})
```

## 9. Docker Compose 模式速览

全栈项目有数据库/Redis 等 sidecar 时使用：

```yaml
# .devcontainer/docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
      - node_modules:/workspace/node_modules
    command: sleep infinity

volumes:
  node_modules:
```

```jsonc
// .devcontainer/devcontainer.json
{
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace"
}
```

## 10. 常见调试命令（在容器内）

```bash
# 确认 Node / pnpm 版本
node -v && pnpm -v

# 查看容器环境变量
env | grep NUXT

# 检查端口监听（Debian 精简镜像可能没有 ss，优先看 dev server 启动日志）
ss -tlnp | grep 5995

# 手动触发 post-create
bash .devcontainer/post-create.sh

# 验证原生模块是否能加载
node -e "require('better-sqlite3')" && echo "OK"

# 测试 HMR
touch app.vue
```

## 11. 容器内前端开发的三个反直觉陷阱

#### node_modules 卷隔离能让 install 提速 5–60 倍

macOS / Windows 上把项目 bind mount 进容器后，`pnpm install` 可能从几十秒膨胀到数分钟。机制在于宿主 APFS/NTFS 与容器 Linux ext4 经虚拟化层同步，每个小文件的元数据操作（
inode、stat）都要穿越两层；前端项目动辄几万个 `node_modules` 小文件，叠加后 I/O 成为瓶颈。把 `node_modules` 改为 Docker 命名卷（named volume）后，
文件落在 Docker 原生 ext4 上，inode 操作本地化，实测 install 可从约 2 分钟降到约 2 秒。代价是宿主 IDE 看不到 `node_modules`，
但在 VS Code Remote 连接容器的场景下编辑器也在容器内，影响很小；只有用宿主 IDE 直接编辑的人才需要权衡。源码仍走 bind mount 保持热同步，是最优组合。

见：[Improve disk performance - VS Code Docs](https://code.visualstudio.com/remote/advancedcontainers/improve-performance)

#### Vite HMR 在容器内不能光靠 usePolling

官方文档建议在容器内开 `server.watch.usePolling: true`，但 vite-plugin-ssr 的 Docker 文档明确提示：某些 Vite 版本（尤其底层 chokidar v3）单独设置该选项可能不生效，
需要同时配 `server.watch.interval`（如 300ms），以及把 `server.hmr.clientPort` 暴露到转发端口。更稳妥的全局开关是环境变量 `CHOKIDAR_USEPOLLING=true`（
chokidar 层级，覆盖 Vite 默认 watcher 行为），代价是 CPU 占用上升。新版 Docker Desktop 的 VirtioFS 已能透传 inotify 事件，多数情况下无需任何配置；
只有当仍出现热更新丢失时才回退到 polling。切忌用 `--cap-add=SYS_ADMIN` 这种偏方——它既不修复事件透传，又把近似 root 的 Linux capability 授予容器。

见：[Docker - vite-plugin-ssr](https://vite-plugin-ssr.com/docker)

#### inotify 监听器上限让大型项目热更新静默丢失

容器内同时跑 Vite、ESLint、TypeScript、Tailwind 等多个 watcher 时，容易触发 `fs.inotify.max_user_watches` 上限（Linux 默认 8192），表现为热更新不再触发、
控制台报 `ENOSPC` 或 watcher 启动失败。在原生 Linux 容器里可以用 `sysctl fs.inotify.max_user_watches=524288` 临时调大，
但 macOS / Windows 的 Docker Desktop 容器共享宿主/VM 内核，无法在容器内改这个值——要么在 Docker Desktop 设置里调，要么改用 polling。
这也是大型 monorepo 容器化时最容易被忽略的一类「看似随机」的热更新失效。

见：[Docker File Watching Is Broken in Containers](https://cr0x.net/en/docker-file-watching-hot-reload/)


