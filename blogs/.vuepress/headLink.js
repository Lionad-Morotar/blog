const isDev = process.env.NODE_ENV === 'development'

const headLink = [
    ['meta', { name: 'baidu-site-verification', content: 'Mdz47FJiHx' }],
    ['link', { rel: 'dns-prefetch', href: '/utteranc.es' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['script', { src: 'https://cdn.bootcss.com/p5.js/1.0.0/p5.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js' }],
    [
        'script',
        {
            src:
                'https://cdn.jsdelivr.net/combine/npm/codemirror@5.54.0,npm/codemirror@5.54.0/mode/jsx/jsx.min.js,npm/codemirror@5.54.0/mode/css/css.min.js,npm/codemirror@5.54.0/mode/htmlmixed/htmlmixed.min.js,npm/codemirror@5.54.0/addon/selection/active-line.min.js,npm/codemirror@5.54.0/addon/edit/closebrackets.min.js,npm/codemirror@5.54.0/addon/edit/closetag.min.js,npm/codemirror@5.54.0/addon/edit/matchbrackets.min.js,npm/codemirror@5.54.0/addon/edit/matchtags.min.js,npm/codemirror@5.54.0/addon/comment/comment.min.js,npm/codemirror@5.54.0/addon/fold/foldcode.min.js,npm/codemirror@5.54.0/addon/fold/foldgutter.min.js,npm/codemirror@5.54.0/addon/fold/brace-fold.min.js,npm/codemirror@5.54.0/addon/fold/comment-fold.min.js,npm/codemirror@5.54.0/addon/fold/xml-fold.min.js,npm/codemirror@5.54.0/addon/fold/markdown-fold.min.js'
        }
    ]
]

if (!isDev) {
    headLink.push([
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
    ])
}

module.exports = headLink
