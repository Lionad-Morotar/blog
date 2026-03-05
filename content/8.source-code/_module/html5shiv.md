---
title: 🛠 低版本浏览器兼容HTML5标签原理
---

## 长话短说

最近在复习 HTML 相关内容呢，不知不觉想起以前在实习公司用过的 html5shiv 这个玩意儿。html5shiv 能使 IE6/7/8 等浏览器支持 HTML5 的新标签[^html5shiv]。这里我初略扫了一眼它的原理。

它主要做了以下两件事情：

* 用高阶函数增强浏览器原生的 createElement 等 API。需要创建新标签时，使用已缓存的元素克隆并返还一个新元素，或回退至调用原生 API 创建 H5 新元素。这个增强是基于 document.createElement 能创建非标准元素这个特性实现的。
* 给新标签增加相应的默认样式。

## 具体实现

### 代码结构

整个代码被包裹在 IIFE 中。像 jQuery 一样，把 window 对象传了进来。

```js
;(function(window, document) {
    // rest of code
}(typeof window !== "undefined" ? window : this, document));
```

一个很经典的模块模式，没什么好拓展的，我们继续...

### 兼容性检测

以下代码检测当前浏览器对 HTML5 的支持程度。

通过检测元素对 hidden 属性的支持程度，检测浏览器对 HTML5 样式支持的水平。

```js
a = document.createElement('a')
supportsHtml5Styles = ('hidden' in a)
```

以前没听过 HTMLElement.hidden，项目里的隐藏元素都是直接上 CSS 做的。不过据 MDN 表示，除了隐藏元素之外，hidden 属性还能用于创造离屏 Canvas[^hidden]。

这段代码用于测试浏览器是否支持未知元素的创建。

```js
a = document.createElement('a')
a.innerHTML = '<xyz></xyz>'
supportsUnknownElements = a.childNodes.length == 1 || (function() {
    var frag = document.createDocumentFragment()
    return (
    typeof frag.cloneNode == 'undefined' ||
    typeof frag.createDocumentFragment == 'undefined' ||
    typeof frag.createElement == 'undefined'
    )
}())
```

如果连 document.createElement 都调用失败的话，那 html5shiv 代码就毫无作用了（html5shiv 的原理需要用到 document.createElement），所以用一个 try/catch 将上述两个功能包裹起来。遇到错误则假装浏览器正常支持 HTML5，相关检测变量被置为 true。

```js
(function() {
    try {
        var a = document.createElement('a')
        a.innerHTML = '<xyz></xyz>'
        //if the hidden property is implemented we can assume, 
        // that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a)

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
            // assign a false positive if unable to shiv
            // ? 猜测特定浏览器对这种括号调用方法会报错
            (document.createElement)('a')
            var frag = document.createDocumentFragment()
            return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
            )
        }())
    } catch(e) {
        // assign a false positive if detection fails => unable to shiv
        supportsHtml5Styles = true
        supportsUnknownElements = true
    }
}())
```

### 功能仿制

每个页面可能有多个 iframe，所以可能有多个 document 对象。因为不同 document 对象可被 shiv 的元素可能不同，所以需要一个变量用作记录。

getExpandoData 方法在传入的 document 对象下挂载了一个属性名为 '_html5shiv' 的空对象，用来便捷存放某些数据（比如说元素缓存），并返回对象单例。

```js
var expandoData = {}
var expanID = 0
var expando = '_html5shiv'
function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]]
    if (!data) {
        data = {}
        expanID++
        ownerDocument[expando] = expanID
        expandoData[expanID] = data
    }
    return data
  }
```

如何对 document 进行 html5 的增强呢？原理体现都在 shivDocument 这个函数了，只需要增强浏览器原生的 createElement 等 API 的功能，再添加对应的元素样式就好了。

```js
function shivDocument(ownerDocument) {
    // 挂载 document._html5shiv
    var data = getExpandoData(ownerDocument)

    // 增强样式
    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      )
    }

    // 这个 if 印证了 ##兼容性检测 那个小节提到的：
    // 如果当前浏览器连 document.createElement 都会报错，
    // 那就没办法 shiv 了，只好假装一切正常...
    if (!supportsUnknownElements) {
      // 增强 createElement 和 createDocumentFragment
      shivMethods(ownerDocument, data)
    }
    return ownerDocument
  }
```

接下来，仔细康康 shivMethods 方法。shivMethods 仿制了 createElement 和 createDocumentFragment 两个 API，将其挂载到 document._html5shiv。并通过装饰器模式增强了浏览器原生的 createElement 等 API 的功能。

```js
function shivMethods(ownerDocument, data) {
    // 创建缓存并在 data 中挂载一些原生方法以方便操作
    if (!data.cache) {
        data.cache = {}
        data.createElem = ownerDocument.createElement
        data.createFrag = ownerDocument.createDocumentFragment
        data.frag = data.createFrag()
    }

    ownerDocument.createElement = function(nodeName) {
      // shivMethods 可看作全局的 shiv 开关
      if (!html5.shivMethods) {
          return data.createElem(nodeName)
      }
      return createElement(nodeName, ownerDocument, data)
    }

    // 调用该函数时，会立马创建一堆需要 shiv 的元素的实例到 data.frag 中，
    // 最终返回 data.frag 的克隆函数
    // PS：在我的浏览器中 documentFragment.createElement 并不是一个可调用的方法，
    // 猜测它只能在老版本 IE 上起作用
    ownerDocument.createDocumentFragment = Function(
      'html5,dataFrag', 
      'return function(){' +
        'var clone=dataFrag.cloneNode(),create=clone.createElement' +
        'html5.shivMethods&&(' +
            // unroll the `createElement` calls
            getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
            data.createElem(nodeName)
            data.frag.createElement(nodeName)
            return 'create("' + nodeName + '")'
            }) +
        ')return clone' +
      '}'
    )(html5, data.frag)
  }
```

小插曲。我在浏览器测试时发现，若像上面这个函数一样，将 document.createDocumentFrament 先缓存，再调用，会发生报错：

```js
data = {}
data.createFrag = document.createDocumentFragment
data.frag = data.createFrag()

// >>> Uncaught TypeError: Illegal invocation
```

由于没有具体的报错原因，只能暂时猜测是 this 指向的锅。更改 this 指向后，再试了一次，这次没得问题。在 GitHub issues 中没有人提过这个问题，所以我只能猜测因为所有现代浏览器都支持使用原生 API 创建非标准元素，所以不会走 shivMethods 的逻辑。

```js
data = {}
data.createFrag = document.createDocumentFragment.bind(document)
data.frag = data.createFrag()

// >>> #document-fragment
```

我们继续。以下代码是对 createElement 的仿制， 用于返回一个已经 shiv 过的元素。主要是用来兼容原生 document.createElement 不支持创建一个非规范的元素的情况。比方说，HTML5 标签中有 article 元素，document.createElement 不支持的话，就需要调用此仿制 API。

```js
function createElement(nodeName, ownerDocument, data){
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName)
    }
    if (!data) {
        data = getExpandoData(ownerDocument)
    }
    var node

    // 如果缓存中有，则从缓存中的这个元素克隆出一个新元素
    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode()
    } else 
    // 如果缓存中没有，同时此元素可以被克隆（IE：不是所有元素都能被拷贝），
    // 则创建一个新元素并存到缓存中
    if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode()
    } else 
    // 如果是不能被克隆的对象，那就直接创建吧...
    {
        node = data.createElem(nodeName)
    }

    // data.frag 对象缓存了新元素。同时这里做了一些兼容性处理。
    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn 
        ? data.frag.appendChild(node) 
        : node
  }
```

和 createElement 类似，createDocumentFragment 也需要仿制。

```js
function createDocumentFragment(ownerDocument, data){
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment()
    }
    // 吐槽下，这个赋值语句风格和 createElement 函数里的不一致...
    data = data || getExpandoData(ownerDocument)
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length
    for(;i<l;i++){
        // 返回的 documentFragment 包含了所有 shived 元素
        clone.createElement(elems[i])
    }
    return clone
  }
```

可以发现，需要 shiv 的元素都存在了 getElements 这个方法中，我们来看看具体实现。

```js
// getElements 返回 html5.elments 的数组形式
// 看来 getElements 也只是一个类似 getter 的存在
function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
}

// 继续追溯可以找到挂载在全局 config html5 对象中的 elements 的值：
var html5 = {
    // options 是外部调用 html5shiv 的接口参数
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video'
}
```



### 私有方法

接下来是几个私有方法。和 shiv 原理不相关，所以不重要。

```js
/**
 * Creates a style sheet with the given CSS text and adds it to the document.
 * 在文档头部添加样式标签
 */
function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement
    // ? 这个 'x' 应该是兼容性考虑
    p.innerHTML = 'x<style>' + cssText + '</style>'
    return parent.insertBefore(p.lastChild, parent.firstChild)
}
```

一对用来维护 html5.elements 的方法 getElements、addElements。相当于 getter/setter。因为 html5shiv 将 html5 这个对象挂载到了 window 对象上，向外暴露。所以可以轻易调用 addElements 维护 html.elements。

```js
function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
}
function addElements(newElements, ownerDocument) {
    var elements = html5.elements
    if(typeof elements != 'string'){
        elements = elements.join(' ')
    }
    if(typeof newElements != 'string'){
        newElements = newElements.join(' ')
    }
    html5.elements = elements +' '+ newElements

    // 每次增加元素的最后，会进行一次 shiv
    shivDocument(ownerDocument)
}
```

## 阅读更多

害，看 html5shiv 并不能带来什么具体的帮助。看完之后，只感觉上一代前端真是太辛苦了，为 IE 操碎了心。现代前端技术随着打包工具的发展开阔了不止一点，兼容性这个曾经的代码重心已经悄然落下帷幕。如果现在我去哪家公司面试，还会被大面积问到兼容性问题，那估计我会当场“quit”吧。

[^html5shiv]: [html5shiv](https://github.com/aFarkas/html5shiv)
[^hidden]: [HTMLElement.hidden@MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/hidden)