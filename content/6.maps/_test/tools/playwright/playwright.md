---
title: Playwright
description: Playwright 自动化测试工具介绍，包含其安装便捷性、先进理念和配套工具等主要特点。
original_path: content/6.maps/_test/tools/playwright.md
---

#### Playwright 的优点

- 安装方便：支持 Chrome、Edge 等现代浏览器，可以自动安装，无需下载 Web Driver。
- 理念先进：许多 API 无需考虑异常超时或竞态问题；使用测试夹具（test fixtures）解耦了测试上下文和浏览器上下文。
- 有配套工具：使用 VSCode 插件快速调试和排查问题，甚至可以通过手动操作浏览器来"录制"测试用例为代码

#### React 合成控件需要真实点击事件

浏览器自动化中，React 等框架的按钮对脚本派发的 `el.click()` 或 `dispatchEvent` 经常不
响应——框架在事件委托层做了合成事件过滤，非 trusted 事件触发的回调会被忽略。

判断：`click` 返回 `success: true` 只代表事件派发成功，不代表业务生效，必须对比操作前
后状态（key 字符串、列表项数量、弹窗是否出现）作为验证锚点。解法是走 CDP 的
`Input.dispatchMouseEvent`（Playwright 的 `click()`、webbridge 的 click action 内部即
此），派发可信鼠标事件，等价真实用户点击。

附带坑：`:has-text("xxx")` 是 Playwright 专属选择器语法，非标准 CSS，直接喂给 CDP 或
querySelector 会静默失败，需用标准 CSS 或框架返回的元素 ref。

见：[MDN - Event.isTrusted](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)