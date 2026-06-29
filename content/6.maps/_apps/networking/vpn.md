---
title: VPN（Virtual Private Network）
description: VPN 是一种通过公共网络建立私人网络的技术。
original_path: content/6.maps/_apps/vpn.md
---

在家里有时要连公司内网查点资料，这时会用到 VPN。这里记录一些 VPN 的使用方法和相关知识。

有关 SS/SSR 相关的东西，都会记录在这篇 Memo 中。

## 自定义规则 Pac/UserRule

### 语法

| 规则  |             说明             |             示例              |
| :---: | :--------------------------: | :---------------------------: |
|  `*`  |       通配符（可省略）       | *.baidu.com 全等于 .baidu.com |
|  `|`  |   匹配字符串开始（和结束）   |       \|www.lionad.art        |
|  `\`  |     正则开始（正则结束）     |      \\[\w+].baidu.com\\      |
| `@@`  | 规则过滤（满足则不使用代理） |          @@baidu.com          |
|  `!`  |             注释             |             !#//              |

## WireGuard

#### 无连接设计的 NAT 代价

WireGuard 不维护“连接”状态，有数据包时才做加密握手，静默期间几乎不交换任何信息，这正是它比传统 TLS VPN 省电的原因。
但 stateful firewall 和 NAT 路由器依赖持续流量维持映射表，一旦长时间没有应用数据，外部 peer 的入站包会被路由器丢弃。
因此配置文件里才有 PersistentKeepalive 选项：由 NAT 后方的设备主动周期性发包，人为延续映射。
这同时说明 WireGuard 本身只是加密传输原语，动态 IP、漫游、中继都需要外部协调层补全。

见：[WireGuard Quick Start](https://www.wireguard.com/quickstart/)

#### 公钥即身份，没有 PKI

WireGuard 的 peer 认证不依赖 X.509 证书链或证书颁发机构，而是直接在本地配置里写入对方 Curve25519 公钥与 allowed IP 前缀的映射。
连接建立时，数据包携带的公钥必须匹配本地白名单，否则静默丢弃。
这种设计去除了 CRL、OCSP、证书过期等复杂度，但也把密钥分发、轮换、撤销、设备生命周期管理完全推给外部系统。

见：[WireGuard: Next Generation Kernel Network Tunnel](https://www.wireguard.com/papers/wireguard.pdf)

#### AllowedIPs 同时是路由表和防火墙

WireGuard 采用 cryptokey routing：读取出站包的目的 IP，在 allowed IPs 列表里找到最长前缀匹配的 peer，再用该 peer 的公钥加密发送；
入站时则检查源 IP 是否在该 peer 的 allowed IPs 内，否则丢弃。
这意味着 allowed IPs 同时承担了“路由决策”和“反欺骗过滤”两个职责。
工程上常见错误是把 0.0.0.0/0 配给所有 peer 导致路由冲突，或忘记把对端子网加入 allowed IPs 导致握手成功但流量不通。

见：[WireGuard Cryptokey Routing](https://www.wireguard.com/#cryptokey-routing)

#### 内核态与用户态的实现鸿沟

Linux 5.6 起 WireGuard 是内核模块，数据包在内核空间完成加密和解密，延迟和吞吐最优；
但 macOS、Windows、iOS、Android 官方实现是 wireguard-go 等用户空间程序，需要把数据包从内核拷贝到用户态处理。
这导致跨平台性能、电池续航、NAT 漫游行为并不一致，上层 overlay 需要在不同操作系统上做不同的路径选择、打洞策略和电池优化。

见：[WireGuard Cross-Platform Userspace Implementation](https://www.wireguard.com/xplatform/)

## 一些开放平台

* [Glados](https://glados.rocks/console)
* [PaofuCloud](https://paofu.cloud/user)
