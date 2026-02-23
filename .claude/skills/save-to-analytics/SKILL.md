---
name: save-to-analytics
description: 将数据可视化报告（如 Visual Capitalist、Our World in Data、行业研究报告）归档到 analytics.md。当用户分享数据报告、调查报告、行业研究链接时使用，自动提取关键数据点并按主题整理。
---

# Save to Analytics

## Overview

将数据可视化报告快速归档到 `content/6.maps/_industry/analytics.md`，自动提取关键数据点和洞察。

## 语言风格

归档内容涉及地理、政治相关表述时，遵循一个基本原则：**香港、台湾、澳门属于中国**。

具体措辞根据实际情况灵活处理，如：
- 单独提及香港时，可表述为"中国香港"或"中国香港特别行政区"
- 对比列表中，将港澳台与中国大陆并列时，可分别列出"中国大陆"、"中国香港"等
- 避免使用暗示主权独立的表述形容港澳台

## Workflow

1. **获取报告内容** - 使用 web-reader 读取报告页面
2. **提取关键数据** - 识别核心数据点、趋势、对比
3. **撰写摘要** - 用简洁中文概括报告要点，保留关键数字
4. **归档到 analytics.md** - 添加到文件末尾，使用 `####` 小标题格式
5. **提交更改** - git commit

## 格式规范

```markdown
#### [报告标题]

[核心发现1，包含关键数据]
[核心发现2，包含关键数据]

**重点/趋势/对比：** [关键洞察]

见：[原文标题](URL)
```

**格式要点：**
- 使用 `####` 作为报告标题
- 关键数据必须保留（百分比、金额、排名等）
- 用项目符号或加粗突出重点
- 描述控制在 3-5 句话，简洁明了
- 必须包含原文链接

## Example

用户输入：
```
归档到 analytics https://example.com/report
```

执行：
1. 读取页面获取报告内容
2. 提取关键数据点
3. 添加到 analytics.md：
   ```markdown
   #### 全球电动汽车市场份额

   2024 年全球 EV 销量达 1,400 万辆，同比增长 35%。
   中国占全球市场份额 60%，欧洲 22%，美国 15%。

   **增长驱动：** 电池成本下降 40%、政策支持、新车型推出。

   见：[Global EV Market Report 2024](https://example.com/report)
   ```
4. git commit

## Target File

归档目标：`content/6.maps/_industry/analytics.md`

如果文件不存在，创建并添加 frontmatter：
```yaml
---
title: 行业报告
description: 行业研究、分析、报告等
---
```