const isDev = process.env.NODE_ENV === 'development'

const config = {
    useBaiduHMT: !isDev
}

const headLink = [
    ['meta', { name: 'baidu-site-verification', content: 'Mdz47FJiHx' }],
    ['link', { rel: 'dns-prefetch', href: '/utteranc.es' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    [
        'script',
        {
            src: '//instant.page/5.1.0',
            type: 'module',
            integrity: 'sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw',
            defer: 'defer'
        }
    ]
]

// 百度统计
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
