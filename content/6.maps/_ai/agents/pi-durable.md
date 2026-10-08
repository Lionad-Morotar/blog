---
title: Pi Durable
description: Earendil 的持久化 Agent Harness 库：先落盘再展示的事务内核、崩溃恢复的副作用分级、fork 指针语义与持久化折衷边界。
---

Pi Durable 是 Earendil 2026 年 10 月随 Pi 1.0 发布的实验性 TypeScript 库（@earendil-works/pi-durable），
面向长时运行、可崩溃恢复、可多端协作的 Agent 应用。它不替代 Pi 编码代理，而是把 harness 定义为
「存储 + 并行运行多对话的机器 + 工具 + 执行环境」四件套，第一性原理是一切变更（transcript 条目、文档、
任务）走同一个原子提交，先落盘再展示。与 Temporal/DBOS 这类工作流引擎的分界在于它是库而非平台：
单进程拥有存储、无跨进程锁，多客户端只能 attach 到属主进程；沙箱与执行环境 BYO（bring your own），
不是一等公民。checkpoint 恢复的只是 harness 内部状态而非外部世界（VM、浏览器、文件系统），
「agent 以为翻到第 5 页、沙箱还在第 0 页」的错位要靠工具级幂等与声明式交互自行堵住。源码约 15k 行，
自带 memory/SQLite/JSONL 三种存储后端与一致性测试套件，存储核不依赖 Node API，
可运行在 Bun 或 Cloudflare Durable Objects 上。

见：[Pi Durable | Earendil](https://earendil.com/posts/pi-durable/)

#### 崩溃恢复按 replay 声明分流副作用

每次模型请求、工具调用与 compaction 都是 durable 任务，每步先存 checkpoint 再执行，新进程打开同一存储后
resume() 从各任务最后检查点继续。工具按声明分流：replay: "safe"（纯读）崩溃后自动重跑；未声明则不重跑，
模型收到 interrupted 错误结果并附上崩溃前已提交的部分输出，裁决权交给模型。hook 的决策写入 memo
（首写胜出），重启后不再重复询问审批人；非 replay-safe 调用被崩溃打断时，它拥有的子任务（如子 agent）
连带 abort。

见：[pi-durable README](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md)

#### requestId 的 exactly-once 只是提交层幂等去重

同一 requestId 重试会返回已存在的 submission 而非重复提交，这是提交层的去重，不是端到端 exactly-once
效果。跨系统副作用仍要工具自备幂等键：官方支付示例里 bank.charge 用 payment-${task.id} 作幂等键，
崩溃重跑也只扣一次。跨系统效果在任何 durable 系统里都只有 at-least-once 加幂等，一个 ID 撑不起更多。

见：[pi-durable README](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md)

#### fork 是指针而非复制，会话树因此拍平

对话是不可变 entry 的时序列表，fork 指向另一对话的某条 entry 并继承其之前的全部历史，零复制；fork 的
文档初始值可选 asOf、current、initial 三种时间语义。这是对旧设计的修正：旧 Pi 编码代理让每个 entry 记
parent 指针构成 git 式分支树，作者自评 exceptionally dumb，每次 /tree 都要把树拍平成嵌套对话才能展示；
一个后置指针即可实现分支继承，无需每条记录携带 parent。

见：[Pi Durable | Hacker News](https://news.ycombinator.com/item?id=49925969)

#### 持久化与热更新共享的折衷边界

SQLite 后端是 WAL 加 synchronous=NORMAL：进程崩溃不丢，断电或宿主机故障最新提交可能丢；JSONL 默认不
fsync，需显式开启；流式 partial 答案每 100ms 才提交一次，崩溃最多丢这个窗口。热更新侧 registry 只存
扩展名不存代码，同名安装即热替换，运行中的调用用旧代码跑完；system prompt 每请求重建，变更按位置记入
transcript、只发增量以保住 provider prompt cache，但返回每次不同内容（如当前时间）的 section 会静默
打穿缓存，无任何报错。另外 TypeBox 校验使包根加载峰值约 23MB RSS，tree-shake 后约 4MB。

见：[pi-durable README](https://github.com/earendil-works/pi/blob/main/packages/durable/README.md)
