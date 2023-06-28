/**
 * 页面路由跳转
 */

export default function routerMixin(Ctor) {
  const defaultAppName = `${Ctor.prototype.CYBER_ENV?.TENANT_CODE}-${Ctor.prototype.CYBER_ENV?.PLUGIN_CODE}`;
  Ctor.prototype.navigateTo = function (route, appName = defaultAppName) {
    if (route && typeof route === "object")
      Ctor.prototype.dispatchs.dispatchRouter(route, appName, "push");
  };

  Ctor.prototype.redirectTo = function (route, appName = defaultAppName) {
    if (route && typeof route === "object") route.appName = appName;
    Ctor.prototype.dispatchs.dispatchRouter(route, appName, "replace");
  };
}
