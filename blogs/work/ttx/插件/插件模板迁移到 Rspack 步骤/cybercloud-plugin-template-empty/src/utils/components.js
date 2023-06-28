import components from "@/components";

/**
 * 安装全局组件
 * @param {*} app
 */
export function globalComponentInstall(app) {
  const entries = components.entries();

  Array.from(entries).forEach((kv) => {
    const compName = kv[0];
    const comp = kv[1];
    app.component(compName, comp);
  });
}
