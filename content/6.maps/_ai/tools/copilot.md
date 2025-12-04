---
title: GitHub Copilot
description: GitHub Copilot 是一款由 GitHub 和 OpenAI 合作开发的人工智能代码提示工具，它可以根据上下文和注释生成代码片段，提高开发效率。
---

## Gists

#### [团队 AI 编码率稳步提升到 89.2% 的 AI Coding 实践分享](https://mp.weixin.qq.com/s/dq87Orqr8SyeyECZg3BMfA)

饿了么团队把 AI 编码采纳率从 9.6% 提到 89.2%，需求交付效率提升 23.6%。

<q>幻觉是AI的天性，不可避免，只能尽量减少。而我们要的是AI给我们生成确定性的、高质量的内容。这就需要从两方面入手，一方面需要保障我们输入给AI的内容质量；另一方面我们需要提出规范及要求让AI按照我们的预期生成内容，保障AI输出给我们的质量。</q>

- 统一上下文  
  - 三层架构模板：数据-逻辑-应用层固定目录结构，先让 AI 生成“地图”再写代码。  
  - 技术方案模版：把需求拆成“领域功能+应用服务+业务规则+数据模型”四格表，人工只填业务，其余交给 AI。  

- 结构化 Prompt  
  - 分层提示：按“架构层-模块-类-函数”四级写要求，不含任何业务词，保证跨需求复用。  
  - 增量调优：每周收一次 bad case，把新规则写进 Prompt，版本号随 CI 自动升级。  

- 任务粒度控制  
  - 类级单元：一次请求只生成一个完整类，过大再拆接口-实现两份。  
  - 先方案后代码：PRD→AI 生成技术方案→人工 Review→AI 按方案写代码，防止幻觉跑偏。  

阶段总结，形成了一套高质量的体系化的AI+Prompt+技术方案模版+工程结构的AI编码方案。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20251204113817450.png)

接口类提示词设计：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20251204114413996.png)

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20251204114154426.png)

修改类需求示例：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20251204114245732.png)

修改类需求生成结果：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20251204114023507.png)


#### Why test-driven development and pair programming are perfect companions for GitHub Copilot

为什么测试驱动开发和结对编程是 GitHub Copilot 的完美伴侣，Source: [Why test-driven development and pair programming are perfect companions for GitHub Copilot](https://www.thoughtworks.com/insights/blog/generative-ai/tdd-and-pair-programming-the-perfect-companions-for-copilot)

> Context poisoning, Automation Bias, Sunk Cost Fallacy, Anchoring Effect and Auto-completion on steroids. We term these incorrect behaviors AI 'smells'.

代码中的 AI 味，[Exploring Generative AI](https://martinfowler.com/articles/exploring-gen-ai.html#memo-04)

1. 放大不良或过时的做法，Amplification of bad or outdated practices
2. 回顾疲劳和自满，Review fatigue and complacency

作者给这两个现象提供了非常有意思的重命名，并带来了新的现象模式：

1. 上下文中毒，Context poisoning: continues to suggest stale implementations or bad patterns.
2. 类固醇自动完成，Auto-completion on steroids: This refers to the unfortunate tendency to switch off the brain and accept everything, in an infinite Tab/Enter loop. 
3. 沉没成本谬误，Sunk-cost fallacy: we’re hesitant to delete GitHub Copilot generated code, even though coding an alternative from scratch would yield a better long-term solution. 
4. 锚定效果，Anchoring effect: we find it harder to develop alternative code implementations once we’ve seen a suggestion from Copilot.

> Pair programming is a technique in software development where two programmers work together on a single computer or remotely, each taking turns to be the driver and the navigator. The driver is responsible for typing code, while the navigator is responsible for guiding the implementation, giving feedback and suggesting improvements ... GitHub Copilot lacks the ability to question or challenge your assumptions, so it cannot give you alternative perspectives the way a human being can when pairing. 

目前来说是的，GitHub Copilot 充当我的代码助手，而不是向我提出质疑。刚开始使用时，我还会仔细检查它的代码，但是随着时间推移，信任感加深后，这种检查反而丢失了。
