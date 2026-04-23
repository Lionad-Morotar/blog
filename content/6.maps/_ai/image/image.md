---
title: Image Generation
description: AI 图像生成技术与工具，包括 Stable Diffusion 等文生图模型与提示词技巧。
original_path: _ai/image.md
---

## OpenAI

#### gpt-image-2 与图像生成模型的自审局限

2026 年 4 月 21 日 OpenAI 发布 gpt-image-2（ChatGPT Images 2.0）。Sam Altman 在直播中声称 gpt-image-1 到 gpt-image-2 的跃迁相当于 GPT-3 到 GPT-5，但这一类比属于营销话术。Simon Willison 用「Where's Waldo」风格提示词横评：gpt-image-1 无法生成可辨识的浣熊；gpt-image-2 默认参数同样失败；使用 `--quality high --size 3840x2160` 后成功在左下角生成浣熊，消耗 13,342 output tokens，按 $30/百万计费约 40 美分。对比中 Google Nano Banana 2 表现不错（浣熊位于图像中央），Nano Banana Pro 结果最差。作者认为 gpt-image-2 暂时超越 Gemini 夺魁。

rizaco 在 Hacker News 让 ChatGPT 在图片中画红圈标浣熊位置，结果显示模型在不存在的位置画了圈——图像生成模型无法可靠地「解题」自己生成的图像。这里存在两个竞争性解释：其一是生成与理解的解耦，模型对自身输出无法建立可靠的空间索引；其二是测试方法论问题——纯文本到图像缺乏空间约束，理想流程应先提供底图再通过 mask 画圈约束生成范围，但 gpt-image-2 目前没有编辑模式。

见：[Where's the raccoon with the ham radio?](https://simonwillison.net/2026/Apr/21/gpt-image-2/)

## Stable Diffusion

* [Stable Diffusion](/maps/_ai/image/stable-diffusion) - 提示词收集与风格指南
