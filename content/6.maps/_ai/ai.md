---
title: Machine Learning
description: machine learning related
---

## Tour

* [通往 AGI 之路](https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e)

## 评论

Anthony Bonkoski 将 GPT 类比为“人类知识的极大似然估计器”，即其知识面广泛覆盖但缺乏深度，能给人提供平均化的标准答案。

见：[ChatGPT: A Mental Model](https://xorvoid.com/chatgpt_a_mental_model.html)，[ChatGPT: A Mental Model @MaxAI](https://www.maxai.co/share?id=a9d5c747a70c3c1a40b43ba6128b22e90a114e588de17c84fc4abba9)

## 数据结构

#### 向量可视化

使用 [projector.tensorflow](https://projector.tensorflow.org/) 在低维度空间查看不同向量的某个特征的分布情况。

## Vibe

- [Vibe](/maps/_ai/vibe/vibe)

## 模型搜索

* [Ollama Search](https://ollama.com/library/qwen3-embedding)
* [mteb Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)：多语言文本嵌入基准测试排行榜，用于比较各模型在不同任务上的嵌入效果。

## NLP

#### 将 LLMs 及 NLP 结合

将传统 NLP 方法如聚类分类、主题识别和 LLMs 结合，以获得 LLMs 的高注意力跨度和记忆力。

## LLMs

* [LLM](/maps/_ai/llm/llm)
* [SLM](/maps/_ai/llm/slm)

## Agents

* [AI Agents](/maps/_ai/agents/agents)

## RAG（检索增强生成）

* [Retrieval-augmented Generated](/maps/_ai/rag/rag)

## MCP

* [MCP](/maps/_ai/mcp/mcp)

## Skills

* [Agent Skills](/maps/_ai/skills/skills)

## AI 对前端的影响

* [AI 对泛前端领域的影响](/maps/_ai/frontend-impact) - 滴滴技术团队关于 GUI→LUI 迁移、Agent 自动化等思考

## Tools

* [Browser AI Automation](/maps/_ai/tools/browser-automation) - Opendia、Browser-use、Stagehand、Playwright MCP 等

## 案例

* [Deepod](https://www.deepod.tech/): YouTube 视频知识提取平台，将英文播客/访谈转化为中文知识单元，覆盖 AI科技、商业思维、个人成长等领域
* [AI辅助游戏开发极简案例：一个解谜卡牌对战小游戏](https://indienova.com/indie-game-development/ai-assisted-game-development-minimal-case-study/)

## Framework

* [SAIF](/maps/_ai/framework/saif)

## Workflow

* [开发工作流](/maps/_ai/workflow/0.index)

## Training

* [AI Training](/maps/_ai/training/training)

## AI 的下半场

#### 从训练到评估的范式转移

AI 发展进入"下半场"，核心特征是从"训练大于评估"转向"评估大于训练"。上半场通过反向传播、AlexNet、DQN、Transformer、GPT-3 等方法创新不断刷分；下半场需要重新定义问题，构建能衡量真实世界效用的评估体系。OpenAI 前研究员姚顺雨（Shunyu Yao）提出这一框架，认为当前 AI 在 MMLU、Codeforces 等基准上达到博士水平，却未能显著改变 GDP——核心矛盾在于评估设定追求"难题"，而真实价值在于"实用"。

见：[The Second Half - Shunyu Yao](https://ysymyth.github.io/The-Second-Half/)

#### AI 训练的标准配方

强化学习的通用配方由三要素构成：强大的语言先验（LLM）、支持推理的行动空间（将思考作为动作）、简单可扩展的算法。这一配方在数学推理（o1/o3）、计算机操作（Operator）等领域都被验证有效，意味着"创造新基准比解决旧基准更有价值"。

见：[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)

## 行业动态

更多动态见：[AI 行业动态](./industry-dynamics.md)

#### 科技巨头的 AI 军备竞赛规模有多大？

2026 年，亚马逊、谷歌、微软、Meta 和 Oracle 五大科技巨头的 AI 相关资本支出预计达 **7000 亿美元**，相当于美国军费的约四分之三。如此巨额投入导致电工人才短缺，部分建筑项目被迫暂停。这一数据直观展示了 AI 热潮对实体经济的资源虹吸效应——AI 竞争已从技术竞争升级为国家级基础设施竞争。

> #周刊摘录 见：[科技周刊第385期](https://www.ruanyifeng.com/blog/2026/02/weekly-issue-385.html)

#### 知识产权的因果循环

OpenAI 长期被指控未经授权使用艺术家和作家的作品训练模型，如今却反过来控诉 DeepSeek 通过「模型蒸馏」技术窃取自己的知识产权。这种「偷数据者抱怨被偷」的戏剧性反转，揭示了科技行业一个古老规律：当技术霸权者打破规则时，往往忘了规则也可能被用来对付自己。讽刺的是，OpenAI 曾游说政府要求版权豁免，如今却成为了自己最痛恨的「免费搭车者」的受害者。

见：[OpenAI Alleges China's DeepSeek Stole its Intellectual Property](https://www.fdd.org/analysis/2026/02/13/openai-alleges-chinas-deepseek-stole-its-intellectual-property-to-train-its-own-models/)、[US authors' copyright lawsuits against OpenAI](https://www.theguardian.com/books/2025/apr/04/us-authors-copyright-lawsuits-against-openai-and-microsoft-combined-in-new-york-with-newspaper-actions)

#### 远程操作的信任困境

AI 行业将远程操作（teleoperation）包装成"AI"的现象正在侵蚀公众信任：

- **Amazon "Just Walk Out"**：号称 AI 驱动的无人收银，实际是印度团队手动审核监控录像完成结账
- **Tesla Optimus**：发布会展示机器人端酒、跳舞，Elon Musk 声称全自主 AI，后被揭露为远程操作
- **1X 机器人**：$20,000 家用机器人 demo 中，操作者就在隔壁房间

远程操作本身的技术难度被忽视——实时控制双足机器人在人群中行走、完成精细动作需要低延迟通信、精准电机控制和优秀的操作界面，这些都是多年工程积累的成果。然而一旦被贴上"AI"标签，远程操作就变成了"骗局"的同义词，甚至 Waymo 也不得不公开辩护否认使用远程操作员。

远程操作在医疗（跨洲手术）、工业（危险环境作业）等领域本身就是核心价值，而非过渡方案。

见：[Teleoperation is Always the Butt of the Joke](https://idiallo.com/blog/teleoperation-is-the-butt-of-the-joke)

## 推荐系统

* [推荐系统](/maps/_ai/recommendation/recommendation-system)
