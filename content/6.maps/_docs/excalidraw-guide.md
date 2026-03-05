---
title: Excalidraw 图表使用指南
---

本文档介绍如何在博客文章中创建和嵌入 Excalidraw 手绘风格图表。

## 什么是 Excalidraw

[Excalidraw](https://excalidraw.com/) 是一个开源的虚拟手绘风格白板工具，可以创建精美的手绘风格图表。它的特点包括：

- **手绘风格**：图表看起来像手绘的，更加亲切自然
- **开源免费**：完全免费使用，代码开源
- **易于使用**：直观的拖拽界面，无需学习成本
- **多种图形**：支持矩形、圆形、箭头、线条、文字等
- **深色模式**：支持自动适配深色主题

## 绘制图表

### 使用 Excalidraw 官网

1. 访问 [excalidraw.com](https://excalidraw.com/)
2. 直接在浏览器中绘制图表
3. 无需注册即可使用

### 使用 Obsidian 插件

如果你使用 Obsidian 笔记软件：

1. 在社区插件中搜索 "Excalidraw"
2. 安装并启用插件
3. 使用 `Ctrl/Cmd + P` 打开命令面板
4. 输入 "Excalidraw: Create new drawing"

## 导出文件

绘制完成后，需要将图表导出为 `.excalidraw` 文件：

### 从 Excalidraw 官网导出

1. 点击左上角的菜单按钮（三条横线）
2. 选择 **"Save to file"**（保存到文件）
3. 选择保存位置，文件将以 `.excalidraw` 格式保存

### 从 Obsidian 导出

1. 在 Excalidraw 绘图界面
2. 点击右上角的菜单按钮
3. 选择 **"Save as..."** 或 **"Export"**
4. 选择 `.excalidraw` 格式

## 放置文件

导出的 `.excalidraw` 文件需要放在文章目录的 `assets/` 文件夹中：

```
content/
└── 6.maps/
    └── _docs/
        └── my-article/
            ├── index.md          # 文章正文
            └── assets/           # 图表文件存放目录
                └── diagram.excalidraw
```

### 文件命名建议

- 使用有意义的文件名，如 `architecture.excalidraw`、`flow-chart.excalidraw`
- 避免使用中文文件名，防止编码问题
- 使用小写字母和连字符，如 `system-design.excalidraw`

### 子目录组织

如果一篇文章包含多个图表，可以使用子目录：

```
assets/
├── diagrams/
│   ├── architecture.excalidraw
│   └── data-flow.excalidraw
└── icons/
    └── logo.excalidraw
```

## 引用图表

在 Markdown 文章中使用 MDC 语法引用图表：

```markdown
::Excalidraw{src="assets/diagram.excalidraw"}
```

### 路径规则

- `src` 路径是**相对于文章文件**的相对路径
- 如果文章在 `my-article/index.md`，图表在 `my-article/assets/diagram.excalidraw`
- 引用路径为 `assets/diagram.excalidraw`（不包含 `index.md` 部分）

### 子目录引用

如果图表放在子目录中：

```markdown
::Excalidraw{src="assets/diagrams/architecture.excalidraw"}
::Excalidraw{src="assets/icons/logo.excalidraw"}
```

## 交互功能

嵌入的 Excalidraw 图表支持以下交互功能：

### 缩放

- **鼠标滚轮**：向上滚动放大，向下滚动缩小
- **触摸手势**：双指捏合缩放（移动端）

### 平移

- **鼠标拖拽**：按住鼠标左键拖动图表
- **触摸滑动**：单指滑动移动图表（移动端）

### 初始视图

图表默认使用 **自动适配模式**（auto-fit）：
- 自动居中显示
- 展示全部内容
- 无需手动调整即可查看完整图表

### 只读模式

图表以**只读模式**显示：
- 读者无法编辑图表内容
- 不显示编辑工具栏
- 专注于查看和浏览

## 暗色模式

Excalidraw 图表会自动适配博客的暗色模式：

- **亮色模式**：图表显示为白色背景
- **暗色模式**：图表自动切换为深色背景

无需额外配置，图表会根据读者的系统偏好或博客主题设置自动调整。

## 故障排除

### 图表显示"加载失败"

**可能原因**：
1. 文件路径错误
2. 文件不存在
3. 文件格式不正确

**解决方法**：
1. 检查 `src` 路径是否正确（相对于文章文件）
2. 确认 `.excalidraw` 文件已上传到 `assets/` 目录
3. 验证文件是否为有效的 JSON 格式

### 图表显示空白

**可能原因**：
1. 图表内容为空
2. 文件内容损坏

**解决方法**：
1. 在 Excalidraw 编辑器中打开文件确认内容
2. 重新导出文件

### 路径解析错误

**问题示例**：
```markdown
<!-- 错误：使用了绝对路径 -->
::Excalidraw{src="/content/6.maps/_docs/assets/diagram.excalidraw"}

<!-- 错误：路径指向文章文件而非目录 -->
::Excalidraw{src="index.md/assets/diagram.excalidraw"}
```

**正确写法**：
```markdown
<!-- 正确：相对路径，基于文章位置 -->
::Excalidraw{src="assets/diagram.excalidraw"}
```

## 创建优质图表的建议

### 保持一致的风格

- 使用统一的颜色方案
- 保持线条粗细一致
- 使用相同的字体大小

### 适当的尺寸

- 图表宽度会自动适应容器（100%）
- 建议图表高度控制在 400-800px 范围
- 避免过宽或过窄的图表

### 清晰的结构

- 使用对齐工具保持元素整齐
- 合理利用分组功能组织相关元素
- 添加适当的文字说明

### 可读性

- 确保文字大小合适（建议最小 16px）
- 使用高对比度的颜色组合
- 避免过度拥挤的布局

## 示例

查看 [Excalidraw 示例文章](./excalidraw-example/) 了解实际使用效果。
