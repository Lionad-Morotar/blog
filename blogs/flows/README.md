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

