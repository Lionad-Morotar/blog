# JavaScript Micro-Templating

[TOC]

回顾 HTML Parser 的时候，回想起在忍者秘籍中提到的这个微型模板解析器。当时没怎么看懂，现在过了一年了，拿出来重新看看，应该能看懂了... 

## 完整实现

```js
// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
(function(){
  var cache = {}
   
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
       
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
         
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
         
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');")
     
    // Provide some basic currying to the user
    return data ? fn( data ) : fn
  }
})()
```

## 解析

首先是一个 IIFE，给 this 对象挂载了 tmpl 函数，通过闭包保存了模板解析的缓存：

```js
(function(){
  var cache = {}
  this.tmpl = function tmpl(str, data){}
})()
```

str 参数有两种两种用途，`/\W/.test(str)` 用来判断字符串中包不包含模板分隔符，如果不含分隔符，即普通字符串，那就当作 ID，从页面对应 ID 的节点中获取内容作为模板。比如，如果 str 为 'user_tmpl'，那么模板函数将会读取页面的以下脚本的内容作为输入：

```html
<!-- type="text/html"，所以浏览器并不会执行这串脚本。它只能由 tmpl 来读取... -->
<script type="text/html" id="item_tmpl">
  <div id="<%=id%>" class="<%=(i % 2 == 1 ? " even" : "")%>">
    <div class="grid_1 alpha right">
      <img class="righted" src="<%=profile_image_url%>"/>
    </div>
    <div class="grid_6 omega contents">
      <p><b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p>
    </div>
  </div>
</script>
```

```js
(function(){
  var cache = {}
  this.tmpl = function tmpl(str, data){
      return !/\W/.test(str) 
        // 缓存会将读取脚本内容到模板解析这个过程的解析结果缓存下来
        ? cache[str] = cache[str] || 
            // 读取脚本内容
            tmpl(document.getElementById(str).innerHTML)
        : new Function()
  }
})()
```

`new Function()` 即模板解析的核心内容，原理是用一个数组，保存所有解析内容，再拼接回字符串，作为 JS 执行。类似 eval 函数。

```js
new Function("obj",
    "var p=[];"
    // + '...'
    + "return p.join('')"
)
```

我们要解析什么内容呢？无非是 `<%=hello%>` 这种模板字符串。执行过程中，通过 with 语句，将内部变量的求值（hello）转移到参数对象（data.hello）。这个玩意儿在 VueJS 的模板编译中也用到过：

```js
/* VueJS */
with (vm) {
  return createVNode('p', 
    { attrs: { 'hi': hello /* vm.hello */ } }, 
    [createTextNode('Hello World')]
  )
}
```

那如何解析呢？

我们知道，模板字符串只有三种内容：字符串、变量及逻辑。

* 普通字符串 `<html>Lionad</html>`
* 带变量字符串 `<html><%=name%></html>` 
* 带逻辑字符串 `<% if(name){ %><html><%=name%></html><% } %>`。
  
所以解析模板，无非就是把这三种字符串替换成纯粹的 JS 逻辑，作为 new Function 的参数。其中所有中间变量，我们可以用一个数组来储存：

* 将普通字符串直接推入我们的内容数组，比如 `<html>Lionad</html>` 应该被解析为 `p.push('<html>Lionad</html>')`。
* 如果碰到变量，则将变量拆分出来推入数组，如 `<html><%=name%></html>` 应该被解析为 `p.push('<html>');p.push(name);p.push('</html>')`。
* 带逻辑的字符串，由于逻辑本身就是 JS 代码，所以不需要解析为字符串，只需要把两侧的 `<% %>` 这种模板标志去掉就好了。如 `<% if(name){ %><html><%=name%></html><% } %>` 应该被解析为：`if(name){ p.push('<html>');p.push(name);p.push('</html>') } `。

以下面这段模板为例，我们看看字符串具体的替换规则。

```js
str = `<% for ( var i = 0; i < users.length; i++ ) { %>
    <li><%=users[i]%></li>
<% } %>`
```

```js
// 引入 obj 即参数 data 作为局部作用域，将 str 转为纯 JS 代码
"with(obj){p.push('" + str
    // 将换行等空白字符转换为空格，这样所有代码都在一行了
    .replace(/[\r\t\n]/g, " ")
    .split("<%").join("\t")
    // 去掉模板标志两端的引号
    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
    // 以下三句最重要
    // 将所有变量推入数组，
    // 生成结果形如 `push('xxx',x,'xxx')` 的字符串
    .replace(/\t=(.*?)%>/g, "',$1,'")
    .split("\t").join("');")
    .split("%>").join("p.push('")
    // 处理剩余的换行符
    .split("\r").join("\\'")
+ "');}"
```

有一个小细节，字符串替换时，所有逻辑语句的模板标志开头和结尾（`<%`、`%>`）分别被替换为 `');`、`push('`，但是开头和结尾的那个标志，并没有对应的匹配。所以在代码中，能看 `with(obj){p.push('` 和 `');` 这种手动补全。

最终生成的字符串如下（为便于阅读，已格式化处理）：

```js
`with(obj){
    p.push(''); 
    for ( var i = 0; i < users.length; i++ ) { 
        p.push('     <li>',users[i],'</li>   '); 
    } 
    p.push('');
}`
```

最后，返回这个新函数。如果不传参数 data 给模板函数，则会返回一个高阶函数以等待执行；否则立即调用。其结果 `return p.join('')` 就是模板解析生成的内容。

```js
(function(){
  var cache = {}
  this.tmpl = function tmpl(str, data){
    return data ? fn( data ) : fn
  }
})()
```

额外提一句，Function 构造器和 eval 函数比，除了能传参数意外，还有一些细节不同，比如说声明变量的作用域不同。这个需要注意。此外，由于 with 语句非常容易出错，且不利于静态优化，不推荐在业务函数里使用。

这个函数不长，但一口气看下来还是蛮要力气的。主要是如果不清楚模板字符串的原理和模板有哪些作用，就会被那个长长的字符串替换链给吓住。阅读源码需要技巧，我总结了几点，希望能帮助到你：

* 从注释或函数名甚至是 Commit Message 入手，总之要先要知道这段代码有什么用
* 将 if/while 等条件转换为流程图，可以快速理清代码结构
* 使用编辑器的折叠代码，一次只看一部分源码
* 从特定变量跟踪搜索，比如在 jQuery 中搜索 `extend`，就能了解它的来龙去脉
* 复杂代码可以借助 Chrome 调试器或 lambda-view、Madge 等工具

## 阅读更多

* [VueJS Parser](../vuejs/parser.html)

* [JavaScript Micro-Templating](https://johnresig.com/blog/javascript-micro-templating/)
* [with@MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)