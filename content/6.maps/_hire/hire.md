---
title: 招聘与求职
original_path: content/6.maps/_hire/
---
前端面试、招聘相关问题与经验总结。

## 主题

- [前端实习问题](intern.md) - 实习生常见问题与解答

## AI 时代的招聘范式

#### AI-native 工程师的面试范式

Karpathy 主张，许多公司还没重构面试流程：继续给候选人小型算法 puzzle、限时手写题，测不出一个人能否在 Agentic Engineering 里高效工作。

他的提案是用大项目代替小 puzzle。例如让候选人做一个“给 Agent 用的 Twitter 仿盘”，要求做得绝对安全；面试官再挂上 10 个 Cursor 当作红队，放开手脚去攻击候选人构建的系统。
这套评估方式不再考查候选人能否手写某个算法，而是考查：能否把模糊目标变成清晰规格、指挥 Agent 完成大规模实现、识别安全与架构风险、设置测试与验证、在模型生成的大量代码里保持质量判断、让最终系统经得起外部攻击。

AI-native 工程师还有一个共同特征：会主动投资工作流配置——像过去工程师配 Vim/VS Code/快捷键一样，今天要花时间把 Cursor、Claude Code 等工具调到适合自己的工作方式。

见：[Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering](https://baoyu.io/blog/andrej-karpathy-from-vibe-coding-to-agentic-engineering)

#### 前沿 AI lab 的工程缺口在 infra 而非 research

大众把前沿 AI 实验室（frontier lab）想象成“博士扎堆的研究机构”，但 Anthropic 1,680 份工程师简历给出反例。
基础设施（infrastructure）背景占 40%，后端、分布式、数据库、安全各约 20%，而强化学习（RLHF 里的 RL）仅 3.3%，博士仅 13.7%。
这不是 Anthropic 一家的偏好，而是行业结构——模型只是冰山一角。
水面之下是几千张 GPU 的集群调度、集合通信（NCCL）、checkpoint 容错、KV cache 优化、推理服务（serving）等大规模系统工程。
研究岗看似光鲜但博士供给充足，真正稀缺的是“把训练扩到上万张卡、把推理吞吐翻倍”的系统工程能力。
所以 lab 愿意为 Google、Meta、Stripe、Databricks 的资深 infra 工程师开出 $300K–$5M 总包。
对求职者的启示：花两年复现论文、刷 benchmark，往往投不进工程岗，对方想看的是“我亲手把 X 系统从 Y 规模扩到 Z 规模”。

见：[I looked at 1,680 Anthropic resumes. Here's who they actually hire.](https://www.linkedin.com/pulse/i-looked-1680-anthropic-resumes-heres-who-actually-hire-cuadros-f34qe/)

#### MoTS 扁平职级的渊源与跳槽隐藏成本

Anthropic 和 OpenAI 的工程师无论资历，对外 title 都是 Member of Technical Staff（MTS/MoTS）。
前 Instagram CTO、Workday CTO、Adept 创始人入职后也都是 MoTS。
这套制度源自 Xerox PARC（Alan Kay 的设计），OpenAI 2023 年率先采用，Greg Brockman 称灵感来自 PARC。
它对内其实有等级（entry MTS 到 Distinguished MTS，H-1B 数据显示 Anthropic $300K–$405K、OpenAI $210K–$530K，principal 级可达 $2M–$5M+）。
高管愿意“降 title”是用股权补偿换的。
反直觉的代价在于：跳回 FAANG 时，MoTS 无法直接映射到 L5/L6，外部招聘者也无法从 title 判断资历，往往需要重新面试定级。
这是接受 lab offer 时容易忽略的隐藏成本。

见：[I looked at 1,680 Anthropic resumes. Here's who they actually hire.](https://www.linkedin.com/pulse/i-looked-1680-anthropic-resumes-heres-who-actually-hire-cuadros-f34qe/)

#### 进入 AI lab 的“非年限信号”与 alignment fellowship 管道

Anthropic 几乎不招普通应届生（1,680 人中仅 50 人经验不足 3 年），但这少数 junior 不靠年限，而靠“信号替代”。
三类典型信号：竞赛奖牌（IOI、Codeforces 2900+）、量化交易经历（Jane Street、Two Sigma、HRT）、alignment fellowship。
其中大众最陌生的是 MATS（ML Alignment & Theory Scholars）——由 Anthropic 的 Evan Hubinger 创立、在 Berkeley 运行的 12 周研究奖学金。
MATS 与 Anthropic Alignment Science team、Redwood Research、ARC 直接合作，结业者约 80% 进入 alignment 工作。
它是绕过“12 年经验”门槛、进入 Anthropic 安全团队的事实标准管道。
早期职业者若想进 frontier lab，与其堆年限，不如在某个强信号上做到顶尖。

见：[I looked at 1,680 Anthropic resumes. Here's who they actually hire.](https://www.linkedin.com/pulse/i-looked-1680-anthropic-resumes-heres-who-actually-hire-cuadros-f34qe/)

