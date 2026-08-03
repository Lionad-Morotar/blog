---
title: Nuxt
description: Nuxt 是一个基于 Vue.js 全栈框架
original_path: /maps/_fe-framework/nuxt/nuxt.md
---

## 模块

* [Nuxt Security](nuxt-security): 自动通过使用 HTTP 头和中间件配置您的应用程序遵循 OWASP 安全模式和原则。

## 实践

* [开发效率提升 50% 以上，爱奇艺官网主站的 Nuxt 实践](https://xie.infoq.cn/article/d07a41f7f19ee210e3838af73)

#### Nuxt 3 与 Nuxt 4 混装时的报错具有误导性

当 Nuxt 3 项目因模块解析污染意外加载到 Nuxt 4 时，崩溃点往往出现在 Nuxt 4 的 `initNuxt` 读取
`nuxt.options.server.builder` 处，而 Nuxt 3 的配置对象没有该字段，于是报错变成
`Cannot read properties of undefined (reading 'builder')`。
这条消息没有指向版本冲突，容易让人误以为是配置缺失或类型错误。排查时应优先确认运行时实际加载的 `nuxt` 包路径，而不是被报错位置带偏去检查 builder 配置。

见：[shushi.86links.com commit d07358b](https://gitee.com/ChinaLinks/shushi.86links.com/commit/d07358b)

#### NUXT_ 前缀环境变量在运行时覆盖 runtimeConfig

Nuxt 约定以 `NUXT_` 前缀的环境变量自动覆盖 `runtimeConfig` 中已声明的同名 key：camelCase 的 key 对应
SNAKE_CASE 的变量名（`apiSecret` ↔ `NUXT_API_SECRET`），`public` 命名空间对应 `NUXT_PUBLIC_` 前缀
（`public.apiBase` ↔ `NUXT_PUBLIC_API_BASE`）。覆盖在服务器启动时生效，无需重新构建，同一份构建产物可以
靠注入不同环境变量部署到多个环境。只有预先在 `nuxt.config` 的 `runtimeConfig` 中声明过的 key 才会被匹配
覆盖，未声明的 `NUXT_` 变量不会凭空出现在配置里。普通无前缀的环境变量不参与该机制，只能在服务端代码里
通过 `process.env` 手动读取；客户端代码中的 `process.env` 在构建时被静态替换，拿不到运行时值。Nitro 层另有
一套平行的 `NITRO_` 前缀，用于覆盖 Nitro 自身配置。

见：[Nuxt Runtime Config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

#### NUXT_PUBLIC_ 变量的值会随 payload 暴露到浏览器

`runtimeConfig.public` 下的值会被序列化进 HTML payload 发往客户端，因此 `NUXT_PUBLIC_` 前缀的环境变量
本质上是公开信息。密钥、令牌等敏感值应放在 `runtimeConfig` 的私有 key 中（仅服务端可用），不能图方便塞进
`public`，这是 Nuxt 应用密钥泄露的高发点。

见：[Nuxt Configuration](https://nuxt.com/docs/4.x/getting-started/configuration)

## 优化

* [Nuxt](https://dev.to/jacobandrewsky/improving-performance-of-nuxt-with-fontaine-5dim)
