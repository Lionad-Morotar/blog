const sidebar = require('./sidebar.js')
const configureWebpack = require('./webpack.config.js')

module.exports = {
    /** develop config */

    base: '/',
    dest: './dist',

    /** page config */

    title: 'Lionad Blogs',
    description:
        'Lionad Guirotar Blogs 是贪玩老虎的个人专栏。其中有给技术人员查阅的技术文章，给文艺青年阅读的杂文散文，还有老虎的一些个人动态。做一个极客范的程序员，我在前端、设计、写作、音乐等方面都有兴趣学习。除了个人资料，用户也可以在今后的首页找到与技术及阅读相关的最新资料与合集。如果你是 GitHub、豆瓣、Medium、CodePen 等网站的用户，我相信你能在这找到一些乐趣。',
    keywords: 'Lionad,Guirotar,贪玩老虎,博客,写作,前端,设计,指弹,吉他',
    robots: 'index,archive',
    author: 'Lionad|贪玩老虎',
    copyright: 'lionad版权所有',
    head: [
        ['meta', { name: 'baidu-site-verification', content: 'Mdz47FJiHx' }],
        ['link', { rel: 'dns-prefetch', href: '/utteranc.es' }],
        ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
        ['script', { src: 'https://cdn.bootcss.com/p5.js/1.0.0/p5.min.js' }]
    ],

    /** theme config */

    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Articles', link: '/articles/' },
            { text: 'Flows', link: '/flows/' }
        ],
        sidebar: {
            '/articles/': sidebar.getSidebar('articles'),
            '/flows/': sidebar.getSidebar('flows'),
            '/friends/': sidebar.getSidebar('friends')
        },
        lastUpdated: 'Last Updated'
    },

    /** markdown config */

    extendMarkdown(md) {
        function imageLazyLoadPlugin(md) {
            const defaultImageRenderer = md.renderer.rules.image
            md.renderer.rules.image = function(
                tokens,
                idx,
                options,
                env,
                self
            ) {
                const token = tokens[idx]

                /* 处理 SRC */
                // const src = token.attrGet('src')
                // token.attrSet('data-src', src)
                // const srcIdx = token.attrIndex('src')
                // if (srcIdx !== -1) {
                //     token.attrs.splice(srcIdx, 1)
                // }

                /* 处理 ClassName */
                // const classnames = token.attrGet('class')
                // // const modClassnames = (classnames || '')
                // //     .split(' ')
                // //     .push('lozad')
                // //     .join(' ')
                // const modClassnames = 'lozad'
                // token.attrSet('class', modClassnames)

                /* 原生懒加载 */
                token.attrSet('loading', 'lazy')

                return defaultImageRenderer(tokens, idx, options, env, self)
            }
        }

        md.use(imageLazyLoadPlugin)
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

                rule.use('sass-loader')
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
