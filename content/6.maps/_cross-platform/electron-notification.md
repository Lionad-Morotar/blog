---
title: Electron 通知桥
description: 主进程通知守卫链、增量通知基线播种与轮询挂载义务归属
---

#### 桥上通知能力：主进程通知与 fire-and-forget 语义

壳给 Web 应用补系统通知能力，惯用形态是桥上加一个通知命名空间：站点调用 `notification.show({title,
body, tag})`，preload 白名单透传主进程，主进程构造 Notification。选主进程通知而不是站点直接用 Web
Notification API，是因为主进程通知不受页面生命周期与会话权限态约束，且壳能在转发路径上做来源校验与
限流，Web 通知做不了这两件事。桥通知是 fire-and-forget（发射后不管）语义：投递结果不经桥回传，失败
不打断站点主流程，畸形调用静默丢弃也不向站点回抛错误，通知是信号面，不值得让站点为它写错误处理分支。
点击通知的语义收窄为「聚焦或重建主窗」，落地路由是深链的职责，通知不越界。契约演进上，新增桥命名空间
算 minor 版本（旧站点探测不到新命名空间自然跳过），改既有 payload 形状才算 major。一个联动细节：
payload 超出契约长度（如 title 上限）会被壳侧校验静默丢弃且永不补投，发送方要自我截断保投递，而不是
信任守卫替你兜底。

见：[Notification](https://www.electronjs.org/docs/latest/api/notification)

#### IPC 频道没有 ACL，契约校验必须在终点消费处再做一次

先立一个事实：Electron 的 IPC 频道没有访问控制，任何渲染进程都能向任意 channel 名发送消息，channel
名在产物 bundle 里可见。preload 里的 payload 校验管的是走桥的正规调用，而渲染进程被 XSS 攻破后，
攻击者拥有进程内任意执行能力，可以绕过桥直接构造 IPC 消息，payload 想塞什么塞什么。所以「preload
校验过」不构成信任终点，契约校验必须在信任链最后一环（ipcMain 消费处）重做，这一层的假想敌不是
「站点代码写错」，而是「渲染进程已被攻破」。纵深防御的闸门各挡一类：sender 身份闸只认桥注入面的宿主
窗口，其他窗口与 iframe 不在受信面；契约闸挡畸形包；来源 URL 白名单加限流闸挡「可信域页面被攻陷后的
能力滥用」。限流用滑动窗口（固定时长内计数），超限的新通知整体丢弃而不是排队，通知是时效信号，积压
补发是骚扰；不可信源的请求不占限流名额，限流防的是失控流量，不是做配额分配。

见：[Security Recommendations](https://www.electronjs.org/docs/latest/tutorial/security)

#### 增量信号系统的第一轮不是发增量，是建基线

场景：用户已有 30 条存量未读消息，此刻应用启动、轮询开始，若逻辑是「轮到未读就弹」，首轮就弹 30 条
旧消息，通知从信号变成骚扰，用户的下一反应是关掉通知权限。解法是首轮只拉列表、把存量 id 记入已见
集合、一条不弹，这叫建基线；之后总量增长且 id 未见才弹。三个边界情形各有对应，漏一个就出事故：总量
回落（用户读掉几条）时不弹，但仍要把当前列表 id 记入已见，否则「已读、被重推、又变未读」的旧消息会
回弹；换账号要在登录起点重建总量基线与已见集合，否则新账号的存量未读会被上账号的基线误判为新增；
批量风暴（一轮涌入多条）时单轮截断只弹前几条，超额的记为已见但不滚存到下轮，下轮拉的是最新列表，
滚存反而会弹旧条目。判重以消息 id 为本、不以总量增量计算：总量会因已读、软删回落，已通知过的 id
永不重弹。消息中心是完整清单，通知只是信号，宁可少弹不可错弹。

见：[Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

#### 单例 composable 的定时器绑在第一个消费者身上，常驻义务要挂应用级

VueUse 的 composables（`useIntervalFn`、`useEventListener` 这类）在组件卸载时自动清理，机制是内部
绑定了组件的 effectScope（副作用作用域，scope 停止时其内的副作用整体清理）。`createSharedComposable`
的实现是首次调用时在一个 effectScope 里创建实例、之后所有调用者共享同一实例，于是单例内部的定时器
被绑在第一个调用它的组件的 scope 上。事故时间线：轮询单例最初被页面 A 的组件消费（比如页面读轮询
状态画徽标），用户离开页面 A，组件卸载、scope 停止，单例里的轮询定时器被清掉，轮询静默停摆，其他
消费方毫无感知、没有任何报错。选挂载点按义务寿命判：义务寿命等于应用寿命的（登录后常驻的轮询、全局
连接）挂应用级，Nuxt client plugin 跑在 nuxtApp 的应用级 scope 里，随应用常驻不随组件卸载；寿命
等于组件寿命的才挂组件，composable 自己退化为纯组装层由插件驱动。顺带一个杠杆：`useIntervalFn` 的
interval 参数接受 ref，退避时改 ref 值即生效，不用拆掉重建定时器。

见：[effectScope](https://vuejs.org/api/reactivity-api.html#effectscope)

#### 主进程通知没有 Web 的 tag 替换语义，要确定性替换就得自己补

浏览器的 Web Notification API 有 tag 字段：同 tag 的新通知会把旧的替换掉而不是堆叠，OS 级去重
语义，适合「同一会话的新消息提醒替换旧提醒」。Electron 主进程的 Notification 没有这个语义字段：
新版有 id（macOS 映射 UNNotificationRequest identifier、Windows 映射 toast 的 Tag）和 groupId，
但文档只说「映射」，不承诺同 id 自动替换、更不承诺跨平台行为一致。壳要确定性的替换观感只能自建：用
`Map<tag, Notification>` 存已展示的通知，同 tag 新通知到达时先 `close()` 旧的再展示新的。`close()`
在部分平台是异步 best-effort（Windows 上可见时收起、已消失时尝试清通知中心），失败用 try/catch 吞掉，
不能影响新通知展示；映射设容量上限、逐出最旧，防长期驻留无限生长。补一个可观测性事实：macOS 通知
底层 UNNotification API 要求应用已签名，未签名二进制的通知被系统静默丢弃，官方文档明文此时会触发
`failed` 事件；不监听它，签名资质到位前的通知丢失完全不可观测。

见：[Notification](https://www.electronjs.org/docs/latest/api/notification)
