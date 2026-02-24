---
title: 框架与工具
description: 开发框架、工具库与 TUI 框架
original_path: content/6.maps/_programming/rezi.md
---

## TUI 框架

#### Rezi 是什么？

Rezi 是一个高性能的 TypeScript 终端 UI（TUI）框架。开发者使用声明式组件树编写界面，由原生 C 引擎（Zireael）处理布局计算和渲染。

核心特点：
- **TypeScript 上层 + C 引擎底层**：保持开发体验的同时获得接近原生的性能
- **56 个内置组件**：布局、表单、数据展示、导航、覆盖层、可视化等
- **Canvas 绘图**：支持盲文、六分符、四分符、半块等子字符分辨率绘制
- **图像渲染**：通过 Kitty、Sixel、iTerm2 协议内联显示 PNG/JPEG
- **终端自动检测**：自动识别 Kitty、WezTerm、iTerm2、Ghostty 等终端
- **确定性渲染**：相同状态 + 相同事件 = 相同帧，支持录制和回放

见：[Rezi 文档](https://rtlzeromemory.github.io/Rezi)

---

*注：此子领域未来可扩展更多开发框架与工具库内容。*
