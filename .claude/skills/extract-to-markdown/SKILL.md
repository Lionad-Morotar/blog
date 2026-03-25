---
name: extract-to-markdown
description: 从 PDF 和图片中提取内容为 Markdown 格式。用于将文档转换为 Markdown、从扫描文档中提取文字、处理技术文档，或将图片/PDF 内容数字化以便编辑和复用。
---

当前 SKILL 服务且仅服务于 `/Users/lionad/Github/Lionad-Morotar/blog` 博客项目，所有改动都应以该项目为基础。

# 提取为 Markdown

## 概述

将 PDF 文档和图片转换为结构化的 Markdown。本技能提供最佳工具推荐和工作流，实现准确提取并保留原有格式。

## 快速决策树

```
输入类型？
├── PDF（文本型或扫描型）
│   ├── 技术文档、学术论文 → Marker
│   └── 简单文本提取 → pdftotext (Poppler)
├── 图片（PNG、JPG 等）
│   ├── 带文字的截图 → Claude vision（直接读取）
│   ├── 扫描文档 → Tesseract OCR
│   └── 复杂布局图片 → PaddleOCR（中文支持）
└── 需要批量处理 → Marker（PDF）或 Tesseract（图片）
```

## PDF 提取

### Marker（推荐）

最适合技术文档、学术论文和复杂布局。保留结构、标题、表格和代码块。

```bash
# 单文件
marker single input.pdf --output_dir ./output

# 批量处理
marker --output_dir ./output ./pdfs/

# 指定页码范围
marker single input.pdf --output_dir ./output --page_range "0,5-10,20"
```

**输出：** Markdown 文件 + 提取的图片存放在子文件夹中

**安装：**
```bash
pip install marker-pdf
```

**适用场景：**
- 多栏布局
- 含表格和图片的文档
- 学术论文
- 技术文档
- 需要保留文档结构

### pdftotext（轻量级）

快速提取文本，不保留格式。

```bash
# 基础提取
pdftotext input.pdf output.txt

# 保留布局
pdftotext -layout input.pdf output.txt
```

**安装：**
```bash
# macOS
brew install poppler

# Ubuntu/Debian
apt-get install poppler-utils
```

**适用场景：**
- 简单文本提取
- 大批量处理
- 不需要格式
- 快速预览

## 图片提取

### Claude Vision（截图）

对于截图和清晰的图片，Claude 可以直接读取，无需额外工具。

**最适合：**
- UI 截图
- 文字清晰的图片
- 小片段
- 快速提取，无需配置

### Tesseract OCR

开源 OCR 引擎，适合扫描文档。

```bash
# 单张图片
tesseract image.png output -l eng

# 多语言
tesseract image.png output -l eng+chi_sim

# 保留空白
tesseract image.png output --psm 6
```

**安装：**
```bash
# macOS
brew install tesseract

# Ubuntu/Debian
apt-get install tesseract-ocr

# 语言包
brew install tesseract-lang  # macOS
apt-get install tesseract-ocr-chi-sim  # 简体中文
```

**页面分割模式（--psm）：**
| 模式 | 使用场景 |
|------|----------|
| 3 | 默认，自动分割 |
| 6 | 单一均匀文本块 |
| 11 | 稀疏文本 - 尽可能找到更多文字 |
| 12 | 带 OSD 的稀疏文本 |

### PaddleOCR（中文支持）

更适合中文文本和复杂布局。

```bash
# 安装
pip install paddleocr

# 命令行
paddleocr --image_dir image.png --use_angle_cls true --lang ch

# Python
from paddleocr import PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang='ch')
result = ocr.ocr('image.png', cls=True)
```

**适用场景：**
- 中文文档
- 复杂布局
- 多语言混合文档
- 亚洲语言识别准确率优于 Tesseract

## 后处理技巧

### 清理提取的 Markdown

1. **移除页码和页眉：**
   ```regex
   ^\d+$\n?  # 独立数字（页码）
   ```

2. **修复断句：**
   - 查找行尾的连字符单词
   - 连接跨页断开的句子

3. **表格格式：**
   - Marker 能很好地保留表格
   - 其他工具可考虑使用表格转换器

4. **图片引用：**
   - Marker 提取图片为 `_page_X_Picture_Y.jpeg`
   - 移动到合适的资源文件夹

### 质量检查清单

- [ ] 验证表格格式
- [ ] 检查代码块缩进
- [ ] 确认标题层级
- [ ] 审查图片标题
- [ ] 移除重复的页眉/页脚
- [ ] 修复断开的链接（如有）

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| Marker 转换慢 | 首次运行需下载模型；后续运行更快 |
| Tesseract 识别错误 | 尝试不同的 --psm 模式或图片预处理 |
| 复杂表格 | Marker 处理效果最佳；可能需要手动清理 |
| 中文文本 | 使用 PaddleOCR 或 Tesseract 配合 chi_sim 语言包 |
| 带图片的扫描 PDF | Marker 自动提取文字和图片 |

## LLM 润色（ProofReading）

提取 Markdown 后，使用 LLM 进行润色：

1. **检查并修正识别错误** - 修复 OCR 或转换过程中产生的文字错误
2. **优化排版格式** - 统一标题层级、代码块、列表等 Markdown 格式
3. **改善可读性** - 去除多余的换行、修复断句、优化段落结构
4. **保留原文意图** - 润色时不改变原意，仅改善表达方式

## 参考资料

- [Marker 文档](references/marker-guide.md)：高级选项和故障排查
- [OCR 对比](references/ocr-comparison.md)：针对特定使用场景的详细工具对比