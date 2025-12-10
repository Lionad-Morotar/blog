---
title: Daily Bugs
description: 追踪一些日常碰到的软件缺陷
---

#### 2025-11-30

不听话的 Github Copilot

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511302322306.png)

#### 2025-11-28

Nuxt 多打一个引号，页面直接炸了，报错找不到任何有用的信息。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511281109208.png)

#### 2025-11-26

Go 的中文文档 typo。以后所有文档自动拷贝成 i18n 站多好。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511261601627.png)

---

  YouMind 搜索资料被 403 了。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511262317741.png)

#### 2025-11-10

  在类型文件 import 外部类型后找不到命名空间问题。

  参考这个解决：[TS 解决找不到命名空间“Courses”](https://juejin.cn/post/7077760247359602718)

#### 2025-11-06

  碰到一个奇怪的问题。发现是错误的 template 导致的。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511061805391.png)

#### 2025-11-05

  1. [Qwen3-embedding 的维度设置问题](https://github.com/coze-dev/coze-studio/issues/838)
  2. Coze Studio 中的鼠标交互问题：<video src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511051626902.mov" controls="controls" width="100%">Your browser does not support the video tag.</video>
  3. 在 Mac Edge 中，搜狗拼音输入不了中文，发现输入框在屏幕上一个奇怪的位置。切换到 VSCode 后能正常输入，再重新切换回 Edge 就好了。

#### 2025-10-27

  MacOS 15 的计算器的问题，能稳定复现。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202510272328599.mp4)

#### 2025-10-22

```
[plugin:vite:vue] crypto.hash is not a function
```

  使用了新版 Vite 后，需要替换新版 NodeJS，不然 API 不兼容。

#### 2025-10-19

  关闭右侧客服弹窗后，仍然存在一个白色的弹窗区域。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/PixPin_2025-10-19_13-04-39.png)

  也许是因为 Windows 更新导致的，无论是在网页还是应用内使用 Explorer 选择文件，选择框都会卡死。多次重启后解决。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/3db30da9c32753c926d793c16203391e.png)

#### 2023-10-24

  * [关于语雀 23 日故障的公告](https://mp.weixin.qq.com/s/WFLLU8R4bmiqv6OGa-QMcw)
