---
title: AbortSignal
description: Web 平台的协作取消协议：信号的产生与组合、检查点响应、生命周期语义与取消的分布式边界。
---

#### AbortSignal 是协作取消协议，不是强杀

AbortSignal 解决的问题是「一个已经交出去的异步操作，外部如何合法地叫停它」。协议是协作式的（cooperative
cancellation）：abort 只负责广播「该停了」，操作是否真停取决于它是否在检查点响应，不配合的代码收到信号也不会停。
它与异常不是同一个东西：abort 不是错误，而是一次性的单向状态广播，恰好以 promise rejection 的形式呈现；超时也不是
独立概念，只是取消的一种触发源。角色分工上，AbortController 是信号的产生端，abort(reason) 是唯一写入口，由调用方
持有；AbortSignal 是消费端的只读视图（aborted、reason），随参数流动，一个信号可以喂给多个操作，一次 abort 全部叫停。
abort reason 是「为什么取消」的载体，默认为 AbortError；throwIfAborted 是消费者在 await 边界把信号转为异常的标准
检查点动作；AbortSignal.any 与 AbortSignal.timeout 是两个内置组合器，分别做多源聚合与延时自爆。协议是 DOM Living
Standard 的一部分并已 Baseline，fetch、Stream、addEventListener、Axios 与 Node（17+）均已接入。

见：[AbortSignal - MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)：接口参考与取消、超时、组合示例

#### fetch 的两段式取消

取消只对「尚未完成」的部分有效：响应头已收到时 promise 已经 settle，无法回撤，但响应 body 的流式读取仍可以被
取消，此时会在读取环节抛出 AbortError，容易误判为「请求没发出去」。自定义异步 API 的标准响应姿势是检查点模式
（checkpoint）：在 await 边界调 signal.throwIfAborted()，或注册 abort 监听做回滚与清理；长循环应在每个迭代设检查点。
AbortSignal.timeout 触发的是 TimeoutError，与人为取消的 AbortError 可区分，用户通知策略可以分开设计。

见：[AbortSignal - MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)：接口参考与取消、超时、组合示例

#### AbortSignal.any：多取消源聚合

AbortSignal.any 把「用户取消 + 全局取消 + 超时」等多个取消源聚合成一个信号，任何一个源 abort 它就 abort，
reason 取第一个 abort 的源的 reason。注意组合信号从外部无法区分最终是哪个源触发的，需要区分时要在各源上分别
注册监听。AbortSignal.timeout(ms) 返回延时自爆的信号，等价于「控制器 + setTimeout + abort」的内置封装。

见：[AbortSignal: any() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static)：组合方法参考

#### Promise.race 超时是结果仲裁，不是取消

用 Promise.race([fetch(...), 超时 promise]) 做超时是最常见的错误姿势：race 只是抛弃了输家的结果，输家的请求仍在
后台完整跑完，连接占着、body 没读、服务器还在算，每次输掉一个就漏一个，慢查询场景下泄漏会累积。Promise 组合器
只做结果仲裁，不做资源回收；想让输家真正停止必须走 signal 通道：fetch(url, { signal: AbortSignal.timeout(5000) })，
或用 AbortSignal.any 把超时与用户取消组合。

见：[Promise.race, fetch and avoiding memory leaks](https://kgrz.io/avoiding-memory-leaks-timing-out-fetch.html)：race 超时模式下输家请求泄漏的根因

#### abort() 是客户端视图，服务器继续执行

abort() 触发的是客户端关闭连接并 reject promise，服务器那边这个请求继续执行，数据库事务可能已提交、扣款可能已
发生，abort 不会回滚任何已经发生的服务器侧行为；对非幂等 POST，用户「取消上传」后服务器可能已入库。abort 只
承诺「客户端不再等」，不承诺「什么都没发生」，后果敏感的操作要靠幂等键或服务器自己的取消机制兜底。

见：[fetch() Timeout: AbortSignal.timeout and AbortController](https://techearl.com/fetch-timeout-abortcontroller)：取消的客户端与服务器语义边界

#### abort 监听器会钉住 any 与 timeout 信号

AbortSignal 的回收语义有个反直觉分界：controller 拥有的信号即使挂着 abort 监听器也能正常回收（controller 不可达后
事件不可能再触发，浏览器允许断开引用），而 AbortSignal.any 与 AbortSignal.timeout 返回的信号会被挂在它上面的
abort 监听器钉住，因为它们的触发时机由定时器或源信号决定，浏览器无法证明事件不会再来。{ once: true } 救不了这种
泄漏：once 的语义是「事件触发后移除监听器」，而事故场景恰是 abort 从未发生，请求正常结束、源信号没 abort，事件不会
来，once 永远不生效。典型现场是全局 AbortController 加每次请求用 AbortSignal.any 建组合信号，监听器与整棵组合信号
树在全局信号可达期间越积越多。唯一正确清理是在 finally 里 removeEventListener，无论成败都摘除。

见：[AbortSignal - MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)：生命周期与 GC 语义（Removing the abort event listener 章节）

#### AbortError 是错误监控里的头号噪声大户

用户切页面、路由跳转、组件卸载触发的 fetch abort 会以未捕获 rejection 的面目进入错误监控，不处理能吃掉大量错误
配额。但不能一刀切过滤：AbortError 名字底下混着三种语义，人为取消（正常）、超时（TimeoutError，名字不同，是真
问题）、以及被 abort 掩盖的真实网络故障。Sentry 的 Inbound Filters 只做基础降噪，工程姿势是在 beforeSend 里按
「是否有对应 controller 的取消意图」区分：自己的取消代码 catch 后静默，裸奔到全局 handler 的 AbortError 才是信号。

见：[How to Filter Noisy Sentry Events Before Ingestion](https://oneuptime.com/blog/post/2026-09-14-filter-sentry-noise-before-ingestion/view)：AbortError 过滤的分层判据（2026-09）