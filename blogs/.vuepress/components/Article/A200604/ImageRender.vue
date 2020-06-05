<template>
    <div class="image-render-cmpt" :class="process">
        <Compare ref="compare" v-if="compare">
            <template v-for="(method, idx) in calcMethods">
                <div class="container" :slot="layouts[idx]" :style="{ imageRendering: method.value }">
                    <div class="title">{{ method.title }}{{ method.isSupport ? '' : ' : Not Support' }}</div>
                    <img loading="lazy" :src="src" />
                </div>
            </template>
        </Compare>
        <template v-else v-for="(method, idx) in calcMethods">
            <div class="container" :style="{ imageRendering: method.value }">
                <div class="title">{{ method.title }}{{ method.isSupport ? '' : ' : Not Support' }}</div>
                <img loading="lazy" :src="src" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        process: String,
        property: String,
        value: Array,
        src: String,
        compare: false,
        layouts: {
            default() {
                return ['left', 'right']
            }
        }
    },
    data() {
        return {
            methods: []
        }
    },
    computed: {
        calcMethods() {
            if (this.methods.length === 0) return []
            const $ele = document.createElement('div')
            return this.methods.map(x => {
                let value, title
                if (x instanceof Object) {
                    value = x.value
                    title = x.title
                } else {
                    value = x
                    title = x
                }

                $ele.style.setProperty(this.property, value)
                const isSupport = $ele.style[this.property] === value

                return {
                    title,
                    value,
                    isSupport
                }
            })
        }
    },
    mounted() {
        this.methods = this.value
    }
}
</script>

<style lang="stylus" scoped>
.image-render-cmpt {
    display flex
    flex-wrap wrap
}
.container {
    display flex;
    box-sizing: border-box;
    margin-top 1rem
    margin-right: 1rem;
    width: 200px;
    height: 200px;
    border: solid 2px;
    cursor: pointer;
    overflow: hidden;
    text-align center;
    // transform: rotate(-5deg) translateZ(0);

    .title {
        position: absolute;
        padding: 0 1em 3px 1em;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #fafafa;
        background: rgba(0,0,0,0.5);
        z-index: 1;
    }
}
.scale {
    img {
        width: 200px;
        height: 213px;
        transform: scale(1) translateZ(0);
        transform-origin: 60% 55%;
        transition: .5s;

        &:hover {
            transform: scale(8) translateZ(0);
        }
    }
}
.enlarge-and-shrink {
    padding-top: 1rem;

    div:nth-child(2) {
        img {
            transform: scale(100) scale(0.01) translateZ(0)
        }
    }

    .container {
        margin: 0;
        width: 100%;
        height: auto;

        img {
            width: 100%;
            height: auto;
        }
    }
}
</style>
