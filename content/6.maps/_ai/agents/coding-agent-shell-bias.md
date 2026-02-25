---
title: Coding Agent 的 Shell 偏差
description: 探讨 Coding Agent 在 PowerShell 与 Bash 环境下的性能差异及其训练语料根源
---

#### LLM 训练语料中的 Shell 分布失衡

Coding Agent 在 Windows PowerShell 与 Bash 环境下的表现差异，根源在于训练语料的不均衡分布。
根据公开数据集统计，Shell/Bash 与 PowerShell 的语料比例约为 **3:1 到 10:1**：

| 数据集 | Shell/Bash | PowerShell | 比例 |
|--------|-----------|------------|------|
| XVERSE-65B | 0.74% | 0.23% | 3.2:1 |
| GitHub Code（文件数） | 1,385,648 | 136,846 | 10:1 |
| GitHub Code（数据量） | 3.01 GB | 0.69 GB | 4.4:1 |

这种失衡源于历史与生态因素：Bash 自 1989 年发布，而 PowerShell 直到 2016 年才跨平台；
开源生态和 CI/CD 基础设施长期以 Linux/Bash 为主流，企业 Windows 环境的 PowerShell 脚本多存在于私有仓库，未进入公开训练数据。

#### 实际性能差异表现

在 Claude Code 等 Agent 的实际运行中，Windows 原生 PowerShell 环境与 WSL/Linux 存在显著性能差距：

| 环境 | 命令延迟 | 相对性能 |
|------|---------|---------|
| 原生 Linux | <1 秒 | 基准 |
| WSL2 | ~1.5 秒 | 接近原生 |
| Windows 原生 PowerShell | **10+ 秒/命令** | 严重滞后 |

文件系统操作方面，Windows NTFS 在文件搜索任务上比 Linux EXT4 慢约 **23%**。
Claude Code 等工具底层依赖 Unix 工具链（`grep`、`find`、`awk`），Windows 需通过 Git Bash 等兼容层提供支持，增加了子进程启动开销和路径转换复杂度。

#### 主流 Benchmark 的平台倾向

现有 Coding Agent Benchmark 呈现明显的 Linux 中心化特征：

| Benchmark | 原生平台 | Windows 支持 |
|-----------|---------|-------------|
| OSWorld | Ubuntu Linux | WindowsAgentArena 扩展 |
| SWE-bench | Linux/Docker | 容器间接支持 |
| SWE-agent | Linux/Unix | Docker 封装 |

这些基准测试的设计假设与执行环境均以 Bash 工具链为基础，
Windows 环境的评估要么缺失，要么通过 Docker/WSL 间接实现，掩盖了原生 PowerShell 场景的真实表现。

#### 关键洞见

**训练语料 imbalance 转化为 runtime performance gap**。
当 Agent 生成 PowerShell 命令时，由于语料 exposure 不足，更易出现：
- 参数幻觉（编造不存在的参数）
- 语法混淆（混用 Bash 语法写 PowerShell）
- 工具链误用（假设存在 Unix 工具）

这一现象揭示了当前 LLM 训练数据对 Windows 生态的系统性 under-representation，
也意味着在 Windows 原生环境部署 Coding Agent 时，需预期更高的容错成本或优先考虑 WSL 方案。

见：[Execution-Based Evaluation of Natural Language to Bash and PowerShell](https://arxiv.org/html/2405.06807v2)、
[XVERSE-65B Training Data](https://github.com/xverse-ai/XVERSE-65B)、
[Claude Code Windows Troubleshooting](https://zenn.dev/sora_biz/articles/claude-code-windows-troubleshoot)
