---
title: Agent 输出优秀案例
description: 收集 agent 输出超出预期智能的 good case：可复用的行为模式，可当作 prompt 与 skill 设计的模板。
---

## 简介

这里收集 agent（对话助手、编程代理）输出的 good case：行为超出对当前一代模型的常规预期、模式可复用、
值得在 prompt 或 skill 设计里主动模仿。案例以第一手会话截图与原文为主，附必要的机制注解。

#### 案例：受众自适应的语域自切换

glm-5.3-flash 的智能体验在奇奇怪怪的地方，和之前的 glm-5.2 一样。这个案例是 Agent 搜索了网络资料后，
对用户首先做了简短的归纳「Stack Overflow 高票答案与 kgrz.io 的长文都以此为根因展开。」，而后归档时把
面向用户的内容重写成了更适合归档的内容。

![AbortSignal 会话截图（图床原图）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260928104208130.png)
