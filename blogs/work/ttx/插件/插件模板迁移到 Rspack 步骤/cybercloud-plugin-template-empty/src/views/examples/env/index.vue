<template>
  <div>
    <div class="example-item">
      <h2>使用 cyber 对象</h2>
      <c-button @click="handlers.fetch">发送请求</c-button>
    </div>
    <div class="example-item">
      <h3>判断环境</h3>
      <div>是否在宿主环境中： {{ isMicro ? "是" : "否" }} , 环境信息： {{ cyber.env }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cyber from "@cyber";

const fetch = () => {
  cyber
    .request({ url: "/api/user/info" })
    .then((response) => {
      console.log(response);
    })
    .catch(() => alert("接口请求失败"));
};

const handlers = {
  fetch,
};
const { isMicro } = cyber;
</script>

<style lang="less">
.example-item {
  margin-bottom: 30px;
}
</style>
