<template>
    <div style="padding: 1.5rem 0 0 0">
        <div class="con" :style="conStyles">
            <div class="circle-con" />
        </div>
        <input type="checkbox" v-model="isTranslateZ" /> TranslateZ(0) /
        <input type="checkbox" v-model="isRotate" /> Rotate(3deg)
    </div>
</template>

<script>
export default {
    data() {
        return {
            isTranslateZ: true,
            isRotate: true
        }
    },
    computed: {
        conStyles() {
            return {
                transform: [this.isTranslateZ ? 'translateZ(0)' : '', this.isRotate ? 'rotate(3deg)' : ''].join(' ')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.con {
    overflow: hidden;

    .circle-con {
        c1 = #cd3f4f;
        c2 = #e6a964;
        position: relative;
        height: 300px;
        background-image: repeating-radial-gradient(circle at 0% 50%, c1 0, c2 50px);
    }
}
</style>
