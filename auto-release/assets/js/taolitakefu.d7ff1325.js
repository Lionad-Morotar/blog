(window.webpackJsonp=window.webpackJsonp||[]).push([[224],{853:function(t,a,v){"use strict";v.r(a);var _=v(0),r=Object(_.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"逃离塔克夫"}},[t._v("逃离塔克夫")]),t._v(" "),a("nav",{staticClass:"table-of-contents"},[a("ol",[a("li",[a("a",{attrs:{href:"#逃离塔克夫"}},[t._v("逃离塔克夫")]),a("ol",[a("li",[a("a",{attrs:{href:"#护甲穿透机制"}},[t._v("护甲&穿透机制")]),a("ol",[a("li",[a("a",{attrs:{href:"#碰撞检测"}},[t._v("碰撞检测")])]),a("li",[a("a",{attrs:{href:"#跳蛋"}},[t._v("跳蛋")])]),a("li",[a("a",{attrs:{href:"#穿透"}},[t._v("穿透")])]),a("li",[a("a",{attrs:{href:"#耐久"}},[t._v("耐久")])]),a("li",[a("a",{attrs:{href:"#碎蛋"}},[t._v("碎蛋")])])])]),a("li",[a("a",{attrs:{href:"#相关阅读"}},[t._v("相关阅读")])])])])])]),a("h2",{attrs:{id:"护甲-穿透机制"}},[t._v("护甲&穿透机制")]),t._v(" "),a("p",[t._v("伤害的成因非常复杂，但可以按照数据和公式推导出概率。一些非常繁琐的细节我会忽略，这里着重介绍：碰撞检测、跳蛋、穿透、耐久、碎蛋。")]),t._v(" "),a("h5",{attrs:{id:"碰撞检测"}},[t._v("碰撞检测")]),t._v(" "),a("p",[t._v("首先要理清的是，护甲的形状并不是真实的碰撞检测形状——这几乎在所有竞技 FPS 中是通用的法则——所以有些带护手的甲连手掌都能防。很离谱。不过这也不算坏消息，有些玩家可能宁愿买不带护手的甲来提高机动性。同时，击中手部位造成的伤害并不致命，所以把甲的耐久点数留给更重要的胸口部位也许反而更加明智。")]),t._v(" "),a("h5",{attrs:{id:"跳蛋"}},[t._v("跳蛋")]),t._v(" "),a("p",[t._v("只有头盔（和面罩）有跳蛋机制：当子弹以特定角度击中头盔时，根据头盔跳蛋概率和子弹的跳蛋概率一起计算出此次命中是否跳蛋。")]),t._v(" "),a("h5",{attrs:{id:"穿透"}},[t._v("穿透")]),t._v(" "),a("p",[t._v("只有与护甲相比同等级或更高等级的子弹才能对其造成有效击穿。六种等级的护甲其等级可以约等于其等级乘 10。这个数据并不精确，但很方便用于估算第一发子弹的击穿概率。比方说，要第一发子弹就大概率击穿满耐久的五级护甲，需要 50 穿透力的子弹。如果没有穿透护甲，护甲只减少 1 点耐久，并且依子弹和护甲的不同种类，身体会受到轻微冲击伤害。如果穿透，越高等级的护甲（以及越高耐久）越能减免此次伤害：可以简单记住满耐久护甲能减免 25% 的同等级子弹的伤害。")]),t._v(" "),a("h5",{attrs:{id:"耐久"}},[t._v("耐久")]),t._v(" "),a("p",[t._v("护甲的耐久和材料相关，受“毁伤系数”影响，所以不能只看纸面点数。比如玻璃的毁伤系数是 0.8，这意味着伤害为 50，对护甲伤害为 40% 的子弹穿透玻璃后，会对其造成 "),a("mjx-container",{staticClass:"MathJax",attrs:{jax:"CHTML"}},[a("mjx-math",{staticClass:"MJX-TEX"},[a("mjx-mn",{staticClass:"mjx-n"},[a("mjx-c",{attrs:{c:"4"}}),a("mjx-c",{attrs:{c:"0"}})],1)],1)],1),t._v(" 点伤害。材料的毁伤系数如下：")],1),t._v(" "),a("ul",[a("li",[t._v("Aramid（凯夫拉）：0.25")]),t._v(" "),a("li",[t._v("UHMWPE（超聚乙烯）：0.45")]),t._v(" "),a("li",[t._v("Titan（钛）：0.55")]),t._v(" "),a("li",[t._v("Aluminium（铝）：0.6")]),t._v(" "),a("li",[t._v("Combine Materials（复合材料）： 0.5")]),t._v(" "),a("li",[t._v("Steel（铁）：0.7")]),t._v(" "),a("li",[t._v("Ceramic（陶瓷）：0.8")]),t._v(" "),a("li",[t._v("Glass（玻璃纤维）：0.8")])]),t._v(" "),a("h5",{attrs:{id:"碎蛋"}},[t._v("碎蛋")]),t._v(" "),a("p",[t._v("子弹击中目标后，无论穿透与否，都依据其碎蛋率，分裂出数个弹头。这些弹头的穿透性和伤害等于原子弹的穿透和伤害总数的 50% 再平分。碎蛋的方向不定，所以可能对身体多个区域造成额外伤害。此外，每个弹头对护甲的耐久损耗都至少是 1——这个散弹的子弹计算耐久损耗是一致的。")]),t._v(" "),a("p",[t._v("子弹的碎蛋率不能仅看 WIKI 的纸面数据。游戏中目前有个严重的 BUG，低于 29 穿透力的子弹不会碎蛋。")]),t._v(" "),a("h2",{attrs:{id:"相关阅读"}},[t._v("相关阅读")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://tarkovaftermidnight.wordpress.com/",target:"_blank",rel:"noopener noreferrer"}},[a("i",[t._v("Armor, Penetration, and Damage")])])])])])}),[],!1,null,null,null);a.default=r.exports}}]);