const sidebarConfigs = {
  articles: [
    {
      title: '心流 / Heart Flows',
      label: '心流',
      collapsable: false,
      childrenGen: list => list.map(x => 'flow/' + x),
      childrenRaw: [
        '权力斗争中的误导与假设',
        '2019',
        '万物联结与幸福感',
        '偷取时间',
        '隐秘',
        '追寻自由与满怀希望',
        '表达和孤独',
        '文字与情绪',
        '使用英文点号',
        '一封沉默',
        '我的腼腆'
      ]
    },
    {
      title: '博客 / Blogs',
      label: '博客',
      collapsable: false,
      children: [
        '从最近很流行的一张CSS风景画中学到的东西',
        '有关CSS的一些极有趣的东西',
        '近来的新工作，及喝饮料时的一些思考',
        '聊聊聊此次离职毕业及其它杂乱的事情',
        '你本可以少写些if-else',
        '150行代码带你实现小程序中的数据侦听',
        '从一个越写越慢的编辑器中聊聊优化思路',
        '探索Scoped-CSS实现原理',
        '听说你还在手写懒加载'
      ]
    },
    {
      title: '单曲 / Songs',
      collapsable: false,
      children: [
        '163/wings-you-are-the-hero',
        '163/EVA',
        '163/奇迹之山',
        '163/wu-wei',
        '163/wuti'
      ]
    }
  ]
}

Object.values(sidebarConfigs).map(sections => {
  sections.map(section => {
    if (!section.children) {
      section.children = section.childrenGen
        ? section.childrenGen(section.childrenRaw)
        : section.childrenRaw
    }
    if (!section.childrenRaw) {
      section.childrenRaw = section.children
    }
  })
})

module.exports = {
  getSidebar(name) {
    return sidebarConfigs[name] || []
  }
}
