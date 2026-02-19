---
title: Debug
description: 系统化 Bug 修复方法
---

#### 系统化 Bug 修复方法

React 核心开发者 Dan Abramov 提出的 Bug 修复方法论，强调通过**可复现测试用例（Repro）**逐步缩小问题范围。

| 步骤 | 行动 | 关键原则 |
|------|------|----------|
| **0** | Just Fix It | 先尝试直接修复，但要有验证手段 |
| **1** | Find a Repro | 找到可复现的测试用例，明确定义"预期"与"实际"行为 |
| **2** | Narrow the Repro | 缩小复现范围，用更简单的方式暴露相同问题 |
| **3** | Remove Everything Else | 逐步删除代码，确保每一步 bug 仍存在（基线保护） |
| **4** | Find the Root Cause | 最终定位根本原因 |

Repro 是一切的基础；没有可验证的复现步骤，任何"修复"都是盲目的。

见：[How to Fix Any Bug — overreacted](https://overreacted.io/how-to-fix-any-bug/)