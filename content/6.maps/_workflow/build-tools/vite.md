---
title: Vite
description: Vite 前端构建工具的核心特性、插件机制和性能优化指南。
original_path: /_workflow/packer/vite.md
---

#### 如何配置 HTTPs 开发环境？

1. 设置 `server.https` 为 true
2. 安装 `vite-plugin-mkcert` 插件并创建实例添加到 plugins 中
3. 运行项目，系统会提示是否安装证书，选“安装”即可

如果不使用 vite-plugin-mkcert 创建证书，Chrome 不会显示有“忽略证书错误并打开页面”的“高级选项”按钮。

#### Vite 多 dev server 并发预构建会踩踏缓存目录

当同一项目需要同时启动多个 Vite dev server（例如主应用 dev server 与另一个使用不同 `root`、`mode` 或代理配置的辅助 dev server）时，
如果它们共享默认的 `node_modules/.vite`，依赖预构建阶段会先把产物写入 `node_modules/.vite/deps_temp`，完成后重命名为 `deps`。多实例并发下这个重命名会互相覆盖或锁失败，
浏览器请求被挂起，最终表现为 `504 Gateway Timeout`。

解决方式是通过 `cacheDir` 为每个实例指定独立缓存目录，并在脚本里用环境变量传入：

```js
// vite.config.ts
export default {
  cacheDir: process.env.CACHE_DIR || 'node_modules/.vite',
}
```

```json
// package.json
"dev": "vite --host --mode development --port 1756 --strictPort",
"dev-iframe": "cross-env CACHE_DIR=node_modules/.vite-iframe vite --host --port 1757 --strictPort --mode iframe-test"
```

每次只运行一个 dev server 时通常不会触发这个问题，因为默认缓存目录足以工作；只有在多实例并行且都触发依赖预构建时才需要隔离。

见：[Shared Options | Vite](https://v3.vite.dev/config/shared-options)

