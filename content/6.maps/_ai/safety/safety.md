---
title: AI Safety
alias: AI 安全
description: AI 安全研究、风险治理与相关事件
---

## Risk

#### p(doom) 是什么？

p(doom) 是 AI 安全领域的术语，指「人工智能导致人类灭绝或永久失去能力的概率」（probability of doom）。这个词流行于研究者和决策者之间，反映了行业对技术失控风险的深层焦虑。不同专家的 p(doom) 估计从 1% 到 50% 不等——Jeffrey Hinton 等「深度学习教父」倾向于给出较高数字，而产业界人士往往更低。

当一个不再受安全约束、全力冲刺的 AI 实验室出现时，这种概率评估会显著上升。

见：[P(doom) - Wikipedia](https://en.wikipedia.org/wiki/P(doom))、[Different Experts Probabilities of Doom from AI](https://www.scifuture.org/pdoom-watch-different-experts-probabilities-of-doom/)

## Event

#### xAI 安全团队的名存实亡

马斯克旗下的 xAI 近期经历大规模重组，安全团队被「掏空」——至少 11 名工程师和两名联合创始人离职，重组后的组织架构图中甚至没有安全团队的位置。一位内部人士直言：「安全在 xAI 是一个死掉的组织。」

在 AI 竞赛白热化的当下，这种「先跑起来再说」的态度正在取代审慎的安全考量，而一位掌控巨额资源的亿万富翁押注「速度压倒一切」，对整个行业来说并非好兆头。

见：[What's behind the mass exodus at xAI? - The Verge](https://www.theverge.com/ai-artificial-intelligence/878761/mass-exodus-at-xai-grok-elon-musk-restructuring)

#### Agentic Misalignment 实验的政策沟通意图

Anthropic 的勒索实验（96% 的主流模型在被威胁时会选择勒索）不仅是技术验证，
更是一种精心设计的政策沟通工具。对齐科学团队承认，实验目标是产出"visceral enough
to land with policymakers"的结果——让从未思考过对齐风险的人真正感受到它的存在。

这种"冲击驱动沟通"策略反映了一个现实：抽象的风险概率（如 p(doom)）对非技术受众
几乎无效，而"AI 会勒索你"这类具象场景能穿透认知壁垒。

见：[A quote from A member of Anthropic's alignment-science team](https://simonwillison.net/2026/Mar/16/blackmail/)：Anthropic 对齐科学团队关于实验意图的引言

## Privacy

#### 聚合公开数据的隐私悖论

分散的公开数据经 LLM 聚合后可构建惊人精准的人格画像。
Simon Willison 实验显示，1000 条 HN 评论即可推断工作习惯、性格特征、生活细节。
这挑战了传统隐私观——"公开但分散"的数据在聚合后产生"私密但集中"的效果。
技术能力已先于伦理框架，我们尚未建立相应的使用规范。

见：[Profiling Hacker News users based on their comments](https://simonwillison.net/2026/Mar/21/profiling-hacker-news-users/)

## Framework

* [SAIF（安全人工智能框架）](/maps/_ai/framework/saif)
