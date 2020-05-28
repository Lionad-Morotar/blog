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

export default {
    name: 'Layout',
    components: {
        ParentLayout,
        PageBottom
    }
}
</script>
