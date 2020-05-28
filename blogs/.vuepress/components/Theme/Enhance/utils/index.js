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
    })()
}
