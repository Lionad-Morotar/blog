/** @file 将 H1 名字加到 body 上，方便给一些特殊页面增加样式，防止污染全局 */

module.exports = {
    mounted() {
        this.$router.afterEach((to, from) => {
            if (to && from && to.path === from.path) {
                return
            }
            try {
                this.$nextTick(() => {
                    const prefix = 'h1_content_'
                    const $h1 = document.querySelector('h1')
                    const $body = document.body

                    if ($h1) {
                        const content = $h1.innerText.replace(/[^a-zA-Z\u4e00-\u9fa5]/g, '')
    
                        $body.classList.forEach(x => x.startsWith(prefix) && $body.classList.remove(x))
                        $body.classList.add(prefix + content)
                    }
                })
            } catch (e) {}
        })
    }
}
