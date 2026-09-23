---
title: SoL-Pi
description: NVIDIA 基于 Pi 的 auto-research 效率机制集，四类 token 浪费的机制归因与自动研究方法论。
---

SoL-Pi 是 NVIDIA 2026 年 9 月开源的 Pi 扩展（NVlabs/SoL-Pi，arXiv 2609.20519），全称 Scaling
Auto-Research Loops for Efficient Agent Harnesses。它不是再造一个 Agent，而是把 harness 改进当作
「受约束的效率搜索」问题：152 个提议方向经六阶段自动研究循环（轨迹 rollout、map-reduce 分析、提案、
实现、评审、训练集筛选与 held-out 验证），仅 4 条机制幸存（约 1/40）。在 EdgeBench 51 个 2-12 小时
长时程任务上保留 Pi 约 94% 平均分，token 流量减少 45%~49%，API 成本约降三分之一；GPT-5.6 Sol 后端上
超过模型原生 Codex harness。四条机制各砍一类 token 浪费：Action Fusion 把编辑与验证命令合并为一次
工具调用，砍模型往返；ObservationPack 把大输出归档本地、上下文只留 handle 与摘录、需要时按页 recall，
砍观测回放；Evidence-Preserving Reducer 让便宜模型先读长日志产出 receipt 且每条引用行必须能在归档
原文精确匹配，砍阅读成本；Online Context Compact 以子任务语义完成作为压缩候选点，砍死上下文。
边界同样清晰：短任务上浪费来不及累积故收益趋零；质量损失会跨机制组合累积；绑定 Pi 生态；
数据出自作者自建基准，发布初期无第三方复现。

见：[SoL-Pi: Scaling Auto-Research Loops for Efficient Agent Harnesses](https://nvlabs.github.io/SoL-Pi/)

#### 上下文压缩是投资回收问题而非容量问题

所有 harness 的压缩时机都被 KV-cache 推向晚期：提前压缩等于亲手作废缓存前缀，整段历史按未命中价重算。
因此「撑满大窗口不压缩」在缓存命中的定价结构下是理性默认而非缺陷。SoL-Pi 的 Online Context Compact
把压缩改成回收判断：子任务完成只是候选点，真正动手的条件是未来请求仍会反复读取的 token 量乘以单价，
大于本次重写成本。这个判断变成坑的时机是任务转折点之后——旧上下文永远不会再被读取，晚压就从省钱
变成纯浪费。

见：[SoL-Pi: Scaling Auto-Research Loops for Efficient Agent Harnesses](https://nvlabs.github.io/SoL-Pi/)

#### 单机制过能力门槛不等于组合无害

SoL-Pi 的每个机制单独验证时质量损失都在预声明容忍度内，但验证一次只评一个机制，小损失在机制组合时
静默累积，最终整体只保留基线约 94% 的分数。配套方法是把机制放在「精确的首次触发点」上评估——看它
实际改变行为的那些轨迹片段而非全局平均，否则收益与损失都被稀释到不可见。推论：给系统叠加多个各自
无害的折衷时，要预留组合损失预算，并逐个在触发点验证。

见：[SoL-Pi: Scaling Auto-Research Loops for Efficient Agent Harnesses](https://nvlabs.github.io/SoL-Pi/)

#### 自动研究循环的局部盆地与宽度价值

官方观察：单条研究线深度迭代 5-10 轮后，即使最强推理档位的模型也会对同一设计做越来越小的调整而非
换方向。宽搜放出一百多个独立想法，存活率仅约 1/40，但最有价值的 harness 改动恰恰来自这些稀有幸存者
引发的跳跃。宽度的价值不是提高平均成功率，而是让稀有跳跃可被发现。推论：跑自动优化循环时，与其加深
一条线，不如并行展开独立想法再让验证收敛。

见：[SoL-Pi: Scaling Auto-Research Loops for Efficient Agent Harnesses](https://nvlabs.github.io/SoL-Pi/)

#### 编排代码的生命周期决定自动化规模上限

SoL-Pi 的自动研究编排演化了三代，每代死因明确。编译式 YAML workflow 死于固定图覆盖不了边角案例，
反复停下来等人工修复；代码编排（lead agent 写协调代码）死于长生命周期协调器膨胀，启动一个新实验要
十小时以上改协调器；最终形态是一次性技能循环——编排代码只活一次 run 的长度，用完即弃，规模化变成
反复实例化模板而非持续膨胀一个协调器，唯一需要长期维护正确性的只剩共享模板本身。教训：自动化规模化
的第一瓶颈不是 agent 能力，是编排代码的生命周期管理。

见：[SoL-Pi: Scaling Auto-Research Loops for Efficient Agent Harnesses](https://nvlabs.github.io/SoL-Pi/)
