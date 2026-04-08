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

#### Project Glasswing：AI 时代的防御性网络安全联盟

2026 年 4 月，Anthropic 联合 AWS、Apple、Broadcom、Cisco、CrowdStrike、Google、
JPMorganChase、Linux Foundation、Microsoft、NVIDIA、Palo Alto Networks 等
11 家科技巨头发起 Project Glasswing——一项旨在保护全球关键软件基础设施的
网络安全倡议。

核心策略：向防御者提供 Claude Mythos Preview 模型（未发布的前沿模型），
使其在 AI 网络攻击能力扩散之前获得先发优势。Anthropic 承诺投入$100M 模型
使用额度，并向 Alpha-Omega、OpenSSF、Apache Software Foundation 捐赠$4M。

这种"先武装防御者"的思路反映了 AI 安全领域的战略焦虑——攻击能力的扩散
速度可能远超防御体系的响应能力。

见：[Project Glasswing - Anthropic](https://www.anthropic.com/glasswing)

#### Claude Mythos Preview 的网络安全能力突破

Claude Mythos Preview 在 CyberGym 基准测试中达到 83.1%（Opus 4.6 为 66.6%），
在数周内自主发现数千个零日漏洞——作为对比，Google Project Zero 这类顶级
人类团队每年仅发布 50-80 个漏洞。

代表性发现：
- OpenBSD 27 年漏洞：可远程 crash 任何运行该系统的机器
- FFmpeg 16 年漏洞：自动化测试工具已执行 500 万次测试仍未发现
- Linux kernel 漏洞链：从普通用户权限提升至完全控制服务器

这标志着 AI 模型的漏洞挖掘能力已跨越阈值——达到"超越绝大多数人类专家"
的水平，而攻击所需的成本、时间和专业门槛被急剧压缩。

见：[Claude Mythos Preview - red.anthropic.com](https://red.anthropic.com/2026/mythos-preview/)

#### 攻守失衡：AI 压缩网络攻击的时间窗口

AI 模型将"发现漏洞 → 开发利用工具"的时间从数月压缩到数分钟，使攻击者
能够以极低成本发动高频次、高复杂度的攻击。CrowdStrike CTO Elia Zaitsev
评论："攻击窗口的坍塌是结构性的——曾经需要数月的过程，现在用 AI 只需
几分钟。"

全球每年约$5000 亿的网络犯罪成本可能因 AI 的普及而激增。这种"攻守失衡"
的核心矛盾在于：防御体系需要持续投入和长期建设，而攻击者只需成功一次。

这解释了为什么 Project Glasswing 采取"防御优先"策略——在攻击能力扩散
之前，先让关键基础设施的维护者获得同等工具。

见：[Anthropic Claims Its New A.I. Model, Mythos, Is a Cybersecurity Reckoning - NYT](https://www.nytimes.com/2026/04/07/technology/anthropic-claims-its-new-ai-model-mythos-is-a-cybersecurity-reckoning.html)

#### 防御性部署：以 AI 制衡 AI 的博弈策略

Anthropic 选择有限度发布 Mythos Preview（仅向 45+ 防御组织提供），而非
全面开放，反映了一种"以 AI 制衡 AI"的战略思路。这种防御性部署的核心
假设是：攻击能力的扩散不可避免，但防御者可以通过先发优势建立"持久优势"。

这种策略的局限在于：它依赖于"负责任的 AI 厂商"能够控制能力的扩散，而
开源模型和地下市场可能绕过这些限制。Project Glasswing 本质上是一场与
时间的赛跑——在能力扩散之前，尽可能加固关键基础设施。

Anthropic 计划在 90 天内发布公开报告，并与安全组织合作制定"AI 时代的
安全实践建议"，包括漏洞披露流程、软件更新机制、供应链安全等。

见：[Project Glasswing - Anthropic](https://www.anthropic.com/glasswing)

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

## Medical AI Risk

#### 医学AI中的病理偏倚风险

多模态模型在医学场景中存在严重的"病理偏倚"（pathology-biased）——模型
倾向于"诊断"疾病，即使在没有图像的情况下也会生成病理偏倚的临床发现。
这种偏倚在医疗场景中极其危险：模型会自信地描述从未存在的病灶，
且不会表达不确定性。

Stanford 团队在VQA-RAD、MedXpertQA-MM、ReXVQA等医学基准测试中发现
60-99%的易感性。当明确告诉模型"没有图像，请猜测"时，性能反而显著下降，
说明存在"幻觉模式"与"猜测模式"两种截然不同的操作机制。

见：[MIRAGE: The Illusion of Visual Understanding](https://arxiv.org/abs/2603.21687)：
Stanford HAI 论文，2026年3月

## Framework

* [SAIF（安全人工智能框架）](/maps/_ai/framework/saif)
