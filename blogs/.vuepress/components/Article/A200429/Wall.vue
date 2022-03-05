<template>
    <div class="container">
        <p class="info">盒子外部</p>
        <div class="boxes">
            <div class="box" v-for="item in 5">
                <div class="box-inner">
                    <div class="left" />
                    <div class="right" />
                    <p class="des"></p>
                </div>
            </div>
            <!-- <div class="box-sec" v-for="item in 5"></div> -->
        </div>
        <p class="info">盒子内部</p>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
w = 50;
count = 5;

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .info {
        margin: 0;
        font-size: 12px;
    }
    .des {
        position: absolute;
        left: 50%;
        bottom: 1em;
        margin: 0;
        width: count * w px;
        font-size: 14px;
        transform: translateX(-50%);
        text-align: center;
        z-index: 99;
        pointer-events: none;
    }

    .boxes {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .box {
        position: relative;
        height: 2 * w px;
        width: w px;
        background: rgba(248, 185, 14, 1);

        &:hover {
            outline: solid white 1px;
            z-index: 1;

            .box-inner {
                // outline: solid white 1px;
                z-index: 1;

                .left,
                .right {
                    display: block;
                    // outline: solid white 1px;
                    // z-index: 1;
                }
            }
        }

        .box-inner {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: count * w px;
            height: w px;
            background: rgba(251, 214, 113, 1);
            transform: translateX(-50%);

            .left,
            .right {
                display: none;
                width: (count - 3) * w px;
                height: 2 * w px;
                position: absolute;
                left: 0;
                top: -w px;

                &:hover {
                    outline: solid white 1px;
                }
            }
            .right {
                left: unset;
                right: 0;
            }
        }
    }

    for i in (1..count) {
        .box:nth-child({i}):hover .des::before {
            content: i;
        }
        .box:nth-child({i}) {
            .box-inner:hover .des::after {
                content: '90deg';
            }
            .box-inner .left:hover ~ .des::after {
                content: '130deg';
            }
            .box-inner .right:hover ~ .des::after {
                content: '45deg';
            }
        }
    }
}
</style>
