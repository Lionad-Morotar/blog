const utils = require('../utils')

module.exports = {
    mounted() {
        const listenType = utils.isMobile ? 'touchstart' : 'mousedown'
        document.addEventListener(listenType, function(event) {
            utils.requestIdleCallback(() => {
                const root = document.body
                const target = event.target
                const touch = event.touches ? event.touches[0] : event
                const meter = 'px'
    
                root.style.setProperty('--clientx', touch.clientX + meter)
                root.style.setProperty('--clienty', touch.clientY + meter)
                root.style.setProperty('--pagex', touch.pageX + meter)
                root.style.setProperty('--pagey', touch.pageY + meter)
    
                target.style.setProperty('--w', target.clientWidth + meter)
                target.style.setProperty('--h', target.clientHeight + meter)
                target.style.setProperty('--x', target.offsetLeft + meter)
                target.style.setProperty('--y', target.offsetTop + meter)
            })
        })
    }
}
