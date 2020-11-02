<flow>比 Chrome Dev 更高级的弱网环境模拟：Clumsy 能系统级拦截指定类型的连接，模拟丢包、延迟、断连、乱序等状况。
<p><img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201102112929.png" style="max-width: 450px" /></p>
<name>Lionad</name><time>2020年11月2日 11点33分</time>
</flow>

<flow>我相信下一个平面设计的方法,来自其它非设计领域。
<name>大卫·卡森</name>
</flow>

<flow><span>这款像素字太强悍了，能在 7x7 的尺寸内展现出汉字的小尺寸极限。</span><small>这款像素字太强悍了，能在 7x7 的尺寸内展现出汉字的小尺寸极限。</small><pixel>这款像素字太强悍了，能在 7x7 的尺寸内展现出汉字的小尺寸极限。</pixel><br />
<name><a href="https://indienova.com/indie-game-news/dinkie-bitmap-font-by-3type/" rel="noopener noreferrer" target="_blank">丁卯点阵体：探索像素汉字的小尺寸极限</a></name>
</flow>

<flow><strong>紧跟别人的设计最终会得到什么样的回馈？唯一的回馈就是空虚感。</strong>
对于设计师而言，趋势有点像垃圾食品。不加分辨地追随趋势能够给你带来一些「看起来显而易见但是非常廉价」的解决方案，这些解决方案在短期内会带来回馈，但是从长远来看，却毫无价值。追随趋势的设计师很快就会从中尝到苦果了。
<name><a href="https://www.uisdc.com/10-common-ui-mistakes" rel="noopener noreferrer" target="_blank">Micah Bowers</a></name>
</flow>

<flow>Chrome 85 使用了 PGO 技术，使新标签页打开速度提升了 10%
PGO 即 Profile Guided Optimization，大意是通过记录并分析代码运行时的性能，动态的运用函数内联、条件分支优化等优化策略。
<name><a href="https://weixin.sogou.com/weixin?type=2&query=%E5%89%8D%E7%AB%AF%E4%B9%8B%E5%B7%85+%E5%89%8D%E7%AB%AF%E5%91%A8%E6%8A%A5%EF%BC%9A%E6%B2%83%E5%B0%94%E7%8E%9B%E5%AE%A3%E5%B8%83%E4%B8%8E%E5%BE%AE%E8%BD%AF%E5%90%88%E4%BD%9C%E7%AB%9E%E8%B4%ADTikTok%EF%BC%9B" rel="noopener noreferrer" target="_blank">前端之巅</a></name>
</flow>

<flow>To iterate is human, to recurse, divine.
人理解迭代，神理解递归。
<name>L. Peter Deutsch</name>
</flow>

<flow>一些浏览器高级调试技巧：
<ul>
    <div>1：使用 $_ 获取上一 REPL 结果；使用 $0 获取选中的节点；</div>
    <div>2：浏览器提供了 copy 函数，用于拷贝对象；</div>
    <div>3：选中节点后，按 H 可以快速隐藏节点；</div>
</ul>
<name><a href="https://mp.weixin.qq.com/s?src=11&timestamp=1598191239&ver=2540&signature=gl33j5e*eRMLINfGpRKzAXpdP3QVOOe3ZkFNXmf*i6KvjufyoOxY6y4-x54Qtp1Q39hVZzFGoGH5XFwkCBFBsVsLhouVVyA5-B4oRh*4AOtUOMUt-uIDHZNgy4Ktbos8&new=1" rel="noopener noreferrer" target="_blank">Chrome开发者工具的11个高级使用技巧@前端之巅</a></name>
</flow>

<flow>闭包是一个捕获了外部绑定的函数，即使这个绑定存在的作用域被销毁，它仍然能被闭包所使用。
<name><a href="https://book.douban.com/subject/26579320/" rel="noopener noreferrer" target="_blank">《JS 函数式编程》</a></name>
</flow>

<flow>浏览器的用户界面有很多彼此相同的元素，如地址栏、前进后退刷新主页按钮、书签... 奇怪的是，浏览器的用户界面并没有任何正式的规范，HTML5 也没有定义浏览器必须具有的用户界面元素。这是多年来的最佳实践自然发展以及彼此之间相互模仿的结果。
<name><a href="https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/" rel="noopener noreferrer" target="_blank">浏览器的工作原理：新式网络浏览器幕后揭秘</a></name>
</flow>

<flow><em>项目依赖多种版本的 NodeJS？</em>
昨天在重构去年写的一个 Markdown 解析器，项目使用 Rollup 打包，同时还使用 Gulp 处理项目引用到的 Stylus 文件。期间出现了一个奇奇怪怪的问题：Gulp 将会在高版本 Node 环境中打包失败报错，而 Rollup 正好相反，它在低版本 Node 环境中打包会报错...
查了各自文档的，文档没有说明具体支持到哪个版本的 Node 环境。最后只好用 NVM 装了两个版本的 Node，然后全局使用高版本 Node，再找到 Gulp 在 NPM 文件夹中对应的入口文件（gulp.cmd、gulp.ps1），把脚本中的 Node 路径写死为低版本 Node，才解决了问题。
<name><a>Lionad</a></name><time>2020年8月4日 17点28分</time>
</flow>

<flow>猴子补丁。
<Highlight>
// 在运行时对功能做出修改
undefined = true
</Highlight>
<name><a href="https://www.wikiwand.com/en/Monkey_patch" rel="noopener noreferrer" target="_blank">Monkey patch</a></name><time>2020年7月31日 17点37分</time>
</flow>

<flow>这个网站不包含任何 JS 代码：<p class="m0"><a href="https://www.swiftbysundell.com/articles/" rel="noopener noreferrer" target="_blank">https://www.swiftbysundell.com/articles/</a></p>
<name><a href="https://www.swiftbysundell.com/articles/" rel="noopener noreferrer" target="_blank">swiftbysundell</a></name><time>2020年7月18日 19点25分</time>
</flow>

<flow>几种创造倾斜文本的方法：
<ul>
    <div>1：em tag；</div>
    <div>2：i tag；</div>
    <div>3：font-style；</div>
    <div>4：Unicode；</div>
    <div>5：Variable fonts；</div>
</ul>
<name><a href="https://css-tricks.com/how-to-italicize-text/" rel="noopener noreferrer" target="_blank">Chris Coyier</a></name><time>2020年7月18日 19点25分</time>
</flow>

<flow>Safari 14 将会支持 WebP、浏览器扩展、网页翻译、视频画中画、BigInt 等功能。
<name><a href="https://zhuanlan.zhihu.com/p/153470955" rel="noopener noreferrer" target="_blank">Safari 14 Beta 版发布</a></name><time>2020年7月3日 00点00分</time>
</flow>

<flow>IaaS 时代，基础设施即服务，用户不再需要购买实体硬件设施，预示着云计算时代的开启；
SaaS 时代，软件及服务，各种线上能力开始在云端喷薄而出；
BaaS 时代，仅提供应用依赖的第三方服务，只以 API 的方式提供应用依赖的后端服务；
而在 FaaS 时代，用户直接提交代码包即可实现运行和部署，开发者不再关注底层，Serverless 必然将在这个阶段开始繁荣。
<name><a href="https://mp.weixin.qq.com/s?src=11&timestamp=1591815301&ver=2392&signature=SWGuuBpwNZmRtyR1DmL8SJhzQf1Wt62W4skaUF1DoAi3YtYqvoCcVolly6PRfw4s8EHZTLdmnC5vHSdsH1Fr2313eLV0ZOK*YNi4MXiwY*mM5-J77QVip0Z4PErhaenF&new=1" rel="noopener noreferrer" target="_blank">佘磊@前端之巅</a></name><time>2020年6月11日 00点23分</time>
</flow>

<flow>心流是触达的通畅，是思考的愉悦，以及融合与创造时的成就。
心流即想法。想法用以解决问题，心流即设计。
我希望我会尽可能地选择去站在永恒的那一面。
<name>Lionad</name><time>2020年4月27日 18点26分</time>
</flow>

<style>
flow {
    position: relative;
    display: block;
    margin-top: 3em;
    padding: .5em 1em;
    border: solid 1px #999;
    line-height: 2.3;
    font-size: 18px;
    white-space: pre-wrap;
    word-break: break-word;
}
flow:after {
    content: '';
    position: absolute;
    left: -1rem;
    top: -1px;
    width: 1rem;
    height: 38%;
    background: #221522;
}

name,
time {
    display: inline-block;
    margin-top: 1em;
    font-size: 12px;
    color: #999;
    /* float: right; */
}
name {
    margin-right: 1em;
    font-family: var(--font-text--bold);
    font-weight: bold;
}
name::first-letter {
    text-transform: uppercase;
}
</style>

<style>
pixel {
    font-family: 'Pixel';
    font-size: 7px;
}
</style>

