/** Utils | Common Functions */

let requestFrameStore = null
let cancelFrameStore = null

const utils = {
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
