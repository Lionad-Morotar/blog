<template>
    <div v-if="shouldRender" style="display: contents">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'JJ',
    data() {
        return {
            shouldRender: process.env.NODE_ENV !== 'production'
        }
    }
}
</script>
