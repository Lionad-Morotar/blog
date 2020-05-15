<template>
    <div id="comment"></div>
</template>

<script>
/** MAIN */
export default {
    name: 'utterances-cmpt',
    mounted() {
        // this.initUtterances()
        this.initCrisp()
    },
    methods: {
        initUtterances() {
            const utterances = document.createElement('script')
            utterances.type = 'text/javascript'
            utterances.async = true
            utterances.defer = true
            utterances.setAttribute('issue-term', 'title')
            utterances.setAttribute('label', '💬')
            utterances.setAttribute('theme', 'github-light')
            utterances.setAttribute('repo', `Lionad-Morotar/blogs`)
            utterances.crossorigin = 'anonymous'
            utterances.src = 'https://utteranc.es/client.js'

            window.document.body.appendChild(utterances)
        },
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
</script>
