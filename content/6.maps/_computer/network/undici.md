---
title: undici
description: Node 官方 HTTP 客户端 undici 的协议演进：v7 选项化 h2、v8 默认化与 Node 捆绑节奏，及 pipelining 参数在 h2 连接上的配置陷阱
---

## 协议演进

#### undici 的 HTTP/2 支持是版本演进陷阱

undici 是 Node 官方从零重写的 HTTP 客户端，自 Node 18 起作为全局 fetch 的底层实现随运行时捆绑。
它的 HTTP/2 支持来得晚且默认关：v7 才引入 `allowH2: true` 选项（opt-in），
v8 翻转为默认开启并计划随 Node 26 进入运行时。在此之前，Node 18 到 25 的全局 fetch
即使面对支持 HTTP/2 的服务器也始终走 HTTP/1.1——实测 Node 24.15 与 25.9 捆绑的 undici 为 7.24.4，
默认 Agent 并未开启 h2，与浏览器 fetch 自动协商 h2 的行为并不等价。
过渡期要用 h2，需自行安装 undici 并以 `new Agent({ allowH2: true })` 之类配置替换全局调度器。

另一个暗坑藏在参数面：h1 时代的 `pipelining` 选项在 h2 连接上被复用为多路复用并发度上限
（H2CClient 直接把它别名到 maxConcurrentStreams），而 `pipelining` 的默认值是 1。
只开 `allowH2` 不调 `pipelining`，h2 连接会退化为串行单流；
「升级了协议却没有并发提升」是这一组合的典型表现。

见：[Undici 8 Tracking Issue](https://github.com/nodejs/undici/issues/4894)
