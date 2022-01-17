# Emoji

[TOC]

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/JavaScript%E4%B8%8B%E5%90%AB%E6%9C%89emoji%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%A4%84%E7%90%86%20-%20%E6%8E%98%E9%87%91.html' source='https://juejin.cn/post/6941276804472635405' >《JavaScript 下含有 emoji 字符串的处理》</Link>

在处理 emoji 字符时有些坑。

* String 原型上的 length、split、substr 等函数不能正确计算带 emoji 字符串
* 展开运算符会把组合 emoji 拆开

另一些坑可使用常规方法规避。

* String 原型上的 charAt 和 fromCharCode 函数可分别使用 ES6 新增的 charPointAt、fromCharPoint 代替
* 字符串遍历 for...in 可以使用 for...of 代替
* 正则匹配时可以在后面加一个 unicode 标记

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E4%BB%8EUnicode%E5%88%B0emoji%20-%20%E7%9F%A5%E4%B9%8E.html' source='https://zhuanlan.zhihu.com/p/41203455' >《从 Unicode 到 emoji》</Link>

ASCII 使用一个字节来编码，所以远远不够用，但因为它的编码集只占用了 128 种，所以一个字节开头的高位就用不上了。所以类似 GBK 字符集的解决方案是如果高位是 0 那么就是一字节的英文字符，否则使用连续的两字节来表示其他字符，这种方案叫做“代码页”。

不过代码页不好用，因为在不同的操作系统、不同的厂商、软件中代码页不尽相同，所以后来出现了 Unicode，它尝试将世界上所有的字符统一编码。Unicode 一开始是两个字节的，后来不够用才变成了四个字节。传输的时候为了不要传输那么多“0”，所以需要对编码进行序列化及压缩。所以后来出现了 UTF 这种编码方式。

Emoji 就更好玩了，出现了一些特殊的用法：

* 使用单色修饰符确定 emoji 是单色还是彩色的，如 ⚠︎ === U+26A0 + U+FE0E，⚠️ === U+26A0 + U+FE0F
* 使用肤色修饰符确定 emoji 中出现的人物的肤色，如 🧒 === U+1f9d2，🧒🏿 === U+1f9d2 + U+1f3ff
* 使用零宽连接符 U+200D 将不同的 emoji 组合起来成为一个单独的符号（不支持的系统会自动回退为多个 emoji）


## TODO

* [《UTF-8 往事》](https://taoshu.in/utf-8.html)
* [《Emoji 的奥秘》](https://taoshu.in/emoji.html)
