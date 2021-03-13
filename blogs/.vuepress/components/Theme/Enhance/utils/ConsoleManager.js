/**
 * “Find out whether Chrome console is open”
 * @see https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open/30638226
 */

const ConsoleManager = {
    isOpened: false,
    evalCounts: 0,
    onOpen() {
        console.log('Console is opened')
    },
    isOpening() {
        return this.evalCounts === (this.isOpened ? 1 : 2)
    },
    init() {
        const watchElement = new Function()
        watchElement.toString = () => {
            this.evalCounts ++
            if (this.isOpening()) {
                this.isOpened = true
                this.onOpen()
                this.evalCounts = 0
            }
        }
        if (window.chrome) {
            console.log && console.log('%c', watchElement)
        }
    }
}

module.exports = ConsoleManager
