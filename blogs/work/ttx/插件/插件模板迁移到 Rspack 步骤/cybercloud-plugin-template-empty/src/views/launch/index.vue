<template>
  <div class="launch-page">
    <select style="margin-right: 20px" v-model="state.val">
      <option value="rep1">仓库1</option>
      <option value="rep2">仓库2</option>
      <option value="rep3">仓库3</option>
    </select>
    <button @click="submit">选择</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import cyber from "@cyber";

const state = reactive({
  val: "rep1",
});
const submit = () => {
  cyber.dispatchs.dispatchLanuchFinish(true, "选择成功");
};
</script>
<style>
.launch-page {
  padding-top: 20vh;
  display: flex;
  justify-content: center;
}
</style>
