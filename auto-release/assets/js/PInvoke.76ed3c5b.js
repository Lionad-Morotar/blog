(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{902:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"pinvoke"}},[t._v("PInvoke")]),t._v(" "),s("nav",{staticClass:"table-of-contents"},[s("ol",[s("li",[s("a",{attrs:{href:"#pinvoke"}},[t._v("PInvoke")]),s("ol",[s("li",[s("a",{attrs:{href:"#手把手教你pinvoke"}},[t._v("《手把手教你PInvoke》")])]),s("li",[s("a",{attrs:{href:"#使用pinvoke互操作-让c和c愉快的交互优势互补"}},[t._v("《使用PInvoke互操作，让C#和C++愉快的交互优势互补》")])])])])])]),s("p",[t._v("PInvoke 既 Platform Invocation Services 平台调用服务，允许你使用 C# 之类的语言调用外部函数。比如，许多硬件中，其驱动是用 C/C++ 写的，而用 C# 在外面再套一层壳子来管理界面（WPF/Winform）。这时，可以使用 PInvoke 方法让 C# 去调用动态链接库中的函数。")]),t._v(" "),s("h5",{attrs:{id:"《手把手教你pinvoke》"}},[s("Link",{attrs:{type:"h5",to:"https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0PInvoke_%E9%BB%84%E8%85%BE%E9%9C%84%E7%9A%84%E5%8D%9A%E5%AE%A2_CSDN%E5%8D%9A%E5%AE%A2.html",source:"https://blog.csdn.net/htxhtx123/article/details/104323450"}},[t._v("《手把手教你PInvoke》")])],1),t._v(" "),s("p",[t._v("可以在 C# 中使用 DLLImport 标记链接库并引入其中函数。")]),t._v(" "),s("div",{staticClass:"language-csharp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-csharp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Win32")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token attribute"}},[s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DllImport")]),s("span",{pre:!0,attrs:{class:"token attribute-arguments"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user32.dll"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extern")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token return-type class-name"}},[t._v("IntPtr")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("MessageBox")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token class-name"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")])]),t._v(" hWnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" text"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" caption"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token class-name"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("uint")])]),t._v(" type\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Program")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token return-type class-name"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        Win32"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("MessageBox")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello, World"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hi~"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        Console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ReadLine")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("如果不知道有什么方法可以用、方法对应哪个动态链接库以及参数是啥，都可以上官方文档中找，里面有函数作用及签名等详细的说明。也可以到 pinvoke.net 找到已经汇总好的代码。")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://docs.microsoft.com/en-us/windows/win32/api/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Programming reference for the Win32 API")])]),t._v(" "),s("li",[s("a",{attrs:{href:"http://pinvoke.net/index.aspx",target:"_blank",rel:"noopener noreferrer"}},[t._v("PInvoke.net")])])]),t._v(" "),s("h5",{attrs:{id:"《使用pinvoke互操作-让c-和c-愉快的交互优势互补》"}},[s("Link",{attrs:{type:"h5",to:"https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E4%BD%BF%E7%94%A8PInvoke%E4%BA%92%E6%93%8D%E4%BD%9C%EF%BC%8C%E8%AE%A9C%23%E5%92%8CC_%E6%84%89%E5%BF%AB%E7%9A%84%E4%BA%A4%E4%BA%92%E4%BC%98%E5%8A%BF%E4%BA%92%E8%A1%A5_%E6%85%95%E8%AF%BE%E6%89%8B%E8%AE%B0.html",source:"https://www.imooc.com/article/305247"}},[t._v("《使用PInvoke互操作，让C#和C++愉快的交互优势互补》")])],1),t._v(" "),s("p",[t._v("介绍了如何使用 Visual Studio 创建一个 C++ 动态链接库并在 C# 中调用。")]),t._v(" "),s("p",[t._v("要了解托管代码和非托管代码的函数签名的类型转换，可以查阅官方文档。")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/standard/native-interop/type-marshaling",target:"_blank",rel:"noopener noreferrer"}},[t._v("类型封送")])])]),t._v(" "),s("p",[t._v("如果碰到复杂类型，可以使用 PInvoke Interop Assistant 工具自动转换代码。")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/jaredpar/pinvoke-interop-assistant",target:"_blank",rel:"noopener noreferrer"}},[t._v("PInvoke Interop Assistant")])])]),t._v(" "),s("p",[t._v("此外，在 C++ 中，可以通过函数指针直接接受来自 C# 的委托函数，十分令人愉快。")])])}),[],!1,null,null,null);s.default=e.exports}}]);