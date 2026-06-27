---
title: 人机协作智能体团队
description: Anthropic 关于构建高效人类与智能体协作团队的经验：公共空间、明确角色、北极星目标与渐进信任
---

## Brief

AI 协作正在从“单人单机”走向“多人协作”：人类与智能体在同一工作空间中为共同目标协同工作。Anthropic 将这种形态称为“多人协作智能体”（multiplayer agents），并基于内部实践总结出四条核心经验：
在公共空间工作以提供广泛上下文、为每个成员定义明确角色并配备合适工具、设定北极星目标以驱动智能体主动行动、通过逐步扩大自主权来建立信任。

#### 智能体凭据应独立于人类账户

在多人协作场景下，让智能体借用人类员工的账户凭证看似省事，实则会让权限边界和审计线索变得模糊。Claude Tag 的做法是为智能体分配独立的工作区或频道级身份，由管理员按角色预配工具和访问范围。这样智能体的行为可以被单独追踪、撤回和限制，
不会因为某个员工离职或转岗而导致智能体权限失控，也让“谁能看到什么”从逐条文档授权变成清晰的安全边界。

见：[Agent identity: a new access model for autonomous, team-wide AI](https://claude.com/blog/agent-identity-access-model)

#### 工作区级透明边界比逐条授权更高效

当智能体成为团队文档、会议记录和 Slack 频道的主要消费者之一时，如果每个频道、每份文档都单独设置可见性，人类和智能体都会陷入“能否分享”的决策疲劳。Anthropic 的经验是：在公司层面定义少数几条安全边界，然后让工作区、
文档库和会议转录共享设置与这些边界对齐。在边界内部默认公开，既能给智能体提供足够的上下文去发现被人类忽略的相关工作，也减少了日常协作中的权限困惑。

见：[Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams)

#### 北极星目标让智能体从被动执行转向主动建议

很多智能体只完成被指派的任务，但如果团队把宏大的长期目标写成清晰的“北极星”并明确告知哪些智能体可以主动提出建议，智能体就能自发发现新的工作流。Anthropic 内部工具团队的例子是：北极星设为“让产品上手体验更有帮助”后，
智能体主动建议修改上手流程中的错误提示文案，随后一周 onboarding 成功率得到可测量的提升。关键是人类必须保留目标设定权，并谨慎选择哪些智能体具备主动建议的权限。

见：[Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams)

#### Doer-Verifier 校验是建立智能体自主权的有效机制

让智能体独立处理复杂任务时，质量漂移是最大风险。Anthropic 采用“执行者-校验者”（Doer-Verifier）模式：一个智能体负责完成任务，另一个专门负责检查其输出是否符合预设标准。代码可以用测试验证，
文档可以套用评分表和风格指南，而更一般的工作则可以引入专门的 verifier agent。通过先在人工监督下反复校准校验清单，再逐步扩大自主权，团队可以在不牺牲质量的前提下，把大量重复性任务交给智能体独立完成。

见：[Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams)

#### 验证成新瓶颈：8x 代码量背后的质量转移

Coding 不再是瓶颈，瓶颈转向验证。Anthropic 工程师现在每季度提交的代码量是 2025 年前的 8 倍，角色从“写代码的人”变成“定义什么是好代码并验证它的人”。Fiona 把质量框架简化为 bad 与 sad：
bad 是不可恢复的错误（如崩溃），sad 是可恢复的痛点（如闪烁），每个团队自己定义阈值；再把 spec、内容设计标准等“好代码的框架”也检入仓库，让 Claude Code Review 自动对照。结果是，
团队应该把更多精力放在 eval、监控和可验证的标准上，而不是继续追逐产出数字。

见：[Building the most AI-pilled engineering team in the world | Fiona Fung (Anthropic)](https://www.bestblogs.dev/video/2f4fa0a)

#### 智能体例程重构管理者工作流

Routines 把管理从“实时聊天”变成“异步编排”。Fiona 过去每天早上手动翻 Slack、邮件、合作伙伴反馈和社交媒体；现在她有一个定时 routine，起床后已经帮她汇总主题、生成打磨 PR，她只负责 review。
这种例程不只是自动化，而是让智能体替你 spawn 其他智能体，把日常 sense-making 抽象成可重复、可验证的异步工作流。关键是给它清晰的自主边界——如果验证足够强，就可以直接放行。

见：[Building the most AI-pilled engineering team in the world | Fiona Fung (Anthropic)](https://www.bestblogs.dev/video/2f4fa0a)

#### AI 时代的两类关键人才画像

当实现门槛被模型打掉后，招聘标准从“能不能写这段代码”转向“能不能定义要做什么”和“能不能验证最难的部分”。Fiona 在 Claude Code 团队刻意补强两类人：一是有产品感的创意型构建者，他们端到端拥有体验、读反馈、打磨细节；
二是深度系统专家，负责 still-need-verification 的硬骨头（如分布式系统）。二者组合才能在“一切理论上都可能”的世界里，既敢想又能信得过。

见：[Building the most AI-pilled engineering team in the world | Fiona Fung (Anthropic)](https://www.bestblogs.dev/video/2f4fa0a)

#### AI 辅助开发的孤独感与文化漂移

一个反直觉的副作用是：工程师整天与智能体协作，可能更孤独。Claude Code 团队用“结对编程午餐”和黑客松来对抗——不是回到旧式 pair programming，而是让大家看到彼此使用 Claude Code 的不同方式，
重建人际连接。Fiona 说真正让她失眠的不是工程难题，而是文化：它是有生命的，需要持续公开讨论什么没做好。高增长团队如果只顾速度，不设计人类同步仪式，最终会用凝聚力换产出。

见：[Building the most AI-pilled engineering team in the world | Fiona Fung (Anthropic)](https://www.bestblogs.dev/video/2f4fa0a)

