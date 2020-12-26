<template>
    <Background 
        :images="images"
        :handleURL="handleURL"
    ><slot /></Background>
</template>

<script>
import Background from './Index'
const images = require('./dataset/my-fav-songs-100th')
export default {
    components: {
        Background
    },
    data() {
        return {
            images,
            handleURL: url => `https://mgear-blog-image.obs.cn-east-3.myhuaweicloud.com/netease/${url}`
        }
    }
}
</script>