<script>
export default {
    render(h) {
        const children = [...(this.$slots.default || [])].sort((a, b) => Math.random() - 0.5)
        // .filter((x) => x.context)
        // .map((x) => {
        //     let name = null
        //     try {
        //         name = x.componentOptions.propsData.name
        //     } catch {
        //         name = ''
        //     }
        //     x.__weight = BLOG_WEIGHT[name] || 0
        //     return x
        // })
        // .sort((a, b) => {
        //     const offset = b.__weight - a.__weight
        //     const offsetNum = Number.isNaN(offset) ? 0 : offset

        //     return Math.random() - 0.5 + offsetNum
        // })
        // .map((x) => (delete x.__weight, x))

        return h(
            'div',
            {
                props: {
                    'v-pre': 'v-pre',
                },
            },
            children
        )
    },
}
</script>