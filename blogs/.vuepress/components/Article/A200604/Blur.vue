<template>
    <div ref="con" class="con">
        <svg width="0" height="0">
            <defs>
                <filter id="Sharpen">
                    <feConvolveMatrix
                        edgeMode="duplicate"
                        preserveAlpha="true"
                        targetY="1"
                        targetX="1"
                        divisor="3"
                        bias="0.033444816053512127"
                        order="3 3"
                        kernelMatrix="0 1 0 1 -4 1 0 1 0"
                        in="SourceGraphic"
                    />
                    <feBlend result="WithEdge" mode="lighten" in="SourceGraphic" in2="Edge" />
                </filter>
            </defs>
        </svg>
        <Compare>
            <div slot="left" class="repeat-con">
                <div class="title">No Blur</div>
            </div>
            <div slot="right" class="repeat-con antialiasing">
                <div class="title">SVG Custom Filter</div>
            </div>
        </Compare>
        <br />
        <Compare>
            <div slot="left" class="circle-con">
                <div class="title">No Blur</div>
            </div>
            <div slot="right" class="circle-con antialiasing">
                <div class="title">CSS Filter Blur(.7px) + CSS Filter Constract(1.1)</div>
            </div>
        </Compare>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.con {
    --deg: 175deg;
    --light: rgba(228, 192, 96, 1);
    --dark: rgba(190, 81, 40, 1);

    .deg {
        margin: 1rem auto;
        text-align: center;
    }
    button {
        margin-left: 1em;
    }
    .repeat-con {
        c1 = #cd3f4f;
        c2 = #e6a964;
        position: relative;
        height: 300px;
        background-image: repeating-radial-gradient(circle at 0% 50%, c1 0, c2 50px);

        &.antialiasing {
            filter: url(#Sharpen) url(#Edge);
        }
    }

    .circle-con {
        c1 = #cd3f4f;
        c2 = #e6a964;
        position: relative;
        height: 300px;
        background-image: repeating-radial-gradient(circle at 0% 50%, c1 0, c2 50px);

        &.antialiasing {
            filter: blur(0.7px) contrast(1.1);
        }
    }
}
</style>
