---
title: Electron 受控下载
description: 壳代下载的守卫链、SSRF 双层防线与反馈预算契约
---

#### 壳代下载的形态：显式桥请求而非拦截一切下载

壳替站点下载文件有两条路径：session 级 will-download 事件拦截渲染进程的一切下载，或站点经桥显式请求、
壳负责安全拉取。受控场景选后者：拦截面拿不到业务意图与建议文件名，也无法只对特定请求执法；纯 web 环境
回落 `a.download`，两态并存。协议设计上壳不维护会话态：请求 id 由站点生成（如 `crypto.randomUUID()`），
壳把全部状态经同名 id 的进度事件回报，四态 downloading/completed/failed/cancelled，终态每请求恰好一条。
守卫链与通知通道同构（sender 身份、payload 契约、发起帧 URL 复核，主窗内第三方 iframe 共享桥注入面须按
帧 URL 复核），另加一道并发闸：在途名额满员直接拒绝不排队，排队会把多个大文件内存缓冲攒成放大面。对话框
预置文件名是攻击面：剥离路径分量与控制字符，防预置路径穿越。

见：[Security Recommendations](https://www.electronjs.org/docs/latest/tutorial/security)

#### SSRF 的 URL 白名单只挡直连，盲区在重定向与 DNS 解析

场景：校验函数确认 hostname 落在可信域后发起请求，攻击者借可信域上的开放重定向端点让响应 302 指向云
元数据地址或内网服务，请求方自动跟跳，第二跳不经过任何校验。OWASP SSRF 防护清单明文要求关闭客户端对
重定向的自动跟随来堵这类输入校验绕过；堵法是手动跟跳（`redirect: 'manual'`）并在每次跳转前重跑完整
校验。第二层盲区在解析：可信域 DNS 劫持或 rebinding 后 hostname 白名单毫无感知，校验必须做到「解析
之后」，对解析出的每个 IP 过保留段黑名单（回环/私网/链路本地/CGNAT/组播）。URL 层与解析层是互补的
两道：前者挡协议与域，后者挡「可信域解析到不该去的地方」。

见：[OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)

#### BlockList 混族误命中与 mapped-v6 绕过是同一堵法的两面

Node 的 `net.BlockList` 无论 `check()`/`addSubnet()` 传什么 family 参数，内部都把地址统一成
IPv4-mapped IPv6 表示比较：v4 与 v6 规则混在一张 list 时，v4 公网地址会被 `::ffff:0:0/96` 这类
v6 规则误命中（阻断所有出站 v4 的假阳性）。反方向是攻击面：`::ffff:127.0.0.1` 这类 mapped-v6
字面量可绕过只建 v4 黑名单的检查（多个 CVE 的成因）。两头堵法同构：v4/v6 拆成两张 list，按地址
含不含冒号路由，v6 那张里显式收编 `::ffff:0:0/96`，mapped 形态自然落进 v6 桶被拦。

见：[SSRF blocklist false-positive issue](https://github.com/Termix-SSH/Support/issues/1024)

#### fire-and-forget 的持久反馈由首帧证据驱动，不是请求发出时

场景：站点点击下载后立刻弹「正在下载」持久提示，而请求实际被守卫静默丢弃（不可信来源不回投任何事件），
没有终态事件来撤提示，残留直到页面刷新。契约解法：持久 UI 的创建时机绑在「首个 downloading 事件到达」
而非请求发出，壳不回事件即未受理，天然无残留可撤。终态语义四分：completed/failed 撤下持久提示并各补
一条终态提示；cancelled 静默，用户自己在另存为对话框点的取消，再弹提示是打扰。失败折叠为领域事件回投
（附截断后的可读原因），请求方自行渲染，服务侧不弹错误框。进度刷新若用撤旧发新，注意双层节流（发送侧
按最小间隔投递 + 展示侧二次节流）防高频重建闪烁；另据 vue-sonner 官方文档，以 `{ id }` 复用调用可
原地更新既有 toast 内容，撤旧发新并非唯一路径。

见：[vue-sonner](https://vue-sonner.vercel.app/)

#### 下载预算的三道边界：声明可撒谎、重定向可叠加、并发可放大

Content-Length 是发送方的声明不是保证：可以虚报小值骗过声明检查后流式涨大，或干脆不给。体积限制要双
上限：声明超限直接拒（不读 body），流式聚合逐块查累计、超限先取消读取再报错。超时同理：写成「每跳独立
计时」的话，恶意端点用重定向逐跳拖满就线性叠加（如 30 秒一跳、5 跳上限即 150 秒资源占用），正确形态
是整体预算：起点一次定死截止时刻，每跳的超时信号只发剩余额度（`AbortSignal.timeout(剩余毫秒)`）。
并发上限满员拒绝不排队：下载占内存与对话框资源，排队等于把放大面攒在内存里，拒掉让用户稍后再试比攒着强。

见：[AbortSignal.timeout()](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout)
