<template>
  <c-config-provider :fetch="cyber.request" :useRouterLink="useLink">
    <div>
      <h3>Welcome to Cyber Plugin App</h3>
      <p>
        <span class="label">插件模板版本：</span>
        <span class="value">{{ pkgJSON.CYBER_PLUGIN_TEMPLATE_VERSION }}</span>
      </p>
    </div>
    <br />
    <router-view />
    <example-tag></example-tag>
  </c-config-provider>
</template>

<script lang="ts" setup>
import { useLink } from "vue-router";
import cyber from "@cyber";
import pkgJSON from "../package.json";

console.info("[debug] process.env.PACK_TIME", process.env.PACK_TIME);
</script>

<style lang="less">
@import "@/styles/common.less";
</style>
