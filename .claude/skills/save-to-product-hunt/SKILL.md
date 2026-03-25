---
name: save-to-product-hunt
description: 将 Product Hunt 发现的产品归档到 product-hunt.md。当用户分享带有 ?ref=producthunt 或其他产品发现来源的链接时使用。
---

当前 SKILL 服务且仅服务于 `/Users/lionad/Github/Lionad-Morotar/blog` 博客项目，所有改动都应以该项目为基础。

# Save to Product Hunt

## Overview

将 Product Hunt（或其他产品发现来源）的链接快速归档到 `content/6.maps/_product/product-hunt.md`，自动移除跟踪参数并按 Product Hunt 官方分类整理。

## Workflow

1. **获取产品信息** - 使用 web-reader 或 browser 读取产品页面
2. **确定分类** - 根据产品功能选择 Product Hunt 官方分类：
   - **Engineering & Development** - 开发工具、代码编辑器、AI 编程助手
   - **Productivity** - 效率工具、笔记应用、写作助手
   - **Design & Creative** - 设计工具、视频编辑、生成式媒体
   - **Marketing & Sales** - 营销自动化、销售工具
   - **Social & Community** - 社交网络、社区管理
   - **Finance** - 金融、会计、投资
   - **AI Agents** - AI 代理、自动化工具
   - **LLMs** - 大语言模型、聊天机器人、AI 基础设施
3. **添加链接** - 将产品添加到对应分类，移除 `?ref=producthunt` 等跟踪参数
4. **提交更改** - git commit

## Product Hunt 官方分类

| 分类 | 包含内容 |
|------|----------|
| Engineering & Development | 开发工具、AI 编程助手、代码编辑器、API 工具 |
| Productivity | 效率工具、笔记应用、写作助手、团队协作 |
| Design & Creative | 设计工具、视频编辑、图形设计、AI 生成媒体 |
| Marketing & Sales | 营销自动化、销售工具、线索生成 |
| Social & Community | 社交网络、专业社交、社区管理 |
| Finance | 会计软件、投资工具、筹款资源 |
| AI Agents | AI 代理、语音代理、代理自动化 |
| LLMs | 大语言模型、AI 聊天机器人、提示工程工具、AI 基础设施 |

## 格式规范

```markdown
* [产品名称](https://clean-url.com)：简短描述（核心功能、亮点）
```

**注意**：
- 必须移除 `?ref=producthunt`、`?ref=xxx` 等跟踪参数
- 描述控制在 20-30 字，突出核心功能
- 如果分类不存在，可新建，但优先使用官方分类

## Example

用户输入：
```
简单归档到 product-hunt https://example.com/product?ref=producthunt
```

执行：
1. 读取页面获取产品信息
2. 确定分类（如"Engineering & Development"）
3. 添加到 product-hunt.md：
   * [Product Name](https://example.com/product)：AI 驱动的工作流自动化工具
4. git commit