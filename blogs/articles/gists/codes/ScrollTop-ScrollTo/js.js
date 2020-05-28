window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function scroll(ele, height, time = 800) {
    const frameTime = 800 / (1000 / 60)
    const currentTop = ele.scrollTop
    const frameHeight = (height - currentTop) / frameTime
    const toBottom = currentTop < height

    const run = () => {
        const store = ele.scrollTop
        ele.scrollTop = store + frameHeight

        const go = (toBottom && store + frameHeight < height) || (!toBottom && store + frameHeight > height)
        go && window.requestAnimFrame(run)
    }
    run()
}

const $scrollArea = document.querySelector('.scroll-area')

document.querySelector('.btn1').addEventListener('click', () => scroll($scrollArea, 500))
document.querySelector('.btn2').addEventListener('click', () => scroll($scrollArea, 1000))
