---
title: Agent 沙箱的 Egress 管控
description: Agent 沙箱出口流量的受控 MITM、DNS 信任、协议边界与推理路由等进阶机制。
---

Agent 沙箱真正难的不是隔离计算，而是管控出口流量（egress）：Agent 生成的代码要立即运行、要调外部 API、要拿凭据。
Gondolin（microVM 沙箱）与 NVIDIA OpenShell（gateway 策略运行时）两个独立项目在这一问题上收敛到了同一组机制，
各自的边界与代价也值得记录。

#### Agent 沙箱的 Egress 收敛于受控可信 MITM

两个独立的 Agent 沙箱项目在出口代理上收敛到同一架构：沙箱启动时生成临时 CA 写进 guest 信任根，
出口代理先以 CONNECT 隧道接住流量，再终止 TLS 恢复明文，在明文层执行策略后自行向上游发起新的 TLS 连接。
凭据也走这条管道：guest 环境变量里只有占位符，真值由代理在转发前替换，秘密因此从不进入沙箱文件系统。
这一模式的关键失败模式发生在 TLS 终止失败时：OpenShell 选择 fail-closed，宁可断连也不退回裸隧道，
因为 fail-open 意味着占位符和未审计流量直接漏出。
评估任何沙箱 egress 方案的第一问，就是它 MITM 失败时是 fail-open 还是 fail-closed。
代价同样具体：MITM CA 私钥成为皇冠宝石，Gondolin 的 ca.key 落在 ~/.cache/gondolin/ssl/，
任何能读到它的进程都能伪造该 VM 信任的任意站点证书。

见：[OpenShell Network Policy Proxy - Zread](https://zread.ai/NVIDIA/OpenShell/12-network-policy-proxy)

#### Egress 策略的主机名锚点是 SNI 而非 DNS

按域名白名单管控出口时，DNS 应答本身不可信：沙箱内的恶意代码可以伪造解析结果，把 evil.com 解析成白名单主机的 IP 穿透策略。
Gondolin 的默认 synthetic DNS 模式干脆不发出真实 DNS 查询——所有主机名都解析到固定保留地址（192.0.2.1），
真实主机名由宿主机从 TLS ClientHello 的 SNI 扩展直接观测，策略以 SNI 为锚点，同时顺手堵死子域名编码式的 DNS 隧道外泄。
需要反查主机名的功能（SSH 出站、mapped TCP）依赖 per-host synthetic mapping，给每个域名分配独立合成 IP 维持双向映射。
针对 DNS 重绑定（检查时解析成公网 IP、连接时换成 127.0.0.1），Gondolin 在预获取策略检查和 undici 连接时 lookup guard
两处重复校验，堵住检查与连接之间的时间窗口。
推论是：凡以域名为主体的 egress 策略，主机名必须取自连接元数据（SNI、CONNECT 目标），而非解析结果。

见：[Gondolin TLS MITM 与 DNS 设计 - Zread](https://zread.ai/earendil-works/gondolin/13-tls-mitm-and-dns-design)

#### 绕过 MITM 的逃生门会让管控退回四层

受控 MITM 只覆盖能被它终止的流量，两类负载天然落在管道外：Gondolin 的网络中介只实现 HTTP/1.x，
gRPC 这类强制 HTTP/2 的负载在 MITM 点直接失败；做了证书固定（certificate pinning）的客户端拒绝代理现场签发的叶证书，
同样被断连。官方给出的替代通道是 mapped TCP 或 SSH 出站，但这类例外路径不经过 HTTP 钩子链——
没有 L7 方法级策略、没有秘密替换、没有请求审计，每开一条，egress 管控就从七层退回四层，
必须用精确的目标白名单（如 tcp.hosts）锁死。
OpenShell 有同构设计：按 endpoint 配置 tls: Skip 可关闭 TLS 终止（用于 mTLS 场景），代价同样是该 endpoint 失去 L7 管控。
给沙箱开逃生门前要先想清楚：这条通道上剩下的唯一防线就是目标地址本身。

见：[Gondolin Limitations](https://github.com/earendil-works/gondolin/blob/main/docs/limitations.md)

#### Inference 是独立于网络策略的执法域

OpenShell 把模型推理流量做成独立的执法域：沙箱内的 https://inference.local 是特殊端点，绕过 OPA 网络策略引擎，
走专门的 inference 拦截路径——剥离调用方凭据、注入后端凭据、转发到托管模型后端。
反直觉的后果是：网络策略全 deny 的沙箱照样能调模型，因为推理流量根本不经过网络策略管道。
策略判定还叠加 binary identity：首次见到某个发起进程的二进制指纹时按 Trust-on-First-Use 记录，
之后 agent 用 curl 伪装成已授权二进制调端点会被识别。
但 TOFU 的信任起点是首次使用——如果供应链投毒发生在沙箱首次启动之前，恶意二进制拿到的就是“合法身份”。

见：[OpenShell Sandbox Supervisor - Zread](https://zread.ai/NVIDIA/OpenShell/9-sandbox-supervisor)
