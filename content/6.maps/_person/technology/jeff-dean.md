---
title: Jeff Dean
description: Google 首席科学家，MapReduce、BigTable、TensorFlow、TPU、Gemini 等系统的主导者
---

#### 简介？

Jeff Dean 于 1999 年作为第 20 号员工加入 Google，现任 Google 首席科学家。他先后主导或参与构建了 MapReduce、
BigTable、TensorFlow、TPU、Gemini 等对行业产生深远影响的系统，与长期搭档 Sanjay Ghemawat 共同重写过 Google
搜索的核心架构。他以「餐巾纸数学」著称——用脑海中的数量级估算发现被忽视的巨大机会
（参见[系统性能](/maps/_computer/system-performance)中的延迟数字与估算案例）。

#### 主要贡献/观点？

**AI 已达初级工程师水平**

2025 年他判断「AI 正处于初级工程师水平」，一年后在 YC Startup School 2026 上确认该预言非常准确：
模型在基于智能体的长时间编码任务上进步显著，能力增长超出他的预期，且已从编码扩展到更多领域。

**质疑默认假设的思想实验**

他推崇偶尔推倒行业几十年不碰的假设。例如：芯片业 60 年追求晶体管零错误（ECC 内存、Reed-Solomon 编码），
但如果用每天可能出错 20 次的晶体管构建系统会怎样？这会逼出冗余路径信号传输等全新设计——类似神经形态计算，
也与大脑用多条通路传递重要信号的方式同构。其逻辑根基在于：更大尺度上人类早已在不可靠部件上构建可靠系统
（三副本的分布式文件系统），同一条原理可以下沉到晶体管层。

**被 NeurIPS 拒绝的蒸馏论文**

2014 年他与 Geoffrey Hinton、Oriol Vinyals 合著的知识蒸馏论文被 NeurIPS 拒绝，审稿意见是「不太可能产生重大影响」。
如今蒸馏已是行业标准做法（Gemini Flash 系列部分得益于此）。他的教训：即使被拒了，也要继续。

**选对问题的检验标准**

他给年轻人的职业检验：如果我做这件事且最好的结果发生了——世界会因此变得更好吗，还是反应只是「嗯，还行吧」？
如果是后者，就不值得投入。找一个真正在乎的问题，与低 ego、技能互补的人组队，然后拼尽全力。

#### 代表作品？

- MapReduce / BigTable - Google 超大规模计算与存储的基础架构
- [TensorFlow](https://www.tensorflow.org/) - 机器学习框架
- TPU - 张量处理单元，第一代比同期 CPU/GPU 节能 30-80 倍
- Gemini - Google 旗舰大模型系列
- Distilling the Knowledge in a Neural Network（2014, with Hinton & Vinyals）- 知识蒸馏开山之作
- Performance Hints（2026, with Sanjay Ghemawat）- 30 页性能优化方法论文档

见：[Jeff Dean × Diana Hu, YC Startup School 2026](https://www.youtube.com/watch?v=CxXgV54KzpQ) |
[中文整理](https://mp.weixin.qq.com/s/RQMxO9rr89V3ZH8grzmEZg)
