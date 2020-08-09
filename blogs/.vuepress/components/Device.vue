<script>
export default {
    props: {
        type: {
            type: String,
            default: 'note8'
        },
        module: {
            type: Array,
            default: () => ['inner', 'sleep', 'volume', 'camera', 'sensor', 'more-sensors', 'speaker', 'screen']
        }
    },
    render(h, context) {
        return h(
            'div',
            {
                domProps: {
                    className: ['marvel-device', this.type].join(' ')
                }
            },
            [
                ...this.module.map(type => {
                    return h(
                        'div',
                        {
                            domProps: {
                                className: type
                            }
                        },
                        type === 'screen' ? this.$slots.default : []
                    )
                })
            ]
        )
    }
}
</script>
<style scoped lang="stylus">
.marvel-device {
    margin: 0 auto;
    max-width: 100%;

    .screen {
        overflow: hidden scroll;

        &::-webkit-scrollbar {
            width: 0;
        }

        & > * {
            display block;
            width 100%;
        }
    }
}
@media screen and (max-width: 888px) {
    .marvel-device,
    .screen {
        display: contents;

        &::after, &::before {
            content: none;
        }

        .inner,
        .top-bar,
        .sleep,
        .volume,
        .camera,
        .sensor,
        .more-sensors,
        .speaker,
        .home,
        .bottom-bar {
            display: none;
        }
    }
}
</style>
