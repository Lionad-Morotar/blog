---
title: 软件工程
description: 软件工程（Software Engineering）是指应用工程化的方法和原则来设计、开发、测试和维护软件系统的学科和实践。
original_path: content/6.maps/_software/software-engineering.md
---

## Tour

* [Awesome Engineering Articles](https://github.com/ashishps1/awesome-engineering-articles)：精选的软件工程领域高质量技术文章合集，涵盖系统设计、架构、性能优化等主题

## Gists

#### API 向后兼容的二十年承诺

Amazon S3 最 remarkable 的成就：2006 年编写的代码今天仍能运行，无需修改。二十年间基础设施迁移了多代磁盘、所有请求处理代码被完全重写、存储规模从 1PB 增长到数百 EB、
价格从 $0.15/GB 降至 $0.02/GB（降幅 85%）——不变的是 API 完全向后兼容。这一案例印证了渐进演进胜于重写的工程哲学。

> "Your data went through 20 years of innovation... But the data you stored 20 years ago is still available today."

见：[Twenty years of Amazon S3 and building what's next](https://aws.amazon.com/cn/blogs/aws/twenty-years-of-amazon-s3-and-building-whats-next/)：AWS 官方博客

#### 渐进演进的战略智慧：为何"丑陋"的代码比"干净"的重写更有价值

程序员本能地想要推倒重来，因为他们认为旧代码是"混乱的"。
但这种直觉恰恰揭示了软件工程中最深刻的悖论：

**读代码比写代码更难**——这是程序员总想重写的根本原因，而非旧代码本身有问题。
那些看似"丑陋"的长函数、奇怪的API调用和晦涩的hack，实际上是无数bug修复和业务智慧结晶的化石记录。
每一行"毛发"都代表着一个在真实世界中发现的边界情况、一个用户报告的问题、数周的调试和一行关键的修复。

**重写是对知识资产的毁灭性清算**。当选择从零开始时，你不仅放弃了代码，更放弃了 years of accumulated bug fixes、真实场景的测试验证、
以及团队对系统行为的集体理解。Netscape为此付出了3年时间和市场主导地位的代价——在软件行业，这等同于商业自杀。

**渐进式重构是更深刻的工程能力**。架构问题可以通过 careful moving code 解决；性能问题可以通过针对性优化解决；
代码风格问题可以通过工具批量解决。这些方法都在保留知识资产的前提下演进系统。
而重写不仅无法保证做得更好（你没有"更多经验"，你甚至可能换了团队），还会让公司在数年内无法响应市场需求。

这是关于软件演化的深层认知：代码的价值不在于其当下的优雅，而在于它所承载的历史智慧和验证过的正确性。

不过，在 Coding Agent 已经强大的 2026 年来看，这些过往的软件工程经验正在急速演变。

见：[Things You Should Never Do, Part I](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/)

####  Martin Fowler深度访谈：软件工程正迎来 40 年来最猛烈的一次地震

这轮技术变革的本质，是从确定性世界走向非确定性世界，AI 最适合用来**理解复杂系统、生成输入与方案**，再交给**确定性的传统工具去执行和落地**，在这一过程中，软件开发过程的管理————软件工程的概念只会演变，但不会过时。

<q>这次变革最大的特点，不是抽象层又提高了，而是我们从确定性的世界进入了非确定性的世界。</q>

<q>Fowler说Thoughtworks已经把用AI理解遗留代码放进了他们技术雷达的采纳环。这是最高级别的推荐，意味着他们强烈建议在这个场景下使用AI。</q>

<q>Fowler说他的同事James Lewis用Cursor尝试重命名一个类，结果花了一个半小时，用掉了10%的月度token配额。这个任务如果用传统IDE的重构功能，也就几秒钟的事。</q>

<q>不要让AI直接生成最终代码，而是让AI生成输入，然后用确定性的工具来执行。</q>

<q>软件开发的核心技能不会过时。什么是核心技能？理解用户需求，与人沟通，把模糊的想法变成清晰的方案，在约束条件下做权衡。</q>

<q>Fowler今年应该快70岁了。他说自己当年进入这个行业纯属偶然，因为自己手笨，干不了需要体力的工程活，写代码刚好不需要力气。谁能想到，这个偶然的选择让他见证了人类历史上发展最快的行业的几乎全部历程。</q>

<q>当我们所有人都在谈论千亿美元投资、万卡集群的时候，这位 AI 领域最神秘的大脑之一 Ilya Sutskever 却说了一句让人意外的话：我们正在从规模时代重回研究时代。</q>

<q>这就是 Andrej Karpathy 想强调的核心差异： 动物智能是被自然进化"碾"出来的，全能、通用、压力巨大； AI 的智能是被商业训练"筛"出来的，用来完成任务、讨好用户、服务人类。 两个力场完全不同，方向也完全不同。</q>

<q>所以真正的超级智能应该是什么样的？Ilya 给出了一个新的定义：它不是一个什么都知道的全能大脑，而是一个能够快速学习任何技能的智能体。就像一个 15 岁的超级学生，基础很扎实，学习能力极强，但还需要去具体的领域深入学习。</q>

#### 迷你框架（Mini-framework）的危害与避免策略

Google 工程师的观察：大公司内部常见的一种反模式是团队基于共享技术栈创建"迷你框架"——
引入新概念和术语、声称能"神奇地"解决许多问题的包装层。

**核心问题：**
*   **功能不完整**：只能处理 80% 的用例，剩下 20% 缺乏灵活性和兼容性
*   **违反 ETC 原则**：基于当前用例建模，需求变化时难以跟进；依赖原框架的实现细节，阻碍原框架演进
*   **认知不匹配**：框架是创建者心智模型的实现，但作者眼中的"自然直观"可能是他人的负担
*   **技术栈碎片化**：迁移永远无法完全完成，新层不断叠加使情况恶化
*   **维护困境**：通常由 1-2 人创建，原作者离职后难以找到继任者

**建议做法：**
创建**库（library）**而非**框架（framework）**——真正的区别在于是否引入新概念。
如果必须创建框架，应将其视为重大决策：从零开始构建而非包装现有框架，
确保概念与具体业务需求挂钩而非个人构想。

见：[Avoid Mini-frameworks](https://laike9m.com/blog/avoid-mini-frameworks,171/)

#### 代码行数与软件复杂度的实证关联

代码行数（LOC）并非无意义的度量。多项大规模实证研究显示其与主流复杂度指标高度相关：

Basili & Hutchens (1981) 分析 19 个程序，发现 LOC 与 Halstead 体积相关性达 +0.98，与圈复杂度 +0.88；
Revilla & van der Meulen (2007) 对 70,000 个 C 程序的统计得出与 Halstead 体积 +0.82、圈复杂度 +0.78；
Herraiz & Hassan (2010) 研究 200,000+ Arch Linux 文件，证实与圈复杂度 +0.72、Halstead 指标 +0.91 的强关联。

这些数据表明 LOC 能够有效捕捉软件系统的复杂度本质。

见：[Lines of code are useful](https://entropicthoughts.com/lines-of-code)：kqr 关于 LOC 作为有效度量指标的论述

#### 本质复杂度与偶然复杂度

Fred Brooks 在《No Silver Bullet》(1986) 中区分了两种复杂度：

本质复杂度是问题本身固有的——如火星车着陆必须处理的大气摩擦、地形不确定性；偶然复杂度则源于实现选择、工具限制和糟糕抽象。LOC 测量的是两者之和，而这正是软件成本所在。

这一区分解释了为何 LOC 作为"成本指标"有效：无论复杂度源于问题本质还是实现决策，维护者都需要逐行阅读、理解和调试。代码库的规模直接对应认知负担和维护工作量。

见：[Lines of code are useful](https://entropicthoughts.com/lines-of-code)：kqr 关于 LOC 作为成本指标的论述

#### 接口窄而实现厚才是深模块

Unix 的 `open()` 调用只暴露路径与 flags，却隐藏了文件系统、权限、缓存、inode 解析等大量机制。
这说明深模块的关键不在于内部代码量少，而在于接口窄而语义厚——调用者以极低的认知成本撬动大量已封装的实现。

见：[A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)

#### 深模块降低的是系统总复杂度

评价模块价值的核心指标不是它自身是否复杂，而是它是否为系统净减少复杂度。
好的深模块通过信息隐藏把细节锁在内部，让上层看到的概念面更小，从而降低整个系统的认知负担与维护成本。

见：[A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)

#### 警惕透传型浅模块

如果一个模块只是把参数原样转发给下一层，自身几乎没有独立决策，那它通常是浅模块。
它没隐藏任何信息，反而多了一层接口、多了一份需要维护的契约，带来 Ousterhout 所说的"复杂度税"。

见：[A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)

#### 过度拆分函数会制造接口复杂度税

把每个小操作都拆成独立函数并不总是好事。当函数的实现只有几行对象拼接或条件转发，却需要调用者理解多个参数和边界情况时，
拆分带来的接口复杂度可能超过其隐藏的价值，最终成为系统噪音。

见：[A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)

#### "Lines Spent"：将代码视为成本而非产出

代码行数作为度量指标的真正价值在于衡量成本而非生产力。当 LOC 被用作成本指标时，它与总复杂度相关，能有效预测维护负担；但当被用作生产力指标时，便陷入 Goodhart's Law——一旦个人知道用 LOC 评判绩效，
就会产生更多偶然复杂度。

更健康的视角是将代码视为"花费的行数"（lines spent）。删除代码减少未来成本，即使表现为"负生产力"。优秀的工程师通过精简实现降低系统复杂度，而非通过增加代码展示工作量。

见：[Lines of code are useful](https://entropicthoughts.com/lines-of-code)：kqr 关于 LOC 作为成本指标的洞见

#### Token Maxing：AI 使用量排行榜如何扭曲工程激励

当 AI 的 token 消耗、生成代码量或 agent 调用次数被纳入工程师绩效或内部排行榜时，工程师会开始刻意刷量：让 AI 重复解释基础文档、执行无意义的指令、把简单任务交给 agent 以冲高调用数。
这种被称为 token maxing 的现象已在 Meta、Amazon、Microsoft 等公司内部出现。它不只是浪费预算，更把工程师的注意力从“交付可靠价值”转移到“证明自己在用 AI”，让组织误以为高 token 消耗等于高产出，
最终侵蚀质量文化和真实交付。

见：[Meta shifts from "tokenmaxxing" to token managing](https://the-decoder.com/meta-shifts-from-tokenmaxxing-to-token-managing-as-internal-ai-costs-reportedly-hit-billions/)、[Tech workers maxed out their AI use](https://www.nytimes.com/2026/06/18/technology/ai-token-minimizing.html)

#### 验证缺口：生成速度已超过审查能力

AI 工具让代码产出速度大幅提升，但审查、测试和理解系统的速度并没有同比例增长，结果就是大量 AI 生成代码未经充分人工验证就进入生产。Meta Instagram 的账户接管漏洞据称与 AI 编写、AI 审查的代码有关；
Amazon 的 AI 编码助手 Kiro 被曝出删除生产环境并引发严重 outage；GitHub 则因 agentic 工作负载快速增长而可用性下降。这些事件的共同根因不是代码生成太慢，而是系统信任的积累速度赶不上代码的积累速度。

见：[Hackers Used Meta's AI Support Bot to Seize Instagram Accounts](https://krebsonsecurity.com/2026/06/hackers-used-metas-ai-support-bot-to-seize-instagram-accounts/)、[When AI Deletes Production: The Amazon Kiro Incident](https://course.shuruai.com/blog/when-ai-deletes-production)、[The Pulse: AI load breaks GitHub](https://newsletter.pragmaticengineer.com/p/the-pulse-github-breaks)

#### Agentic 负载正在压垮现有基础设施

当整个工程组织把代码审查、PR、搜索、文档解析甚至部分部署都交给 agent 完成时，平台侧承受的压力会远超最初设计容量。GitHub 反映其基础设施在约两年内负载增长约三倍，导致可用性事件频发；
Amazon 的内部 AI 助手曾因自主操作而直接删除生产环境。这说明基础设施的韧性、可观测性和配额治理必须赶在 agent 规模化之前到位，否则生成侧越快，系统整体反而越脆弱。

见：[The Pulse: AI load breaks GitHub](https://newsletter.pragmaticengineer.com/p/the-pulse-github-breaks)、[Amazon Kiro Deleted Production](https://atypicaltech.dev/blog/amazon-kiro-when-your-ai-deletes-production/)

#### 慢下来才能更快：把 agent 用量限制在自己能验证的范围内

真正的长期收益不是个人产出速度，而是团队能否在更高速度下保持质量。Gergely Orosz 的建议是把每日 agent 使用量封顶在自己能审计、测试或系统验证的范围内；利用 AI 快速清理技术债，把自己从“写代码的人”变成“架构维护者”；
同时不要让 AI 替代深度领域知识，否则短期快是以长期技能衰退为代价。这种“先建护栏、再踩油门”的策略，是 AI 时代软件工程从个人效率转向系统效率的关键。

见：[Slow down to speed up: AI and software engineering](https://www.bestblogs.dev/video/550c5a2)、[Ideas: slow down to speed up when working with AI agents](https://newsletter.pragmaticengineer.com/p/ideas-slow-down-to-speed-up-when)


