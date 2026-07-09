---
title: Image Generation
description: AI 图像生成技术与工具，包括 Stable Diffusion 等文生图模型与提示词技巧。
original_path: _ai/image.md
---

## OpenAI

#### gpt-image-2 与图像生成模型的自审局限

2026 年 4 月 21 日 OpenAI 发布 gpt-image-2（ChatGPT Images 2.0）。
Sam Altman 在直播中声称 gpt-image-1 到 gpt-image-2 的跃迁相当于 GPT-3 到 GPT-5，但这一类比属于营销话术。Simon Willison 用「Where's Waldo」风格提示词横评：
gpt-image-1 无法生成可辨识的浣熊；gpt-image-2 默认参数同样失败；使用 `--quality high --size 3840x2160` 后成功在左下角生成浣熊，消耗 13,342 output tokens，
按 $30/百万计费约 40 美分。对比中 Google Nano Banana 2 表现不错（浣熊位于图像中央），Nano Banana Pro 结果最差。作者认为 gpt-image-2 暂时超越 Gemini 夺魁。

rizaco 在 Hacker News 让 ChatGPT 在图片中画红圈标浣熊位置，结果显示模型在不存在的位置画了圈——图像生成模型无法可靠地「解题」自己生成的图像。这里存在两个竞争性解释：其一是生成与理解的解耦，
模型对自身输出无法建立可靠的空间索引；其二是测试方法论问题——纯文本到图像缺乏空间约束，理想流程应先提供底图再通过 mask 画圈约束生成范围，但 gpt-image-2 目前没有编辑模式。

见：[Where's the raccoon with the ham radio?](https://simonwillison.net/2026/Apr/21/gpt-image-2/)

## Seedream

#### Pro 的 4K 是像素陷阱

Seedream 5.0 Pro 并非靠堆分辨率取胜。官方 API 文档将输出像素乘积限制在 4,194,304（等价于 2048×2048），
16:9 场景下长边只能到约 2752–2848 px，即俗称的 2.7K 左右。这与 Lite 支持原生 3K/4K 的规格形成倒挂，
因此如果业务需求是印刷级 4K 或大屏物料，选 Pro 反而可能拿不到想要的尺寸，需要先确认目标分辨率再决定用
Pro 还是 Lite，必要时配合 upscaler。

见：[Seedream 5.0 Pro - Runware Docs](https://runware.ai/docs/models/bytedance-seedream-5-0-pro)

#### 编辑只写"改什么"会连带毁整体

用参考图做局部编辑时，Seedream 5.0 Pro 不会自动保留未提及的区域。如果只描述"把鞋面换成森林绿"，
模型很可能同时改动背景、角度、光影甚至鞋型。稳定做法是在提示词里用明确的 pin 语句列出必须保持不变的属性，
例如"保持原图轮廓、相机角度、背景、灯光不变"。没有 pin 语句的编辑请求，返工率会显著上升。

见：[Prompting Seedream 5.0 Pro - Runware Docs](https://runware.ai/docs/models/bytedance-seedream-5-0-pro/guides/prompting)

#### 多图融合 Prefer 白底产品图

多图融合最多支持 10 张参考图，但参考图类型直接决定合成稳定性。白底 packshot 的几何、材质、logo 比
lifestyle 图更稳定；用生活场景图做参考，容易出现材质漂移、形变或比例失真。提示词中应通过内容描述来指代
参考图（如"tan leather-bound journal"），而不是用"first reference"这类索引，否则换图顺序后提示词会错位。

见：[Prompting Seedream 5.0 Pro - Runware Docs](https://runware.ai/docs/models/bytedance-seedream-5-0-pro/guides/prompting)

#### 提示词过长会丢失指定细节

虽然 API 允许 positivePrompt 最长 3000 字符，但官方指南建议控制在 600 英文词以内。超过这个长度后，
模型注意力会分散，复杂信息图或多主体场景中的指定细节容易 dropout。分层式提示词
（格式 → 主体 → 构图 → 灯光 → 文字 → 风格）和先声明画幅/版式，比单纯堆砌形容词更能保留关键信息。

见：[Prompting Seedream 5.0 Pro - Runware Docs](https://runware.ai/docs/models/bytedance-seedream-5-0-pro/guides/prompting)

## Stable Diffusion

* [Stable Diffusion](/maps/_ai/image/stable-diffusion) - 提示词收集与风格指南

