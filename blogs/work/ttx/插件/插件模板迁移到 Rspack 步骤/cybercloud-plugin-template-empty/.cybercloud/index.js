import "./bootstrap";

import { createApp } from "vue";
import router from "@router";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import CybercloudUI from "@cybercloud/ui";

if (process.env.NODE_ENV !== "production") {
  import("element-plus/dist/index.css");
  import("@cybercloud/ui/lib/styles/index.css");
}

import components from "@/components";
import { globalComponentInstall } from "../src/utils/components";

const app = createApp(App);

app.use(ElementPlus).use(CybercloudUI);

app.use({
  install(app) {
    globalComponentInstall(app);
  },
});

app.use(router).mount("#app");
