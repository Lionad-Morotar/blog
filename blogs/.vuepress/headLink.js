const isDev = process.env.NODE_ENV === 'development'

const headLink = [
    ['meta', { name: 'baidu-site-verification', content: 'Mdz47FJiHx' }],
    ['meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }],
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

!isDev &&
    headLink.push([
        'script',
        {
            // @see https://www.fundebug.com/dashboard/60fbd322368abf12549b2481/errors/inbox
            src: '//js.fundebug.cn/fundebug.2.5.0.min.js',
            crossorigin: 'anonymous',
            apikey: '6cf8608d1691cea338ccf8b2057530f1991968b20555ea79ff3cb6261e6cba77',
            defer: 'defer'
        }
    ])

// 百度统计
!isDev &&
    headLink.push([
        'script',
        { defer: 'defer' },
        `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?9f386eab0658c409277cb8e60691de6e";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })();
        `
    ])

// ARMS
!isDev &&
    headLink.push([
        'script',
        { defer: 'defer', crossorigin: 'crossorigin' },
        `
            window.__bl = {
                config: {
                    pid:"eeh52p97ae@20a026fed78311e",
                    appType:"web",
                    imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",
                    sendResource:true,
                    enableLinkTrace:true,
                    behavior:true,
                    enableConsole:true,
                    useFmp:true
                }
            }
            ;(function() {
                var hm = document.createElement("script");
                hm.src = "https://retcode.alicdn.com/retcode/bl.js";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })()
        `
    ])

module.exports = headLink
