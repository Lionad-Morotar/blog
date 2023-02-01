(window.webpackJsonp=window.webpackJsonp||[]).push([[264],{1006:function(t,a,s){"use strict";s.r(a);var n=s(0),r=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"sentry-遗留问题整理"}},[t._v("Sentry 遗留问题整理")]),t._v(" "),a("nav",{staticClass:"table-of-contents"},[a("ol",[a("li",[a("a",{attrs:{href:"#sentry-遗留问题整理"}},[t._v("Sentry 遗留问题整理")]),a("ol",[a("li",[a("a",{attrs:{href:"#目前有什么问题"}},[t._v("目前有什么问题")])]),a("li",[a("a",{attrs:{href:"#想要达成的目标"}},[t._v("想要达成的目标")])]),a("li",[a("a",{attrs:{href:"#怎么解决"}},[t._v("怎么解决？")]),a("ol",[a("li",[a("a",{attrs:{href:"#1-静默噪音"}},[t._v("1.静默噪音")])]),a("li",[a("a",{attrs:{href:"#2-版本控制"}},[t._v("2.版本控制")])]),a("li",[a("a",{attrs:{href:"#3-开发规范"}},[t._v("3.开发规范")])]),a("li",[a("a",{attrs:{href:"#4-流程约束"}},[t._v("4.流程约束")])])])]),a("li",[a("a",{attrs:{href:"#结果"}},[t._v("结果")])]),a("li",[a("a",{attrs:{href:"#总结"}},[t._v("总结")])]),a("li",[a("a",{attrs:{href:"#新目标"}},[t._v("新目标")])])])])])]),a("h2",{attrs:{id:"目前有什么问题"}},[t._v("目前有什么问题")]),t._v(" "),a("p",[t._v("BAX-FE 项目遗留了海量未处理问题，约 7W+。新版本代码上线后，很难从 Sentry 有效跟踪新代码带来的问题。")]),t._v(" "),a("figure",{attrs:{"data-type":"image"}},[a("img",{attrs:{src:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/msedge_faMD4wFyo0.png",alt:"",loading:"lazy"}})]),t._v(" "),a("p",[t._v("为什么很难跟踪？")]),t._v(" "),a("p",[t._v("举个例子，BAX-FE 中光和网络相关的报警就有 2W+。“网络错误”可能是后端接口返回“权限错误”、“服务器异常”，可能是因为浏览器内容安全策略拦截了 HTTP 请求，甚至也许令人出乎意料，浏览器防广告插件会拦截某些接口 URL 带 “AD（‘广告’的英文缩写）”的请求后也会抛“网络错误”。新代码上线后，如果抛出某些意料之外的异常，这些异常会被 Sentry 和数万个噪音淹没。")]),t._v(" "),a("p",[t._v("目前已知的大部分问题（也许 99.999%）都只是代码异味，不属于业务问题，没有什么显著的影响范围，所以如果一直容忍 Sentry 噪音堆积，会让后续开发忽略代码中潜在的风险，逐渐麻木。")]),t._v(" "),a("h2",{attrs:{id:"想要达成的目标"}},[t._v("想要达成的目标")]),t._v(" "),a("p",[t._v("希望 Sentry 提供的报错信息以项目版本为维度，每个版本只提供和新版本代码相关的、高质量的报警。")]),t._v(" "),a("h2",{attrs:{id:"怎么解决"}},[t._v("怎么解决？")]),t._v(" "),a("h3",{attrs:{id:"_1-静默噪音"}},[t._v("1.静默噪音")]),t._v(" "),a("p",[t._v("静默能缓解噪音问题，方便开发专注更高价值的报警信息")]),t._v(" "),a("ul",[a("li",[t._v("静默无关紧要的抛错：权限问题、接口报错、浏览器异常、第三方代码异常...")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Sentry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("ignoreErrors")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hackLocationSuccess'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'请登录 BAX 系统'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'无权限'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("ul",[a("li",[t._v("解决遗留的代码问题：代码异味，比如没有处理接口、函数的默认值")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bad")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" cities "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("query\n  Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("assign")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("form"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// BAD CASE")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("areas")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" cities"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'|'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// GOOD CASE")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("areas")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" cities "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" cities"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'|'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-版本控制"}},[t._v("2.版本控制")]),t._v(" "),a("p",[t._v("给代码启用版本控制后，每次上线后只需要专注与和上线代码相关的问题。解决相关问题后有余力的同时，解决少量遗留问题，持续提升代码质量。")]),t._v(" "),a("figure",{attrs:{"data-type":"image"}},[a("img",{attrs:{src:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201224035754.png",alt:"",loading:"lazy"}})]),t._v(" "),a("figure",{attrs:{"data-type":"image"}},[a("img",{attrs:{src:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201224034920.png",alt:"",loading:"lazy"}})]),t._v(" "),a("h3",{attrs:{id:"_3-开发规范"}},[t._v("3.开发规范")]),t._v(" "),a("p",[t._v("主要有两个方面的规范：代码规范 和 Git 规范。")]),t._v(" "),a("ul",[a("li",[t._v("使用工具静态扫描代码，减少低级错误，如：语法问题、类型问题（ESLint）")]),t._v(" "),a("li",[t._v("使用业界最佳实践，保持代码风格，规避代码陷阱（Vue Style Guide）")]),t._v(" "),a("li",[t._v("提交信息：记录能组织地、有意义的提交信息（LeanCloud Commit Message Style）")])]),t._v(" "),a("p",[t._v("“保证所有代码看起来都像一个人编写的”是一个神圣的目标。严格地规范带来整洁的代码，能规避低级错误且使项目新手更易于理解。")]),t._v(" "),a("figure",{attrs:{"data-type":"image"}},[a("img",{attrs:{src:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201224120843.png",alt:"",loading:"lazy"}})]),t._v(" "),a("h3",{attrs:{id:"_4-流程约束"}},[t._v("4.流程约束")]),t._v(" "),a("p",[t._v("通过 Husky 调用 githooks，在特定时机进行检测：")]),t._v(" "),a("ol",[a("li",[t._v("提交前：静态扫描、校验提交信息")]),t._v(" "),a("li",[t._v("推送前：分支保护、校验推送信息")])]),t._v(" "),a("figure",{attrs:{"data-type":"image"}},[a("img",{attrs:{src:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201224121305.png",alt:"",loading:"lazy"}})]),t._v(" "),a("h2",{attrs:{id:"结果"}},[t._v("结果")]),t._v(" "),a("p",[t._v("之前：不能从 Sentry 有效追踪报警；")]),t._v(" "),a("p",[t._v("现在：通过代码版本，可以相对更轻松地追踪代码问题；")]),t._v(" "),a("h2",{attrs:{id:"总结"}},[t._v("总结")]),t._v(" "),a("p",[t._v("解决问题的上层思考是避免问题。")]),t._v(" "),a("h2",{attrs:{id:"新目标"}},[t._v("新目标")]),t._v(" "),a("ol",[a("li",[t._v("善用 Sentry：团队学习、用户信息聚合、邮件报警、页面性能追踪")])]),t._v(" "),a("p",[t._v("Sentry 提供了丰富地功能，但是网络上鲜有如何把 Sentry 结合到项目开发流程的资料，这方面暂时只能进一步摸索学习。")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("从版本控制、代码规范、流程约束相关代码创建脚手架")])]),t._v(" "),a("p",[t._v("前端脚手架更像是“代码生成器”，能根据有选择性地在项目中引入新代码、新依赖、新逻辑。输出脚手架意味着整套设施可以有选择性地迁移到新项目。")]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("ESLint 接 Sonar")])]),t._v(" "),a("li",[a("p",[t._v("more...")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);