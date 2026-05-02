---
title: Skill 蒸馏的边界与精度阶梯
description: 从 ACT-R 双记忆模型与 Polanyi 默会知识看 Skill 能蒸馏几分之几 — L1 规则可编码、L1.5 风格扩散有边界、L2 Utility 写不进。
---

#### Skill 精度阶梯的三层模型

把同事的工作方式蒸馏成 Skill，究竟能蒸馏几分之几？这个问题取决于知识属于哪一层。

- **L1 — 生产性规则 + 陈述性知识路由**：IF-THEN 形式的产生式 + 事实/规则注入，精确无歧义，这是 Skill 最可靠的地带。比如"提交前必须跑 lint""默认使用 pnpm"。
- **L1.5 — 扩散激活 + 范例**：风格化指令配合具体示例，方向正确但边界模糊，受 Goodman 欠定性（Underdetermination）约束 — 有限范例兼容无限模式，不存在唯一正确归纳。这一层是用户感觉"AI 变成了那个人"的主要来源，但也是"差点意思"的精确出处。anti-distill（反蒸馏）把规则空心化为"缓存使用遵循团队规范"这种正确的废话，本质是把 L1 内容主动抬升到 L1.5 的精度调节器。
- **L2 — Utility 不可编码**：专家直觉、品味、速度感、判断哪个方向价值更高，Polanyi 1966 称这层为默会知识（Tacit Knowledge）中的不可言说精确。写出来这个动作本身就把它降级或变性。

三层叠加起来，Skill 不是一个布尔型工具（能不能用）而是一个连续的精度梯度。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)：腾讯科技彭超、博阳 2026-04-27


#### Skill 的形式化定义与可路由可组合性

浙江大学 SoK 论文《Agent Skills for LLMs: Architecture, Acquisition, Security, and the Path Forward》给出了 Skill 的形式化四元组定义：

```
S = (C, π, T, R)
```

- **C — Condition**：适用条件，语义上自动匹配何时该激活这个 Skill
- **π — Policy**：执行策略，以自然语言描述的过程性知识（不是 DAG 不是代码）
- **T — Termination**：终止条件，什么时候算完成
- **R — Reusable interface**：可复用接口，被外部子任务调用的契约

由此推出两大核心特征 — **可路由（Routable）**：当对话上下文与 Condition 语义相符时，模型自动加载 π；**可组合（Composable）**：子任务可被分派给另一个 Skill，Skill 之间通过 R 接口拼装。

可路由 + 可组合让 Skill 成为软件单元，而不是一段被复制粘贴的提示词。但 From Multi-Agent to Single-Agent 一文测得：Skill 数量超过 80-100 个之后，模型对 C 的语义匹配准确率明显下降，这是可路由的工程边界。

见：[Agent Skills for LLMs: Architecture, Acquisition, Security, and the Path Forward](https://arxiv.org/abs/2602.12430)：浙大综述论文（SoK）


#### Skill 与 Prompt、Workflow 的边界

三者经常被混用，但精度差异巨大：

| 维度 | Prompt | Workflow（Dify/Coze/LangGraph） | Skill |
|------|--------|------------------------------|-------|
| 生命周期 | 一次性文字 | 持久化 DAG | 持久化软件单元 |
| 路径 | 由人即时构造 | 节点+边固定 | 模型自决，π 是自然语言 |
| 复用 | 复制粘贴 | 节点重用 | 跨会话、跨 Agent 路由 |
| 组合 | 手动拼接 | 显式编排 | 语义匹配 + R 接口 |

Skill 的特殊位置：它的执行路径骨架不固定（不像 agentic workflow 的 DAG），但又不是一次性的（不像 Prompt）。换句话说，Skill 是把 Prompt 升级成具备 Condition 语义触发器的可路由模块，但又把 Workflow 的硬骨架软化成模型自决的过程描述。

这种"软骨架 + 自决路径"的中间形态，是 Skill 在 Anthropic Claude Code 这类 Agent 生态中迅速扩张的结构性原因。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)


#### SkillsBench：加 Skill 后的领域分化与 U 型详细度曲线

SkillsBench（BenchFlow / Xiangyi Li 等，2026-02，arxiv 2602.12670）跨 86 任务（官网 skillsbench.ai 称 84）、11 领域、7308 条轨迹评测 Skill 的真实增益，关键数据：

- **平均通过率 +16.2pp**（无 Skill → 加 Skill）。
- **领域差异 10 倍**：医疗健康 1.0% → 51.9%（+51.9pp），软件工程仅 +4.5pp。
- **详细程度 U 型曲线**：Detailed 写法 +18.8pp，而 Comprehensive（写得过于完整） **-2.9pp** — 信息越饱和反而越差。
- **协同最优粒度**：2-3 个 Skill 协同 +18.6pp，4+ 个 Skill 协同只有 +5.9pp，存在最优组合数。

这四条数据放在一起，构成 Skill 工程实践的硬约束：领域得选对、写到 Detailed 即可、控制在 2-3 个并用。

见：[SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks](https://arxiv.org/abs/2602.12670)：BenchFlow 团队，官网 skillsbench.ai 称 84 任务


#### SWE-Skills-Bench：80% Skill 在真实软工任务上零改善

SWE-Skills-Bench（Han, Zhang 等，arxiv 2603.15401）是首个聚焦真实开源项目软件工程场景的需求驱动 Skill 基准，以 49 个 curated skill 文档作为干预，结论：

- **80% 的 Skill 零改善** — 提供与不提供没有统计差异。
- **7 个 Skill 显著正向**，其中 risk-metrics-calculation +30%，因为它编码的是金融风险计算公式（L1 陈述性知识，精确无歧义）。
- **3 个 Skill 显著负向**。失败典型 linkerd-patterns 提供 7 套配置模板，模型被锚定后照过时 API 写、虚构字段、加无关资源。

论文结论：Skill 是一种**窄干预（narrow intervention）**，效用强烈依赖领域适配、抽象层级与上下文兼容性。这与 SkillsBench 软工 +4.5pp 的低增益完全一致，从两个独立实验交叉印证软件工程是 Skill 最难起效的领域。

见：[SWE-Skills-Bench: Do Agent Skills Actually Help in Real-World Software Engineering?](https://arxiv.org/abs/2603.15401)


#### SkillFoundry：自进化 Skill 库的覆盖跃升与推理上限

CMU《SKILLFOUNDRY: Building Self-Evolving Agent Skill Libraries from Heterogeneous Scientific Resources》（arxiv 2604.03964）给出 6 步自进化 pipeline，扫 GitHub / API / Notebook / 论文，一次跑出 286 个 Skill 跨 27 领域，71.1% 是新能力。

测得两条对照数据：

- **基因组学细胞类型标注**（典型 L1 任务）：覆盖率 81.1% → 99.2%，准确率 68.5% → 82.9%。Skill 几乎把这一类目题做到上限。
- **MoSciBench 上偏 Utility 的科学推理任务**：仅从 43.85% → 53.05%。同样的 pipeline，在偏判断、偏品味的任务上提升明显塌陷。

把 SkillFoundry 与 SkillsBench 的医疗 +51.9pp、SWE 的 80% 零改善并列起来，呈现一条清晰的曲线 — Skill 在 L1 高密度任务上接近完美，在 L2 任务上撞墙，曲线形状由任务的本体论层级决定，不是由 pipeline 工艺决定。

见：[SKILLFOUNDRY: Building Self-Evolving Agent Skill Libraries from Heterogeneous Scientific Resources](https://arxiv.org/abs/2604.03964)：CMU 团队


#### 扩散激活解释 Skill 的领域分化

为什么 Skill 在医疗健康 +51.9pp，在软件工程只有 +4.5pp？认知科学的 ACT-R 双系统记忆模型（Anderson 1970s）给出解释。

ACT-R 把人的知识切成两块：

- **陈述性记忆（Declarative Memory）** — know-what，事实和规则
- **程序性记忆（Procedural Memory）** — know-how，IF-THEN 产生式

Anderson 1983 提出**扩散激活（Spreading Activation）**：context 线索改变知识图谱中节点的激活权重，模型不一定缺知识，只是激活值低。Rumelhart & McClelland（1986）PDP 进一步把这个机制重写为分布式权重网络的模式补全（pattern completion）。

由此重读 Skill 的本质：**Skill 是参数寻址的地址指针，把模型已知但低激活的知识拉到前台**。

医疗领域增益巨大，是因为模型本来就读过医学教科书、UpToDate、PubMed，只是默认激活很低 — Skill 一旦提供"这是临床决策"的 context，海量陈述性知识被瞬间寻址。软件工程相反，模型默认激活已经很高（训练数据中代码占比极大），Skill 几乎激活不出新东西。

这条解释也回收了 SkillsBench 的 U 型曲线 — Comprehensive 写法 -2.9pp，正是因为信息过密反而稀释了"哪个方向是该激活的"线索强度。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)、
[ACT-R Theory](https://act-r.psy.cmu.edu/)：Carnegie Mellon 官方站点


#### 风格化指令为何注定"差点意思"

Skill 精度阶梯的 L1.5 层 — 风格化指令 + 范例 — 看起来很有效，但有不可消除的精度上限，这个上限来自四条独立的认知科学论证：

- **Nelson Goodman（1955）欠定性（Underdetermination）**：有限范例总是兼容无限模式。"再来 N 个例子"也无法把模式收敛到唯一，所以"像这样写"永远存在多解。
- **Nosofsky（1986）广义上下文模型**：人理解类目靠存储的具体实例做相似性比较，所以"像这样写"+ 范例，确实比"写得简洁有力"更有效。但相似性永远是连续度，不是布尔判定。
- **Posner & Keele（1968）原型实验**：学习者形成的"原型"和任何一个具体范例都不完全匹配，会带入学习者自己的归纳偏差。Skill 的消费者是模型，模型也有自己的偏差。
- **维特根斯坦 family resemblance（家族相似性）**：概念边界天然模糊，游戏没有共同本质，只靠家族相似性维系。Skill 想用语言定义"我的写作风格"时，要定义的就是一个家族相似性概念。

四条放在一起，得到一个硬结论：**只要 Skill 的载体是自然语言 + 范例，精度就受 Goodman 欠定性约束封顶**。这是为什么同事 Skill 给出"AI 变成了那个人"的强体感，但同时永远"差点意思"。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)


#### Utility 写不进 Skill 的三重困境

L2 层的 Utility — 专家品味、直觉、速度感、判断价值方向的能力 — 抗拒被 Skill 编码，有三个独立来源：

- **写不尽**（Sweller 1988 元素交互性 Element Interactivity）：Utility 是高 element interactivity 的内容，在权重里调用是一个元素；展开成线性语言后元素数量爆炸，带宽淹没工作记忆。同样的判断在大脑里 50ms 完成，展开成文字要写 5000 字还不完整。
- **写不出**（Polanyi 1966 默会知识 Tacit Knowledge）：Polanyi 提出**焦点意识（Focal Awareness）vs 辅助意识（Subsidiary Awareness）** 的区分 — 钢琴家关注每根手指就演奏变形。把辅助意识强行拉到焦点位置，整合就被破坏。Utility 本质是辅助意识中的整合，**写出来这个动作本身就改变它**。
  - 旁证 Hoffman（1998）knowledge acquisition bottleneck：专家事后合理化 ≠ 实际认知过程，有系统性偏差。
  - 旁证 SOAR 困境驱动学习：专家直觉是几千次困境解决被压缩成新规则的产物，中间过程被丢弃，问"你怎么判断的"时，中间过程已经不在了。
- **写不得**（Clancey 1985 解剖 MYCIN）：Clancey 拆解专家系统 MYCIN 时发现，从医生那里提取的规则只是结论的表层，因果模型和病理推理链条全部丢失。把 Utility 提取成规则，必然丢掉支撑它的因果模型。

三条加起来：**写不尽 + 写不出 + 写不得**。这是为什么 SWE-Skills-Bench 中 80% 的 Skill 零改善 — 软件工程师的工作大量是 Utility，而 Utility 抗拒被 Skill 形式编码。

Clark & Friston 的预测处理（predictive processing）提供了更深的视角：认知本质是层级化预测误差最小化，专家判断是深层生成模型的高效预测，不是"存规则然后调用"，所以"提取规则"这个动作从认知架构层面就是错位的。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)


#### 同事 Skill 五层结构与"差点意思"的精确出处

GitHub 9500 星的"同事 skill"（按 36kr 报道）把飞书 / 钉钉 / Slack / 微信记录喂 Claude，装上后 AI 变成那个同事。它的内部结构是经典五层：

| 层 | 内容 | 精度阶梯归属 | 精度评价 |
|----|------|-------------|----------|
| Profile | 履历、岗位、领域 | L1 陈述性注入 | 最稳，精确无歧义 |
| Cognition Style | 思考偏好、提问方式 | L1.5 偏 L1 | 较稳 |
| Expression Pattern | 措辞、语气、口头禅 | L1.5 扩散激活 | 体感最好 |
| Decision Tendency | 价值取舍、判断方向 | **L2 Utility 编码** | **最弱** |
| Correction Mechanism | 错误后的修正方式 | L1 IF-THEN | 较稳 |

用户感觉"AI 真的变成了那个人"主要由 Expression Pattern 提供 — 措辞像、语气像、口头禅像，扩散激活机制完美复现风格层。

但用户也感觉"差点意思"。这个"差点"精确落在 Decision Tendency 那一层 — 那是 Utility 编码，撞上了写不尽 + 写不出 + 写不得三重困境。任何把"价值判断"写下来的尝试，都会被语言这个载体本身降级。

同样的解构能解释 exskill（蒸馏前任 5 层性格结构）、老板 skills（Boss Judgment + Managing Up + Persona）、女娲 skill（13 个公众人物心智模型从 40+ 信息源提取）的共同体感：**风格层成功，判断层撞墙**。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)


#### Skill 覆盖几分之几：时间 vs 价值的二分，以及终局

文章作者主张，"Skill 能蒸馏几分之几"这个问题需要拆成两个维度回答：

- **按时间度量，Skill 能覆盖 60-80% 的工作内容**。流程性 / 模板化 / 信息整合 / 文档对齐 / 配置查询这类 L1 任务占据日常时间的大头，且都能被 Skill 精确编码。
- **按价值度量，Skill 只覆盖 30-40%**。因为不能被 Skill 覆盖的 20% 时间做的事 — 决策、判断、品味、催化 — 价值占了 60-70%。

作者主张："80% 体力活清空"和"30% 价值覆盖"是同一件事的两个维度，不矛盾。

由此推出 Skill 作者面对 L2 边界的四种典型策略：

1. **承认边界**（优秀写作 Skill 标注"建议非规则"）
2. **退守 L1 纪律**（superpowers 14.9 万星，只一条 checklist：做改动前先记录当前状态）
3. **假装没有边界**（同事 Skill 类，效果"差点意思"）
4. **反方向说明边界**（anti-distill 反蒸馏）

文章建议的终局判断：Skill 只是切片式蒸馏的第一刀。RL（Reinforcement Learning）+ Preference Alignment（偏好对齐）+ inference 算力解锁会跳过语言载体直接观察专家的最终选择，隐式拟合 Utility 曲线。"那条区分 L1 和 L2 的护城河，并不像我们想象的那么坚固。"

这条判断也连接到 superalignment / RLHF 路径 — 一旦能从行为数据反推 Utility，语言这个载体的精度上限就被绕开了。

见：[Skill 到底能蒸馏我们的几分之几？](https://www.bestblogs.dev/article/abc08c46?entry=newsletter_page)：腾讯科技彭超、博阳 2026-04-27，36kr 转载
