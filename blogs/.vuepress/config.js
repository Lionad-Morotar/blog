const sidebar = require('./sidebar.js')

module.exports = {
  /** develop config */

  base: '/',
  dest: './dist',

  /** page config */

  title: 'Lionad Blogs',
  description: 'Lionad Guirotar 的个人博客, 心流历程以及其它一些好玩的东西',
  head: [
    ['link', { rel: 'dns-prefetch', href: '/utteranc.es' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],

  /** theme config */

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Flows', link: '/articles/' }
    ],
    sidebar: {
      '/articles/': sidebar.getSidebar('articles')
    },
    lastUpdated: 'Last Updated'
  },

  /** markdown config */

  extendMarkdown(md) {
    md.use(require('markdown-it-katex'))
  },

  /** plugins */

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-142194237-1'
      }
    ]
    // 'vuepress-plugin-nprogress',
    // [
    //   'vuepress-plugin-medium-zoom',
    //   {
    //     selector: '.theme-container img'
    //   }
    // ]
  ]
}
