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

## 优化

* [Nuxt](https://dev.to/jacobandrewsky/improving-performance-of-nuxt-with-fontaine-5dim)
