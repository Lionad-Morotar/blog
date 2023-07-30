# 工具函数无冲突处理

[TOC]

## 源码解读

```html
<script>
	var $ = 'prototype\'s $'
</script>
<script src="jquery.js" />
<script>
	$.noConflict()
	console.log($) // prototype's $
</script>
```

```js
var
    _$ = window.$,
    _jQuery = window.jQuery

// ....

jQuery.extend({
    noConflict (extreme) {
        window.$ = _$

        if (extreme) {
            window.jQuery = _jQuery
        }
        return jQuery
    }
})
```

代码引入时，先通过下划线开头命名的变量，将 `window.$`（可能是其它库）以及 window.jQuery 储蓄起来了。这之后，若是调用 noConflict 函数，将会直接还原 `window.$` 为原始值。

noConflict 最后还将 jQuery 返回了，也就是说，jQuery 的无冲突处理还可以这样玩儿：

```js
// method one
$.noConflict(true)
jQuery('.box')

// method two
const jq = $.noConflict()
jq('.box')

// method three
(function ($) {
    // inside IFEE $ === jQuery
    $('.box')
})($.noConflict())
```

