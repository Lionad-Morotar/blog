# VueJS | Parser

[TOC]

## Parser

解析器（Parser） 有 HTML Parser、Text Parser、Filter Parser 等，其中最重要的就是 HTML Parser。

Vue 中的 HTML Parser 是在某个已有的 Parser 基础上改造而成的。原有 Parser 是一个不断解析传入 HTML 的有限状态机，不停地对标签开头、属性、标签结尾及文本等类型进行正则匹配，并处理匹配得到的内容。其内部维护了一个堆栈，可以很好地处理节点间的层级关系。

Vue 通过原 HTML Parser 提供的接口，传入钩子函数，分别对标签、文本等做额外处理。比如说，HTML 中的文本要按照文本解析器，将模板的插值和纯文本解析出来，这样才可以将变量动态代入，生成字符串。最终，HTML 通过 Parser 解析，得到了 AST。

## Code Example

* [HTML Parser](https://github.com/Lionad-Morotar/read-source-code/tree/master/module/html-parser)
* [Template Parser](https://github.com/Lionad-Morotar/read-source-code/tree/master/module/template-parser)