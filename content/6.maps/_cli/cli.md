---
title: CLI
description: 命令行工具、脚本和自动化
---

## 子领域

* [媒体工具](/maps/_cli/tools/ffmpeg)
* [终端转义序列](/maps/_cli/terminal/escape-sequences)

## 概述

CLI（命令行界面）领域涵盖常用的命令行工具、脚本编写和自动化技术。重点包括媒体处理工具（如 FFmpeg 和 ImageMagick）用于视频、音频和图像的处理与转换。

#### 自动化脚本跳过交互式确认

**`-y` / `--yes` 参数**
```bash
npm install -y
terraform apply -auto-approve
```

**`CI=true` 环境变量**
```bash
CI=true npm install
DEBIAN_FRONTEND=noninteractive apt-get install
```

**`yes` 命令**
```bash
yes | rm -i *.txt        # 自动回答 y
yes "n" | ./install.sh   # 自动回答 n
yes | head -10 | cmd     # 限制次数
```
