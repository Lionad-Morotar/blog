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

#### AI 安全报告质量的"突变点"（2026 年 2-3 月）

2026 年 2-3 月间，开源社区观察到一个现象级的拐点：AI 生成的安全报告质量突然从"AI slop"跃升为"真实可靠的报告"。

Linux kernel 维护者 Greg Kroah-Hartman 在 KubeCon Europe 采访中描述："几个月前，我们收到的是'AI slop'——那些明显错误或低质量的 AI 生成安全报告，甚至有点搞笑，不构成威胁。但一个月前，世界switched。现在我们收到的是真实的报告。"

这一转变并非个例——所有主要开源项目的安全团队都观察到相同模式。Greg 推测可能有两个原因：要么是很多工具同时变得更好，要么是研究人员开始认真对待这个领域。

关键影响：较小的开源项目面临更大压力——它们缺乏 Linux 内核团队那样的人力和分布式结构来吸收突然涌现的 AI 生成 bug 报告洪流。

见：[A quote from Greg Kroah-Hartman - Simon Willison](https://simonwillison.net/2026/Apr/3/greg-kroah-hartman/)、[Linux kernel czar says AI bug reports aren't slop anymore - The Register](https://www.theregister.com/2026/03/26/greg_kroahhartman_ai_kernel/)

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

## Jailbreak

#### 安全神经元：LLM 对齐的稀疏脆弱性

当前对齐方法（RLHF、DPO 等）的安全行为并非分布式地"渗透"在整个模型中，而是高度集中于极少数专门化神经元。

「已核实」NeuroStrike（NDSS 2026 Distinguished Paper）在 LLaMA 系列上的实验表明，修剪不到 0.6% 的神经元即可实现高攻击成功率，多模态图像测试甚至达到 100%。这意味着安全对齐在神经元层面存在结构性脆弱——安全行为是"嫁接"在基础能力之上的薄层，而非深度融合。

有分析认为，这种稀疏性颠覆了"对齐深度"的传统假设。如果安全机制仅依赖 <1% 的神经元，那么任何能够定位这些神经元的攻击者都可以轻易瓦解整个安全约束体系。

见：[NeuroStrike: Neuron-Level Attacks on Aligned LLMs](https://arxiv.org/abs/2509.11864)：NDSS 2026 杰出论文，wu-lichao/NeuroStrike-Neuron-Level-Attacks-on-Aligned-LLMs（GitHub）

#### 神经元级攻击的技术谱系：白盒、黑盒与迁移

神经元级攻击已形成从白盒到黑盒的完整技术谱系。

「已核实」白盒场景（模型权重可访问）直接定位并抑制安全神经元。黑盒场景利用安全神经元的跨模型迁移性——在开源 surrogate 模型上训练对抗性提示生成器，再部署到闭源目标模型。NeuroStrike 在 20+ 开源模型上验证了安全神经元的"位置共性"：不同 LLM 家族中负责安全决策的神经元往往位于相似的层/位置。

有分析认为，这种迁移性颠覆了"闭源即安全"的假设。即使攻击者无法访问目标模型内部，也能通过开源模型制备有效的越狱攻击。

见：[NeuroStrike 论文](https://arxiv.org/abs/2509.11864)：涵盖白盒与黑盒攻击的完整框架

#### Abliteration：单方向消融的极简攻击

Abliteration（"ablation" + "literation"）是一种无需训练、无需数据即可绕过安全对齐的方法。

「已核实」其核心洞察是：拒绝行为可能由残差流中的单一潜在方向主导。通过对比有害与无害提示在各层的激活差异，找到最大区分方向（"拒绝方向"），然后将其投影归零，即可使模型"忘记"如何拒绝。该方法仅需几次前向传播即可完成，门槛极低。

后续防御研究（arXiv:2505.19056）提出"扩展拒绝微调"（extended-refusal fine-tuning）——将安全信号分散到多个维度而非单一方向，从根本上消除单点脆弱性。

见：[An Embarrassingly Simple Defense Against LLM Abliteration Attacks](https://arxiv.org/abs/2505.19056)：防御论文，从侧面验证攻击有效性、[Heretic](https://github.com/p-e-w/heretic)：Abliteration 的开源实现工具

#### 神经元移植：训练免费的安全恢复

有害微调（Harmful Fine-tuning）是攻击者通过少量有害数据微调开源模型以解除安全约束的常见手段。

「已核实」AAAI 2025 的 NLSR（Neuron-Level Safety Realignment）框架提出了一种训练免费的安全恢复方案：对比模型在有害微调前后的神经元状态变化，识别出安全关键神经元的退化模式，然后从原始参考模型中"移植"这些神经元的参数。该方法无需重新训练，计算成本极低。

有分析认为，NLSR 的有效性隐含了一个关键假设：安全神经元在有害微调中发生的是"局部退化"而非"全局重组"，因此局部修复足以恢复整体安全行为。

见：[NLSR: Neuron-Level Safety Realignment](https://arxiv.org/abs/2412.12497)：AAAI 2025

#### 安全对齐的分布式假设危机

作者主张，当前主流对齐方法隐含一个未被充分检验的假设：安全行为是通过微调"分布式地"融入模型的。但神经元级攻击研究揭示的事实令人不安——安全行为可能极度稀疏和局部化。

这一发现提出了三重挑战：对齐的"深度"可能被高估（安全是薄层而非深度融合）；对抗鲁棒性的基础不牢（稀疏目标易被定向攻击）；需要重新思考对齐目标——从"行为对齐"（输出符合安全规范）转向"结构对齐"（内部表征本身具备安全属性）。

这与机制可解释性领域的 broader 议题相连：如果模型的关键行为都如此稀疏，那么 AI 安全的根基可能需要根本性重构。

见：[Unraveling LLM Jailbreaks Through Safety Knowledge Neurons](https://arxiv.org/abs/2509.01631)：EACL 2026，从可解释性角度验证安全神经元的存在

## Framework

* [SAIF（安全人工智能框架）](/maps/_ai/framework/saif)
