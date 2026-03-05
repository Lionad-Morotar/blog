---
title: Emerging AI Technologies
description: Emerging technologies and research directions in AI
original_path: _ai/emerging.md
---
## MoE：稀疏激活的参数扩展

混合专家模型（MoE）将前馈层替换为多个"专家"网络，通过门控网络动态选择激活的专家。DeepSeek-V3 是 MoE 标杆，拥有 671B 总参数但每次只激活 37B，在保持推理成本不变的情况下显著扩展模型容量。2025 年 MoE 成为大模型标配，Mixtral、Qwen3、Gemini 1.5 Pro 均采用此架构。

见：[DeepSeek-V3 技术报告](https://arxiv.org/abs/2412.19437) | [MoE LLMs 详解](https://cameronrwolfe.substack.com/p/moe-llms)

## JEPA：非生成式世界模型

JEPA（Joint Embedding Predictive Architecture）是杨立昆（Yann LeCun）提出的非生成式自监督学习架构。不同于 LLM 在像素/token 空间预测，JEPA 在抽象表示空间进行预测，关注高层语义而非低层细节。2025 年 Meta 发布 V-JEPA 2，结合互联网视频与机器人轨迹数据，在视觉理解上达到 SOTA。VL-JEPA 进一步拓展到视觉-语言多模态领域。

见：[V-JEPA 2 官方发布](https://ai.meta.com/research/vjepa/) | [JEPA 深度解析](https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/) | [VL-JEPA 多模态突破](https://medium.com/@harshit.sinha0910/what-vl-jepa-could-revolutionize-in-multimodal-intelligence-a1c2105dc62e)

## 空间智能：李飞飞的 AI 愿景

李飞飞认为当前 LLM 只是"系统一"的快速思考，真正的 AI 需要具备"空间智能"——理解三维世界的几何、物理和语义关系。世界模型需要具备生成性（创造物理一致的世界）、多模态（融合视觉、语言、空间）、交互性（支持探索和导航）三大特征。

见：[李飞飞空间智能宣言](https://www.mittrchina.com/news/detail/15468)

## 投机解码：推理加速新范式

投机解码用小模型（draft）快速生成候选 token，大模型（target）并行验证，理想情况下可加速 2-3 倍。2025 年该技术真正成熟，华为诺亚提出 ViSpec 方法首次实现多模态大模型高效投机推理，加速比达 3.2 倍。与 MoE 结合有协同效应。

见：[NVIDIA 投机解码介绍](https://developer.nvidia.cn/blog/an-introduction-to-speculative-decoding-for-reducing-latency-in-ai-inference/) | [ViSpec NeurIPS 2025](https://hub.baai.ac.cn/view/49232)

## 模型合并与长上下文

模型合并通过权重空间插值将多个微调模型融合，Task Arithmetic、TIES-Merging、Model Soups 等技术实现零训练集成。长上下文技术包括位置编码外推（RoPE、ALiBi）、Ring Attention 分布式训练，Gemini 1.5 Pro 已实现百万级 Token 上下文。

见：[Model Merging 论文](https://arxiv.org/abs/2212.09849) | [Long Context Survey](https://arxiv.org/abs/2312.00752)
