/** Utils | Common Functions */

// @see http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
const tween = {
    linear(t, b, c, d) {
        return (c * t) / d + b
    },
    easein(t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeout(t, b, c, d) {
        return c * (t = t / d - 1) * t * t * t + b
    },
    strongeasein(t, b, c, d) {
        return c * (t /= d) * t * t * t * t * t * t + b
    },
    easeoutelastic(t, b, c, d) {
        var s = 1.70158
        var p = 0
        var a = c
        if (t == 0) return b
        if ((t /= d) == 1) return b + c
        if (!p) p = d * 0.3
        if (a < Math.abs(c)) {
            a = c
            var s = p / 4
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
        return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b
    }
}

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
    tween,
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
