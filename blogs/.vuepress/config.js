const path = require('path')

const sidebar = require('./sidebar')
const headLink = require('./headLink')
const configureWebpack = require('./webpack.config.js')

const valineID = require('./secrets/valine-id').default
const valineKey = require('./secrets/valine-key').default

module.exports = {
    /** develop config */

    base: '/',
    dest: './dist',

    /** page config */

    title: 'Lionad Blogs',
    description:
        'Lionad Blogs 是仿生狮子的个人专栏。其中有技术文章、杂文散文，或是狮子的个人动态。他是前端工程师，也是未来的独立游戏开发，此外他对设计、音乐和写作都颇感兴趣。如果你是 GitHub、豆瓣、Medium、CodePen 等网站的用户，相信你能在这找到一些乐趣。',
    keywords: 'Lionad,Guirotar,仿生狮子,博客,写作,前端,设计,写作,游戏,指弹,吉他',
    robots: 'index,archive',
    author: 'Lionad|仿生狮子',
    copyright: 'Lionad版权所有',
    head: headLink,

    /** theme config */

    theme: path.join(__dirname, './components/Theme/Enhance'),
    themeConfig: {
        lastUpdated: '本文最后更新于',
        smoothScroll: true,
        search: false,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Articles', link: '/articles/' },
            { text: 'Flows', link: '/flows/' }
        ],
        sidebar: {
            '/articles/': sidebar.getSidebar('articles'),
            '/flows/': [],
            '/friends/': []
        },
        nextLinks: false,
        prevLinks: false
    },

    /** markdown config */
    markdown: {
        anchor: {
            permalink: false
        }
    },
    extendMarkdown(md) {
        function imageLazyLoadPlugin(md) {
            const defaultImageRenderer = md.renderer.rules.image
            md.renderer.rules.image = function(tokens, idx, options, env, self) {
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
        md.use(require('markdown-it-toc-done-right'))
    },

    /** plugins */

    plugins: {
        'vuepress-plugin-comment': {
            choosen: 'valine',
            options: {
                el: '#valine-vuepress-comment',
                appId: valineID,
                appKey: valineKey,
                placeholder: '在 Lionad Blogs 留下你的印记...',
                avatar: 'robohash',
                pageSize: '50',
                highlight: false,
                recordIP: true,
                visitor: true
            }
        },
        'rss-feed': {
            username: 'Lionad',
            hostname: 'http://lionad.art',
            selector: '.content__default',
            count: 10,
            filter: page => {
                const shouldConvert = /^articles\/((flow\/)|([^\/]*\.md$))/.test(page.relativePath)
                shouldConvert && console.log(page.relativePath)
                return shouldConvert
            }
        },
        sitemap: {
            hostname: 'http://lionad.art',
            changefreq: 'weekly'
        },
        robots: {
            host: 'http://lionad.art',
            disallowAll: false,
            sitemap: '/sitemap.xml',
            policies: [
                {
                    userAgent: '*',
                    disallow: ['/gists'],
                    allow: ['/articles', '/flows', '/friends', 'rss.xml']
                }
            ]
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
    },

    extraWatchFiles: ['./styles/*']
}
