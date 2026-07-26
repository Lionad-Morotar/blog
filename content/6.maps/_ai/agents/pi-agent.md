---
title: Pi Agent 源码解析
description: 从 Pi Agent 源码中提炼的 Agent 循环、上下文压缩、会话管理与工具执行等进阶实现细节。
---

Pi Agent 是 earendil-works 开源的终端编码 Agent，包结构从底向上分为 pi-ai、pi-agent-core、pi-coding-agent。
它的实现里有几处很容易被文档“跳过”但会直接决定系统行为的细节，下面按源码逐条记录。

#### Agent 事件派发是同步屏障

多数事件总线采用“派发即放手”的语义：触发事件后不必等待监听器完成，单个监听器的异常通常被框架吞掉。
Pi 的 `Agent.processEvents` 则不同，它会用 `await` 顺序等待每一个监听器返回，所有监听器完成后才退出事件处理。
这种同步屏障意味着任何外部监听器的同步或异步抛错都会直接冒泡到当前 Agent Run，进而把循环拉停。
如果你在 UI 层或日志扩展里写一个可能抛异常的事件监听器，必须自己包 try/catch，否则一次渲染失败就会让整个 Agent 停摆。
反过来说，这种设计也保证了同一事件的所有副作用在下一行代码开始前已经落定，不会出现“事件发了但状态还没更新”的竞态。

见：[Pi Agent agent.ts#L574](https://github.com/earendil-works/pi/blob/main/packages/agent/src/agent.ts#L574)

#### 上下文压缩需保留半轮 Turn 前缀

上下文超长时，常见的截断策略是“从旧消息开始删”，但简单的删除会破坏 Tool Use 协议的配对关系。
Pi 的 `findCutPoint` 允许切在 assistant 消息和它对应的 toolResult 之间：assistant 消息被纳入保留区，
而它的工具结果因为更靠近当前轮次被保留下来。如果直接把 assistant 丢掉，LLM 就会看到没有对应 toolCall 的 toolResult。
为了修复这种“半轮”状态，Pi 会额外生成一段 `turnPrefix` 摘要，把触发这轮的用户消息和被截断的 assistant 消息一起压缩进上下文，
让模型仍然知道“这一轮最初发生了什么”。这在实现上意味着压缩不是单纯的丢消息，而是要维护调用-结果链条的完整性。

见：[Pi Agent compaction.ts#L845-L882](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/compaction.ts#L845-L882)

#### 会话树让状态随回滚自动还原

Pi 把模型切换和思考级别也存成 Session Tree 上的 Entry，而不是放在全局变量里。
`buildSessionContext` 从当前 leaf 沿着 parentId 走回根，一路上用最新值覆盖 `model` 和 `thinkingLevel`。
因此当用户回退到某个节点时，运行时参数会自动恢复到那个时间点的状态；如果模型切换是全局变量，回退后调用的仍然是新模型。
这种设计同时解释了为什么 Session Tree 只维护 parentId 而不维护 children 列表：只要父节点不变，追加新分支就永远不需要修改旧节点，
回退也只是移动 `leafId`，整套分支操作都是 O(1)。

见：[Pi Agent session-manager.ts#L362-L377](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/session-manager.ts#L362-L377)

#### 工具执行流式更新有截止门

工具执行可能持续很久，期间会不断产生 `tool_execution_update` 部分结果事件。
`executePreparedToolCall` 内部用 `acceptingUpdates` 做一道截止门：工具还在跑时，partial-result 回调被收集进 Promise 队列；
一旦 execute 完成或抛错，这个标志立刻置 false，后续回调直接忽略，然后统一 `await Promise.all(updateEvents)` 清场。
这避免了工具承诺已经 settle 之后，延迟到达的流式更新被错误地塞进下一轮 Turn，造成 UI 或状态机看到“已经结束的工具还在冒事件”。
对于需要实时反馈的长工具，这个模式是个关键的安全网。

见：[Pi Agent agent-loop.ts#L671-L706](https://github.com/earendil-works/pi/blob/main/packages/agent/src/agent-loop.ts#L671-L706)
