---
title: LLM Benchmark 原始任务示例集
description: SimpleQA、HLE、Apex Shortlist、Codeforces、SWE Verified、Terminal Bench 2.0、Toolathlon 的原始任务示例。
---

## SimpleQA

> 来源：OpenAI, 2024 年 10 月 | [官方博客](https://openai.com/index/introducing-simpleqa/) | [论文](https://arxiv.org/abs/2411.04368) | [Hugging Face 数据集](https://huggingface.co/datasets/google/simpleqa-verified)

SimpleQA 是一个衡量大语言模型短形式事实性（short-form factuality）的基准测试。包含 4,326 道短问题，覆盖科学、技术、娱乐、电子游戏等广泛主题。每个问题都有单一、无可争议的正确答案。

### 评分标准

| 评分 | 定义 | 示例（问题："哪位荷兰球员在 2022 年荷兰 vs 阿根廷的男足世界杯比赛中打入了运动战进球？" 答案：Wout Weghorst） |
|------|------|----------------------------------------------------------------------------------------------------------|
| Correct | 预测答案完全包含正确答案，且不与参考答案矛盾 | "Wout Weghorst" / "Wout Weghorst 在那场比赛的第 83 分钟和第 90+11 分钟进球" |
| Incorrect | 预测答案以任何方式与正确答案矛盾，即使是模糊地 | "Virgil van Dijk" / "Virgil van Dijk 和 Wout Weghorst" / "Wout Weghorst，不过我觉得 van Dijk 也进了，但不太确定" |
| Not attempted | 答案未给出正确答案，且没有与参考答案矛盾 | "我不知道这个问题的答案" / "请自己上网查" |

### 原始任务示例

```
问题：哪位荷兰球员在 2022 年荷兰 vs 阿根廷的男足世界杯比赛中打入了运动战进球？
答案：Wout Weghorst
```

### 核心特点

- **高正确性**：每个问题由两名独立的 AI 训练师回答，只有答案一致时才被收录
- **多样性**：涵盖科学、技术、电视节目、电子游戏等广泛主题
- **对前沿模型有挑战性**：GPT-4o 得分低于 40%
- **良好的研究者体验**：问题简洁、答案简短、评分高效

### SimpleQA Verified

Google 在 2025 年发布的改进版本，通过搜索引擎增强的模型 ensemble 对原始数据集中的冲突来源进行调和，进一步提高了基准的可靠性。[^simpleqa-verified]

---

## HLE (Humanity's Last Exam)

> 来源：Center for AI Safety & Scale AI, 2025 年 1 月 | [官网](https://lastexam.ai/) | [论文](https://arxiv.org/abs/2501.14249) | [Nature 发表](https://www.nature.com/articles/s41586-025-09962-4)

HLE 是一个多模态基准测试，位于人类知识前沿，旨在解决现有基准被快速饱和的问题（如 MMLU 上当前模型已达 90%+ 准确率）。数据集包含约 2,500-3,000 道高难度问题，横跨数十个学科。

### 学科覆盖

数学、物理、化学、生物、医学、计算机科学、人文科学、社会科学等 100+ 个学科。

### 题目来源

由来自 50 多个国家、500 多个机构的近 1,000 名学科专家贡献，主要包括教授、研究人员和研究生学位持有者。

### 核心特点

- **专家级难度**：问题设计为"同类中最后一个闭卷学术基准"
- **多模态**：包含需要图像理解的题目
- **广覆盖**：横跨 100+ 学科
- **防污染**：题目均为原创或经过深度改编

### 当前表现

目前最优模型在 HLE 上的准确率仍然很低（<10%），使其成为衡量前沿模型能力的有效基准。

---

## Apex Shortlist (MathArena Apex)

> 来源：MathArena, 2025 年 | [官网](https://matharena.ai/apex/) | [Hugging Face 数据集](https://huggingface.co/datasets/MathArena/apex-shortlist)

Apex Shortlist 是从 2025 年各类数学竞赛中精选的 12 道最难题目组成的基准。这些题目经过筛选，确保当前最优模型在 4 次尝试内（pass@4）无法解决。

### 筛选方法

1. 从 2025 年几乎所有公开的最终答案型竞赛中手动搜索候选题目
2. 使用代表模型（Grok 4、GPT-5 High、Gemini 2.5 Pro、GLM 4.5）各尝试 4 次
3. 如果任何一次尝试得到正确答案，该题目被丢弃
4. 最终从近 100 个竞赛中仅筛选出 12 道题目

### 原始任务示例

#### Problem 1 - "The Integer Chord"（整数弦）

> 来源：All Russian 2025 11.8 | 类别：分析 | 最优模型：Qwen3 (7/16 正确)

```
设 f: ℝ → ℝ 为一个连续函数。定义"弦"为一条平行于 x 轴、长度为整数的线段，
其两端点位于 f 的图像上。已知 f 的图像恰好包含 N 条弦，其中一条长度为 2025。
求 N 的最小可能值。

正确答案：4049
最常见错误答案：2025（45% 的尝试）
```

#### Problem 2 - "The Zigzagging Chessboard"（锯齿棋盘）

> 来源：Turkey TST 2025 P5 | 类别：组合数学 | 最优模型：GLM 4.5 (2/16 正确)

```
设 P 是由无限棋盘的边构成的一个不自交多边形。令 a₁, a₂, a₃ 分别表示恰有
1、2、3 条边在 P 边界上的单位正方形的数量。求最大的实数 k，使得不等式
a₁ + a₂ > k·a₃ 对满足条件的每个多边形都成立。

正确答案：1/2
最常见错误答案：2（35% 的尝试）
```

#### Problem 4 - "The Divisoral Matrix"（因数矩阵）

> 来源：Serbian MO 2025 P6 | 类别：数论 | 最优模型：GPT-5-mini (1/16 正确)

```
称一个 n×n 的表格（填入正整数）为"可除的"，如果满足：第 i 行的数恰好是某个
正整数 rᵢ 的所有约数，第 j 列的数恰好是某个正整数 cⱼ 的所有约数，且对任意
i ≠ j 有 rᵢ ≠ rⱼ。给定一个素数 p，令 S(p) 为最小的正整数 n（n 被 p 整除），
使得存在一个 n×n 的可除表格。求所有素数 p ≤ 13 的 S(p) 之和。

正确答案：6266942768
最常见错误答案：80（48% 的尝试）
```

#### Problem 6 - "The p-adic Polynomial"（p-adic 多项式）

> 来源：ELMO Shortlist 2025 N7 | 类别：数论 | 最优模型：GPT-5-mini (1/16 正确)

```
设 n 为正整数，p 为素数。记 k(n,p) 为最大的非负整数 k，使得存在一个整系数
多项式 P(x) 满足以下条件：
- P(x) 的 xⁿ 项系数为 1
- 对所有整数 x，pᵏ 整除 P(x)

计算：
  Σₙ₌₁₁¹⁵ Σₚ∈{11,13} k(n,p)

正确答案：138
最常见错误答案：8（83% 的尝试）
```

#### Problem 12 - "The IMO Final Boss"

> 来源：IMO 2025 P6（改编为最终答案形式）| 类别：组合数学 | 最优模型：无正确尝试

```
考虑一个 2025 × 2025 的单位方格网格。Matilda 想要放置一些矩形瓦片（大小可以不同），
使得每个瓦片的每条边都在网格线上，且每个单位方格至多被一个瓦片覆盖。
求 Matilda 需要放置的最少瓦片数量，使得网格的每一行和每一列都恰好有一个
单位方格不被任何瓦片覆盖。

正确答案：2112
最常见错误答案：4048（81% 的尝试）
```

### 核心特点

- **极度困难**：最优模型 Qwen3 平均准确率仅 5.2%
- **无数据污染**：5/9 的评估模型在题目确定后才发布
- **模型通病明显**：模型往往懒惰且固执，快速锁定错误答案后试图强行论证
- **构造性难题**：组合数学问题尤其困难，模型倾向于选择简单但次优的构造

---

## Codeforces (CodeElo)

> 来源：QwenLM / 上海 AI Lab, 2025 年 1 月 | [论文](https://arxiv.org/abs/2501.01257) | [GitHub](https://github.com/QwenLM/CodeElo) | [官网](https://codeelo-bench.github.io/)

Codeforces 基准测试使用 Codeforces 平台的竞赛编程题目评估 LLM 的竞赛级代码生成能力。通过机器人直接向 Codeforces 提交模型解答进行测试，与人类参与者同场竞技，实现零假阳性。

### 题目特征

- **难度分级**：题目难度评分从 800 到 2400 不等
- **算法类别**：涵盖动态规划、图算法、数据结构、数学问题等
- **实时评测**：与人类选手一样在真实平台上提交和评测
- **ELO 评级**：使用与人类可比的 ELO 评分系统

### 原始任务示例

一个典型的 Codeforces 问题包含：

```
输入格式说明、输出格式说明、若干样例输入/输出、以及隐藏测试用例。

问题类型示例：
- Div.2 A：简单实现题（难度 ~800-1000）
- Div.2 C：中等算法题（难度 ~1200-1400）
- Div.1 D：高难度综合题（难度 ~2000+）
```

### 核心特点

- **零假阳性**：直接提交到真实平台评测，无法通过猜测通过
- **与人类可比**：使用 Codeforces 官方 ELO 评级系统
- **防污染**：使用最近 6 个月的竞赛题目
- **难度跨度大**：从入门到世界级竞赛难度

### 当前表现

o1-like 推理模型（如 o1-mini、QwQ-32B-Preview）表现最佳，但大多数模型即使面对简单问题也 struggle。

---

## SWE-bench Verified

> 来源：Princeton + OpenAI, 2024 年 8 月 | [官网](https://www.swebench.com/verified.html) | [OpenAI 博客](https://openai.com/index/introducing-swe-bench-verified/) | [论文](https://arxiv.org/abs/2310.06770)

SWE-bench Verified 是原始 SWE-bench 的人工验证子集，包含 500 个来自真实 GitHub 问题的实例。人类标注员审查每个实例以确保问题描述清晰、测试补丁正确、任务在给定信息下可解。

### 评估方式

给定一个代码库和一个 issue 描述，语言模型需要生成一个补丁（patch）来解决描述的问题。

- **FAIL_TO_PASS 测试**：在解决方案添加前失败、添加后通过的测试
- **PASS_TO_PASS 测试**：在 PR 合并前后都通过的测试，用于检查未破坏现有功能
- **两种测试都必须通过**才算完全解决 issue

### 原始任务示例

#### scikit-learn__scikit-learn-14520

**问题描述：**

```
函数参数 copy 可被用户指定，但被库忽略（行为在函数内部被硬编码）
```

一个函数接受 `copy` 参数，但用户传入的 `copy` 值被忽略，函数始终按固定行为执行。

**原始测试要求（过于具体的问题）：**

测试要求解决方案在 `copy` 参数被使用时必须抛出 `DeprecationWarning`，且警告消息必须与原始 PR 中的讨论完全一致——而这些信息 agent 无法获取。

**改进后的 SWE-bench Verified 处理方式：**

此类问题在 Verified 版本中被过滤或修正，确保测试只检查核心功能是否正确修复，而不强制要求特定的实现细节。

### 核心特点

- **真实世界问题**：来自 12 个流行的开源 Python 仓库（Django、Flask、scikit-learn 等）
- **人类验证**：500 个样本经过人工筛选，过滤掉 68.3% 有问题的原始样本
- **难度分层**：196 个 <15 分钟的简单任务，45 个 >1 小时的困难任务
- **Docker 容器化**：使用容器化环境确保评估可靠性

### 当前表现

GPT-4o 在最佳 scaffold 上达到 33.2%（原始 SWE-bench 为 16%）。Claude Mythos Preview 目前领先，达 93.9%。[^swe-bench-verified]

---

## Terminal Bench 2.0

> 来源：LAUDE Institute 等, 2026 年 1 月 | [论文](https://arxiv.org/abs/2601.11868) | [官网](https://www.tbench.ai/) | [GitHub](https://github.com/harbor-framework/terminal-bench)

Terminal Bench 2.0 是一个精心策划的硬核基准测试，包含 89 个计算机终端环境中的真实任务。每个任务都有独特的环境、人工编写的解决方案和全面的验证测试。

### 任务组成

每个 Terminal Bench 任务包含：
- **指令**（instruction.md）：自然语言描述的任务
- **Docker 环境**：预配置的容器环境
- **测试集**：验证任务完成情况的自动化测试
- **示例解决方案**：人工编写的参考解法
- **时间限制**：任务必须在指定时间内完成

### 任务类别

| 类别 | 示例任务 |
|------|----------|
| 科学计算 | 实现自适应拒绝采样器（adaptive-rejection sampler） |
| 代码编译 | 调试异步代码、解决编译错误 |
| 系统管理 | 配置服务器、设置环境 |
| 机器学习 | 训练模型、调试训练流程 |
| 安全 | 解决 CTF 式安全漏洞 |

### 原始任务示例

#### adaptive-rejection-sampler

```
你的任务是实现 Gilks et al. (1992) 描述的自适应拒绝采样器。

1. 你的解决方案应允许用户提供合理的输入（包括采样点数），并验证输入的有效性。
   主要输入应为一个函数或表达式，用于计算目标分布的（可能未归一化的）密度。
   你的代码应包含在采样过程中捕获非对数凹密度（non-log-concave densities）的检查。

2. 需要正式测试（见 1.），将结果与已知真值进行比较。
   你应对整体功能和任何复杂模块进行测试。
   鉴于输出是随机的，如何做这需要一些思考。
   测试函数的输出应清晰且可解释。

3. 你的解决方案应包含模块化代码，使用函数或 OOP 方法实现离散任务。
   你应该有一个整体设计方案，代码风格一致。
```

#### 另一个示例任务（来自论文描述）

```
任务：在一个隔离的 Docker 容器中，编译并运行一个给定的 C++ 项目。
该项目依赖若干第三方库，需要正确配置 CMake 才能编译通过。

环境：Ubuntu 容器，预装了基本开发工具但缺少部分依赖。

验证：编译成功后运行测试套件，所有测试通过即算完成。
```

### 核心特点

- **真实工作流**：任务灵感来自真实工作流程中的问题
- **长程任务**：需要多步操作才能完成
- **纯终端**：无 GUI，测试命令行能力
- **隔离环境**：每个任务在独立 Docker 容器中运行
- **难度高**：前沿模型和 agent 得分低于 65%

---

## Toolathlon

> 来源：HKUST NLP, ICLR 2026 | [论文](https://arxiv.org/abs/2510.25726) | [GitHub](https://github.com/hkust-nlp/Toolathlon) | [文档](https://toolathlon.xyz/)

Toolathlon（Tool Decathlon）是一个评估语言 agent 在真实环境中通用工具使用能力的基准测试。包含 600+ 种基于真实软件环境的多样化工具，每个任务需要长程工具调用来完成。

### 任务场景

任务基于真实的软件环境，涵盖：
- 邮件客户端（Dovecot/Poste.io）
- 学习管理系统（Canvas）
- 文件存储（MinIO/S3）
- 数据库
- 代码仓库
- 办公软件等

### 原始任务示例

#### Canvas Homework Grader Python（校园场景）

**任务指令：**

```
你的任务是检查邮箱中 homework2 的提交并在 Canvas 上评分。

请从邮件附件中下载 Python 文件到本地工作区，在终端中运行每个 Python 文件
检查是否有错误。如果 Python 文件正确，在 Canvas 中给它打 10 分；
否则打 0 分。

你可以在 assignments/homework2.md 中查看 homework2 的要求，
在 student_canvas_ids.csv 中查看学生 ID。
对于多次提交的学生，使用最新的一次提交。
```

**初始状态：**

```
workspace/assignments/
├── homework1.md
└── homework2.md
```

**邮箱中的示例邮件：**

```
主题：Homework 2 - Two Sum (CS101)

Hi Professor Torres,

Here's my homework 2 submission for the two sum problem.
I tried my best but I'm not sure if it's perfect.
I used the hash map approach we discussed in class. Hope it works!

Thanks,
Martha Watson

附件：two_sum.py

def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums)  # ← 有语法错误：缺少冒号
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []

if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    result = twoSum(nums, target)
    print(f"Result: {result}")
    print("Tests completed!")
```

**agent 需要完成的步骤：**

1. 访问邮件收件箱，筛选出 homework2 的提交邮件
2. 下载每封邮件的 Python 附件到本地
3. 根据 student_canvas_ids.csv 识别学生身份
4. 运行每个 Python 文件检查语法/逻辑错误
5. 在 Canvas 系统中为每个学生录入分数（10 或 0）
6. 对多次提交的学生，只使用最新提交评分

### 核心特点

- **真实工具**：600+ 工具基于真实软件环境
- **长程任务**：每个任务需要多步工具调用
- **执行验证**：基于执行的可靠评估，而非文本匹配
- **多样化**：涵盖 10 种不同的工具使用场景
- **隔离容器**：每个任务在独立容器中运行

---

## 各 Benchmark 对比

| Benchmark | 核心能力 | 题目数量 | 评估方式 | 当前最优表现 |
|-----------|----------|----------|----------|-------------|
| SimpleQA | 短形式事实性 | 4,326 | 文本匹配 | GPT-4o < 40% |
| HLE | 专家级知识 | ~2,500 | 多选题/短答案 | < 10% |
| Apex Shortlist | 数学推理 | 12 | 最终答案匹配 | Qwen3: 5.2% |
| Codeforces | 竞赛编程 | 动态更新 | 平台提交评测 | ELO 评级 |
| SWE Verified | 软件工程 | 500 | 测试通过 | Claude Mythos: 93.9% |
| Terminal Bench 2.0 | 终端操作 | 89 | 执行验证 | < 65% |
| Toolathlon | 工具使用 | 108+ | 执行验证 | 因任务而异 |

---

## 参考来源

[^simpleqa-verified]: [SimpleQA Verified: A Reliable Factuality Benchmark](https://arxiv.org/pdf/2509.07968), Google, 2025

[^swe-bench-verified]: [SWE-bench Verified](https://www.swebench.com/verified.html), Princeton + OpenAI, 2024

