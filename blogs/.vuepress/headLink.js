const isDev = process.env.NODE_ENV === 'development'

const config = {
    useConfetti: !isDev,
    useBaiduHMT: !idDev,
    useCodeMirror: true
}

const headLink = [
    ['meta', { name: 'baidu-site-verification', content: 'Mdz47FJiHx' }],
    ['link', { rel: 'dns-prefetch', href: '/utteranc.es' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['script', { src: 'https://cdn.bootcss.com/p5.js/1.0.0/p5.min.js', defer: 'defer' }]
]

// 彩带动画
config.useConfetti &&
    headLink.push([
        'script',
        { src: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.2.0/dist/confetti.browser.min.js', defer: 'defer' }
    ])

// 代码高亮
config.useCodeMirror &&
    headLink.push(
        [
            'script',
            {
                src: 'https://cdn.jsdelivr.net/npm/codemirror@5/lib/codemirror.min.js',
                defer: 'defer'
            }
        ],
        // ! 出现了 indent 报错，暂时去掉语言 mode
        // [
        //     'script',
        //     {
        //         src: 'https://cdn.jsdelivr.net/npm/codemirror@5/mode/jsx/jsx.min.js',
        //         defer: 'defer'
        //     }
        // ],
        // [
        //     'script',
        //     {
        //         src: 'https://cdn.jsdelivr.net/npm/codemirror@5/mode/css/css.min.js',
        //         defer: 'defer'
        //     }
        // ],
        // [
        //     'script',
        //     {
        //         src: 'https://cdn.jsdelivr.net/npm/codemirror@5/mode/htmlmixed/htmlmixed.min.js',
        //         defer: 'defer'
        //     }
        // ],
        [
            'script',
            {
                src: 'https://cdn.jsdelivr.net/npm/codemirror@5.54.0/addon/selection/active-line.min.js',
                defer: 'defer'
            }
        ]
    )

config.useBaiduHMT &&
    headLink.push([
        'script',
        { defer: 'defer' },
        `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?774d33180b32709e7d3109ce600657c1";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();
        `
    ])

module.exports = headLink
