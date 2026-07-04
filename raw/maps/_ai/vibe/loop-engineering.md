# Loop Engineering

> 从手动提示词工程到自主循环系统的 AI 编程范式迁移，以及其构建块、风险与工程权衡

## 循环工程替代手动提示

Loop Engineering 不是写更好的单次 prompt，而是设计一个无需你持续介入的递归系统：它自己发现任务、调度执行、验证结果并决定下一步。Claude Code 的 `/goal`、Codex 的 `/goal` 以及定时 `/loop` 都是这一范式的具体原语。它的核心洞察是，杠杆点从“你会不会向 agent 提问”转移到了“你能不能设计出一个可持续运转的反馈闭环”。当系统跑起来后，工程师的角色从“握着手柄操作”变成“设计手柄的人”。见：[Loop Engineering](https://addyo.substack.com/p/loop-engineering)

## 外部记忆是第六块积木

Loop 常被描述为五个构建块：automations、worktrees、skills、plugins/connectors、sub-agents，但真正让它跨会话存活的是第六块——外部记忆。模型在每次运行后都会遗忘上下文，所以循环的状态必须持久化到 markdown 文件、Linear board 或数据库等外部存储。没有这块，循环每天醒来都在重新推导项目背景，无法累积。这也是长时运行 Agent 的 Harness 设计与单次对话 agent 的根本分界。见：[Loop Engineering](https://addyo.substack.com/p/loop-engineering)

## 制造者与检查者必须分离

循环里最危险的结构是让同一个模型既写代码又判分，因为写代码的模型会“给自己的作业打很高的分”。Sub-agents 的关键作用是把 maker 和 checker 拆开：一个 agent 实现，另一个用不同指令甚至不同模型做验证。Claude Code 的 `/goal` 在底层也用了独立的小模型判断终止条件，正是同一原理。unattended 运行时，这是你能放心走开的唯一原因，也是 token 成本最值得花的地方。见：[Loop Engineering](https://addyo.substack.com/p/loop-engineering)

## 自动化放大理解债务

循环不会减少工程师责任，反而会把“看不懂自己代码”的问题加速。Loop 跑得越顺，越容易产出大量你未逐行审阅的代码，形成 comprehension debt；如果长期依赖循环而不保持判断，就会滑向 cognitive surrender——把思考外包给机器。设计循环的真正难度不在于让它跑起来，而在于让它在放大杠杆的同时，仍然强迫你保持领域判断。见：[Loop Engineering](https://addyo.substack.com/p/loop-engineering)
