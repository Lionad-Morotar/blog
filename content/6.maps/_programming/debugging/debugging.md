---
title: 调试技术
description: 系统化 Bug 修复方法与调试技术
original_path: content/6.maps/_programming/debug.md
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

#### strace 系统调用跟踪速查

`strace` 是 Linux 下观察进程与内核交互的诊断工具，无需重新编译或修改代码即可跟踪系统调用、
信号传递和进程状态变化。核心入口是 `strace ./a.out`（跟踪新命令）和 `strace -p <PID>`
（附加到运行中进程）。

常用选项按场景选择：`-o file` 重定向输出；`-s 200` 延长字符串打印长度；`-yy` 显示文件描述符
对应路径；`-c` 汇总各系统调用的次数与耗时；`-f` 跟踪子进程；`-e trace=open,read,write,connect`
只过滤特定调用；`-e status=failed` 只看失败调用。

输出格式为 `syscall(参数) = 返回值 <耗时>`，例如
`openat(AT_FDCWD, "/etc/hosts", O_RDONLY|O_CLOEXEC) = 3 <0.000012>`。errno 如 `ENOENT`、
`EACCES`、`ECONNREFUSED` 通常直接暴露问题根因。常见排查模式包括：
用 `-e trace=openat,stat,fstat,access` 找文件缺失，用 `-p <PID>` 观察 hang 住所停位置，
用 `-e trace=socket,connect,sendto,recvfrom` 诊断网络连接失败，用 `-c` 做性能初筛。

macOS 没有原生 strace，等价工具为 `sudo dtruss -f ./a.out` 或直接使用 DTrace。

见：[strace - Linux manual page](https://www.man7.org/linux/man-pages/man1/strace.1.html)
