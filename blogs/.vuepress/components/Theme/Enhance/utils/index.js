/** Utils | Common Functions */

module.exports = {
    isMobile: (function() {
        let isMobile = null
        const mobileUAs = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod']
        return () => {
            return isMobile !== null
                ? isMobile
                : (isMobile = !!mobileUAs.find(mobileUA => navigator.userAgent.indexOf(mobileUA) !== -1))
        }
    })(),

    onload: (function() {
        const store = []
        return {
            fn: () => store.map(fn => fn()),
            add: fn => (store.push(fn), store),
            destroy: () => store.map(fn => fn._destroy && fn._destroy())
        }
    })()
}
