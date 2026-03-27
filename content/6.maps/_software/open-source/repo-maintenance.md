---
title: 开源仓库维护
description: 开源项目维护实践、贡献者管理与可持续性策略
---

#### AI 贡献的虚假繁荣

开源维护者 Andrew Nesbitt 以讽刺笔调列出"吸引AI机器人"的反面指南：
模糊的 issue 描述、缺少类型注解、禁用分支保护和 CI 检查……
这些本是维护者应当做好的基本功，却偏偏是 AI 生成 PR 的温床。
AI 可以同时生成代码、撰写 PR 说明、处理 review 反馈，全程不需要真正理解问题，
制造出"贡献"的幻象，却让维护者承担甄别成本。

见：[How to Attract AI Bots to Your Open Source Project](https://nesbitt.io/2026/03/21/how-to-attract-ai-bots-to-your-open-source-project.html)：讽刺性的反面指南

#### 代码规模与维护成本的经验法则

开源项目的维护成本与代码库规模呈正相关。对 17 个开源项目的统计显示：约 200,000 行代码需要约 1 名全职维护者（每天投入约 1 小时维护工作）。

这一经验法则揭示了软件维护的线性特征——代码不会自我维护，每增加一行都意味着未来的阅读、理解和潜在修改成本。LOC 作为"花费的行数"而非"生产的行数"，是维护成本的最佳可用代理指标。

见：[Lines of code are useful](https://entropicthoughts.com/lines-of-code)：kqr 关于 LOC 与维护成本的分析
