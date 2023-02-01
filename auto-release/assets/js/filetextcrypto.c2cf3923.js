(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{1005:function(t,s,e){"use strict";e.r(s);var a=e(0),n=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"file-text-crypto"}},[t._v("file-text-crypto")]),t._v(" "),s("nav",{staticClass:"table-of-contents"},[s("ol",[s("li",[s("a",{attrs:{href:"#file-text-crypto"}},[t._v("file-text-crypto")]),s("ol",[s("li",[s("a",{attrs:{href:"#简介"}},[t._v("简介")])]),s("li",[s("a",{attrs:{href:"#原理"}},[t._v("原理")])])])])])]),s("h2",{attrs:{id:"简介"}},[t._v("简介")]),t._v(" "),s("p",[t._v("file-text-crypto，以下简称 FTC，是一款可以给你的代码中部分内容或全文加密的插件。想象你有这么一个情景：在你的开源博客系统中，你写了一些带有隐式的日记，使用 FTC 可以让你在本地编辑时自由编辑，而编辑时生成的文本内容是加密后的信息，这样一来，就算上传到 GitHub 后，别人也无法查看到你的隐私原文。")]),t._v(" "),s("p",[s("strong",[t._v("FTC 会把文件的密钥存在本地目录，所以请务必把密钥文件所在的文件夹加入 .gitignore（密钥默认储存在 .ftc 文件夹）防止 Git 系统把密钥传到了远端。")])]),t._v(" "),s("p",[t._v("由于我的业余时间有限，所以目前仅支持加密 markdown 文件中的特定标识文本。如果你有其它更好的想法，欢迎 Pin Issues 或者 Pull Request ！")]),t._v(" "),s("h2",{attrs:{id:"原理"}},[t._v("原理")]),t._v(" "),s("p",[t._v("FTC 根据文件的特定注释内容来判断该文件是否开启了加密，比方说，你可以使用指令 ftc.gists-on 在文件头部快速加入这段特定注释（当然，手动也完全可以）。")]),t._v(" "),s("div",{staticClass:"language-markdown extra-class"},[s("pre",{pre:!0,attrs:{class:"language-markdown"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- FTC:on --\x3e")]),t._v("\n")])])]),s("p",[t._v("FTC 在文件中开启之后，FTC 会寻找在 FTC:on 以下一直到 FTC:off 的文本内容中特定的标识，并将其进行加密。比如以下文本 "),s("code",[t._v("_*_secrets_*_")]),t._v(" 中的 "),s("code",[t._v("_*_")]),t._v(" 就是加密标识，"),s("code",[t._v("secrets")]),t._v(" 则是加密内容。")]),t._v(" "),s("div",{staticClass:"language-markdown extra-class"},[s("pre",{pre:!0,attrs:{class:"language-markdown"}},[s("code",[t._v("Normal text...\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- FTC:on --\x3e")]),t._v("\nNormal text，_"),s("span",{pre:!0,attrs:{class:"token italic"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("*")]),s("span",{pre:!0,attrs:{class:"token content"}},[t._v("_secrets_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("*")])]),t._v("_，Normal text\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- FTC:off --\x3e")]),t._v("\nNormal text...\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);