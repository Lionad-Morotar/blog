/** @see https://blog.csdn.net/qq_21460229/article/details/103182426 */

let x

const ConsoleManager = {
    tickTime: 0,
    onOpen() {
        console.log('Console is opened')
    },
    onClose() {
        console.log('Console is closed')
    },
    init() {
        let self = this
        x = x || document.createElement('div')
        let isOpening = false,
            isOpened = false

        Object.defineProperty(x, 'id', {
            get() {
                if (!isOpening) {
                    self.onOpen()
                    isOpening = true
                }
                isOpened = true
            }
        })
        function check() {
            isOpened = false
            console.info(x)
            if (ConsoleManager.tickTime++ % 10 === 0) {
                console.clear()
            }
            if (!isOpened && isOpening) {
                self.onClose()
                isOpening = false
            }
        }
        setInterval(!isOpening && check, 500)
        check()
    }
}

module.exports = ConsoleManager
