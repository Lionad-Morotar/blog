const sidebar = require('./sidebar.js')
const configureWebpack = require('./webpack.config.js')

module.exports = {
    /** develop config */

    base: '/',
    dest: './dist',

    /** page config */

    title: 'Lionad Blogs',
    description:
        'Lionad Guirotar 的个人博客, 心流历程以及其它一些好玩的东西 | Lionad Blogs',
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
