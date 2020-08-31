# 面试复盘

**🌖 2020 年 8 月 30 日**

哇哦，恭喜自己成为备胎！周五的时候，两周前面的公司又约我下一轮。我挂掉电话之后，仔细算了一下，确实是有两个礼拜了。

这周的技术面试难度偏简单。面试过程中主要暴露的是我的业务能力不足的问题。现在复盘过许多项目之后，才知道项目复盘的重要性。项目复盘不仅可以帮助自己理顺业务，也能顺带记录项目中的难点，其实是一件很重要的事儿。

这周接了几个零散的 offer，但是薪资没有达到预期，我都拒了。因为我的《Wu Wei》快练好了，我预感马上就能接到不错的 offer。嗯？offer 和《Wu Wei》之间有什么关系呢。答案很简单，我在开始写简历的时候就在想，等我找到工作时一定要重录一遍《Wu Wei》。尽管“把《Wu Wei》练好就能接到 offer”是一种因果倒置的信念，但其中隐形的“联系”对我会有神秘加成。

**🌑 2020 年 8 月 21 日**

这周投了一些徐汇这边的公司，然后也找内推面了几家一线厂。总之，感觉非常乏力...

留意了几个我没吃透的概念：

```js
var name = 1
!(function() {
  if (typeof name === 'undefined') {
    var name = 'err'
    console.log(name)
  } else {
    console.log('Hello world')
  }
})()
```

```js
Promise.resolve(1)
  .then()
  .then(data => {
    return Promise.reject(2)
      .then(_ => console.log(data))
      .catch(err => console.log(err))
      .then(_ => console.log(data))
  })
```

然后我注意到一点，面试答题的时候，很多题目我回到不到面试官期待的重点。这个和刷少了面试题有关系。比方，我一直说“闭包是一种特殊的作用域”，但今天看书的时候正好看到闭包的定义，于是又找来更多的定义看，发现其实“闭包是函数”。

再是算法，我在想什么时候能开始我的力扣每日一题计划呢？今天晚上可以开始啦。

下周的重点是重新读一下 A+ 规范，然后把上个月看了一半的函数式相关的书继续看完。

**🌗 2020 年 8 月 14 日**

本来在公交车上看会儿博客复习一下，结果晕车晕的差点就吐了。

今天约了三个面试。早上那场只面了一面。感觉聊得可以，一面结束后老哥去找二面老哥去了。估计二面老哥是技术 Leader，看到半年自由状态，又不是主 React 技术栈，嫌弃地不想面我。于是又把一面的老哥喊回来和我聊了十来分钟，然后就把我打发走了。害，他们的内部团队，无论是 HR 还是技术 Leader，都不专业呀...

下午面某个据说团队精干的公司，所以这场面试也是打起 12 分精神。慌倒是不慌，这之前一晚上我还特意看过有关他们的一些相关资料。

一面老哥的水平很高，问题开放，深度广度都有涉及。二面是个妹子，估计不是前端。不出意外，手写代码。然后我们大致又聊了一会儿关于前端安全方面的东西。没记错的话，三面负责人说自己是“Tech Leader”，但是他问的问题都绕不开职业价值观的讨论。给我整体感觉像是人事。最后，也不出意外，面完就把我打发走了。按照“不是蠢就是坏”的原则，机会渺茫。

五点钟的时候，还有个电话面试。那时候我还在路上，就出了地铁站等着电话过来。莘庄站附近有火车经过，特别吵，所以面试体验也很糟糕。其实这会儿来说，前端基础知识比较扎实，所以我不怕任何面试。就是... 老哥面试的水平倒是真的难说。“React Hooks 用过么？”，“父子组件的生命周期？”... 讲真，我感觉没答上几个问题来，所以很好奇为啥晚上又打了电话过来约我二面。

截至 14 号（其实是 12 号），我把闵行这边的公司基本上都投了一遍。阔惜呀，也没捞着几个沟通机会。下周开始打算转战市区了，顺便内推也可以投一投。

说到内推，礼拜三（13 号）的时候让别人投了 BiliBili（看看，我是有多么膨胀...）。写复盘的今天（15 号），还邮件给了裤衩大求帮忙看看上海有没有机会内推。不过人家又不认识我，甚至都没必要回信给我，为啥要帮忙呢...

**🌘 2020 年 8 月 11 日**

哇，又冷又紧张，今天真的惨。很多小问题都没答到位；还暴露了一些因面试准备不充分而阻断思路的比较严重的问题。大的方向上来说，主要是我的项目细节和职业规划。

像面试官问“项目难点在哪儿”这种问题，因为以前做项目没有复盘的习惯，项目细节一时半会儿想不起来，脑子一旦转不过弯来，就直接答非所问了。下午我问了一下前同事，他说人家应该只是想问问你碰到的一些难题，然后讲一下场景和解决思路就行了。害，确实，也不是谁都有和“百万并发、千万用户”这种特定场景的“难题”打交道的机会。别人想问的“难题”也许并不是我想象中那么艰深的技术难题。

技术面试官问我“职业规划”问题和 HR 问我的“职业规划”问题尽管名字相同，但实际是两种意思。技术面试官着重点在前端技术的学习路径看我符不符合公司的技术栈，HR 则比较关注我的职业发展方向。相应的，HR 问了许多有关我的职业稳定性、职业发展时的思考（技术上和业务上的思考）方面的问题。我的前两份工作的面试，都没有过 HR 面。我和 HR 打交道的场景也并不惹人欢喜，一次是实习面试的时候被 HR 直接（委婉地）回绝；再是上一份工作辞职时被 HR 拉过聊天... 现在可以说是真没准备好和 HR 的交锋，所以今天回答的也挺糊的...

然后是一些小问题。

由于这家公司做直播产品，前端直接和用户打交道。技术面试的重心很大一部分落在浏览器原理这块儿，而这些内容因为不是特别了解，所以... 面试出来我就打算把《Webkit 技术内幕》那本书列为在读书目了。

一面就被问了快排，好慌，直接跪了。我心想还好只有一个算法问题，结果技术二面又问了一些数据结构与算法。TOT 我还是把回顾算法、刷力扣也纳入学习计划吧，不然继续这样“无准备面试”实在太吃亏了。

比较有意思的地方是，今天面的公司，研发流程中有“技术评审”这个制度，主要是开发们就需求可行性和技术实现难度，讨论开发方案和开发时间。果然，“技术驱动”的公司，技术们挺有话语权的。这个不错，哈哈。