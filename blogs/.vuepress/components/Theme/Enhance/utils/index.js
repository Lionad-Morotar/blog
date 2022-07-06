/** Utils | Common Functions */
const utils = {
    onload: (function() {
        const store = []
        return {
            fn: () => store.map(fn => fn()),
            add: fn => (store.push(fn), store),
            destroy: () => store.map(fn => fn._destroy && fn._destroy())
        }
    })(),
    requestIdleCallback: (...args) => {
        const methods = window.requestIdleCallback || function (cb) {
            var start = Date.now()
            return setTimeout(function () {
            cb({
                didTimeout: false,
                timeRemaining: function () {
                return Math.max(0, 50 - (Date.now() - start))
                }
            })
            }, 1)
        }
        return methods(...args)
    },
    cancelIdleCallback: (...args) => {
        const methods = window.cancelIdleCallback || function (id) {
            clearTimeout(id)
        }
        return methods(...args)
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
