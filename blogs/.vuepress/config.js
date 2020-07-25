const path = require('path')
const pinyin = require('chinese-to-pinyin')

const sidebar = require('./sidebar')
const headLink = require('./headLink')
const configureWebpack = require('./webpack.config.js')
const { chainMarkdown, extendMarkdown } = require('./extendMarkdown')

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
    locales: {
        '/': {
            lang: 'zh'
        }
    },

    /** markdown config */
    markdown: {
        anchor: {
            permalink: false
        },
        toc: false,
        extendMarkdown
    },
    chainMarkdown,

    /** plugins */

    plugins: {
        'named-chunks': {
            pageChunkName: page => {
                const defaultName = page.key.slice(1)
                const pinyinName = pinyin(page.title || defaultName, { removeTone: true }).replace(/[^a-zA-Z0-9]/g, '')
                return pinyinName
            },
            layoutChunkName: layout => 'layout-' + layout.componentName
        },
        'vuepress-plugin-medium-zoom': {
            selector:
                '.theme-default-content > img,' +
                '.theme-default-content > p > img,' +
                '.theme-default-content > ul > li > img,' +
                '.theme-default-content > ol > li > img',
            delay: 1000,
            options: {
                margin: 24,
                background: 'var(--color-background)',
                scrollOffset: 0
            }
        },
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
        },
        'vuepress-plugin-mathjax': {
            target: 'chtml',
            macros: {
                '*': '\\times'
            }
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
