(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{987:function(t,s,a){"use strict";a.r(s);var r=a(0),n=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"npm"}},[t._v("NPM")]),t._v(" "),s("nav",{staticClass:"table-of-contents"},[s("ol",[s("li",[s("a",{attrs:{href:"#npm"}},[t._v("NPM")]),s("ol",[s("li",[s("a",{attrs:{href:"#package-json"}},[t._v("package.json")]),s("ol",[s("li",[s("a",{attrs:{href:"#常用字段有哪些"}},[t._v("常用字段有哪些？")])]),s("li",[s("a",{attrs:{href:"#main-和-module-字段有什么不同"}},[t._v("main 和 module 字段有什么不同？")])])])]),s("li",[s("a",{attrs:{href:"#配置"}},[t._v("配置")]),s("ol",[s("li",[s("a",{attrs:{href:"#不同-npmrc-的优先级"}},[t._v("不同 npmrc 的优先级？")])])])]),s("li",[s("a",{attrs:{href:"#镜像源"}},[t._v("镜像源")]),s("ol",[s("li",[s("a",{attrs:{href:"#如何设置淘宝源"}},[t._v("如何设置淘宝源？")])]),s("li",[s("a",{attrs:{href:"#如何对比不同源的速度"}},[t._v("如何对比不同源的速度？")])]),s("li",[s("a",{attrs:{href:"#如何安装不同来源的依赖"}},[t._v("如何安装不同来源的依赖？")])])])])])])])]),s("h2",{attrs:{id:"package-json"}},[t._v("package.json")]),t._v(" "),s("p",[t._v("参阅：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://docs.npmjs.com/cli/v8/configuring-npm/package-json",target:"_blank",rel:"noopener noreferrer"}},[t._v("package.json document")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.cn/post/7145001740696289317",target:"_blank",rel:"noopener noreferrer"}},[t._v("package.json 完全解读")])])]),t._v(" "),s("h4",{attrs:{id:"常用字段有哪些"}},[t._v("常用字段有哪些？")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用来标记当模块作为依赖时必要的文件范围，默认值是 '*'。")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("files")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 条件导出，node 版本必须大于 14.13")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("exports")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"."')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"require"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./index.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"import"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./index.mjs"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 覆盖依赖的子依赖版本，yarn 需使用 resolution 字段")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("overrides")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"A"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"foo"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.1.0-patch"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 副作用字段标记了代打包工具一但引入便没法再使用摇树手段把它去掉的文件")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sideEffects")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"styles/*.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"main-和-module-字段有什么不同"}},[t._v("main 和 module 字段有什么不同？")]),t._v(" "),s("p",[t._v("main 标记了程序的主入口。按约定惯例，main 标记了 ES5 语法的打包好的文件，以便其他库在引用时无需再对 main 标记的入口二次编译打包。module 标记了程序的 ES6 模块规范语法的主入口，以便支持 ES6 Module 的打包工具引入该模块时启用摇树优化。pkg.module 最早由 Rollup 使用，Webpack 现在也支持该属性，但它不是 package.json 的正式属性。")]),t._v(" "),s("p",[t._v("见："),s("a",{attrs:{href:"https://blog.csdn.net/sd19871122/article/details/122405592",target:"_blank",rel:"noopener noreferrer"}},[t._v("聊聊 package.json 文件中的 module 字段")])]),t._v(" "),s("h2",{attrs:{id:"配置"}},[t._v("配置")]),t._v(" "),s("h4",{attrs:{id:"不同-npmrc-的优先级"}},[t._v("不同 npmrc 的优先级？")]),t._v(" "),s("p",[t._v("项目内的 > 用户目录下的 > 全局配置文件 > 包管理器自带的")]),t._v(" "),s("h2",{attrs:{id:"镜像源"}},[t._v("镜像源")]),t._v(" "),s("h4",{attrs:{id:"如何设置淘宝源"}},[t._v("如何设置淘宝源？")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 淘宝源更换过地址，所以`https://registry.npm.taobao.org`已失效")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" registry https://registry.npmmirror.com\n")])])]),s("h4",{attrs:{id:"如何对比不同源的速度"}},[t._v("如何对比不同源的速度？")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("npx nrm "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),s("p",[t._v("见："),s("a",{attrs:{href:"https://github.com/Pana/nrm#usage",target:"_blank",rel:"noopener noreferrer"}},[t._v("NRM Document@GitHub")])]),t._v(" "),s("h4",{attrs:{id:"如何安装不同来源的依赖"}},[t._v("如何安装不同来源的依赖？")]),t._v(" "),s("ul",[s("li",[t._v("在域下发布私有包，并给域配置 registry")]),t._v(" "),s("li",[t._v("安装包时指定 registry（如 npm install vue --registry=xxx）")])]),t._v(" "),s("p",[t._v("见："),s("a",{attrs:{href:"https://github.com/pnpm/pnpm/issues/5581",target:"_blank",rel:"noopener noreferrer"}},[t._v("pnpm 不能安装不同来源的包")])])])}),[],!1,null,null,null);s.default=n.exports}}]);