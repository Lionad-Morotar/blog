<template>
    <div class="container">
        <div class="circle" v-for="item in 72"></div>
        <div class="shadows"></div>
        <div class="head">
            <div class="face">
                <div class="mouth"></div>
                <div class="eye-group">
                    <div class="eye eye-left"></div>
                    <div class="eye eye-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
/** 三角函数 @see http://jimyuan.github.io/blog/2015/02/12/trigonometry-in-sass.html */

fact(number)
    value = 1
    if number > 0
        for i in (1..number)
            value = value * i
    value

pow(number, exp)
    value = 1
    if exp > 0
        for i in (1..exp)
            value = value * number
    else if exp < 0
        for $i in (1..(-1 * exp))
            value = value / number
    value

rad(angle)
    unitless = angle / (angle * 0 + 1)
    unitless = unitless / 180 * pi()
    unitless

pi()
    3.14159265359

sin(angle)
    sin = 0
    angle = rad(angle)
    for i in (0..10)
        sin = sin + pow(-1, i) * pow(angle, (2 * i + 1)) / fact(2 * i + 1)
    sin

cos(angle)
    cos = 0;
    angle = rad(angle);
    for i in (0..10)
        cos = cos + pow(-1, i) * pow(angle, 2 * i) / fact(2 * i)
    cos

/*********************** 笑脸 */

container-height = 500

.container {
    position: relative;
    height: container-height px;
    overflow: hidden;
    background: #feee9d;
}
.container {
    * {
        position: absolute;
    }
    *:not(.circle):before,
    *:not(.circle):after {
        content: '';
        position: absolute;
    }

    face-width = 300;
    circle-width = container-height;

    /** 监听器代码 */

    .circle {
        position: absolute;
        width: 30px;
        height: circle-width px;
        // &:hover {
        //     background: red;
        // }
    }
    part = 72;
    part-degree = 360 / part;
    for i in (1..part) {
        angle = (i / part) * 2 * 3.1415926;
        x = cos(angle) * face-width / 2 - 5 + 500;
        y = sin(angle) * face-width / 2;
        .circle:nth-child({i}) {
            left: x px;
            top: y px;
            transform: rotate((90 + i * part-degree) deg);
            &:hover ~ .head {
                // 除 50 的话会出现诡异的小数点问题，暂时没想到解决方法，先以 49 避免问题。
                ty = sin(angle) * face-width / 49;
                tx = cos(angle) * face-width / 49;
                left: 'calc(50% - %spx)' % tx;
                top: 'calc(50% - %spx)' % ty;
                .eye {
                    &::after {
                        background-position: 100% 50%;
                        transform: rotate((0 + i * part-degree) deg);
                    }
                }
            }
        }
    }

    /** 样式代码  */

    .shadows,
    .head {
        border-radius: 50%;
        width: face-width px;
        height: face-width px;
        transform: translate(-50%, -50%);
        top: calc(50%);
        left: calc(50%);
        cursor: pointer;
    }
    .shadows {
        background-color: darken(#fbd671, 20%);
    }
    .head {
        background-color: #fbd671;
    }

    .face {
        width: 150px;
        height: 170px;
        top: 75px;
        left: 75px;
    }

    .mouth {
        width: 100%;
        height: 70px;
        bottom: 0;
        background-color: #20184e;
        border: 5px solid #20184e;
        border-radius: 150px 150px 10px 10px;
        overflow: hidden;
        &::after {
            background-color: #f15962;
            width: 100px;
            height: 60px;
            left: 20px;
            top: 40px;
            border-radius: 50%;
        }
    }

    .eye-group {
        top: 10px;
        width: 150px;
        height: 50px;
        .eye {
            width: 40px;
            height: 40px;
            background-color: #20184e;
            border-radius: 50%;
            border: 5px solid #20184e;
            &::after {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: radial-gradient(#fbd671 68%, #20184e 68%);
                background-size: 10px 10px;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                transition: 0.1s;
            }
            &.eye-left {
                left: 15px;
            }
            &.eye-right {
                right: 15px;
            }
        }
    }
}
</style>
