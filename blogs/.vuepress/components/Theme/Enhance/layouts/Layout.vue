<template>
    <ParentLayout>
        <template #page-bottom>
            <PageBottom />
        </template>
    </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import PageBottom from '@theme/components/PageBottom.vue'

import addH1toBody from '../mixins/addH1toBody'
import addWhiteMaskToNav from '../mixins/addWhiteMaskToNav'
import catchSidebarScroll from '../mixins/catchSidebarScroll'
import useConfetti from '../mixins/useConfetti'
import useCSSBridge from '../mixins/useCSSBridge'
// import useScript from '../mixins/useScript'

const utils = require('../utils')

export default {
    name: 'Layout',
    components: {
        ParentLayout,
        PageBottom
    },
    mixins: [
        addH1toBody,
        addWhiteMaskToNav,
        catchSidebarScroll,
        useConfetti,
        useCSSBridge,
        // useScript('http://192.168.1.7:8081/console-ban.js')
    ],
    mounted() {
        window.onload = utils.onload.fn
    },
    beforeDestroy() {
        utils.onload.destroy()
    }
}
</script>
