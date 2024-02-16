instant.page 本身的原理：

* 将 click 事件替换为 mousedown 触发，快 85ms
* 鼠标悬浮到 a 标签时预加载 HTML 文档，能快约 300ms

模仿 instant.page 以及做出改进：

* 在 ui 库的 c-button 组件将 click 事件默认替换到 mousedown 触发，快 85ms
* 改 ui 库的 c-router-link 组件在 hover 时预取组件 JS 和 CSS
* 使用 IntersectionObserver