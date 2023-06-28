import ElementPlus from "element-plus";
import CybercloudUI from "@cybercloud/ui";
// @ts-ignore
import { globalComponentInstall } from "../../utils/components";

if (process.env.NODE_ENV !== "production") {
  import("element-plus/dist/index.css");
  import("@cybercloud/ui/lib/styles/index.css");
}

export default {
  created(app) {
    app.use(CybercloudUI).use(ElementPlus);
    globalComponentInstall(app);
  },

  mounted(app, nodeID) {
    console.log(app, nodeID);
  },
};
