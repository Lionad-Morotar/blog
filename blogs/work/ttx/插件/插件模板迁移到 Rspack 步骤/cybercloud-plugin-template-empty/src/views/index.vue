<template>
  <div class="plugin-page plugin-page-home">
    <h1>CyberCloud 插件首页</h1>
    <hr />
    <c-router-link to="/examples/buttons">按钮预览页面</c-router-link>
    <hr />
    <c-router-link to="/examples/env">环境工具预览页面</c-router-link>
  </div>
</template>

<script lang="ts" setup>
import cyber from "@cyber";

console.info("[info]", cyber);
</script>

<style scoped></style>
