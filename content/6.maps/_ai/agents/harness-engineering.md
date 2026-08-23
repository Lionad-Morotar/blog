---
title: Harness 工程
description: 结合控制论与真实 .codebuddy 配置，探讨 AI 辅助编程中 Harness 的双环控制、Rules/Hooks 实践、Token 成本优化与流程型 Skill 设计。
---

## Brief

Harness 是包裹在大模型外面的那层「壳」：它决定模型能看到什么、行为边界在哪里、如何知道自己做对了。LangChain 的实验显示，
仅换 Harness 就能让同一模型在 TerminalBench 2.0 上的通过率从 52.8% 提升到 66.5%，这说明很多 AI 编程瓶颈不在模型权重，而在模型外的代码层。本文围绕控制论前馈/反馈、Reflexion 工程化、
KV Cache 复用和流程型 Skill 设计四个切面，整理可落地的 Harness 工程经验。

#### Harness 双环控制：Rules 前馈 + Hooks 反馈

Harness 的本质可以映射到控制论的「双环控制」。Rules 是前馈控制（开环），在 AI 推理前就把约束注入上下文，相当于用先验知识划定搜索空间；Hooks 是反馈控制（闭环），在 AI 决定调用工具或工具返回结果时检测偏差，
执行 deny、ask 或提示。ReAct 的 Thought-Action-Observation 循环因此可以被接管：Thought 阶段由 Rules 约束方向，Action 阶段由 PreToolUse Hooks 拦截风险，
Observation 阶段由 PostToolUse Hooks 追加影响面分析。Nyquist 的负反馈稳定性定理指出，只要反馈增益小于 1，系统趋于稳定，而 Hooks 的 deny 机制正是对这种增益的截断器。
工程上这意味着不要只堆 Prompt，而要设计一套「行动前定边界、行动中能纠偏」的代码层。

见：[从 Harness 架构到 Token 经济学的探索](https://www.bestblogs.dev/article/70410bef)

#### Reflexion 的工程化：编码红线替代自动反思

Reflexion 论文提出在任务失败后自动生成反思报告并写入长期记忆，但在真实工程里，AI 自动反思往往空泛且不稳定。更可靠的工程化版本是从真实 Bug 中手工提炼规则，
写入 ai-coding-defense.md 并标记 alwaysApply，让每条规则在每次对话里自动注入；同时用 commit-quality.sh 在提交前扫描调试标记，命中即拒绝提交。
记忆持久化靠 .codebuddy/memory/ 目录，30 天以上的旧记录由 archive-old-memories.sh 自动归档；而 /compact 后的「失忆」则由 SessionStart Hook 重新注入关键约定。
这样就把论文里的「失败→反思→记忆→召回」流程，变成了可落地、可拦截、可审计的工程机制。

见：[从 Harness 架构到 Token 经济学的探索](https://www.bestblogs.dev/article/70410bef)

#### Token 经济学的 KV Cache 视角

理解 Token 成本不能只看字数，而要看 KV Cache。Transformer 自注意力中，每个 token 都要和历史所有 token 的 K/V 向量计算注意力，把已算过的 K/V 缓存起来后，前缀相同的请求就能复用，
计算成本降到约十分之一。System Prompt 和 alwaysApply Rules 正是高命中率的前缀，只要规则文本稳定，实际成本远低于字面 token 数。
项目通过消除 workspace_rules 与 project-rules 的重复注入、把 atomic-step-commit、search-first 等低频规则从 alwaysApply 改为按需加载、清理占位符，
把每对话基础开销从 23.5K tokens 降到 15K，降幅 36%。这提示 Rules 设计不仅是约束问题，更是缓存命中率和成本问题。

见：[从 Harness 架构到 Token 经济学的探索](https://www.bestblogs.dev/article/70410bef)

#### 流程型 Skill 的 disable-model-invocation 设计

不是所有 Skill 都需要 AI 每步重新推理。proto-sync、git-commit-push 这类流程型 Skill 只是按固定步骤执行脚本，加载后 AI 按步骤走即可，不需要每个步骤都触发大模型调用。
给它们设置 disable-model-invocation: true，就可以用 DeepSeek/GLM 等省配额模型完成。这与 dev Skill（~11K tokens，需多阶段推理）形成对比：
简单修改用 quick-iterate（~2K），流程型任务用 disable-model-invocation Skill，只有复杂多文件联动才加载完整 dev Skill。模型配额因此可以按任务风险分配——
Claude 25% 留给关键任务，DeepSeek 50% 作为日常主力，GLM 15% 跑批量轻量任务，Hy3 10% 作为尝鲜备选。

见：[从 Harness 架构到 Token 经济学的探索](https://www.bestblogs.dev/article/70410bef)

#### 长时运行 Agent 应收敛插件边界而非无限扩张

插件能力无限扩张与 Agent 长期运行叠加时，系统状态会变得无法推理。反方向的设计是严格的边界纪律：
核心独占持久化——一切可持久数据只分三类（对话条目、当前寄存器、追加账本），没有第四处；
插件只能以钩子与事件的形式观察和幂等介入，其产出不自行落盘，而是在消费它的那个事务里一并持久化；
若进程在该事务之前崩溃，钩子可能被重新执行，因此插件必须按幂等设计、不承担恢复语义。

这与「一切皆插件」的路线形成对照：能力越无边界，长期运行下的状态推理代价越高。工程上应把写权限视为
harness 层最警惕的扩张方向，宁可让插件只读与幂等，也不把恢复与持久化的复杂度下放给生态。

见：[Pi AgentHarness implementation specification](https://github.com/earendil-works/pi/blob/main/packages/agent/docs/harness.md)

#### 脚手架是成本主效应：小而专的 Harness 更适合良定义任务

一项 7 种脚手架 × 5 个模型 × 1 个固定 git 任务的受控实验显示，主导运行成本的是脚手架而非工具接口
（MCP 与 CLI 之争）：两个完全不带 MCP 的脚手架仅用 CLI 完成全部任务，比 MCP 组便宜 5~28 倍；
同一个本地 27B 模型跨脚手架的成本差异达 139 倍。

两个附带发现值得警惕：对良定义、可重复的任务，小而专的 harness 优于大而全的通用款；
agent 经常无视被指派的接口自行其是，因此不验证实际行为的对比测到的是未知混合物。
对选型的含义：通用性应体现在持久化、恢复、可组合这类正交能力上，而不是功能堆叠。

见：[The Scaffolding Matters More Than the Interface](https://arxiv.org/abs/2608.08654)

