---
title: SkillOpt
description: 微软开源的 Agent Skill 优化框架，把 markdown skill 文档当作可训练参数，通过 rollout→reflect→aggregate→select→update→evaluate 循环自动迭代。
---

#### SkillOpt 核心思想：把 skill 文档当作可训练状态

SkillOpt 是微软开源的 Agent Skill 优化框架（L1）。它把一段 markdown skill 文档视为 frozen agent 的 trainable state，模型权重保持不变，仅对 skill 文本做有边界的 add / delete / replace 编辑（L1）。部署产物是一个紧凑的 `best_skill.md`（通常 300–2000 tokens），塞回原模型即可运行，不增加推理时的模型调用（L1）。

论文称在 6 个 benchmark、7 个目标模型、3 种执行 harness 上，52 个评估单元全部最好或并列最好；GPT-5.5 上平均提升约 +20pp（L1，来源为项目 README 自述）。

见：[microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)、[SkillOpt 论文 arXiv:2605.23904](https://arxiv.org/abs/2605.23904)


#### SkillOpt 训练循环与超参数类比

训练循环与深度学习训练器一一对应（L2）：

| 训练环节 | 作用 | 对应 DL 概念 |
|---|---|---|
| rollout | 用当前 skill 跑一批任务 | forward |
| reflect | 分析成功/失败案例 | gradient |
| aggregate | 汇总错误模式 | batch statistics |
| select | 在验证集上挑选严格提分的候选 edit | validation gate |
| update | 把 accepted edit 写入 skill | optimizer step |
| evaluate | 在 held-out 集上评估 | eval |

稳定性机制包括：textual learning-rate budget、rejected-edit buffer、epoch-wise slow update、meta skill。这些设计的目标是让 skill 训练像神经网络训练一样可复现，同时避免一次性 prompt 工程的漂移。


#### SearchQA：初始 skill 与优化后 best_skill.md 对比

初始 skill 几乎为空，仅有一句占位说明。经过优化后，best_skill.md 被扩展为多个规则章节（L1）：

- **Concise Answer Normalization**：答案要最短且无歧义，保留地理特征名（Lake/River/Bay），省略公司后缀等。
- **Context-Grounded Evidence Matching**：优先使用多个线索词同时出现的段落/标题。
- **Clue Interpretation and Answer Type**：根据 Jeopardy 式措辞推断期望答案类型。
- **Common Clue Traps**：处理反向关系、举例→父类等陷阱。

这些规则直接来自对 SearchQA 错误案例的反思，而不是通用 NLP 提示技巧。


#### ALFWorld：初始 skill 与优化后 best_skill.md 对比

ALFWorld 的初始 skill 已经是一份完整的人工 prompt，包含任务类型表格、通用原则和常见错误。SkillOpt 在此基础上插入了大量经过验证的细粒度规则（L1）：

- **Pick Two Object Bookkeeping**：记住同一个目标 receptacle，不要分散放置。
- **Hard Search-Loop Recovery**：已检查过的具体实例不再回访、3-4 次未命中后切换类别、禁止用“最近没提到”重置搜索状态。
- **Strict Search Ledger Action Filter**：每次空手游荡前必须选择未观察过的实例。
- **Destination-as-Source Lockout**：目标容器如果也是可能来源，检查一次后就锁定为最终目的地。
- **Pick-Two Phase Memory**：放置第一个物体后，如果记得第二个物体位置直接返回。

`<!-- SLOW_UPDATE_START -->` 区块包含 epoch-level 慢更新规则，防止 step-level 优化把 skill 带偏。


#### SkillOpt 关键结论与快速开始

- **输入不是裸问题**：需要初始 skill、benchmark 数据 split、系统提示模板（L1）。
- **输出是可读 markdown**：不是权重，可人工编辑和继续训练（L2）。
- **优化是增量编辑**：从 `initial.md` 出发，通过 add / delete / replace 生成 `best_skill.md`（L1）。
- **数据 split 多数只有 id 清单**：仓库自带的 `data/*/items.json` 通常只有 `id`，实际内容需自行准备（L1）。

快速开始命令：

```bash
pip install skillopt

python scripts/train.py \
  --config configs/searchqa/default.yaml \
  --split_dir /path/to/your/searchqa_split \
  --azure_openai_endpoint https://your-resource.openai.azure.com/ \
  --optimizer_model gpt-5.5 \
  --target_model gpt-5.5
```

见：[microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)
