# W3C 规范集合

[TOC]

## ES

#### [proposal-defer-import-eval](https://github.com/tc39/proposal-defer-import-eval)

动态导入有两个问题：网络请求带来的性能损耗、异步传染性。延迟导入执行提案（proposal-defer-import-eval）希望通过创建一个类似 Proxy 的外部对象 DeferredModuleNamespace，允许同步模块导入模块，但是只有使用到模块时才执行。

#### [proposal-regexp-v-flag](https://github.com/tc39/proposal-regexp-v-flag)

<q>the v and u flags cannot be combined</q>

v 模式拥有 u 模式所有优点（支持 unicode）并带来了新功能和改进，且有后向兼容。因为他是一个全新的模式，所以 u 模式和 v 模式不能同时使用。

1. v 模式支持预设的几种字符串属性（properties of strings），可以解决 u 模式不能匹配多码合一 Emoji 的问题（最终这些字符串属性在 u 模式中也能使用）。

```js
'👨🏾‍⚕️'  // '\u{1F468}\u{1F3FE}\u200D\u2695\uFE0F'

/^\p{Emoji}$/u.test('👨🏾‍⚕️') // -> false
/^\p{RGI_Emoji}$/v.test('👨🏾‍⚕️') // -> true
```

2. v 模式支持集合操作（交集、并集、合集）

```js
/[\p{Decimal_Number}--[0-9]]/v.test('𑜹'); // → true
```

3. 改善了大小写匹配逻辑

## HTML

## CSS

#### [CSS Scrollbars Styling Module Level 1](/articles/source-code/css/scrollbar.html)

<!-- BLOCK - 2a2171afae04283296e4f0a931eec534 -->
Scrollbars Styling 模块主要定义了用于控制滚动条的样式使用到的一些属性。在 Level 1 规范中，主要介绍了 scrollbar-color 和 scroll-width，分别用来控制滚动条的颜色和宽度。
<!-- BLOCK - END -->

## Web

#### Multi-Screen Window Placement

```js
// Detect if the device has more than one screen.
if (window.screen.isExtended) {
  // Request information required to place content on specific screens.
  const screenDetails = await window.getScreenDetails();
  // Detect when a screen is added or removed.
  screenDetails.addEventListener('screenschange', onScreensChange);
  // Detect when the current <code data-opaque bs-autolink-syntax='`ScreenDetailed`'>ScreenDetailed</code> or an attribute thereof changes.
  screenDetails.addEventListener('currentscreenchange', onCurrentScreenChange);
  // Find the primary screen, show some content fullscreen there.
  const primaryScreen = screenDetails.screens.find(s => s.isPrimary);
  document.documentElement.requestFullscreen({screen : primaryScreen});
  // Find a different screen, fill its available area with a new window.
  const otherScreen = screenDetails.screens.find(s => s !== primaryScreen);
  window.open(url, '_blank', `left=${otherScreen.availLeft},` +
                             `top=${otherScreen.availTop},` +
                             `width=${otherScreen.availWidth},` +
                             `height=${otherScreen.availHeight}`);
} else {
  // Detect when an attribute of the legacy <code data-opaque bs-autolink-syntax='`Screen`'>Screen</code> interface changes.
  window.screen.addEventListener('change', onScreenChange);
  // Arrange content within the traditional single-screen environment...
}
```

Working Draft，见：[MSWP](https://www.w3.org/TR/window-placement/)

## Security

#### [Subresource Integrity](/maps/w3c/subresouce-integrity.html)

<!-- BLOCK - 11029a843d11296b21dad1130fd1d208 -->
子资源完整性是允许浏览器通过检查哈希值的方式来判断脚本等资源是否经过篡改的一项协议。
<!-- BLOCK - END -->