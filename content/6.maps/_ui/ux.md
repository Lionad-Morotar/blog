---
title: 用户体验（UX）
description: 用户体验设计原则、反模式与交互成本分析
---

## 反模式

#### 激励涌现型敌对架构（Hostile Architecture）

新闻网站糟糕体验并非设计师蓄意为之，而是激励结构的系统性涌现。
Viewability（可见性）和 time-on-page（页面停留时长）是决定 CPM 竞价的核心指标，
每一次延迟关闭按钮、自动播放视频、强制注册弹窗，都是本地理性决策——
但累积起来，产生了"将读者注意力视为可提取资源"的敌对系统。
没有工程师下令让阅读变得痛苦；这是千个小激励决策的集体灾难。

见：[The 49MB Web Page](https://thatshubham.com/blog/news-audit)：对新闻网站 hostile UX 的深度解剖

#### Z 轴战争（Z-Index Warfare）：预读拦截的叠层模式

用户点击新闻链接，目标明确：读那段文字。但页面加载后迎来的是协调进攻：
GDPR/Cookie 横幅占据视口底部 30%，滚动一次触发"订阅通讯"Modal，
浏览器同时弹出通知权限请求。用户必须执行"视觉分类"，找到被刻意设计成
低对比度的关闭按钮——完成这些数字杂务，才能接触到原本 5KB 的正文内容。
NNgroup 将交互成本（Interaction Cost）定义为用户达成目标所需付出的心智和
体力总和，Z 轴战争是故意将交互成本前置的反模式。

见：[The 49MB Web Page](https://thatshubham.com/blog/news-audit)：对新闻网站预读拦截模式的实地分析
