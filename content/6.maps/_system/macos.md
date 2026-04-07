---
title: macOS
description: macOS 系统知识与实践经验
---

#### AWDL 导致 Mac WiFi 速度暴跌

Apple 的 AWDL（Apple Wireless Direct Link）是为 AirDrop、AirPlay 等设计的私有 WiFi 增强协议，但它会严重拖累常规网络性能。实测中，两台 Mac（Sonoma 桌面端与 Tahoe 笔记本）在同网络下的 WiFi 速度仅有 80-160 Mbps，而 Android 手机却能跑到 1.1 Gbps——更诡异的是，开启 NordVPN 后 Mac 的速度反而恢复正常。

AWDL 的干扰在路由器 5GHz 信道使用 160MHz 带宽并配合 DFS（动态频率选择）时尤为明显。一个有效的缓解方案是将路由器 5GHz 设置改为 80MHz 固定带宽，并锁定信道 44（欧洲地区）或 36（欧洲以外）。AWDL 本身是系统守护进程，很难彻底永久关闭，因为它会不断自动重启。

见：[Fixing my slow Mac network speeds](https://remysharp.com/2026/03/26/fixing-my-slow-mac-network-speeds)：Remy Sharp 的排查记录
