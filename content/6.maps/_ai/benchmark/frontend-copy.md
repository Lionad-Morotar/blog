---
title: Frontend Copy Benchmark
description: 前端抄代码能力测试
---

## 目标

从蓝湖上下载了设计稿、切图和代码，全部扔给模型，实现首页。

## 提示词

```
## 环境变量
* 设计稿：~/company.platform.h5/refs/首页/index.png
* 设计稿转代码入口：~/company.platform.h5/refs/首页/index.html

## 目标
* 接下来，在 producer-services-v2/home.vue 实现首页。
* 工作流程：页面理解、精细组件拆分、页面实现。

## 要求
* 代码风格、页面或组件结构完全参考：~/company.platform.h5/pages/carbon-emission
* 不复用已有组件
```

## 说明

* 没有给单独的切图文件，但是切图可以从设计稿转代码的结果找到
* MCP、Skill 环境一致；IDE、记忆、Agent 略有差异
* glm-5 和 minimax-m2.5 不是多模态模型，只能通过图片分析工具理解设计稿

## 结果

#### gpt-5.2

👍：效果最好，接近完美

👎：少量的样式错误

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303100446874.png)

#### gemini-3-pro

👍：速度最快

👎：部分板块样式错误

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303100320650.png)

#### qwen-3.5-plus

34m 58s

👍：界面干净，比较完美

👎：导航的层级错误、轮播图板块

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303094416575.png)

#### doubao-seed-2.0-code

27m 37s

👍：倾向使用问题确定实现边界，甚至包含主动开启子代理的询问

👎：页面不能滚动、轮播图板块尺寸不对、少数图片和文字尺寸错误

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303093144995.png?w=30)

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303094009036.png?w=30)

#### glm-5

IDE 使用 on-my-opencode Sisyphus

👍：顺手实现了简单的点击反馈

👎：忽略了板块背景等样式、第一次提示后页面不能打开（没有遵守 Nuxt 组件命名策略，简单修复后可以打开）

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303095058346.png)

#### minimax-m2.5

IDE 使用 on-my-opencode Sisyphus，模型是 opencode 的免费模型

👍：无情干活机器

👎：部分样式错误实现、没有使用图片分析工具

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303095448700.png)

#### kimi-k2.5

👍：比较完美

👎：少量样式错误、第一次提示结束页面不能打开（没有遵守 Nuxt 组件命名策略，简单修复后可以打开）

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260303100923582.png)

## 总结

从 Kimi-k2.5 出了之后一直在用国产模型，但是还没画过新页面。完全没想到不同模型之间画页面差距能这么大。
