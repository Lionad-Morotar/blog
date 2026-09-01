---
title: Vitest
description: Vitest 测试框架进阶知识，涵盖 server.deps 内联与外置机制、mock 传导与版本迁移陷阱。
---

#### inline 与外置的判定基于完整文件路径

Vitest 默认把 moduleDirectories（通常是 node_modules）内的文件外置（external），交给 Node 原生加载，
其余一律 inline 走 Vite 转换管线。`server.deps.inline` / `external` 的字符串值会先被规范化为
`/node_modules/<name>/` 前缀，再对模块的完整文件路径做匹配，RegExp 则直接匹配完整路径。
外置模块不进入 module graph，连锁后果是：文件变更不触发 watch 重启，Vite 插件、alias、define
对其无效，`vi.mock` 也无法拦截。

这个判定方式在 monorepo 里有个反直觉表现：被 link 的 workspace 包真实路径不在 node_modules 下，
默认就被自动 inline，所以测试“刚好能跑”；但反过来想用字符串 `@scope/pkg` 显式 inline 或
external 它时，规范化后的前缀与真实路径对不上，配置会静默不生效。正确做法是改用 RegExp 匹配，
或把包目录加入 `deps.moduleDirectories`。

见：[server | Config | Vitest](https://vitest.dev/config/server)

#### mock 传导到第三方库内部需要 inline 该库

Jest 默认会把模块 mock 扩展到使用了该模块的外部库，Vitest 不会。典型失败场景是
`vi.mock('axios')` 之后，业务代码里的 axios 被替换了，但某个内部同样引用 axios 的第三方 SDK
依然发出真实请求——因为外置的 SDK 由 Node 原生加载，mock 注册表管不到它。要让 mock 传导进去，
必须把这个库加入 `server.deps.inline`，让它成为 module graph 的一部分，
走同一条被 mock 拦截的加载路径。

见：[Migration Guide | Vitest](https://vitest.dev/guide/migration.html)

#### Vitest 4 只认 server.deps.*

顶层 `test.deps.inline` / `external` / `fallbackCJS` 在 Vitest 4 已被移除，
必须改写为 `server.deps.*`。网上大量旧教程和问答仍使用 `deps.inline` 写法，
照抄到 v4 项目里配置不会生效。同一轮改造中底层从 vite-node 切换为 Vite 官方的 Module Runner，
环境变量 `VITE_NODE_DEPS_MODULE_DIRECTORIES` 随之改名为 `VITEST_MODULE_DIRECTORIES`，
依赖该变量的脚本也要同步更新。

见：[Migration Guide | Vitest](https://vitest.dev/guide/migration.html)
