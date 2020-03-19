const sidebarConfigs = {
  articles: [
    {
      title: '心流 / Heart Flows',
      collapsable: false,
      children: [
        'flow/权力斗争中的误导与假设',
        'flow/2019',
        'flow/万物联结与幸福感',
        'flow/偷取时间',
        'flow/隐秘',
        'flow/追寻自由与满怀希望',
        'flow/表达和孤独',
        'flow/文字与情绪',
        'flow/使用英文点号',
        'flow/一封沉默',
        'flow/我的腼腆'
      ]
    },
    {
      title: '博客 / Blogs',
      collapsable: false,
      children: [
        '200319-从最近很流行的一张CSS风景画中学到的东西',
        '191112-有关CSS的一些极有趣的东西',
        '007-近来的新工作，及喝饮料时的一些思考',
        '006-聊聊聊此次离职毕业及其它杂乱的事情',
        '005-你本可以少写些if-else',
        '004-150行代码带你实现小程序中的数据侦听',
        '003-从一个越写越慢的编辑器中聊聊优化思路',
        '002-探索Scoped-CSS实现原理',
        '001-听说你还在手写懒加载'
      ]
    },
    {
      title: '单曲 / Songs',
      collapsable: false,
      children: [
        '163/wuti',
        '163/wings-you-are-the-hero',
        '163/奇迹之山',
        '163/wu-wei',
        '163/EVA'
      ]
    }
  ]
}

module.exports = {
  getSidebar(name) {
    return sidebarConfigs[name] || []
  }
}
