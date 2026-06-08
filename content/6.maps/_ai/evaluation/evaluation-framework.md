---
title: Evaluation Framework
description: 大语言模型评估框架与基准测试，包括 lm-evaluation-harness、BigCode 等统一评估工具。
original_path: _ai/evaluation.md
---
## lm-evaluation-harness：统一评估框架

lm-evaluation-harness 由 EleutherAI 开发，提供统一的接口测试生成式语言模型在 60+ 学术基准上的表现，解决了各基准实现不一致、结果不可比的问题。支持 MMLU（多学科知识，15,908 题）、GSM8K（数学推理，1,319 题）、HellaSwag（常识推理）、HumanEval（代码生成）、BBH（复杂推理）、TruthfulQA（事实性）等核心基准。

见：[lm-evaluation-harness GitHub](https://github.com/EleutherAI/lm-evaluation-harness) | [lm-eval 使用指南](https://blog.csdn.net/M00Rue_/article/details/148063263)

## BigCode：代码能力评估

BigCode 项目专注于代码大模型的评估，提供 HumanEval（手写函数补全，164 题）、MBPP（Python 编程问题，约 1000 题）、DS-1000（数据科学场景代码）、BigCodeBench（更复杂的实际编程任务，需调用多个工具）等基准。HumanEval Pro 和 MBPP Pro 是新一代基准，支持自调用代码生成评估。

见：[BigCode 项目](https://bigcode-project.org/) | [BigCodeBench](https://huggingface.co/blog/leaderboard-bigcodebench) | [EvalPlus Leaderboard](https://evalplus.github.io/leaderboard.html)

## 评估维度：知识、推理、代码、安全

基础能力包括知识问答（MMLU、ARC）、阅读理解（RACE、SQuAD）、推理能力（GSM8K、BBH）；专业能力涵盖代码（HumanEval、MBPP）、科学（GPQA、TheoremQA）、多语言（XNLI、MGSM）；安全性评估包括有害内容检测、越狱测试（AdvBench、HarmBench）、指令遵循（IFEval）。

见：[Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)

## 评估最佳实践

避免数据污染：使用训练集 cut-off 日期后的基准，检查训练语料是否包含测试数据，对敏感任务使用动态评估（hold-out）。统计显著性：多次运行取平均，报告标准差，使用配对 t-test 比较模型差异。

见：[自定义评估基准构建](https://blog.csdn.net/gitblog_00326/article/details/151852170)

## 效用问题（Utility Problem）

#### 为什么 AI 如此聪明却不实用

当前 AI 在 MMLU、HumanEval、Codeforces 等基准上达到博士水平，能完成人类难以企及的任务，但并未显著改变 GDP（估计仅影响了 1%）。这种"聪明但不实用"的矛盾被称为"效用问题"，核心原因在于评估设定追求"难题"，而真实价值在于"实用"。

#### 学术界评估与现实任务的错位

当前 AI 评估基于 i.i.d（独立同分布）假设：500 个任务并行执行后取平均。但真实场景是持续学习——软件工程师每解决一个问题就积累代码库知识，下次解决更快。学术界缺乏评估"学习能力"而非"现有能力"的基准。入职第一天的表现不重要，入职半年后的表现才重要。

#### 下一代评估需要打破的隐含假设

现有评估隐含多个惯性假设：任务必须 i.i.d、人类偏好是静态的、任务边界清晰。这些假设源于学术传统，但与现实严重脱节。当通用配方可以攻克任何既定基准时，创造"打破通用配方"的新设定比制造更难的题目更有价值。

见：[The Second Half - AI 评估的未来](https://ysymyth.github.io/The-Second-Half/)

## 多模态基准测试的效度危机

#### 无图像高分的悖论

当前多模态基准测试可能完全没有衡量视觉理解能力。Stanford MIRAGE 研究显示，
模型可以在不看图像的情况下在多模态基准测试中获得高分——3B参数的Qwen-2.5
纯文本模型仅使用文本训练（不看任何图像），却超越了所有前沿多模态模型以及
放射科医生。

"Super-guesser"实验揭示：模型在无图像情况下保留了70-80%的性能，
Mirage Score = (无图像准确率 ÷ 有图像准确率) × 100%。这意味着我们之前
评估的"视觉能力"大多是对训练数据统计模式的记忆，而非真正的视觉理解。

见：[MIRAGE: The Illusion of Visual Understanding](https://arxiv.org/abs/2603.21687)：
Stanford HAI 论文，2026年3月

#### B-Clean 框架：净化多模态评估

B-Clean 是 Stanford 团队提出的多模态基准净化框架，通过四步消除"模式可解"
问题对评估的污染：(1)幻觉模式评估——测试模型在无图像时的表现；(2)移除
compromised问题——剔除所有模型都能答对的问题；(3)文本模型训练——训练
纯文本模型识别模式可解的问题；(4)清洁评估——仅在净化后的问题上使用图像评估。

实验效果：移除了74-77%的问题，模型排名在3个基准中有2个发生改变。
MicroVQA原始准确率61-69% → B-Clean后降至15-23%，揭示了大量问题无需
看图像即可作答。

见：[MIRAGE: The Illusion of Visual Understanding](https://arxiv.org/abs/2603.21687)：
Stanford HAI 论文，2026年3月

## 经典指标的结构性失效

#### BLEU/ROUGE 在 LLM 评估中的结构性失效

[L1] 传统 n-gram 重叠指标（BLEU、ROUGE）在绝大多数 LLM 生产评估中已被完全弃用，当前主流转向 BERTScore 或 LLM-as-a-Judge。

[L2] 根本矛盾在于：BLEU/ROUGE 惩罚同义替换和语序重组，而 LLM 的核心价值恰恰在于生成语义等价但表述多样的文本。这些指标对短文本尤其敏感，而现代 LLM 输出以对话和推理为主，n-gram 匹配率与真实质量几乎脱钩。

[L3] 面试者仍在机械背诵 BLEU/ROUGE 作为"经典指标"，这反映的是评估认知的滞后。理解指标背后的假设边界，比记住指标公式更有价值。

见：[BLEU: a Method for Automatic Evaluation of Machine Translation](https://aclanthology.org/P02-1040/)

#### RAGAS 的 faithfulness 无法捕获"伪忠实"幻觉

[L1] RAGAS 将 faithfulness 定义为"回答是否基于检索内容"，其自动检测基于 entailment 模型判断断言与检索片段的蕴含关系。

[L2] 最致命的幻觉类型是 grounded hallucination：模型正确引用了检索片段，却通过错误逻辑组合推导出虚假结论。例如检索到"张三在 A 公司任职"和"李四在 B 公司任职"，模型输出"张三和李四是同事"——每个断言都有据可查，但组合关系完全错误。RAGAS 的 entailment 检测对这种跨片段的逻辑、时序、因果错误几乎无能为力。

[L3] 当前 RAG 评估框架在"伪忠实"面前存在系统性盲区，生产环境中不能仅凭 RAGAS 分数判定幻觉风险，必须叠加人工审核或更细粒度的关系验证。

见：[RAGAS Documentation](https://docs.ragas.io/)

#### Perplexity 与输出质量存在任务依赖性的负相关

[L1] 低困惑度在预训练阶段代表更好的概率建模能力，但在对话和指令遵循任务中，perplexity 往往与用户满意度呈负相关。经过 RLHF 对齐的模型相比基础模型，输出 perplexity 通常更高，但人类偏好得分更好。

[L2] 低 perplexity 意味着模型选择概率最高的"安全"词汇，导致回答过于保守、缺乏信息增量。perplexity 的解读必须绑定任务类型：在预训练阶段它是能力指标，在生成阶段它可能反映的是"冒险意愿"而非"质量"。

[L3] 若将 perplexity 作为生产监控指标，可能系统性地误判对齐后的优质输出为"质量退化"。监控体系需要按任务阶段和模型类型分别设定基线，而非使用统一阈值。

见：[Perplexity in NLP](https://huggingface.co/docs/transformers/perplexity)
