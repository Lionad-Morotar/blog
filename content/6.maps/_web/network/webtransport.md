---
title: WebTransport
description: 基于 HTTP/3 + QUIC 的下一代 Web 双向通信技术
---

#### WebTransport API：基于 HTTP/3 + QUIC 的下一代 Web 双向通信技术

WebTransport 是为解决 WebSocket 瓶颈而生的新一代实时通信 API，基于 HTTP/3 + QUIC 协议，
主打低延迟、高吞吐、高灵活性。

**与 WebSocket 的核心差异：**

| 特性 | WebSocket | WebTransport |
|------|-----------|--------------|
| 协议 | HTTP/1.1 Upgrade + TCP | HTTP/3 + QUIC (UDP) |
| 握手延迟 | TCP 三次握手 | 0-RTT/1-RTT，最快 100ms 内建立 |
| 传输模式 | 单一可靠流 | 可靠流 + 不可靠数据报，支持多路复用 |
| 队头阻塞 | 存在 | 无，单流阻塞不影响其他流 |
| 网络切换 | 断连需重握手 | 支持连接迁移，Wi-Fi 切 4G 不中断 |

**三大核心特性：**
1. **双重传输模式**：可靠流（保证有序不丢包）+ 不可靠数据报（极低延迟），可同时满足聊天消息和游戏位置更新的不同需求
2. **多路复用**：一个连接内多个独立流并行传输，视频流丢包重传不影响弹幕推送
3. **连接迁移**：基于 QUIC 的连接 ID 标识，网络切换时连接无缝迁移

**适用场景**：实时游戏、直播推流/拉流、实时协作工具；普通聊天场景 WebSocket 已足够。

见：[浅学 WebTransport API：下一代 Web 双向通信技术](https://www.zhangxinxu.com/wordpress/2026/03/webtransport-api/)
