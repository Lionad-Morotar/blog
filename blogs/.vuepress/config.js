const sidebar = require('./sidebar.js')
const configureWebpack = require('./webpack.config.js')

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

  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-142194237-1'
    }
  },

  /** Configuration */

  configureWebpack,
  chainWebpack(config, isServer) {
    // 单独配置 SASS 文件是因为一个 VuePress 的 Bug，见：https://github.com/vuejs/vuepress/issues/2148
    for (const lang of ['sass', 'scss']) {
      for (const name of ['modules', 'normal']) {
        const rule = config.module.rule(lang).oneOf(name)
        rule.uses.delete('sass-loader')

        rule
          .use('sass-loader')
          .loader('sass-loader')
          .options({
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: lang === 'sass'
            }
          })
      }
    }
  }
}
