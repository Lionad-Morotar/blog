# Fine-tuning

> Model fine-tuning techniques and best practices

## Axolotl：YAML 配置驱动的微调框架

Axolotl 的核心理念是"用 YAML 定义整个训练流程"——从数据预处理、模型加载、训练配置到导出部署，全部收敛在一个配置文件中。这种声明式接口降低了微调门槛，支持 LoRA/QLoRA、全参数微调、多模态微调和持续预训练。
2025 年 2 月新增 LoRA 优化，在单 GPU 和多 GPU 训练中进一步降低内存占用并提升训练速度。

见：[Axolotl GitHub](https://github.com/axolotl-ai-cloud/axolotl) | [Axolotl 官方文档](https://docs.axolotl.ai/)

## LLaMA-Factory：一站式 LLM 训练与部署平台

LLaMA-Factory 是目前最全面的开源微调框架，支持 100+ 模型架构，提供 Web UI 界面让非技术人员也能轻松操作。其特色是集成了模型量化、合并、导出等全流程工具，微调完成后可直接生成 GGUF、vLLM 等部署格式。
通过可扩展的模块统一了多种高效微调方法，让大模型微调真正普及。

见：[LLaMA-Factory GitHub](https://github.com/hiyouga/LLaMA-Factory) | [LLaMA-Factory 使用指南](https://zhuanlan.zhihu.com/p/694047673)

## LoRA：低秩适配的参数高效微调

LoRA（Low-Rank Adaptation）冻结预训练模型权重，注入可训练的秩分解矩阵到每一层：W = W_0 + BA，其中 W_0 冻结，B 和 A 可训练且秩远小于 W。这种方法将训练参数量减少 10000 倍，
同时保持与全参数微调相当的性能，是在消费级 GPU 上微调大模型的标准选择。

见：[LoRA 论文](https://arxiv.org/abs/2106.09685) | [Hugging Face LoRA 教程](https://huggingface.co/learn/llm-course/en/chapter11/4)

## QLoRA：量化 + LoRA 的极致内存优化

QLoRA 将 4-bit 量化与 LoRA 结合，实现最大内存效率。全参数微调 70 亿参数模型需要 100-120GB 显存，而 QLoRA 仅需约 10GB，让消费级 GPU 也能微调大模型。量化后的模型权重以低精度存储，
计算时动态反量化，配合 LoRA 的可训练适配器，在效率和效果之间取得完美平衡。

见：[LoRA vs QLoRA - RedHat](https://www.redhat.com/en/topics/ai/lora-vs-qlora) | [IBM QLoRA 文档](https://www.ibm.com/docs/en/watsonx/w-and-w/2.1.0?topic=tuning-qlora-fine)

## PEFT：Hugging Face 参数高效微调库

PEFT（Parameter-Efficient Fine-Tuning）是 Hugging Face 开源的参数高效微调库，集成了 LoRA、Prefix Tuning、Prompt Tuning、IA³、Adapter 等多种方法。
它让研究者可以用统一接口尝试不同微调策略，无需修改模型代码即可切换方法，极大简化了实验流程。

见：[PEFT GitHub](https://github.com/huggingface/peft) | [PEFT 方法概览](https://huggingface.co/docs/peft/en/conceptual_guides/adapter)

## Unsloth：手写 CUDA 内核的极速微调

Unsloth 通过手写 CUDA 内核和算法优化，在保持精度的前提下将微调速度提升 2-5 倍，显存占用降低 50%+。它针对 LLM 训练中的热点操作（RoPE、LayerNorm、Cross-Entropy）定制 CUDA 实现，
支持与 PEFT 完全兼容，只需修改几行导入语句即可加速现有 LoRA/QLoRA 训练代码。

见：[Unsloth 官网](https://unsloth.ai/) | [Unsloth 博客](https://unsloth.ai/blog)

#### LoRA 的低秩更新同样会造成表征漂移

文档将「只训练 0.1% 参数」当作免疫灾难性遗忘的理由，但工程实践中真正的临界点并不在参数量。当新任务的数据分布与预训练分布差异极大——比如把通用基座模型硬拉到某个极窄的垂直领域——即使 rank=8，
低秩矩阵在反向传播中仍会沿着与基座表征正交的方向持续施加更新；加上常用的较大学习率，关键层的隐空间几何结构会被缓慢但系统地扭曲。表征层面的偏移累积到一定程度，旧任务上的表现就会断崖式下跌，而此时权重热图可能显示「
只有不到 1% 的权重发生了显著变化」。判断 LoRA 是否安全的实用指标不是更新参数量，而是新旧数据在嵌入空间的重叠度与学习率的乘积。

#### 多 LoRA 共存的推理代价被严重低估

「多个 LoRA 可以共存」在训练权重层面成立，在推理服务层面却完全是另一回事。动态切换意味着每次请求都要加载不同的 A/B 低秩矩阵；在 vLLM/SGLang 这类基于 Continuous Batching 的推理框架中，
这会破坏请求的同质性假设，导致同一 batch 内的序列无法共享相同的 CUDA kernel 计算图。更隐蔽的是，如果把多个 LoRA 同时驻留显存来避免切换延迟，
每个适配器都会额外占用一层 hidden_size × rank × 2 的显存 footprint，直接压缩 KV Cache 可容纳的并发长度。工程上「无遗忘」往往以牺牲 20%-40% 的吞吐或并发能力为代价，
这是方案选型时需要在架构层面提前计算的账。

#### 混合训练的配比困境

文档将混合训练总结为「效果好，成本高」，但成本的根因不仅是多算了几轮数据。真正棘手的是旧数据与新数据的比例根本没有通用公式：旧数据占比过高，模型会在新任务上欠拟合，学到的领域适配能力不足；占比过低，则无法提供足够的「记忆锚点」
来对抗参数漂移。而且这个最优配比高度依赖旧任务的性能指标——如果你要保留十项旧能力，就必须构造一个多维帕累托前沿来搜索配比，否则只是用「混合」的名义做了一种更隐蔽的遗忘。因此混合训练在实践中很快就会退化为昂贵的超参搜索问题，
这也是工业界更倾向于可控遗忘评估加 LoRA 解耦，而不是端到端重训的根本原因。
