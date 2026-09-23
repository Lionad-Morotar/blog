---
title: 🎨 实现近乎免费之后，设计还剩什么
description: GitHub Next 设计工程师 Maggie Appleton 的 AI 时代工作流：纸笔、Jig、spec 前置，以及 agent 吞不掉的那部分判断。
---

![实现近乎免费之后，设计还剩什么](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/260924-illo-sketch-to-jig.jpg)

*配图：纸上线稿越过纸页，长成可以拖动的活界面（AI 生成，Rio·Night 系列）*

「作为工程师，我让 Claude 生成 20 个高保真设计稿，反复迭代到满意为止。比和设计团队打交道快得多，也更享受。」

主持人在节目里念出这条听众评论时，大概预想到了嘉宾的反应。Maggie Appleton 现任 GitHub Next 的 staff research engineer（
资深研究工程师），工作是为「工程师如何与 AI 协作」原型化下一代工具；主持人称她是业内最好的设计工程师（Design Engineer）之一。她对这条评论的回应是一份更细的账单：这位工程师换来的是一个「按钮和侧边栏拼起来」的界面，而设计的核心劳动——想清楚要造什么、判断它好不好——一个环节都没有省。
她补充说，没有设计师在手边、又要验证产品假设时，这样做完全没问题；但只要涉及一个还没有形状的新东西，就需要有人专门去做实验、拿给用户看、弄清人们到底理解什么[^podcast]。

这期对谈最有趣的地方在于，她一边在 GitHub 最前沿原型化 agentic 工具，一边把设计流程拆给你看：哪些环节 agent 已经接管，哪些环节连影子都够不着。

## 实现变成了一个过夜任务

Maggie 的一天里已经几乎没有写代码这件事。一旦想清楚要造什么，她会写一份详细的 spec，把「agent 该如何验证自己确实做对了」一并列进去，然后丢给 agent：「好了，PR 挂出来叫我。」PR 回来时她只粗扫一眼代码，
没问题就合并。她的原话是，实现并没有被彻底解决，但已经「好用到」这个程度：只要 spec 写得足够好，剩下的可以放心交出去[^podcast]。

更激进的做法是视觉还原。她曾在 Figma 里做一个高保真稿，然后让 agent 进入 goal mode 循环：对着截图自己检查，和 Figma 不像就继续改，直到像素对齐为止——整夜跑完，早上界面已经在那里了。
这类活儿在她看来原本就是苦工：又一个侧边栏，又一个 React 组件，做好了也注定是丢弃式原型。

这套「不读代码」的流程有前提：GitHub Next 是原型团队，不需要交付生产级软件，质量门槛远低于 github.com 主站，这是她自己说得很清楚的[^podcast]。方法成立靠的是容错空间，换到生产环境未必如此。

## 想法在变成语言之前，纸笔更快

她仍然从纸笔开始每个项目，三个理由：手画比向 Claude Code 描述一个「卡片堆叠的手风琴组件」快得多；画在纸上的东西不会消失，第二天还躺在桌上等你；也是最关键的一条——想法在早期根本不是语言形态的，
而 agent 几乎只吃文本[^podcast]。

![Maggie 的笔记本页面](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/260924-maggie-notebook.jpg)

*Maggie 的笔记本跨页：界面线稿、规划草图与学习笔记混在一起，思考发生在动笔的一刻（图源：The Pragmatic Engineer）*

她把话说得相当直接：agent 的图像理解很弱，空间推理很差，让它们做视觉设计就是不断犯错——间距不对、尺寸不对、文字重叠，因为它们「看不见」。网上那种「以后人人都是对着 prompt 创造」的说法，她持怀疑态度：
在你能用语言描述想要什么之前，需要一个快速、松散、低成本的反馈介质来摸索形状。工程师其实早就懂这个道理，只是介质换成了白板——最有效的架构讨论，往往发生在有人画出第一个框、另一个人凑上来补一个箭头的时候。

## Jig：给自己现造一个 Figma

纸上有了形状之后，她会造一批自己取名为 Jig 的东西。这个词借自木工：一种为一个特定工序临时制作的定位夹具。在 Maggie 的用法里，Jig 是让 agent 现做的交互式原型——把所有她拿不准的变量做成滑杆和取色器：标题字号、背景色、
动画速度、星星的重力强度、玻璃效果的透明度。她在浏览器里实时拖动，找到满意的值再固化下来。她管这叫「按需现造一个 Figma」[^podcast]。

这套东西是 Bret Victor 十多年前「活编程」（live programming）主张的落地：你应当始终盯着成品本身直接调整，而不是在编辑器里改变量、切出去看结果。此前不存在能做到这一点的编程系统，
最接近的是浏览器 DevTools；现在 agent 让「为自己的问题现造一个工具」便宜到了几分钟的程度。她给 GitHub Next 新站做的旋转星图首页——星星物理运动、悬停放大、滚动缩放——没有写一行代码，
全部由若干个 Jig 调出来[^podcast]。

![Jig 实景](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/260924-maggie-jig.jpg)

*Jig 实景：GitHub Next 星图原型与右侧实时调参面板，截图时正在拖动 Intensity 滑杆（图源：The Pragmatic Engineer）*

## Planning 坏在了文本上

「我有个理论：眼下的 planning 体验糟透了。」这是她在节目中给出的判断。现状是：你和 agent 长谈一场，它像审讯一样抛出 A、B、C 选择题，来上一百次。到第二十个问题时你已经疲惫，大脑开始罢工；何况它还告诉你「推荐 A」，
于是你干脆一路「同意、同意、回车」[^podcast]。她点名了 Matt Pocock 的 grill-me 类技能——主持人承认自己被问到第三十六个问题。

![别再问了，给我看图](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/260924-illo-decision-card.jpg)

*配图：左边是第二十个 A/B/C 问题，右边是一张带架构图的决策卡（AI 生成，Rio·Night 系列）*

她的诊断是：agent 天生爱输出成篇的文字，这对 agent 是理想输出，对人却是最差的输入。更麻烦的是，很多问题本身就是视觉的——「边框用 10% 还是 15% 的灰」该展示色板，「架构怎么分层」该展示架构图。所以她正在原型的规划界面里，
让每个决策自带对应的载体：简单决策是三选一的卡片，视觉决策内嵌 HTML 原型，架构决策内嵌数据流图；每个决策卡还记录决策人和当时可用的信息，留一份「为什么当时这么定」的审计轨迹。

这背后是她更深的一个论点，演讲标题就叫《一个开发者，两打 agent，零对齐》（One Developer, Two Dozen Agents, Zero Alignment）[^zero]：单独一个人带着 agent 可以跑得飞快，
但软件永远是团队造的。过去实现慢，团队可以边做边对齐；现在交给 agent 的是一个硬交接点，所有分歧必须在交接前收敛，而今天的 agentic 工具几乎全是单人的、私有的、跑在本地机器上的。她所在的团队天天被这个问题困扰。
她在推的方向是让「决策」成为一等公民的工件——用她的话说，agent 的世界里有权重、模型、skills 和 MCP，人类这边是实体、质感、光和材料，「找出让两边在中间碰头的工件，是真正的难题」[^podcast]。

## 能力煤气灯，和 agent 学不会的品味

Maggie 自造了一个词：能力煤气灯（capability gaslighting）。模型在某些任务上强得惊人，转头在同类任务上惨败，你无法预测下一次落在哪边。让你印象最深的那次成功，会成为你持续信任它的依据——
她形容自己有时模型已经失败了都没察觉，因为「Opus 不可能把这也搞错」，但它偏偏就错了。她说明这个词描述的是使用者 early on 的感受，和 Ethan Mollick 后来提出的「锯齿状边界」（jagged frontier）
是同一个现象[^podcast]。人类专家的表现是稳定的，模型不是——这是把判断下放给 agent 时必须带着的警惕。

设计的判断恰恰是最难下放的。她写过 design skills，试图把「边框到元素之间留多少内边距」这类个人规则喂给 agent，结果它们无法稳定执行，她还是得一次次进去手动改那些「本该早被自动化掉」的数值。她说 agent「
绝对还做不到我的设计标准」，过渡生硬、按钮上堆四行说明文字、什么都想加个标签——模型被灌过通用设计原则，但不理解 nuance 和语境[^podcast]。

更根本的是，她认为设计中有相当一部分是时尚：现在流行 Linear 和 Vercel 那种极简白，十年后这个审美就会过时。当所有 agent 都能完美复刻这类风格时，「一眼 agent 生成」本身会变成一种 tell——
就像她在 Pinterest 上刷到的那些精美但明显是 AI 的房间，以及她一眼辨认出 Claude 风格的米色底、微红文字。到那时，想要脱颖而出就得让人类做出模型给不出的新东西。文化语境一直在变，而模型不擅长「设计是文化中的信号」这件事。

![一眼 agent](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/260924-illo-agent-tell.jpg)

*配图：同款界面的流水线末端，质检员只放行那张带手绘痕迹的（AI 生成，Rio·Night 系列）*

判断的价值在她自己的故事里最清楚。ChatGPT 发布前一年，她在 AI 创业公司 Elicit 做第一位设计师，团队花几个月打造「AI 的新界面」：无限画布、卡片流、Notion 式可组合文档。每一场用户访谈，科学家用户都在说「太混乱了，
给我一张表格行吗」——他们原本就是在 Excel 里一行一篇论文地提取数据。最后团队回到表格，再把新能力一点点长在表格周围和里面。她的教训是：哪怕在创新，也要从用户熟悉的基本形（primitive）出发，聊天窗也不是 AI 的最终形态——
Codex 同样是在熟悉的聊天窗之外，扩展出了 worktree、标注和调试[^podcast]。

## 跨在分界线上的人

回到「设计工程师」这个词。Maggie 明确划掉了社交网络上流行的版本——那些炫酷的按钮悬停和加载动效创作者，「那些让 agent 做就行，而且那不是一份完整的职业」。她的版本是：依然是设计师，依然在乎产品的名词与动词和视觉，
但深入理解技术架构，关心「后端数据的形状决定了界面上什么是可能的」，并且通常亲手实现前端。工程师同事们乐于让出 CSS，因为他们在乎的本来是同步逻辑和数据流[^podcast]。

对谈末尾她留下一个没答完的问题：如果某天 agent 真的能完全按她的品味出稿，她会不会觉得「有趣的部分全没了」——一个完美界面凭空出现在面前，而自己没有参与制造，这件事是否还令人满足。她不确定。
主持人 Gergely 的感受是同一枚硬币的工程师面：agent 生成代码很好，但他不再亲手写代码之后，觉得自己与创造物的连接变淡了、变得更像一笔交易。

实现的价格正在归零，「决定造什么、判断好不好」的价格正在上涨。Maggie 的工作流——纸笔、Jig、spec、决策卡——本质上是把人的注意力从实现侧整体搬到了判断侧。搬过去之后的那块地，
agent 目前还进不来；至于将来进了之后我们是否还想要它进来，是下一个问题。

---

来源：本文依据 [The Pragmatic Engineer Podcast — Design engineering with Maggie Appleton](https://newsletter.pragmaticengineer.com/p/design-engineering-with-maggie-appleton) 期完整转写整理（约 88 分钟），引语为中文转译；Elicit 表格故事、Jig 与《零对齐》演讲细节可核对原节目对应时间戳。

[^podcast]: [The Pragmatic Engineer: Design engineering with Maggie Appleton](https://newsletter.pragmaticengineer.com/p/design-engineering-with-maggie-appleton): 2026 年 9 月发布，Gergely Orosz 主持
[^zero]: [One Developer, Two Dozen Agents, Zero Alignment](https://maggieappleton.com/zero-alignment): Maggie Appleton 的同名文章
