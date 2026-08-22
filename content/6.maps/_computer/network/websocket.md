---
title: WebSocket
description: WebSocket 的协议迁移现实：RFC 8441/9220 的实现矩阵与机会式触发条件链，实时通道的优化空间在应用层而非传输层版本
---

## 协议迁移

#### WebSocket 不随 HTTP 版本迁移

WebSocket 的底层传输至今仍停在 HTTP/1.1 时代。RFC 8441（2018）定义了 WebSocket over HTTP/2（Extended CONNECT），
Chromium 系自 91 版（2021 年）起默认启用，但触发是机会式的：必须已存在到该 origin 的 HTTP/2 连接、
服务端在 SETTINGS 帧中通告 ENABLE_CONNECT_PROTOCOL、且中间代理链支持 Extended CONNECT 转换，
三者缺一便静默回退 HTTP/1.1 Upgrade；Firefox 与 Safari 至今未实现。
HTTP/3 版本（RFC 9220，2022）更为早期，连 Chrome 也需要手动开启 flag，全线处于实验状态。
根源在于 WebSocket 的原始设计是握手后劫持整条连接（Upgrade），与多路复用模型天然冲突，
新版本只能以协商扩展的方式嫁接，缺乏强制迁移的协议杠杆。

工程推论是：面向浏览器的实时通道（语音、实时识别、协同编辑）不能指望升级边缘 HTTP 版本来加速 WebSocket，
跨浏览器没有确定性；Node 服务端栈的主流 WS 实现监听在 HTTP/1.1 Upgrade 路径上，
即使浏览器凑齐全部前提也走不上 h2。实时链路的传输优化空间在应用层韧性
——断线重连、会话恢复、上游超时管理——而非传输层协议版本。

见：[WebSocket Standards: RFC 6455, Extensions & Browser Support](https://websocket.org/standards/)
