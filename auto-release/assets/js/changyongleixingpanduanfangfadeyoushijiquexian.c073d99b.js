(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{735:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"🎫-常用类型判断方法的优势及缺陷"}},[t._v("🎫 常用类型判断方法的优势及缺陷")]),t._v(" "),s("nav",{staticClass:"table-of-contents"},[s("ol",[s("li",[s("a",{attrs:{href:"#常用类型判断方法的优势及缺陷"}},[t._v("🎫 常用类型判断方法的优势及缺陷")]),s("ol",[s("li",[s("a",{attrs:{href:"#常用判断方法"}},[t._v("常用判断方法")])]),s("li",[s("a",{attrs:{href:"#typeof"}},[t._v("typeof")]),s("ol",[s("li",[s("a",{attrs:{href:"#判断内置对象"}},[t._v("判断内置对象")])]),s("li",[s("a",{attrs:{href:"#typeof-null"}},[t._v("typeof null")])])])]),s("li",[s("a",{attrs:{href:"#instanceof"}},[t._v("instanceof")]),s("ol",[s("li",[s("a",{attrs:{href:"#依据原型链"}},[t._v("依据原型链")])]),s("li",[s("a",{attrs:{href:"#跨宿主运算"}},[t._v("跨宿主运算")])])])]),s("li",[s("a",{attrs:{href:"#object-prototype-tostring-call"}},[t._v("Object.prototype.toString.call")]),s("ol",[s("li",[s("a",{attrs:{href:"#如何扩展"}},[t._v("如何扩展")])]),s("li",[s("a",{attrs:{href:"#缺陷所在"}},[t._v("缺陷所在")])])])]),s("li",[s("a",{attrs:{href:"#最后"}},[t._v("最后")])]),s("li",[s("a",{attrs:{href:"#阅读更多"}},[t._v("阅读更多")])])])])])]),s("h2",{attrs:{id:"常用判断方法"}},[t._v("常用判断方法")]),t._v(" "),s("p",[t._v("类型判断，在 JavaScript 中是一个很经典的问题了。围绕类型判断，有几种常见的解决方法，下是最常用的三种：")]),t._v(" "),s("ul",[s("li",[t._v("typeof")]),t._v(" "),s("li",[t._v("instanceof")]),t._v(" "),s("li",[t._v("Object.prototype.toString.call")])]),t._v(" "),s("p",[t._v("我将在此文中根据这几种方法在 ECMAScript 规范下的描述及我们开发时的实际情况，聊聊这几种方法的优劣势所在。")]),t._v(" "),s("h2",{attrs:{id:"typeof"}},[t._v("typeof")]),t._v(" "),s("p",[t._v("当我还是一个 JS 萌新的时候，我就爱上了 typeof 运算符，因为它的作用正如其名，非常好理解。\n利用 typeof 我们可以轻松判断常见的基础类型，如 Number、String、Boolean 等。")]),t._v(" "),s("p",[t._v("ECMAScript 文档中有对 typeof 这样描述：")]),t._v(" "),s("p",[s("mjx-container",{staticClass:"MathJax",attrs:{jax:"CHTML"}},[s("mjx-math",{staticClass:"MJX-TEX"},[s("mjx-TeXAtom",[s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"U"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"n"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"a"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"r"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"y"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"E"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"x"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"p"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"r"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"e"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"s"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"s"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"i"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"o"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"n"}})],1)],1),s("mjx-mstyle",[s("mjx-mspace",{staticStyle:{width:"1em"}})],1),s("mjx-mo",{staticClass:"mjx-mit",attrs:{space:"4"}},[s("mjx-c",{attrs:{c:":"}})],1),s("mjx-mstyle",{attrs:{space:"4"}},[s("mjx-mspace",{staticStyle:{width:"1em"}})],1),s("mjx-TeXAtom",[s("mjx-mi",{staticClass:"mjx-b"},[s("mjx-c",{attrs:{c:"t"}})],1),s("mjx-mi",{staticClass:"mjx-b"},[s("mjx-c",{attrs:{c:"y"}})],1),s("mjx-mi",{staticClass:"mjx-b"},[s("mjx-c",{attrs:{c:"p"}})],1),s("mjx-mi",{staticClass:"mjx-b"},[s("mjx-c",{attrs:{c:"e"}})],1),s("mjx-mi",{staticClass:"mjx-b"},[s("mjx-c",{attrs:{c:"o"}})],1),s("mjx-mi",{staticClass:"mjx-b"},[s("mjx-c",{attrs:{c:"f"}})],1)],1),s("mjx-mstyle",[s("mjx-mspace",{staticStyle:{width:"1em"}})],1),s("mjx-TeXAtom",[s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"U"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"n"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"a"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"r"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"y"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"E"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"x"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"p"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"r"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"e"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"s"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"s"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"i"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"o"}})],1),s("mjx-mi",{staticClass:"mjx-mit"},[s("mjx-c",{attrs:{c:"n"}})],1)],1)],1)],1)],1),t._v(" "),s("ol",[s("li",[t._v("Let val be the result of evaluating UnaryExpression.")]),t._v(" "),s("li",[t._v("If "),s("em",[t._v("Type(val)")]),t._v(" is Reference, then\n"),s("ul",[s("li",[t._v("If "),s("em",[t._v("IsUnresolvableReference(val)")]),t._v(" is true, return "),s("strong",[t._v('"undefined"')]),t._v(".")])])]),t._v(" "),s("li",[t._v("Let val be "),s("em",[t._v("GetValue(val)")]),t._v(".")]),t._v(" "),s("li",[s("em",[t._v("ReturnIfAbrupt(val)")]),t._v(".")]),t._v(" "),s("li",[t._v("Return a String according to Table Below.")])]),t._v(" "),s("p",[t._v("简单来说，就是先判断是不是引用未知，是则返回 'undefined'，不然就根据下表找值。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("类型")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("返回")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Undefined")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"undefined"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Null")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"object"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Boolean")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"boolean"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Number")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"number"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("String")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"string"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Object (ordinary and does not implement [[Call]])")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"object"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Object (standard exotic and does not implement [[Call]])")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"object"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Object (implements [[Call]])")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('"function"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Object (non-standard exotic and does not implement [[Call]])")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v('Implementation-defined. Must not be "undefined", "boolean", "function", "number", "symbol", or "string".')])])])]),t._v(" "),s("p",[t._v("这里我们详细说说两点：")]),t._v(" "),s("ol",[s("li",[t._v("判断内置对象")]),t._v(" "),s("li",[t._v("typeof null === 'object'")])]),t._v(" "),s("h3",{attrs:{id:"判断内置对象"}},[t._v("判断内置对象")]),t._v(" "),s("p",[t._v("Function 作为内置对象，为什么 "),s("code",[t._v("typeof (function a(){})")]),t._v(" 的值不为“object”呢？")]),t._v(" "),s("p",[t._v("其实上面那张表有相应线索，倒数第二条，这是一个特殊判定，“如果对象实现了内部方法[[Call]]” 或 “是 "),s("code",[t._v("Callable")]),t._v(" 对象”，那么返回值为“function”。")]),t._v(" "),s("p",[t._v("用 typeof 判断对象太麻烦了，一点儿也不实在。一般情况下，我们会用等下介绍的 Object.prototype.toString 去判断内置对象。")]),t._v(" "),s("h3",{attrs:{id:"typeof-null"}},[t._v("typeof null")]),t._v(" "),s("p",[t._v("null 是用来标记“期待指向”的，不是 Object 类型，所以 typeof null === 'object' 是一个程序错误。\n这要追溯到第一版 JavaScript。这版 JS 的实现中，值是存储在 32 位单位中，其中端序最小的 3 位，用来表示值的类型，如下：")]),t._v(" "),s("ul",[s("li",[t._v("000：Object")]),t._v(" "),s("li",[t._v("001：Int")]),t._v(" "),s("li",[t._v("010：Double")]),t._v(" "),s("li",[t._v("100：String")]),t._v(" "),s("li",[t._v("110：Boolean")])]),t._v(" "),s("p",[t._v("此外，还有两种特殊值：")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("undefined")]),t._v(" (JSVAL_VOID): "),s("mjx-container",{staticClass:"MathJax",attrs:{jax:"CHTML"}},[s("mjx-math",{staticClass:"MJX-TEX"},[s("mjx-mo",{staticClass:"mjx-n"},[s("mjx-c",{attrs:{c:"2212"}})],1),s("mjx-msup",[s("mjx-mn",{staticClass:"mjx-n"},[s("mjx-c",{attrs:{c:"2"}})],1),s("mjx-script",{staticStyle:{"vertical-align":"0.363em"}},[s("mjx-TeXAtom",{attrs:{size:"s"}},[s("mjx-mn",{staticClass:"mjx-n"},[s("mjx-c",{attrs:{c:"3"}}),s("mjx-c",{attrs:{c:"2"}})],1)],1)],1)],1)],1)],1)],1),t._v(" "),s("li",[s("strong",[t._v("null")]),t._v(" (JSVAL_NULL): 用全为 0 的机器码表示的 NULL 指针（或，一个指向 0 的 Object 类型的值）")])]),t._v(" "),s("p",[t._v("也就是说，对程序而言，typeof null 判断类型是根据前三位 0 取得的“object”。这是一个历史遗留问题，有人提出过修复方案，但是怕影响历史遗留代码，修复便被否决了。")]),t._v(" "),s("h2",{attrs:{id:"instanceof"}},[t._v("instanceof")]),t._v(" "),s("p",[t._v("内置 instanceof 运算符是用来检测构造函数的 prototype 属性是否存在于某个实例对象的原型链。\n用代码解释要更直观一些：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Car")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("make"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" year")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("make "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" make\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("model "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" model\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("year "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" year\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" auto "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Car")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Honda'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Accord'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1998")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("auto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__proto__ "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Car")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" auto "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Car")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("我们直接看看规范是怎么定义 instanceof 运算符的：")]),t._v(" "),s("p",[s("strong",[t._v("InstanceofOperator(O, C)")])]),t._v(" "),s("ol",[s("li",[t._v("If "),s("em",[t._v("Type(C)")]),t._v(" is not Object, throw a "),s("strong",[t._v("TypeError")]),t._v(" exception.")]),t._v(" "),s("li",[t._v("Let "),s("em",[t._v("instOfHandler")]),t._v(" be "),s("em",[t._v("GetMethod(C,@@hasInstance)")]),t._v(".")]),t._v(" "),s("li",[s("em",[t._v("ReturnIfAbrupt(instOfHandler)")]),t._v(".")]),t._v(" "),s("li",[t._v("If instOfHandler is not "),s("strong",[t._v("undefined")]),t._v(", then\n"),s("ul",[s("li",[t._v("Return "),s("em",[t._v("ToBoolean(Call(instOfHandler, C, «O»))")]),t._v(".")])])]),t._v(" "),s("li",[t._v("If "),s("em",[t._v("IsCallable(C)")]),t._v(" is "),s("strong",[t._v("false")]),t._v(", throw a "),s("strong",[t._v("TypeError")]),t._v(" exception.")]),t._v(" "),s("li",[t._v("Return "),s("em",[t._v("OrdinaryHasInstance(C, O)")]),t._v(".")])]),t._v(" "),s("p",[t._v("第一条，如果 C 的类型不是对象，那么会抛出类型错误，重现如下：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("1")]),t._v("\n")])])]),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("DANGER")]),t._v(" "),s("p",[t._v("VM1008:1 Uncaught TypeError: Right-hand side of 'instanceof' is not an object")])]),t._v(" "),s("p",[t._v("第二至第四条，判断 C 是否有内置的 hasInstance 实现，即 Symbol.hasInstance，如果有，则调用此方法。\n也就是说，对复杂类型，我们可以通过 Symbol，自定义 instanceof 运算符的实现，用下列代码举例：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Lionad")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Symbol"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hasInstance"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("obj")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" obj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isCute\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Lionad")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("isCute")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Lionad")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),s("p",[t._v("这之后，第五条，如果 C 非 Callable 对象（还记得我们在 typeof 提到的内部方法[[call]]吗，Callable 对象即实现了[[call]]内部方法的对象，比如说某个函数），抛出类型错误，重现如下：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("DANGER")]),t._v(" "),s("p",[t._v("VM684:1 Uncaught TypeError: Right-hand side of 'instanceof' is not callable")])]),t._v(" "),s("p",[t._v("最后，返回调用内置 instanceof 实现的结果。")]),t._v(" "),s("p",[t._v("不过，需要强调的是，instanceof 也有缺陷存在，主要体现在两个方面：")]),t._v(" "),s("ol",[s("li",[t._v("判断的依据是原型链")]),t._v(" "),s("li",[t._v("跨宿主运算")])]),t._v(" "),s("h3",{attrs:{id:"依据原型链"}},[t._v("依据原型链")]),t._v(" "),s("p",[t._v("使用 instanceof 运算符判断对象字面量，会出现另人诧异的结果，见下代码：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'asdf'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("题外话，上面几行代码还隐式说明了这些问题：")]),t._v(" "),s("ul",[s("li",[t._v("对于对象字面量 "),s("code",[t._v("{}")]),t._v(" 有 "),s("code",[t._v("({}).__proto__ === Object.prototype")])])]),t._v(" "),s("h3",{attrs:{id:"跨宿主运算"}},[t._v("跨宿主运算")]),t._v(" "),s("p",[t._v("关于跨宿主运算，可以尝试以下代码重现:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" iframe "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'iframe'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ndocument"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("iframe"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nxArray "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("frames"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("frames"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Array\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" xArr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("xArray")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xArr "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("xArray")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xArr "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n")])])]),s("p",[t._v("因为 iframe 中的数组实例不是父窗口的 Array 的实例，所以在 xArr 的原型链上是找不到 Array 的，所以结果为 false。")]),t._v(" "),s("h2",{attrs:{id:"object-prototype-tostring-call"}},[t._v("Object.prototype.toString.call")]),t._v(" "),s("p",[t._v("一般来说，在业务代码中，我们使用 typeof 和 instanceof 运算符判断变量的类型就足够了。虽然这两种方法都有缺陷，但是我们记住这些常见的容易混淆的地方，避免使用就可以。\n下面要介绍的是一种更精确的方法，一般会用在工具函数或者类库中，如：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArray")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arr")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[object Array]'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArray")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),s("p",[t._v("那么 Object.prototype.toString 到底能分辨几种类型呢？查阅 ES6 规范文档，可以得到其实现，如下：")]),t._v(" "),s("ol",[s("li",[t._v("If the "),s("strong",[t._v("this")]),t._v(" value is "),s("strong",[t._v("undefined")]),t._v(", return "),s("strong",[t._v('"[object Undefined]"')]),t._v(".")]),t._v(" "),s("li",[t._v("If the "),s("strong",[t._v("this")]),t._v(" value is "),s("strong",[t._v("null")]),t._v(", return "),s("strong",[t._v('"[object Null]"')]),t._v(".")]),t._v(" "),s("li",[t._v("Let O be "),s("em",[t._v("ToObject(this value)")]),t._v(".")]),t._v(" "),s("li",[t._v("Let isArray be "),s("em",[t._v("IsArray(O)")]),t._v(".")]),t._v(" "),s("li",[s("em",[t._v("ReturnIfAbrupt(isArray)")]),t._v(".")]),t._v(" "),s("li",[t._v("If isArray is true, let builtinTag be "),s("strong",[t._v('"Array"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O is an exotic String object, let builtinTag be "),s("strong",[t._v('"String"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has an [[ParameterMap]] internal slot, let builtinTag be "),s("strong",[t._v('"Arguments"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has a [[Call]] internal method, let builtinTag be "),s("strong",[t._v('"Function"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has an [[ErrorData]] internal slot, let builtinTag be "),s("strong",[t._v('"Error"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has a [[BooleanData]] internal slot, let builtinTag be "),s("strong",[t._v('"Boolean"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has a [[NumberData]] internal slot, let builtinTag be "),s("strong",[t._v('"Number"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has a [[DateValue]] internal slot, let builtinTag be "),s("strong",[t._v('"Date"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, if O has a [[RegExpMatcher]] internal slot, let builtinTag be "),s("strong",[t._v('"RegExp"')]),t._v(".")]),t._v(" "),s("li",[t._v("Else, let builtinTag be "),s("strong",[t._v('"Object"')]),t._v(".")]),t._v(" "),s("li",[t._v("Let tag be "),s("em",[t._v("Get(O, @@toStringTag)")]),t._v(".")]),t._v(" "),s("li",[s("em",[t._v("ReturnIfAbrupt(tag)")]),t._v(".")]),t._v(" "),s("li",[t._v("If "),s("em",[t._v("Type(tag)")]),t._v(" is not String, let tag be builtinTag.")]),t._v(" "),s("li",[t._v("Return the String that is the result of concatenating "),s("strong",[t._v('"[object "')]),t._v(", tag, and "),s("strong",[t._v('"]"')]),t._v(".")])]),t._v(" "),s("p",[t._v("细数下来，Object.prototype.toString 不仅可以区分 Object、Function、Date、RegExp 等常见对象，它还能区分 Error、Arguments 等，见下代码：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" arguments"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'object'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arguments"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '[object Arguments]'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"如何扩展"}},[t._v("如何扩展")]),t._v(" "),s("p",[t._v("可以通过 Symbol.toStringTag 对已有对象的内置标签进行修改。这样就可以不需要通过构造函数的方法来分辨程序中不同种类的新对象。如下代码：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\na"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Symbol"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("toStringTag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1234'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// >>> "[object 1234]"')]),t._v("\n")])])]),s("h3",{attrs:{id:"缺陷所在"}},[t._v("缺陷所在")]),t._v(" "),s("p",[t._v("JS 中的对象，按照执行环境来划分可以分为内置对象（Build-In Object）和宿主对象（Host Object），如 Window、History 就是执行环境（浏览器）提供的对象。\n缺陷呢，往往就存在于规范中没有被定义的行为。\n比如，Window 对象的 Symbol.toString 是浏览器定义的行为，而且往往不同浏览器，实现还不一样。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [object Window] ?")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [object Object] ?")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [object DOMWindow] ?")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [object global] ? (这个尤其为叛徒，第一个字母居然是小写的)")]),t._v("\n")])])]),s("p",[s("strong",[t._v('(￣ ▽ ￣)" 害。')])]),t._v(" "),s("h2",{attrs:{id:"最后"}},[t._v("最后")]),t._v(" "),s("p",[t._v("想不到吧，JS 类型判断这个问题居然没有完美的解法，每种解法都有缺陷。")]),t._v(" "),s("p",[t._v("那么我们平常写代码到底用哪种呢？")]),t._v(" "),s("p",[t._v("虽然我刚才提到“业务代码可以使用 typeof 或 instanceof，库和工具函数等需要更精准的情况则用 Object.prototype.toString”，但是，这并不是绝对的。\n我们仔细思考一下这三种方法的本质：")]),t._v(" "),s("ul",[s("li",[t._v("typeof 根据最小三位字节判断变量类型")]),t._v(" "),s("li",[t._v("instanceof 根据原型链判断")]),t._v(" "),s("li",[t._v("Object.prototype.toString 主要是根据对象的内置标签（Build-In Tag）判断")])]),t._v(" "),s("p",[t._v("那么熟记这三条规则，写代码时就能游刃有余了。")]),t._v(" "),s("p",[t._v("感谢看到结尾，如有错误请务必指正，十分感谢。如果喜欢请点赞、投币、关注三连吧！我是 Lionad，爱你萌！")]),t._v(" "),s("h2",{attrs:{id:"阅读更多"}},[t._v("阅读更多")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://book.douban.com/subject/27133542/",target:"_blank",rel:"noopener noreferrer"}},[t._v("《JavaScript 框架设计》")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://justjavac.com/javascript/2012/12/23/what-is-javascripts-typeof-operator-used-for.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript 的 typeof 的用途")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://2ality.com/2013/10/typeof-null.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("The history of “typeof null”")])]),t._v(" "),s("li",[s("a",{attrs:{href:"http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator",target:"_blank",rel:"noopener noreferrer"}},[t._v("ECMAScript® 2015 Language Specification")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.im/post/5b0b9b9051882515773ae714",target:"_blank",rel:"noopener noreferrer"}},[t._v("instanceof 和 typeof 原理")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);