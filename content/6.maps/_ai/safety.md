# 安全 (Safety)

## Constitutional AI：价值观对齐的宪法方法

Constitutional AI 由 Anthropic 提出，核心思想是让模型遵循一组"宪法原则"进行自我修正。不同于 RLHF 需要大量人工标注，它通过 AI 自我批评和修订实现价值观对齐——模型生成回答后根据宪法原则自我批评并改进，再用改进后的回答训练偏好模型。这种方法减少了对人工反馈的依赖，更易扩展到多语言、多文化场景。

见：[Constitutional AI 论文](https://arxiv.org/abs/2212.08073) | [Claude's Constitution](https://www.anthropic.com/constitution) | [BlueDot 解读](https://blog.bluedot.org/p/what-is-constitutional-ai)

## LlamaGuard：输入输出内容审核模型

LlamaGuard 是 Meta 开源的输入/输出内容审核模型，基于 Llama 架构微调，可对对话内容进行安全风险分类。覆盖暴力与犯罪、仇恨言论、自残、性相关内容、恶意软件、欺诈/诈骗、隐私侵犯等 7 大类风险。最新 Llama Guard 3 支持多模态（图像理解）内容审核，是构建安全 AI 系统的关键组件。

见：[LlamaGuard 论文](https://arxiv.org/abs/2312.06674) | [Meta AI 发布](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/) | [Llama Guard 3 Vision](https://ai.meta.com/research/publications/llama-guard-3-vision-safeguarding-human-ai-image-understanding-conversations/)

## NeMo Guardrails：三层防护对话安全框架

NeMo Guardrails 是 NVIDIA 推出的对话安全框架，提供输入防护（检测并拦截恶意提示）、对话管理（控制对话流程防止话题偏离）、输出防护（审核模型回复过滤不安全内容）三层防护。与 LlamaGuard、Cleanlab TLM 集成，支持 LangChain、LlamaIndex 等主流框架，是可编程的 LLM 安全工具包。

见：[NeMo Guardrails 文档](https://docs.nvidia.com/nemo/guardrails/latest/index.html) | [NVIDIA 博客](https://developer.nvidia.com/blog/content-moderation-and-safety-checks-with-nvidia-nemo-guardrails/) | [GitHub](https://github.com/NVIDIA-NeMo/Guardrails)

## Prompt Guard：提示注入与越狱检测

Prompt Guard 是 Meta 专门用于检测提示注入（Prompt Injection）和越狱（Jailbreak）攻击的模型。Prompt Guard 2 有两个版本：86M（支持多语言攻击检测）和 22M（超轻量版适合边缘部署）。两者都经过大量已知漏洞语料训练，可检测直接注入（用户试图覆盖系统提示）、间接注入（通过外部数据源注入恶意指令）和越狱攻击。

见：[Prompt Guard 86M](https://huggingface.co/meta-llama/Llama-Prompt-Guard-2-86M) | [Prompt Guard 22M](https://huggingface.co/meta-llama/Llama-Prompt-Guard-2-22M) | [Meta 发布说明](https://ai.meta.com/blog/ai-defenders-program-llama-protection-tools/)

## 多层防御：安全不能依赖单点

有效的 LLM 安全需要多层防御架构：输入层使用 Prompt Guard 检测注入攻击，内容层使用 LlamaGuard 进行风险分类，输出层再次审核过滤不安全内容。永远不要依赖单一防线，攻击者总能找到绕过单个防护的方法。定期红队测试、记录分析被拒绝的请求、建立人工审核机制处理边界案例，是持续保持安全性的关键。

见：[LLM 安全最佳实践](https://www.datocms-assets.com/75231/1752004377-llm-security-best-practices-v2.pdf) | [Datadog Guardrails 指南](https://www.datadoghq.com/blog/llm-guardrails-best-practices/) | [Defense in Depth 指南](https://www.sentinelone.com/cybersecurity-101/cybersecurity/defense-in-depth-ai-cybersecurity/)
