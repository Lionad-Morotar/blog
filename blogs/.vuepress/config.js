module.exports = {

  /** develop config */

  base: "/",
  dest: "./dist",
  ga: "UA-142194237-1",

  /** page config */

  title: "Lionad Blogs",
  description: "Lionad Guirotar 的个人博客, 心流历程以及其它一些好玩的东西",
  head: [
    ["link", { rel: 'dns-prefetch', href: '//utteranc.es' }],
    ["link", { rel: 'shortcut icon', href: '/favicon.ico' }],
  ],

  /** theme config */

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Flows", link: "/articles/" },
      // { text: "Resume", link: "/resume/" },
      // { text: "代码分享", link: "/codes/gists/" },
    ],
    sidebar: {
      '/articles/': getSidebar('articles'),
      // '/resume/': getSidebar('resume'),
      '/codes/gists/': getSidebar('gists')
    },
    lastUpdated: 'Last Updated'
  },

  /** markdown config */

  markdown: {
    anchor: { permalink: false },
    config: md => {
      md.use(require("markdown-it-katex"))
    }
  },

  plugins: [
    'vuepress-plugin-nprogress',
  ]
}

// TODO gulp
function getSidebar(name) {
  const sidebarConfigs = {

    articles: [
      {
        title: '心流 / Heart Flows',
        collapsable: false,
        children: [
          'flow/万物联结与幸福感',
          'flow/偷取时间',
          'flow/隐秘',
          'flow/追寻自由与满怀希望',
          'flow/表达和孤独',
          'flow/文字与情绪',
          'flow/使用英文点号',
          'flow/一封沉默',
          'flow/我的腼腆',
        ]
      },
      {
        title: '博客 / Blogs',
        collapsable: false,
        children: [
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
    ],

    // resume: [
    //   {
    //     title: '简历 & 项目',
    //     collapsable: false,
    //     children: [
    //       'CRM',
    //       '乘云小程序',
    //       '乘云新零售'
    //     ]
    //   }
    // ],

    gists: [
      {
        title: '代码段',
        collapsable: false,
        children: [
          'object-create',
          'bind'
        ]
      }
    ]

  }

  return sidebarConfigs[name] || []
}

