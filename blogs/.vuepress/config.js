module.exports = {
  title: "MGear",
  description: "Lionad-Guirotar Blogs",
  base: "/",
  dest: "./dist",

  head:[
    [
      "link", 
      { rel: 'shortcut icon', href: '/favicon.ico' }
    ]
  ],

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blogs", link: "/articles/" },
      { text: "GitHub", link: "https://github.com/Lionad-Morotar" }
    ],
    sidebar: {
      '/articles/': genSidebarConfig('Blog')
    },
    lastUpdated: 'Last Updated'
  },

  markdown: {
    anchor: { permalink: false },
    config: md => {
      md.use(require("markdown-it-katex"))
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title: 'My Blogs',
      collapsable: false,
      children: [
        '005-你本可以少写些if-else',
        '004-150行代码带你实现小程序中的数据侦听',
        '003-从一个越写越慢的编辑器中聊聊优化思路',
        '002-深入探索Scoped-CSS实现原理',
        '001-听说你还在手写懒加载'
      ]
    }
  ]
}

