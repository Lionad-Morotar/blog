/** Utils | Common Functions */
const utils = {
    onload: (function() {
        const store = []
        return {
            fn: () => store.map(fn => fn()),
            add: fn => (store.push(fn), store),
            destroy: () => store.map(fn => fn._destroy && fn._destroy())
        }
    })()
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
