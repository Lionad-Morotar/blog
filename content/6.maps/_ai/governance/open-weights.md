---
title: Open Weights
alias: 开放权重
description: 开放权重模型（Open Weight Models）的生态价值主张、安全论证与政策争议
---

## Open Letter

#### 《Open Weights and American AI Leadership》联署信

2026 年 7 月 24 日，微软在企业责任站点发布《Open Weights and American AI Leadership》公开信，
截至 2026 年 8 月 3 日已有超过 270 家公司和组织联署，包括 Google、Meta、OpenAI、Amazon、
NVIDIA、Hugging Face、Mistral 等模型厂商、云服务商与初创公司。

公开信将开放权重模型（任何人可下载、检查、修改并在自有基础设施上运行的 AI 模型）定位为
美国 AI 领导力的基础，并类比 1980 年代开源软件运动：开源不仅降低了软件成本，更创造了
代代工程师与创业者赖以构建的共享知识基础。信的核心论点是，AI 领导力不由单一前沿模型
判定，而取决于能否构建扩散至工厂、医院、农场、课堂与小微企业工作流的开放生态。

阅读时应注意其性质：这是行业联盟的政策游说文本，签署方在云算力、模型分发与开源生态中
有直接商业利益，其主张属于行业立场而非中立结论。

见：[Open Weights and American AI Leadership](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/)

## Value

#### 开放权重的三重价值主张

公开信从三个维度论证开放权重的生态价值：

1. 经济接入——组织无需从头训练模型或为每个任务支付前沿模型价格，"把对的模型匹配给对的
   任务与对的成本"：前沿能力保留给真正的前沿问题，其余场景运行高效的专用模型。信中将此
   视为 AI 扩展到数十亿日常任务后仍保持经济可持续的纪律。
2. 竞争——允许众多组织构建、适配和部署先进模型，使竞争从模型开发者扩展到云、芯片、应用
   和服务各层，从而压低价格，让 AI 收益被广泛分享而非集中于少数厂商。
3. 控制权——帮助组织避免供应商锁定：控制自己的数据、按需评估和适配模型、按业务需求随处
   部署，并通过自改进模型与积累的专业能力拥有自己创造的价值。

见：[Open Weights and American AI Leadership](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/)

## Safety

#### "开放促进安全"的论证结构

针对"权重发布后脱离控制、修改版本难以追溯"的风险，公开信没有否认，而是给出四步论证：

1. 封闭不等于安全：闭源模型同样可能被攻破、滥用，或以外部无法检测的方式失败。
2. 集中化放大风险：把先进能力集中在少数闭源模型上会造成单点故障、削弱竞争，并让关键
   技术掌握在少数供应商手中。
3. 防御需要能力对称：当攻击者使用先进 AI 时，防御方需要同等能力的模型来检测、模拟和
   响应新兴威胁；开放模型扩大了防御能力与透明度，使漏洞能被众多团队发现并修复。
4. 透明优于隐匿：正如开源软件证明了透明可以比隐匿更安全，广泛的研究者社区可以检查
   模型行为、开发防护措施；基准评测与红队测试应基于真实已证实的危害，而非默认假设
   封闭系统更安全。

这一框架与安全研究相互印证：NeuroStrike 等越狱研究显示，即使攻击者无法访问闭源模型
内部，也能借助开源 surrogate 模型制备有效攻击，"闭源即安全"的假设在实证层面同样
不成立。其反向框架——能力扩散降低滥用门槛——则未在信中展开，是该立场的选择性呈现。

见：[Open Weights and American AI Leadership](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/)

## Policy

#### 蒸馏与盗用的政策区分

公开信呼吁政策制定者不要把合法的模型开发技术与盗用（misappropriation）混为一谈。
信中将蒸馏（distillation）——用一个模型的输出帮助训练或改进另一个模型——描述为
广泛使用的模型改进、评估与验证技术，延续了开源软件运动以来"学习、构建并改进现有
技术"的创新传统。

与之相对，非法从闭源模型提取价值的行为确实构成正当关切，但信主张应通过针对性的
法律与商业框架处理，而非对重要创新技术施加全面限制。结合签署方中 Mistral 等开放
模型厂商的利益背景，这一表态可视为开放权重阵营对"蒸馏侵权"指控争议的集体回应。

见：[Open Weights and American AI Leadership](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/)
