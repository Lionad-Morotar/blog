---
title: AI 时代的工程师技能形成
description: AI 接管了过去用于培养工程师的初级工作，成长阶梯的台阶正在消失；监督 AI 所需的判断力恰恰来自这些被接管的经验
original_path: _ai/vibe/skill-formation.md
---

#### AI 正在拆除工程师成长阶梯的台阶

Alasdair Allan 在 QCon London 提出一个结构性困境：AI 正在接手过去用于培养工程师的工作——花数年阅读遗留代码库、
凌晨调试生产事故——而监督 AI 恰恰需要这些经验养成的编程技能。资深工程师的模式识别能力（系统应该如何构建、
复杂性隐藏在哪里、规模扩大后会在哪里出问题）无法再通过传统路径获得，因为初级工程师会让 AI 智能体处理这些内容并要求它总结。

研究证据指向同一方向。Anthropic 的编码技能形成研究发现，使用 AI 辅助的开发者学习新库时，理解测试得分低 17%，
而任务完成速度没有任何显著提升——Allan 概括为"他们牺牲了学习，却什么也没换来"。其机制在于，
当 AI 直接给出答案却省略整个探索过程时，与导师一起艰难解决问题所带来的偶发学习机会就被绕过了。

见：[AI Disrupts Engineering Career Progression](https://www.infoq.com/news/2026/08/AI-disrupts-engineering-progress/)

#### 黑地系统的关键上下文只存在于生产环境

大多数工程工作属于"黑地（blackfield）"：处于高负载下的遗留系统，所有人都同意应该逐步弃用，却没有人有时间真正执行。
规范可能从未编写，或因数十年未记录的决策而失去意义；业务规则被编码在各种条件分支中，而理解这些规则的人早已离开。

这构成 AI 智能体的能力边界：它们可以阅读代码、测试和文档，但无法读取生产环境——无法查看多年的请求模式，
也无法理解哪些代码路径以代码本身无法揭示的方式承担着关键负载。资深工程师对黑地系统的判断力，
正来自这些无法从代码中提取的生产环境经验。

见：[AI Disrupts Engineering Career Progression](https://www.infoq.com/news/2026/08/AI-disrupts-engineering-progress/)

#### 编程正在转变为监督工作

Allan 援引 Anthropic 内部数据：其工程师在 59% 的日常工作中使用 Claude，但只能完全委托约 20% 的工作。
生成与判断之间的差距，是未来工作岗位存在的地方——AI 编写代码，人类判断它是否是正确的代码。

监督角色的代价是学习通道的改变。Allan 观察到，现在 80% 到 90% 的工程问题会被提交给 AI 而不是同事；
过去的职业发展通道是为编写代码的人建立的，尚未有人为监督系统的人重建这条通道。

见：[AI Disrupts Engineering Career Progression](https://www.infoq.com/news/2026/08/AI-disrupts-engineering-progress/)

#### 住院医师模式：刻意保留"枯燥杂活"的学习价值

Allan 承认行业目前处于诊断阶段而非解决方案阶段，但给出了组织层面的行动方向：建立结构化的学习路径，
有意识地安排基础工作轮岗——就像住院医师培训，人们做那些枯燥的杂活是因为这些工作能够培养判断力，而不是因为效率更高。

配套的衡量方式需要转变：衡量理解程度而非速度，观察人们如何思考而非产出了什么。同时把上下文视为基础设施——
文档应该写得像为一名懂得编程、却不了解该代码库的高级工程师准备的入职材料。对个人而言，
AI 是工具而不是老师，利用它跳过理解过程就是在透支自己的未来。

见：[AI Disrupts Engineering Career Progression](https://www.infoq.com/news/2026/08/AI-disrupts-engineering-progress/)
