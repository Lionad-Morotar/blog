# de-indent

de-indent 是 Vue 解析 SFC 是引用的一个工具包。能将代码中额外的前置缩进去掉。

## 长话短说

de-indent 很简单，只做了以下三件事情：

* 将源码拆分为行
* 遍历代码行，找到最小缩进（或空格）数量
* 每行都去除最小缩进（或空格）数量

## 简单实现

其实我在写博客时碰到过额外的前置缩进这种问题。当时，写了一个 highlight.js 的 Vue 组件封装，用来在 Markdown 的 HTML 代码中写代码高亮，如：

```markdown
<p>
    <Highlight lang='js'>
        export default {
            hello: 'world'
        }
    </Highlight>
</p>
```

看起来没啥问题，但是这段文本传到 Vue 组件内部，就会带上一些不必要的缩进，和前后两个多余的换行。

```js

        export default {
            hello: 'world'
        }

```

对于缩进，简单处理如下。将源码拆分为行，找出最小的前置空格数量，记长度为 minSpace，然后每行去除这个等长的前置空格：

```js
const splits = codes.split(/\n/)
const tabs = splits.map(x => x.search(/[^\s]/))
const minSpace = Math.min(...tabs)
const reMinSpace = new RegExp(`\\s{${minSpace}}`)
codes = splits.map(x => x.replace(reMinSpace, '')).join('\n')
```

## 源码解析

思路是一模一样的，但是 de-indent 这玩意儿性能高很多倍。

```js
var splitRE = /\r?\n/g
var emptyRE = /^\s*$/
var needFixRE = /^(\r?\n)*[\t\s]/

module.exports = function deindent (str) {
  // 如果第一行前没有空格，直接退出
  if (!needFixRE.test(str)) {
    return str
  }
  // 将代码拆分成行
  var lines = str.split(splitRE)

  /* 这里只循环了一次就找到了最小空格数量，并且做了优化 */
  var min = Infinity
  // type 用来记录缩进是 tab 还是空格
  var type, cur, c 
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    if (!emptyRE.test(line)) {
      if (!type) {
        c = line.charAt(0)
        if (c === ' ' || c === '\t') {
          type = c
          cur = count(line, type)
          if (cur < min) {
            min = cur
          }
        } else {
          return str
        }
      } else {
        cur = count(line, type)
        if (cur < min) {
          min = cur
        }
      }
    }
  }
  // 用 String.slice 切除前置空格，性能最好
  return lines.map(function (line) {
    return line.slice(min)
  }).join('\n')
}

function count (line, type) {
  var i = 0
  while (line.charAt(i) === type) {
    i++
  }
  return i
}
```

正在复习 VueJS 的源码，看到 de-indent 这玩意儿。本来说早就知道它了，就直接跳过吧，但还是打开浏览器扫了一眼。这一扫算收获不小。

以后尽量还是多用简单的原生函数，性能要高很多。这也警醒了我：别因为喜欢用 replace，就到处都用 replace ...