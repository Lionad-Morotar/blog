# Lodash 源码学习

[TOC]

## String

### camelCase、kebabCase、snakeCase

各种命名法的转化方式，算是字符串的常见操作了。一般我们喜欢使用正则去处理这些内容，像我的工具函数箱中就常备了以下函数：

```js
/**
 * @example
 * camelCase('a-b__cc') // -> "aBCc"
 */
function camelCase(s) {
    const shouldConvert = !(s.indexOf('-') === -1 && s.indexOf('_') === -1)
    return shouldConvert
        ? s.replace(/[-_]+([^-_])/g, (...args) => args[1].toUpperCase())
        : s
}
```

Lodash 中的转换函数要强大的多，比如 camelCase 他能将 'Foo Bar', '--foo-bar--', '\_\_FOO_BAR\_\_' 等形式的字符串转换为 'fooBar'。createCompounder 会创造一个迭代器，每次把匹配到的字符串传进去处理，由于匹配模式默认是词组，所以 camelCase 等函数都是建立在处理词组的基础上，而非像我自己的工具函数一样是处理单个字符。

```js
/**
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
    return function(string) {
        // 注意，这里会去除一些特殊字符
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '')
    }
}

// 将不是第一个的词组转换为大写首字母形式
var camelCase = createCompounder(function(result, word, index) {
    word = word.toLowerCase()
    return result + (index ? capitalize(word) : word)
})

// 词组之间用中隔线连接
var kebabCase = createCompounder(function(result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase()
})

// 词组之间用下划线连接
var snakeCase = createCompounder(function(result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase()
})
```

### truncate

_.truncate 这个函数的功能意外的强大，可以像以下方式使用：

```js
/**
 * @example
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   length: 24,
 *   separator: /,? +/,
 *   omission: ' [...]'
 * })
 * // -> 'hi-diddly-ho there [...]'
 */

function truncate(string, options) {
    let length = +options.length || 30
    let omission = options.opmission || '...'
    let separator = options.separator

    /* 对包含 Unicode 字符的字符串特殊处理*/
    let strSymbols = null
    let strLength = string.length
    if (hasUnicode(string)) {
        strSymbols = stringToArray(string)
        strLength = strSymbols.length
    }

    /* 极值情况 */
    let end = length - omission.length
    if (length > strLength) {
        return string
    } else if (end < 1) {
        return omission
    }

    /* 裁剪字符串并处理分隔符 */
    let result = strSymbols
        ? strSymbols.slice(0, end).join('')
        : string.slice(0, end)
    if (!separator) {
        return result + omission
    } else {
        // 如果有分隔符，则将结果裁剪到最后一个分隔符的位置
        if (isRegExp) {
            end = result.length
            if (!separator.global) {
                separator = RegExp(separator.source, /\w*$/.exec(separator) + 'g')
            }
            let match = null
            let newEnd = null
            while ((match = separator.exec(result))) {
                newEnd = match.index
            }
            if (newEnd) {
                result = result.slice(0, newEnd)
            }
        } else if (string.indexOf(separator, end) !== end) {
            const idx = result.lastIndexOf(separator)
            if (idx !== -1) {
                result = result.slice(0, idx)
            }
        }
    }

    return result + omission
}
```

从源码中可以看到，它对包含 Unicode 的字符串做了特殊处理。

尽管 ES6 增强了 Unicode 支持，但还是很弱，举一个 Unicode 乱码的例子：

```js
"𝌆".split('') // ["�", "�"]
```

所以，Lodash 先将它转换为数组再处理长度。Lodash 是使用正则匹配，将每一个 Unicode 字符都划分为数组子元素，如果是我们自己写的话，可以简化如下：

```js
Array.from('a𝌆b') // ["a", "𝌆", "b"]
```

若平常自己写工具函数时，不需要这么复杂的参数结构，可以简化如下：

```js
function truncate (s, len = 30, omission = '...') {
    return s.length > len
        ? s.slice(0, len) + omission
        : String(s)
}
```

### padStart、padEnd

功能和 ES6 的 padStart 和 padEnd 一样，参数也相同。需要注意的是它处理了 Unicode 字符。

```js
// '𝌆'.padStart(3) // -> " 𝌆"

function padStart(string, length, chars) {
    string = toString(string)
    length = toInteger(length)

    var strLength = length ? stringSize(string) : 0
    return length && strLength < length ? createPadding(length - strLength, chars) + string : string
}

function padEnd(string, length, chars) {
    string = toString(string)
    length = toInteger(length)

    var strLength = length ? stringSize(string) : 0
    return length && strLength < length ? string + createPadding(length - strLength, chars) : string
}
```

### repeat

这是二分法思路，比如重复 4 次 'a'，等同于重复 2 次 'aa'。

```js
function repeat(s, n) {
    // # 不好意思，走错片场了
    // return s * n 

    if (!s || n < 1 || n === Infinity) {
        throw new Error('Args error')
    }

    let res = ''
    while (n) {
        if (n % 2) {
            res += s
        }
        s += s
        if (n === 1) break
        n = n >> 1
    }
    return res
}
```

使用递归也可以，貌似浏览器会自动对递归进行优化，所以速度很快。

```js
function repeat(s, n) {
    if (n === 1) {
        return s
    }
    let res = repeat(s, n >> 1)
    res += res
    if (n % 2) {
        res += s
    }
    return res
}
```

## escape、unescape

escape 方法能将字符串中的 `<`、`>`、`&`、`"` 等 HTML 字符转义得到适合放在页面上进行显示的内容，一般用于防止 XSS 攻击。

两种方法的处理思路都是先判断是否需要转义，如果不需要则直接返回原内容，节约算力。

```js
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
    reUnescapedHtml = /[&<>"']/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source),
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
}

function unescape(string) {
    string = toString(string)
    return string && reHasEscapedHtml.test(string) 
        ? string.replace(reEscapedHtml, c => htmlUnescapes[c]) 
        : string
}

var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}

function escape(string) {
    string = toString(string)
    return string && reHasUnescapedHtml.test(string) 
        ? string.replace(reUnescapedHtml, escapeHtmlChar) 
        : string
}
```

## Array

## 疑难部分

### template

* [Lodash.template](/articles/source-code/lodash/lodash.template.html)