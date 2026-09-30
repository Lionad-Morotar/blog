---
title: Electron 深链与桥
description: 自定义协议深链的三通道接入、恒等翻译、缓冲投递与壳站桥契约
---

#### 深链与自定义启动参数共用 argv 通道

应用自定义命令行参数（如环境切换）后，深链处理会与之打架：macOS 深链走 `open-url` 事件、不进 argv；
Windows/Linux 深链走 `second-instance` 事件的 commandLine，里面同时躺着自定义参数、Electron 内部参数
和深链 URL，「取最后一个元素」的官方示例写法在加入自定义参数后不再可靠。环境类参数解析必须容忍 argv
里混着协议 URL，且深链解析要在环境判定之后执行，否则一次从深链冷启动就会把应用带进错误环境。

见：[Launch app from URL in another app](https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app)

#### 深链三通道接入与桥契约单源

自定义协议深链从操作系统到壳主进程有三条通道：macOS 的 `open-url` 事件（热启动与冷启动都走它）、
Windows 热启动的 `second-instance` 事件 argv、冷启动的 `process.argv`，三路汇入同一个缓冲中枢。
协议注册在 dev 态（`electron .` 拉起，`process.defaultApp` 为 true）必须显式传可执行文件路径与应用
入口参数，否则系统登记的拉起命令指不回本应用。注册与 `open-url` 监听都必须在 app ready 之前：
官方文档明文「在 ready 事件里注册监听会错过触发启动的 URL」，冷启动拉起事件由系统在 ready 后重放。
桥契约（版本号、IPC channel 常量、payload schema）收进单一事实源文件，主进程与 preload 两端产物
消费同一份定义防字面量漂移；站点侧以 ambient 类型声明手工对齐，站点不 import 壳代码，桥是 preload
经 contextBridge 注入的运行时探测契约。

见：[Launch app from URL in another app](https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app)

#### 深链翻译的安全性由构造保证

自定义协议深链要翻译成站点 URL（scheme 换成 https、host 换成站点域名、路径原样带上），攻击面在
路径：`ai86:////evil.com/x` 这类输入若经相对 URL 解析，前导双斜杠会被重解为「协议相对 host」，
翻译产物就跨到了 evil.com。堵法在构造层：目标 origin 恒取环境映射表，深链内容永远不参与 host
构造，只赋给 URL 的 pathname——pathname setter 是字符串赋值加编码，不做协议相对解析，`//` 前缀
进不了 host；前导多斜杠再显式归一，双保险。scheme 判定要大小写不敏感：OS 拉起链路会原样透传用户
输入的大小写。

见：[URL: pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname)

#### 异步深链永远追不上站点的同步初始导航链，解法是会合

时间线：用户点深链 `myapp://chat/123` 冷启动应用，壳起窗并缓冲深链，站点开始加载。站点有一条
**同步**跑完的初始导航链（从 `/` 出发的全局中间件，含鉴权守卫），而深链消息要等站点 JS 订阅桥之后
经 IPC 异步补投——注定后到。鉴权守卫发现未登录会执行**外跳**（整个浏览器跳去登录页，文档死亡），
这个已发生的副作用不会因导航被作废而收回，文档死了之后任何「重定向到深链目标」都没有执行环境。
用户点了 123，最终站在登录页，全程无报错。解法是把「追」改成「等」：插件订阅桥时创建一个带未决
promise 的会合通道，全局中间件在根路径停在 `Promise.race([promise, 250ms 超时])` 上；深链补投到达
插件时不自己导航，而是 resolve promise 把目标递给中间件，由初始导航自己完成重定向，一跳落地，
鉴权守卫对目标正常执法。超时放行回落普通链路，迟到事件由插件 push 兜底。模式前提：此中间件须排在
鉴权中间件之前，靠 middleware 目录按文件名字典序扫描（Nuxt 明文承诺 modules 字母序，middleware
同理但未单列承诺）。

见：[Nuxt Route Middleware](https://nuxt.com/docs/4.x/directory-structure/app/middleware)

#### 事件缓冲系统的设计全在三个语义裁决里

主进程的深链中枢有两种模式：缓冲模式（订阅者未出现，事件先攒着）与实时模式（订阅者在线，直接下发）。
两态由不同事件驱动（订阅握手 vs 窗口销毁），中间必然存在「窗口正在死亡、状态还停在实时模式」的
瞬间——深链此刻到达，下发抛错。此时的选择：回填缓冲等下次补投，还是当作已投递丢弃。回填会把
**上一个窗口会话**的点击在**下一个会话**补投出来（跨会话串意图），销毁瞬间的失败常是连锁的，回填
会攒一批事件下次一起爆；裁决是按已投递处理、留日志丢弃。同族还有两个裁决：回放粒度取全量 FIFO
而非只留最新——每条深链都是一次独立点击意图，全量回放时顺序导航最终停在最后一条，恰好是最近意图；
容量超限逐出最旧，同理。做事件缓冲，「往数组 push」只要十行代码，设计全在回放粒度、淘汰方向、
失败处理三个语义选择里，选错任何一个，故障都表现为「偶尔怪」而非报错。

见：[IpcMain](https://www.electronjs.org/docs/latest/api/ipc-main)
