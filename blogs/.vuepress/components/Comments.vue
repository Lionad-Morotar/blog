<template>
  <div id='comment'></div>
</template>

<script>
export default {
  name: 'utterances-cmpt',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const utterances = document.createElement('script')
      utterances.type = 'text/javascript'
      utterances.async = true
      utterances.setAttribute('issue-term', 'title')
      utterances.setAttribute('label', '💬')
      utterances.setAttribute('theme', 'github-light')
      utterances.setAttribute('repo', `Lionad-Morotar/blogs`)
      utterances.crossorigin = 'anonymous'
      // utterances.src = '/js/utteranc.client.js'
      utterances.src = 'https://utteranc.es/client.js'

      window.document.getElementById('comment').appendChild(utterances)
    }
  }
}
</script>