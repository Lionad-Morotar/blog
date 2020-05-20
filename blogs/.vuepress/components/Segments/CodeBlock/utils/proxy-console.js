(function () {

    window.onerror = function (message) {
        window.parent.postMessage({
            /* FLAG-MESSAGE-ID */
            type: 'iframe-error', 
            message 
        }, '*')
    }

    const methods = [
        'debug',
        'clear',
        'error',
        'info',
        'log',
        'warn',
        'dir',
        'props',
        '_raw',
        'group',
        'groupEnd',
        'dirxml',
        'table',
        'trace',
        'assert',
        'count',
        'markTimeline',
        'profile',
        'profileEnd',
        'time',
        'timeEnd',
        'timeStamp',
        'groupCollapsed'
    ]

    const newConsole = Object.create(console)

    methods.map(method => {
        const originalMethod = console[method]
        newConsole[method] = function (...args) {
            originalMethod(...args)
            window.parent.postMessage({
                /* FLAG-MESSAGE-ID */
                args,
                method,
                type: 'console',
            }, '*')
        }
    })

    window.console = newConsole
})()
