---
title: 伪造基准文梯鉴
description: 用 created_at 取证、REPL 验码与算术自查三步，在几分钟内判别"X 个真实任务实测"类文章及其 GitHub 数据源是否为编造
---

## 三步验伪

#### 来源取证、验码与算术

任何声称"跑了 N 个真实任务"的框架对比文，逐数字核查成本高且没必要，三步梯鉴便宜且正交。
第一步对文中引用的 GitHub 仓库打 `api.github.com/repos/<owner>/<repo>`，看 `created_at`、star 数与创建到最后 push 的间隔：
一个典型假数据源创建于 2026-06-17、创建 1.5 小时后即终 push、0 star，而引用它的文章把数据源标成 "June 2024"，时间线凭空早两年。
第二步把文章代码示例贴进对应版本的 REPL：幻觉 API（`from autogen import AgentFlow`、`langgraph.Graph()`、
`crew.setup_dependencies()` 之类在任一真实版本里都不存在）一跑即死。第三步做算术自查：该仓库 README 标题写 107、
正文写 "24 Real Data Engineering Tasks"、六个分类计数求和等于 108，克隆命令还留着 `YOUR_USERNAME` 占位符。
真实跑过实验的人不会死在这三步的任意一步上；死在哪一步就退回哪一层认知：第一步死数据不存在，第二步死作者没碰过代码，第三步死数字是生成出来的。

见：[sweta2503/agent-framework-benchmark](https://github.com/sweta2503/agent-framework-benchmark)

## 集群特征

#### 内容农场的衔尾蛇引用网

假基准不是单篇失误而是集群污染：同一作者在两周内对"同一基准"发布两篇冠军相反的博文
（一篇 AutoGen 96/107 全面胜出，另一篇 AutoGen 仅 58/107 且 49 次硬失败、LangGraph 封王），
两篇互相引用同一组 0-star 仓库充当一手数据；再经转抄渠道进入中文语境后数字又长出第三套，与任何上游都不匹配，
连测试模型都从仓库实际使用的 Groq Llama 3.3 70B 变成 GPT-4-turbo 与 Claude 3 Opus。
三角测量时的识别信号：多来源措辞雷同或数字彼此矛盾、引用链向上收敛到同一批匿名仓库、没有任何一环可复现。
命中即整组按 TX（无法溯源）计，名为多源实为单源自引。

见：[Why LangGraph Wins: Benchmarking on 107 Real Data Engineering Tasks (dev.to)](https://dev.to/priyeshdave6/why-langgraph-wins-benchmarking-langgraph-crewai-and-autogen-on-107-real-data-engineering-tasks-3ljg)
