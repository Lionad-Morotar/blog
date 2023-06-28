<template>
  <div>
    createTest
    <button @click="click">Button</button>
  </div>
</template>

<script lang="ts" setup>
import cyber from "@cyber";

const click = () => {
  console.info("[info] 点击了按钮");
  cyber.dispatchs.dispatchDialogClose();
};
</script>
<style lang="less">
div {
  color: Red;
}
button {
  color: red;
}
</style>
