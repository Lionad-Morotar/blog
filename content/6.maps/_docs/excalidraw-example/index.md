---
title: Excalidraw 嵌入示例
---

本文演示如何在博客文章中嵌入 Excalidraw 交互式图表。

## 什么是 Excalidraw

Excalidraw 是一个开源的虚拟手绘风格白板工具，可以创建精美的手绘风格图表。通过集成 Excalidraw 组件，你可以在博客文章中直接展示交互式图表，读者可以缩放、平移查看细节。

## 示例图表

下面是一个简单的系统架构图，展示了 Excalidraw 与 Nuxt Content 的集成方式：

::Excalidraw{src="assets/sample-diagram.excalidraw"}

### 图表说明

这个图表展示了：

- **Excalidraw**：手绘风格图表绘制工具
- **Nuxt Content**：博客内容管理系统
- **Interactive**：交互式图表展示

图表使用手绘风格的矩形和箭头，展示了 Excalidraw 图表如何嵌入到 Nuxt Content 博客中，并提供交互式查看体验。

## 交互功能演示

上面的图表支持以下交互操作：

### 缩放

- **鼠标滚轮**：向上滚动放大，向下滚动缩小
- 可以放大查看图表的细节部分

### 平移

- **鼠标拖拽**：按住鼠标左键可以拖动图表
- 当图表放大后，可以拖动查看不同区域

### 自动适配

图表默认以 **auto-fit 模式** 显示：
- 自动居中展示全部内容
- 无需手动调整即可查看完整图表

## 暗色模式支持

Excalidraw 图表会自动适配博客的暗色模式。如果你切换到暗色主题，图表背景会自动变为深色，文字和线条颜色也会相应调整，确保在暗色模式下依然清晰可读。

## 如何创建自己的图表

### 1. 绘制图表

访问 [excalidraw.com](https://excalidraw.com/) 在线绘制图表，或使用 Obsidian 的 Excalidraw 插件。

### 2. 导出文件

绘制完成后，将图表导出为 `.excalidraw` 文件：
- 点击菜单按钮（三条横线）
- 选择 "Save to file"
- 保存为 `.excalidraw` 格式

### 3. 放置文件

将导出的文件放在文章目录的 `assets/` 文件夹中：

```
my-article/
├── index.md
└── assets/
    └── my-diagram.excalidraw
```

### 4. 嵌入图表

在文章中使用 MDC 语法引用：

```markdown
::Excalidraw{src="assets/my-diagram.excalidraw"}
```

## 更多资源

- [Excalidraw 使用指南](../excalidraw-guide) - 完整的文档说明
- [Excalidraw 官网](https://excalidraw.com/) - 在线绘制工具
- [Excalidraw GitHub](https://github.com/excalidraw/excalidraw) - 开源代码

## 技术细节

本博客使用 `@nuxtjs/excalidraw` 模块实现 Excalidraw 集成：

- **只读模式**：图表以只读模式显示，读者无法编辑
- **ClientOnly 渲染**：避免服务端渲染的 hydration 问题
- **自动主题适配**：根据博客主题自动切换亮/暗色模式
- **相对路径解析**：基于文章位置自动解析图表文件路径
