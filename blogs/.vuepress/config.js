module.exports = {

  /** develop config */

  base: "/",
  dest: "./dist",
  ga: "UA-142194237-1",

  /** page config */

  title: "MGear | 前端🔗世界",
  description: "Lionad 的个人博客, 心流历程以及其它一些好玩的东西",
  head:[
    ["link", { rel: 'dns-prefetch', href: '//cdn.bootcss.com' }],
    ["link", { rel: 'dns-prefetch', href: '//utteranc.es' }],
    ["link", { rel: 'shortcut icon', href: '/favicon.ico' }],
  ],

  /** theme config */

  themeConfig: {
    nav: [
      { text: "社交主页", link: "/" },
      { text: "博客内容", link: "/articles/" },
      { text: "代码分享", link: "/codes/polyfills/" },
    ],
    sidebar: {
      '/articles/': getSidebar('articles'),
      '/codes/polyfills/': getSidebar('polyfills')
    },
    lastUpdated: 'Last Updated'
  },

  /** markdown config */

  markdown: {
    anchor: { permalink: false },
    config: md => {
      md.use(require("markdown-it-katex"))
    }
  }
}

function getSidebar (name) {
  const sidebarConfigs = {

    articles: [
      {
        title: '心流',
        collapsable: true,
        children: [
          // ...
        ]
      },
      {
        title: '博客',
        collapsable: false,
        children: [
          '006-聊聊聊此次离职毕业及其它杂乱的事情',
          '005-你本可以少写些if-else',
          '004-150行代码带你实现小程序中的数据侦听',
          '003-从一个越写越慢的编辑器中聊聊优化思路',
          '002-探索Scoped-CSS实现原理',
          '001-听说你还在手写懒加载'
        ]
      },
      {
        title: '单曲',
        collapsable: true,
        children: [
          // ...
        ]
      },
      {
        title: '推荐',
        collapsable: true,
        children: [
          // ...
        ]
      }
    ],

    polyfills: [
      {
        title: '代码段',
        collapsable: false,
        children: [
          'object-create'
        ]
      }
    ]

  }

  return sidebarConfigs[name] || []
}

