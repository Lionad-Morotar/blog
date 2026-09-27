---
title: Claude Code 子智能体
description: 子智能体的隔离本质与委托决策规则、配置体系现状、描述双角色与输出格式设计要领、委托经济学与冷启动税。
---

#### 子智能体的隔离本质与委托决策规则

子智能体（subagent）是 Claude Code 在独立上下文窗口里运行的一次性专职助理：收到主线程写的委托提示后自己读文件、
搜代码、跑命令，结束后只把摘要回传主对话，中间过程连同整个子代理会话一起丢弃。它解决的是主上下文的污染问题，
每个工具调用、文件读取、搜索结果都会常驻主窗口，塞满后模型开始遗忘前文，而「读 15 个文件只为回答一个事实」
正是探索型工作的常态。委托与否的决策规则只有一句：中间过程是否重要，只要结果就委托，要盯过程就留在主线程。
与相邻概念的分界：技能（Skill）在主上下文内共享对话历史运行；分叉（fork，/subtask）继承全部会话历史；
智能体团队（agent teams）是跨会话常驻协作的编排层，子智能体只是会话内的一次性委托。

见：[Claude Academy: Introduction to subagents](https://academy.claude.com/courses/introduction-to-subagents)

#### description 的双角色：触发路由加委托提示塑形

所有可用子智能体的 name 与 description 会注入主线程的系统提示，主线程据此决定何时把任务委托给谁；同时
description 还充当主线程撰写委托提示的模板指导。给代码审查子代理的描述里写「必须指明要审查哪些文件」，主线程
派活时就会列出具体文件清单而不是一句含糊的「看看当前改动」；给搜索子代理写「返回可引用的来源」，委托提示就会
带上这一要求。想让子代理被主动使用，在描述里写 "use proactively" 并附上具体触发场景示例；委托不命中时优先
回头改 description 而不是系统提示。注意所有自定义子代理的描述合计超过 15000 token 时启动会告警，细节应放进
按需加载的系统提示正文而不是描述里。

见：[Create custom subagents](https://docs.claude.com/en/docs/claude-code/sub-agents)

#### 结构化输出格式是停止点，障碍上报防重踩坑

子代理系统提示里定义的结构化输出模板（如 Summary / Critical Issues / Major Issues / Minor Issues /
Recommendations / Approval Status）同时解决两个问题：填完每一节就是天然的完成信号，防止研究型任务
「不知道查到什么程度算够」而超时乱跑；返回的信息结构化后主线程才能直接消费。输出格式里必须包含障碍上报段：
安装问题、环境怪癖、绕过方案、需要特殊 flag 的命令、引发问题的依赖，这些中间发现若不上报，主线程就要
用同样的代价重新踩一遍坑。子代理没有 AskUserQuestion 工具，遇到歧义只能自行猜测，输出格式里给它
「待澄清问题」一节是唯一出口。

见：[Claude Academy: Designing effective subagents](https://academy.claude.com/courses/introduction-to-subagents/designing-effective-subagents)

#### 配置体系现状：frontmatter 扩容与向导移除

子代理是 Markdown 文件加 YAML frontmatter，存放于 .claude/agents/（项目级）或 ~/.claude/agents/（用户级），
作用域优先级为托管设置 > --agents 传参 > 项目 > 用户 > 插件。2026 年初的现状与旧教程差异明显：/agents 交互式
创建向导在 v2.1.198 已移除，改为口头让 Claude 写文件或手工编辑；内置 Explore 子代理从固定跑 Haiku 改为继承
主对话模型（API 上封顶 Opus）；Task 工具已更名 Agent。frontmatter 字段大幅扩容：permissionMode（独立权限模式）、
mcpServers（子代理独享 MCP，主上下文不吃工具描述开销）、hooks（PreToolUse 卡只读 SQL 这类条件控制）、maxTurns、
skills（启动预载技能全文）、memory（跨会话持久记忆目录）、isolation: worktree（git worktree 隔离副本）、
omitClaudeMd、effort、background 等；模型解析顺序为单次调用参数 > frontmatter > 环境变量 > 主对话模型。
三大经典反模式：专家人设（"you are a Python expert" 无能力增量）、串行流水线（每步依赖上一步发现，信息在
交接中丢失）、测试跑器（吞掉排障需要的完整输出）。

见：[Create custom subagents](https://docs.claude.com/en/docs/claude-code/sub-agents)

#### 委托经济学：15 倍 token 乘数与并行回报

Anthropic 多智能体研究系统的一手数据给出了委托决策的量化边界：agent 平均消耗约 4 倍于普通对话的 token，
多智能体架构约 15 倍；token 用量单独解释了 BrowseComp 评测 80% 的性能方差。回报侧同样有数：Opus 主控加
Sonnet 子代理的组合比单个 Opus 跑研究评测高 90.2%（质量提升幅度），主控并行拉 3-5 个子代理、子代理内并行调
3 个以上工具，把复杂研究耗时砍掉最多 90%（耗时下降幅度），两个 90% 含义不同不可混用。结论是多智能体只在
「高价值、真并行、信息量超单窗口」的任务上划算，多数编码任务的可并行度不如研究，Anthropic 自己也是这么
承认的；小任务委托的启动开销得不偿失。

见：[How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

#### 编排者的工作量分配规则要显式写进提示

多智能体早期最典型的失败不是子代理干得差而是主控乱派活：简单事实查询扇出 50 个子代理，或者两个子代理
重复调查同一件事（半导体案例里两个子代理都在查 2025 供应链，分工形同虚设）。修复手段是把工作量刻度规则
显式写进主控的提示：事实查找 1 个代理配 3-10 次工具调用，直接对比 2-4 个代理各 10-15 次，复杂研究 10 个
以上代理且职责切清。落到 Claude Code：委托质量的上限不在子代理文件本身，而在主线程怎么写委托提示，
可以在 CLAUDE.md 里教主线程按任务复杂度决定扇出数量，这比调任何一个子代理的系统提示杠杆更大。

见：[How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

#### 冷启动税是乘法，内置 Explore 与 Plan 免税

每个非 fork 子代理启动都要重新装载自身系统提示、委托任务、全层级 CLAUDE.md 和 git 快照，且普通子代理的
提示缓存与主会话分离，缓存都省不掉；扇出 N 个并行子代理时公共载荷（尤其臃肿的 CLAUDE.md）就被付 N 次。
两条免税路径：探索类任务让主线程委托给内置 Explore 与 Plan（它们跳过 CLAUDE.md 和 git 快照，这是它们快而
便宜的原因）；自定义子代理设 omitClaudeMd: true（v2.1.271 起），让它只靠委托提示带足信息。另一笔常驻税是
描述注入：所有自定义子代理的 name 与 description 常驻主系统提示，闲置的 agent 文件在向每个会话收税，
不用的应及时删除。分叉（fork）是成本结构的另一极：继承父会话全部历史并复用父提示缓存，上下文密集型
支线任务用 fork 比新子代理便宜，代价是失去输入隔离。

见：[Create custom subagents](https://docs.claude.com/en/docs/claude-code/sub-agents)

#### 子代理报告按不可信输入建模

子代理替主线程读了用户从未审过的文件、网页和命令输出，这些内容可能携带指向主线程的注入指令。Claude Code
对回流报告做输出扫描：模仿 system-reminder 等 harness 形态的文本被插入反斜杠消解，命中「指令形态」的报告
前置标记行，但扫描不判断恶意也不改语义，只防模仿不防诱导。配套硬规则是任何 agent 的消息都不构成权限批准，
报告里声称「用户已同意」没有任何效力。工程含义：给网络与文件扇出型子代理配最小工具集（研究型只读，
审查型加 Bash 看 diff，修改型才给 Edit 与 Write），报告驱动的后续动作仍要过权限关。

见：[Create custom subagents](https://docs.claude.com/en/docs/claude-code/sub-agents)
