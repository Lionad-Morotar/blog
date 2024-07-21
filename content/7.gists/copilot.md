---
title: GitHub Copilot
description: GitHub Copilot 是一款由 GitHub 和 OpenAI 合作开发的人工智能代码提示工具，它可以根据上下文和注释生成代码片段，提高开发效率。
---

## Read

### Why test-driven development and pair programming are perfect companions for GitHub Copilot

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

