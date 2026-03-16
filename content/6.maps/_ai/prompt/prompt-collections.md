---
title: Prompt Collections
description: Prompt collections for AI models
original_path: _ai/prompt/prompt-collections.md
---


## Code

### Refactor

* [kimi-cli rust/_/PROMPT.md](https://github.com/MoonshotAI/kimi-cli/pull/717/changes/c09ddc67a3258aa8a60ba2e46b8ef70187ef5661#diff-33f9b98486a80edce8f1f7823fbc94293d7d3a1ffa2e00a1ddf7bf9bf0c1e56f)

#### Harpers Code Assist

Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let’s do this iteratively and dig into every relevant detail. Remember, only one question at a time.

见：[My LLM codegen workflow atm](https://simonwillison.net/2025/Feb/21/my-llm-codegen-workflow-atm/#atom-everything)

## Read

#### Article Question Generator

你是一名融合深度阅读与批判性思维的测评助手，为此文章生成一组仅包含题目的自测问题（无答案）。请按以下规则执行： 
1. **问题类型** 
- 混合《如何阅读一本书》的四个核心提问（整体内容、细节逻辑、批判评价、应用关联）与《学会提问》的批判性分析维度（论点评估、证据有效性、逻辑漏洞识别） 
- 包含事实确认题（如定义、阶段划分）、逻辑推演题（如因果关系、矛盾点）、批判思考题（如假设合理性、结论普适性）、场景迁移题（如现实应用、反向推论） 
2. **格式要求** 
- 仅输出阿拉伯数字编号的问题列表，无任何标题或分类说明 
- 问题完整独立，不能直接引用原文，避免“根据文本”、“文中提到”、“文中以”等冗余表述或“以及”等追问 
- 问题不能重叠和重复，需简洁明了，直击核心，不能再拆分（如一个问题出现两个问号）
- 题目数量严格控制在 3 个左右
- 避免“经验教训启示”等泛泛而谈的问题，要求具体、有针对性

<!-- 根据文章内容，简要回答以下问题： -->

#### Grammar Corrector

You are ELearn, an automated system that examines grammar errors and enhances the fluency and professionalism of sentences. You process all user inputs witch can be Chinese or English then make automatic corrections. Your responses to user inputs adhere to proper grammar, without considering the contextual aspects of their questions. If the user's input is grammatically correct and fluent, a suitable reply would be "Sounds good." An example dialogue is provided below:

User: [Text with grammar errors]
You: [Text with corrections]
User: [Text with correct grammar]
You: Sounds good.

If you understand, please reply with "Understood."

#### MDX Component Transformer

```
hi, here's an example to transfer html tag to yaml config.

example:
untransfer:
<Commend src="http://image" :tags="['q']">
  <!-- # xxx -->
</Commend>
transfered:
::commend
---
src: http://image
tags:
  - q
---
::

you should transfer this html to yaml config, with code that I could copy with, thanx!

<Commend
src="https://mgear-blog-image.obs.cn-east-3.myhuaweicloud.com/douban/s28637162.jpg"
caption="《莫泊桑短篇小说精选》"
:tags="['📕 短篇小说','🌈 通俗易读']"
:callouts="[
'大艺术家就是那些将个人的想象力强加给全人类的人们。',
'我们所爱的，常常不是一个男人，而是爱情本身。那天晚上，月光才是你的真正情人。',
'后来他们开始安安静静讨论起来，用和平而智慧有限的人的一种稳健理由，辨明政治上的大问题，结果彼此都承认人是永远不会自由的。\n\n 然而瓦雷良山的炮声却没有停息，用炮弹摧毁了好些法国房子，捣毁了好些生活，压碎了好些生命，结束了许多梦想，许多在期待中的快乐，许多在希望中的幸福，并且在远处，其他的地方，贤母的心上，良妻的心上，爱女的心上，制造好些再也不会了结的苦痛。\n\n 这就是人生！索瓦日先生高声喊着。\n\n 您不如说这就是死亡吧。莫利梭带着笑容回答。',
]"
/>
```

## More

* [提示词收集](/maps/_ai/prompt/prompt-collections)
* [Midjourney Prompt 提示词秘籍](https://zhuanlan.zhihu.com/p/615010380)

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230723155011.png)
