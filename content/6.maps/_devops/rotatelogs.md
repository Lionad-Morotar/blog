---
title: rotatelogs
description: Apache 内置的日志轮转工具，通过管道机制实现按时间或大小切割日志文件。
---

## 简介

#### rotatelogs 是什么？

Apache 自带的日志轮转程序。它不独立运行，而是作为管道的接收端——Apache 往管道写日志，rotatelogs 从另一头读，到点就换个新文件接着写。

#### 管道机制怎么工作？

配置里写一行 `CustomLog "|rotatelogs /var/log/access.%Y%m%d.log 86400" common`。Apache 启动时，管道符 `|` 告诉它：别写文件，启动 rotatelogs 进程，把日志喂给它。rotatelogs 拿到数据后，按你指定的规则（每天、每小时、每 100MB）切分。

## 原理

#### 数据流向

```
Apache (写 stdout) → 管道 → rotatelogs (读 stdin) → 文件系统
```

Apache 只管往标准输出写，不关心后面是谁。rotatelogs 只管从标准输入读，不关心前面是谁。这种解耦让 rotatelogs 可以被任何支持管道的程序使用。

#### 轮转触发

两种模式：时间间隔（秒数，如 `86400` 表示每天）或文件大小（字节数）。时间到了或文件大了，关闭当前文件，打开新文件。文件名支持 strftime 格式，所以 `/var/log/access.%Y%m%d.log` 在 2024 年 3 月 15 日会变成 `/var/log/access.20240315.log`。

## 消息边界问题

#### 问题在哪？

rotatelogs 处理的是字节流，不是消息。它不知道什么是"一行日志"，更不知道什么是"一个 JSON"。轮转时刻到了，它就切一刀——不管你写到哪。

#### 举个例子

23:59:59，你的程序开始写一个 10MB 的 JSON。00:00:00，轮转时间到。这个 JSON 的前半截留在昨天的文件，后半截进了今天的文件。两边都不完整，解析时全挂。

#### 根本原因

管道是字节流。rotatelogs 读到什么写什么，不缓冲、不等待、不理解边界。这不是 bug，是设计如此——简单、高效、不阻塞上游。

## 解决方案

#### 应用层保证

写入端自己负责：每条日志一行，行尾换行符作为边界。大多数日志框架都这么干。

#### 使用 logrotate

logrotate 是操作系统层面的工具，它不依赖管道。它的工作方式是：等文件写完，重命名，发信号让程序重新打开文件。这种方式尊重程序内部的缓冲逻辑，不会在半截切断消息。缺点是时间精度不如 rotatelogs——可能差几分钟。

#### 接受它

如果你的日志格式本身就是行导向的（大多数 Web 服务器日志都是），而每行又足够短（几百字节到几 KB），那这个问题几乎不会遇到。只有当日志行特别大（比如嵌了 base64 图片、大 JSON）时才需要担心。

见：[Log messages split between files on log rotation · Issue #409](https://github.com/rsyslog/rsyslog/issues/409)

## 与 logrotate 对比

| 特性 | rotatelogs | logrotate |
|------|------------|-----------|
| 运行方式 | 常驻进程，实时处理 | 定时任务，批处理 |
| 时间精度 | 秒级精确 | 分钟级，依赖 cron |
| 依赖 | Apache 管道 | 独立程序，信号通知 |
| 消息边界 | 不保证 | 程序配合时可保证 |
| 压缩 | 不支持 | 支持 |

见：[Apache日志管理精要：rotatelogs vs logrotate](https://runebook.dev/zh/docs/apache_http_server/programs/rotatelogs)

## 配置示例

#### 按天轮转

```apache
CustomLog "|rotatelogs /var/log/apache2/access.%Y%m%d.log 86400" combined
ErrorLog "|rotatelogs /var/log/apache2/error.%Y%m%d.log 86400"
```

#### 按小时轮转

```apache
CustomLog "|rotatelogs /var/log/apache2/access.%Y%m%d%H.log 3600" combined
```

#### 按大小轮转（每 100MB）

```apache
CustomLog "|rotatelogs /var/log/apache2/access.log 100M" combined
```

注意：按大小轮转时，文件名不会自动变化，需要配合 `%s` 或其他策略。

见：[Apache 配置日志切割](https://www.cnblogs.com/xiaqiuchu/p/18248962)
