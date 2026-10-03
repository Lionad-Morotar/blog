---
title: 结构化并发
description: 结构化并发模型与 Effection：Await 事件视界、生命周期三原则、v4 调度与 API 收敛，及与 cordis 的分界
---

#### 结构化并发：把内存作用域模型搬到异步世界

结构化并发（Structured Concurrency）把「内存生命周期绑定函数作用域」的既有模型搬到异步世界：并发生命周期构成一棵树，
子操作不能活得比父久，每个操作要么返回结果要么抛错、且完全退出。它解决的核心问题是 JS 里「异步操作的清理不保证运行」：
同步世界的 try/finally 足够，异步世界的 finally 会静默失守，常见的 EADDRINUSE 就是进程退出时清理没跑的症状。

失效的机制在于 Await 事件视界（Await Event Horizon）：async 函数一旦 await，控制流不可逆地交出，恢复点被注册成被等待
promise 的 then 回调，promise 不 settle 恢复点就永不执行；而 settle 只能由创建它的闭包触发，调用方手里的 promise 只是
订阅凭证（then/catch/await 全是读），不是控制柄，没有 cancel 这样的写入口。因此 while(true) 不是僵尸任务的成因，任何
await 点都是：单发竞态晚到覆盖缓存、线性事务半路弃单、Promise.all 的 fast-fail 不取消其余成员，都不需要循环。

心智转换是从「异步操作要跑多久就跑多久」改为「异步操作只在需要时才活」：清理不由使用者负责，而由结构负责。JS 里承载
这个模型的代表是 Frontside 的 Effection（4.x，2025-12 发布 4.0）：操作（Operation）用生成器函数书写，生成器委托
（yield*）取代 await，把「是否恢复」的开关从事件源手里移到运行时手里，要中断子任务时运行时不再调它的 next()，转而
驱动它的 finally/ensure，挂死的 await 在这个世界里不存在。一切操作归结为三个原语：action（手动 resolve 的最低层
原语）、resource（setup/teardown 对称封装）、spawn（树上开子任务），常用组合件有 all/race/sleep/ensure/call。

```js
// Promise 世界：僵尸轮询，finally 永远等不到执行机会
async function poll() {
  let timer;
  try {
    while (true) {
      await fetch("/api/status");
      await new Promise((r) => { timer = setTimeout(r, 5000); });
    }
  } finally {
    clearTimeout(timer);
  }
}

// Effection：父任务结束，子循环被强制终止，子任务内的 finally/ensure 照常执行
yield* spawn(function* () {
  while (true) {
    yield* sleep(5000);
  }
});
```

与 AbortSignal 的分界：AbortSignal 是点对点的取消信号，没有生命周期树，也没有「子先于父退出」的结构保证，取消的
覆盖面取决于每一环是否自觉接了 signal，漏接一环就断链。它是逐点打补丁，Effection 是换控制流载体。

见：[Thinking in Effection](https://frontside.com/effection/docs/thinking-in-effection)

#### v4 调度父优先：spawn 的子任务不再立刻跑

v3 中 spawn 一执行子任务立刻运行，哪怕父任务还在跑同步代码；v4 反转为父任务永远优先，子任务要等父让位给一个真正
异步的操作（如 sleep）才有机会启动，纯同步代码即使包在 yield* call() 里也不让位。升级指南的示例里，spawn 后跟一段
同步循环：v3 的 child: start 插在 parent: middle 之前，v4 被推到 parent: before async 之后。若 v3 代码依赖「spawn
返回时子任务已开始执行」，升级后静默失效，补救是显式 yield* sleep(0) 让位，或把父子关系改成共享 scope 的兄弟任务。
注意子任务一旦启动，它自己挂起的定时器到期即恢复：示例中 child 的 sleep(10) 仍先于 parent 的 sleep(100) 到期，
child: end 在两个版本里都先于 parent: end 打印（官方指南两段输出的末两行顺序与 Node 22 实测不符，本机 effection
4.2.0 与 3.6.1 均复现）。

```js
await run(function* example() {
  yield* spawn(function* () { yield* sleep(10); });
  for (let i = 0; i < 1000; i++) {} // 纯同步段：v4 期间子任务不会插入执行
  yield* sleep(100); // 子任务在这里才第一次获得运行机会（v4）
});
```

见：[Upgrading from V3](https://frontside.com/effection/guides/v4/upgrade/)

#### v4 的 API 收敛：call 缩权、action 对齐 Promise 与 await using

v3 的 call() 身兼五职：调函数、求值 promise、常量当 operation、错误边界、并发边界；v4 只保留第一项，它就是
Function.prototype.call 的异步版。promise 转 operation 用 until()，常量用 constant()，结构化边界必须显式用 scoped()
建立。判断依据：你不会期望一个普通函数调用拥有作用域边界。失败场景：call 的 operation 里 spawn 的后台任务，v3 会在
call 返回前后台任务被收掉，v4 里它会活着穿透 call 边界继续跑。

action() 则向 new Promise() 对齐：v3 是 generator 形式配 suspend() 与 try/finally；v4 是同步函数接收 resolve/reject、
返回同步清理函数，且不再自建并发或错误边界。此外 Task 和 Scope 实现了 Symbol.asyncDispose，可接入显式资源管理
（Explicit Resource Management）的 await using 语法，离开块作用域时 task 自动 halt，结构化并发的边界由此对接进
语言标准的资源管理协议。

```js
yield* call(function* () { yield* spawn(bg); return "done"; });   // v4：bg 泄漏过边界
yield* scoped(function* () { yield* spawn(bg); return "done"; }); // bg 在返回前被终止
await using task = run(function* () { yield* suspend(); });       // 离开作用域自动 halt
```

见：[Upgrading from V3](https://frontside.com/effection/guides/v4/upgrade/)

#### cordis 的 fiber/effect 与 Effection 的分界

DeepSeek Harness vendor 的 cordis（cordiverse/cordis 4.0）与 Effection 同属一族但切面不同：cordis 解决「结构化清理」
与资源安全，模型是副作用的登记与冲销。Fiber.effect() 注册副作用时收集清理函数，fiber 卸载时按 LIFO 逆序执行，无论
正常退出、故障还是显式释放；Context/Fiber 构成生命周期树，父卸载子全部回收，官方哲学文档自比 Rust 所有权机制
（语言层强制 vs 应用层非强制）。Effection 解决「结构化并发」，模型是控制流接管。分界在两组对照：中断语义上，cordis
是协作式的，异步迭代器 effect 靠 epoch 守卫在当前 await 之后才检查到卸载，若那个 await 永不返回，清理就永远堵在
那里；Effection 是侵入式的，挂起的操作被整体放弃、teardown 立刻执行。问题域上，cordis 的主业是插件元框架（依赖
注入、waterfall 事件分发、热重载），生命周期是支撑手段；Effection 的主业就是并发控制流本身。判据：问「插件卸载时
注册的监听器会不会被回收」是 cordis 的领地；问「飞行中的异步操作能否被强制停下并跑完清理」只有接管控制流的
Effection 能答。

见：[可逆的插件系统 | Cordis](https://cordis.moe/zh-CN/guide/philosophy/disposable.html)
