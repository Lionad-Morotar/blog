# Canvas Blocker

## 前言

最近在看一些反反爬相关的东西，期间找到了 Canvas Blocker 这个神奇的库。他是一个浏览器扩展，声称能拦截以下几种类型的指纹追踪：

* Canvas 2D
* WebGL
* Web Audio
* History
* Window
* DOMRect
* TextMetrics
* Navigator
* Screen

让我们大致拆解一下，看看其原理是什么。

## Intercept

Blocker 最主要的思路就是用伪造的函数篡改属性的 Getter 以及某些 API。

篡改的入口在 intercept.js 中，先根据页面 URL 检查当前页面是否允许篡改，允许的话就通过 interceptFns、interceptGetters 实施具体步骤。

```js
scope.intercept = function intercept({subject: windowToProcess}, apis){
  const siteStatus = apis.check({url: getURL(windowToProcess)})
  logging.verbose("status for page", windowToProcess, siteStatus)
  if (siteStatus.mode !== "allow"){
    interceptFunctions(windowToProcess, siteStatus, apis)
    interceptGetters(windowToProcess, siteStatus, apis)
  }
}
```

## Window

Blocker 篡改了 Window 的两个属性，window.name 和 window.opener。这两个属性和指纹没有直接关系，但却是一种“帮助函数”，能够帮助恶意网站追踪指纹以及窃取隐私。

### window.name

在过去的浏览器中，window.name 能够跨站点传输数据，并且能逃逸同源策略。从 Firefox 88 开始，用户通过点击超链接跳转到新页面时，window.name 将被置空，不过为了不造成更大的破坏，当用户从跳转后页面回到之前页面时，window.name 会被还原。

* [Firefox 88 combats window.name privacy abuses](https://blog.mozilla.org/security/2021/04/19/firefox-88-combats-window-name-privacy-abuses/)
* [clear-window-name@web-platform-tests](https://wpt.fyi/results/html/browsers/windows/clear-window-name.https.html?label=master&label=experimental&aligned)

在使用 JS 设置 window.name 时，Blcoker 会记录下设置的值。original.call 调用原有的 window.name setter；windowNames 只做记录，稍后会用到。

```js
{
  set name(name){
    // 调用原有 setting 设置 window.name
    original.call(this, ...arguments)
    // 把 name 记录下来
    windowNames.set(this, name)
  }
}
```

因为只有通过显式的 window.name = 'xxx' 才会触发 windowNames 中记录的值的改变，所以一旦在 b.com 读取到的 window.name 不是 windowNames 记录的值，就说明浏览器泄露了 window.name，此时需要返回伪造的值。

```js
{
  get name(){
    return checkerWrapper(checker, this, arguments, function(args, check){
      const {notify, original, prefs} = check

      // 读取 b.com 的 window.name 可能会返回 a.com 的 window.name
      const originalName = original.call(this, ...args)

      // 根据配置，iframes 中返回的 window.name 可以赦免此伪造规则，
      // this !== this.top 是一种快速检测当前 window 是否在 iframe 中的方法
      if (
        this !== this.top &&
        prefs("allowWindowNameInFrames", this.location)
      ){
        return originalName
      }

      // 只有通过显式的 window.name = 'xxx' 才会触发 windowNames 中记录的值的改变，
      // 所以一旦 windowNames 记录的值和 originalName 不一样，
      // 就说明当前浏览器犯了 window.name 泄露的错误
      const returnedName = windowNames.get(this) || ""
      if (originalName !== returnedName){
        notify("fakedWindowReadout")
      }
      return returnedName
    });
  }
}
```

## window.opener

在过去的浏览器中，当页面通过超链接或 window.open 的方式从 A 网站跳转到 B 网站时，如果制定了 target 属性却没有指定 rel="norefer" 属性，那么在 B 网站是可以使用 window.opener 获取到 A 网站的部分信息的。也就是说，在 B 网站中可以修改 window.opener.location.href = 'x' 从而让 A 网站自动跳转到 X 网站。如果页面跳转时使用 target="__blank" 打开了新页面，那么用户更加不可能注意到 A 网站的恶意跳转。

* [CWE-1022: Use of Web Link to Untrusted Target with window.opener Access](https://cwe.mitre.org/data/definitions/1022.html)

Blocker 对 window.opener 的防范比较简单，直接返回 null 就完事儿了。考虑到现代浏览器已经修复了这个漏洞，该篡改的设置的值默认是关闭的。

```js
{
  // 修改 Getter 使 window.opener 一直返回 null
  getterGenerator: function(checker){
    const temp = {
      get opener(){
        return checkerWrapper(checker, this, arguments, function(args, check){
          const {notify, original} = check
          const originalOpener = original.call(this, ...args)
          if (originalOpener !== null){
            notify("fakedWindowReadout")
          }
          return null
        })
      }
    }
    return Object.getOwnPropertyDescriptor(temp, "opener").get
  },
  // 修改 Descriptor.Value 使得 window.opener 一直返回 null，
  // 这是一种兼容，在部分浏览器中，
  //  window.opener 是通过 value 而不是 getter 获取的值
  valueGenerator: function({original, notify}){
    if (original !== null){
      notify("fakedWindowReadout")
    }
    return null
  }
}
```

## Canvas

伪造了 getContext、getDataURL 等 API，并替代了原本正常的 API。

## 相关链接

* [CanvasBlocker](https://github.com/kkapsner/CanvasBlocker)