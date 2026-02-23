---
name: save-to-product-hunt
description: 将 Product Hunt 发现的产品归档到 product-hunt.md。当用户分享带有 ?ref=producthunt 或其他产品发现来源的链接时使用。
---

# Save to Product Hunt

## Overview

将 Product Hunt（或其他产品发现来源）的链接快速归档到 `content/6.maps/_product/product-hunt.md`，自动移除跟踪参数并按领域分类。

## Workflow

1. **获取产品信息** - 使用 web-reader 读取产品页面
2. **确定分类** - 根据产品功能选择合适分类：
   - AI 工具
   - 生产力工具
   - 视频工具
   - 开发工具
   - 设计工具
   - 其他（新建分类）
3. **添加链接** - 将产品添加到对应分类，移除 `?ref=producthunt` 等跟踪参数
4. **提交更改** - git commit

## 格式规范

```markdown
* [产品名称](https://clean-url.com)：简短描述（核心功能、亮点）
```

**注意**：
- 必须移除 `?ref=producthunt`、`?ref=xxx` 等跟踪参数
- 描述控制在 20-30 字，突出核心功能
- 如果分类不存在，可新建

## Example

用户输入：
```
简单归档到 product-hunt https://example.com/product?ref=producthunt
```

执行：
1. 读取页面获取产品信息
2. 确定分类（如"AI 工具"）
3. 添加到 product-hunt.md：
   * [Product Name](https://example.com/product)：AI 驱动的工作流自动化工具
4. git commit