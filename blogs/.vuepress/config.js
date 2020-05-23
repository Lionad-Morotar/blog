const sidebar = require('./sidebar.js')
const configureWebpack = require('./webpack.config.js')

module.exports = {
    /** develop config */

    base: '/',
    dest: './dist',

    /** page config */

    title: 'Lionad Blogs',
    description:
        'Lionad Guirotar Blogs 是老虎贪玩儿的个人专栏。其中有给技术人员查阅的技术文章，给文艺青年阅读的杂文散文，还有老虎的一些个人动态。做一个极客范的程序员，我在前端、设计、写作、音乐等方面都有兴趣学习。除了个人资料，用户也可以在今后的首页找到与技术及阅读相关的最新资料与合集。如果你是 GitHub、豆瓣、Medium、CodePen 等网站的用户，我相信你能在这找到一些乐趣。',
    keywords: 'Lionad,Guirotar,老虎贪玩儿,博客,写作,前端,设计,指弹,吉他',
    robots: 'index,archive',
    author: 'Lionad|老虎贪玩儿',
    copyright: 'lionad版权所有',
    head: [
        ['meta', { name: 'baidu-site-verification', content: 'Mdz47FJiHx' }],
        ['link', { rel: 'dns-prefetch', href: '/utteranc.es' }],
        ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
        ['script', { src: 'https://cdn.bootcss.com/p5.js/1.0.0/p5.min.js' }],
        [
            'script',
            {
                src:
                    'https://cdn.jsdelivr.net/combine/npm/codemirror@5.54.0,npm/codemirror@5.54.0/mode/jsx/jsx.min.js,npm/codemirror@5.54.0/mode/css/css.min.js,npm/codemirror@5.54.0/mode/htmlmixed/htmlmixed.min.js,npm/codemirror@5.54.0/addon/selection/active-line.min.js,npm/codemirror@5.54.0/addon/edit/closebrackets.min.js,npm/codemirror@5.54.0/addon/edit/closetag.min.js,npm/codemirror@5.54.0/addon/edit/matchbrackets.min.js,npm/codemirror@5.54.0/addon/edit/matchtags.min.js,npm/codemirror@5.54.0/addon/comment/comment.min.js,npm/codemirror@5.54.0/addon/fold/foldcode.min.js,npm/codemirror@5.54.0/addon/fold/foldgutter.min.js,npm/codemirror@5.54.0/addon/fold/brace-fold.min.js,npm/codemirror@5.54.0/addon/fold/comment-fold.min.js,npm/codemirror@5.54.0/addon/fold/xml-fold.min.js,npm/codemirror@5.54.0/addon/fold/markdown-fold.min.js'
            }
        ],
        [
            'script',
            {},
            `
                var _hmt = _hmt || [];
                (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?774d33180b32709e7d3109ce600657c1";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
                })();
            `
        ]
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
            '/flows/': [],
            '/friends/': []
        },
        lastUpdated: 'Last Updated'
    },

    /** markdown config */
    markdown: {
        anchor: {
            permalinkSymbol: '🔗'
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

    // extraWatchFiles: ['../../node_modules/code-block-runner/dist/*']
}
