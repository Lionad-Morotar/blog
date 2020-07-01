/** Utils | Common Functions */

let requestFrameStore = null
let cancelFrameStore = null

const loadScriptFromURL = (() => {
    const cache = {}
    return function(url) {
        let callback
        const listener = new Promise(resolve => (callback = resolve))
        const item = cache[url] || (cache[url] = { state: 'init', toNotify: [callback] })

        function notify() {
            item.toNotify.map(cb => cb())
        }

        if (item.state === 'queue') {
            item.toNotify.push(callback)
        }
        if (item.state === 'done') {
            callback()
        }
        if (item.state === 'init') {
            cache[url].state = 'queue'
            const script = document.createElement('script')
            script.src = url
            document.body.appendChild(script)

            script.onload = () => {
                cache[url].state = 'done'
                notify()
            }
        }

        return listener
    }
})()

const utils = {
    loadScriptFromURL,
    isDev: process.env.NODE_ENV === 'development',
    requestAnimationFrame: cb => {
        const fn =
            requestFrameStore ||
            (requestFrameStore =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    return window.setTimeout(callback, 1000 / 60)
                })
        return fn(cb)
    },
    cancelAnimationFrame: id => {
        const fn =
            cancelFrameStore ||
            (cancelFrameStore =
                window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout)
        return fn(id)
    }
}

let isMobile = null
const mobileUAs = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod']
Object.defineProperty(utils, 'isMobile', {
    enumerable: true,
    get() {
        return isMobile || (isMobile = !!mobileUAs.find(mobileUA => navigator.userAgent.indexOf(mobileUA) !== -1))
    }
})

module.exports = utils
