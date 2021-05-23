<template>
    <Compare>
        <div slot="left" class="left-pic">
            <div class="title">glossiness 0.5，Fresnel ON</div>
            <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523161810.png">
        </div>
        <div slot="right" class="right-pic">
            <div class="title">glossiness 0.5，Fresnel OFF</div>
            <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523161929.png">
        </div>
    </Compare>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.left-pic,
.right-pic {
    width: 100%;
    height: auto;
}
</style>