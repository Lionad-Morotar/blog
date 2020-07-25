/** @file 防止 sidebar 滚动穿透到正文（PC 和 Mobile） */

const utils = require('../utils')

module.exports = {
    data() {
        return {
            $sidebar: null
        }
    },
    mounted() {
        this.catchSidebarScroll()
    },
    beforeDestroy() {
        this.removeCatchSidebarScroll()
    },
    methods: {
        // 阻止侧边栏滚动时连带滚动正文
        catchSidebarScroll() {
            const $sidebar = this.$sidebar || (this.$sidebar = document.querySelector('.sidebar'))
            if (utils.isMobile) {
                $sidebar.addEventListener('touchstart', this.recordTouchStartXY)
                $sidebar.addEventListener('touchmove', this.checkStop)
                $sidebar.removeEventListener('touchend', this.recordTouchStartXY)
                $sidebar.removeEventListener('touchcancel', this.recordTouchStartXY)
            } else {
                $sidebar.addEventListener('onwheel' in document ? 'wheel' : 'mousewheel', this.checkStop)
            }
        },
        removeCatchSidebarScroll() {
            const $sidebar = this.$sidebar
            if (!$sidebar) {
                return null
            }
            if (utils.isMobile) {
                $sidebar.removeEventListener('touchstart', this.recordTouchStartXY)
                $sidebar.removeEventListener('touchmove', this.checkStop)
            } else {
                $sidebar.removeEventListener('onwheel' in document ? 'wheel' : 'mousewheel', this.checkStop)
            }
        },
        recordTouchStartXY(e) {
            const touch = e.touches ? e.touches[0] : e
            this.lastTouchStart = {
                pageY: touch.pageY
            }
        },
        checkStop(e) {
            const $sidebar = this.$sidebar
            const [minOffset, maxOffset] = [0, $sidebar.scrollHeight - $sidebar.offsetHeight]

            const shouldStop = utils.isMobile
                ? (() => {
                      const touch = e.touches ? e.touches[0] : e
                      const curTouch = {
                          pageY: touch.pageY
                      }
                      const direction = this.lastTouchStart.pageY - curTouch.pageY
                      return (
                          (direction > 0 && $sidebar.scrollTop >= maxOffset) ||
                          (direction < 0 && $sidebar.scrollTop <= minOffset)
                      )
                  })()
                : (() => {
                      const wheelOffset = e.wheelDelta && e.deltaY ? e.wheelDelta * -1 : event.deltaY
                      return (
                          (wheelOffset > 0 && $sidebar.scrollTop >= maxOffset) ||
                          (wheelOffset < 0 && $sidebar.scrollTop <= minOffset)
                      )
                  })()

            if (shouldStop) {
                e.stopPropagation()
                e.preventDefault()
            }
        }
    }
}
