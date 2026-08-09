---
title: Applications
description: AI 应用场景与实践，涵盖前端影响、学术论文写作和提示工程等领域应用。
---

## Frontend Impact

* [AI 对泛前端领域的影响](/maps/_ai/applications/frontend-impact) - 滴滴技术团队关于 AI 浪潮下泛前端变革的思考

## Paper Writing

* [ML 论文写作](/maps/_ai/applications/paper-writing) - LaTeX 工具、文献管理与可复现性实践

## Product Direction

#### 1% 法则：找模型成功率为 0% 的领域，而非 20%

Jeff Dean 给 AI 创业者的方向选择框架：测试前沿模型在目标领域的表现，警惕「表现还行」（成功率约 20%）的领域——
这恰恰是最危险的信号，意味着能力已开始出现，后续更大的模型很可能彻底覆盖。应该找成功率为 0% 或 1% 的问题。

0% 意味着问题完全不在模型的训练分布内，通常有三类成因：需要极其专业的知识；需要通用模型无法访问的特定数据
（如帮用户组织其全部个人信息的产品，数据模型根本看不到，瞬间构成优势）；或问题复杂度超出当前架构的能力边界。
对后者，拿到正确的训练数据、训练一个高度专注的垂直模型是可行路径——如今训练垂直模型不需要太多算力，
AlphaFold（蛋白质折叠）就是范本，材料科学、芯片设计等同构领域比比皆是。

见：[Jeff Dean YC Startup School 2026 炉边谈话（中文整理）](https://mp.weixin.qq.com/s/RQMxO9rr89V3ZH8grzmEZg)

## AI for Science

#### 代理模型把科学实验循环的延迟压到极低

科学计算的传统瓶颈是模拟器太贵：理解一个分子的性质需要跑密度泛函理论（DFT）模拟，一次可能耗一整夜。
Google 团队用昂贵模拟器的输入-输出对训练神经网络代理模型（Surrogate Model），精度几乎与原模拟器一致，
速度提升约 30 万倍——筛选一千万个分子从「攒六个月算力」变成「吃午饭的功夫」。

其机制在于把科学方法本身自动化：提出实验、实现并运行、评估结果、整合发现——能自动化这个循环的领域，
都不再只跑几个实验，而是跑海量实验。同一逻辑也指向机器学习自身：模型改进可以成为自动化循环，
人类只在最高层给方向（「试试融合这些特性的新架构」），模型自动跑大量实验并整合有效结果。
要优化的指标是每单位算力投入的发现数量。

见：[Jeff Dean YC Startup School 2026 炉边谈话（中文整理）](https://mp.weixin.qq.com/s/RQMxO9rr89V3ZH8grzmEZg)

## Translation

#### 平台级自动翻译正在消解语言边界

Reddit 通过 URL 参数（如 `?tl=fi`）动态翻译帖子，Google 已索引这些翻译页面；YouTube 自动为非本地语言视频启用 AI 配音；游戏语音聊天也在接近实时翻译。当平台全面部署自动翻译，
人类语言在数字通信中可能变得不再重要——这是 Douglas Adams 笑话里"巴别鱼"的现实版本。

见：[Making human languages irrelevant](https://rakhim.exotext.com/making-human-languages-irrelevant)：平台级翻译消解语言边界的趋势观察

## Prompt Engineering

* [提示工程](/maps/_ai/applications/prompt-engineering) - DSPy、Instructor、Guidance 等提示编程框架

