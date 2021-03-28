/** @file Crisp / 没有废除 Crisp 的原因是可以看到用户的实时浏览轨迹 */

module.exports = {
    mounted() {
        // 没有浏览 5s 则不计入 Crisp 的统计（去除爬虫之类的影响）
        const isDev = process.env.NODE_ENV === 'development'
        if (!isDev) {
            setTimeout(() => {
                this.initCrisp()
            }, 1000 * 5)
        }
    },
    methods: {
        initCrisp() {
            const crisp = document.createElement('script')
            crisp.type = 'text/javascript'
            crisp.async = true
            crisp.defer = true
            crisp.crossorigin = 'anonymous'
            crisp.innerHTML = `/** CRISP */ window.$crisp = []; window.CRISP_WEBSITE_ID = '645341f5-8128-4961-a5b8-7b7dfb057cdd'; ;(function() { d = document; s = d.createElement('script'); s.src = 'https://client.crisp.chat/l.js'; s.async = 1; d.getElementsByTagName('head')[0].appendChild(s); })();`
            window.document.body.appendChild(crisp)
        }
    }
}
