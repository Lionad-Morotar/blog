/** @file 控制台打开时的彩带效果 */

const ConsoleManager = require('../utils/ConsoleManager')

module.exports = {
    mounted() {
        !this.$utils.isDev && this.initConfetii()
        // this.initConfetii()
    },
    methods: {
        async initConfetii() {
            if (!this.$utils.isMobile) {
                await this.$utils.loadScriptFromURL(
                    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.2.0/dist/confetti.browser.min.js'
                )
                ConsoleManager.onOpen = () => {
                    function randomInRange(min, max) {
                        return Math.random() * (max - min) + min
                    }

                    var end = Date.now() + randomInRange(0.5, 1) * 1000

                    var colors = ['#ED2433', '#F69925', '#F6ED25', '#1F73CC', '#3D8DE1', '#221522']

                    ;(function frame() {
                        confetti({
                            colors,
                            particleCount: colors.length,
                            angle: randomInRange(115, 145),
                            spread: randomInRange(70, 100),
                            origin: { x: 1 },
                            decay: 0.95
                        })
                        if (Date.now() < end) {
                            requestAnimationFrame(frame)
                        }
                    })()
                }
                ConsoleManager.init()
            }
        }
    }
}
