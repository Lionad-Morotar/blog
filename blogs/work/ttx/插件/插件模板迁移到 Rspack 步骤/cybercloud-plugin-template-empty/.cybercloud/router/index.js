import { createRouter, createWebHistory } from "vue-router";
import routes from "../../src/router/";

const router = createRouter({
  history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || "/"),
  routes,
});

function isCurrentApp(url, appPath) {
  const index = url.indexOf("?");
  if (index === -1) {
    return url.includes(appPath);
  }
  return url.substring(0, index).includes(appPath);
}

if (window.__MICRO_APP_ENVIRONMENT__) {
  const BASE_ROUTE = window.__MICRO_APP_BASE_ROUTE__;

  router.beforeEach(() => {
    if (typeof window.history.state?.current === "string") {
      if (isCurrentApp(window.location.pathname || "", BASE_ROUTE)) {
        window.history.state.current = window.history.state.current.replace(
          new RegExp(BASE_ROUTE, "g"),
          ""
        );
        console.log("[CYBER_APP_ROUTER_BEFOREEACH]: 执行了替换路由", window.history.state.current);
      }
    }
  });

  router.afterEach(() => {
    if (
      typeof window.history.state === "object" &&
      isCurrentApp(window.location.pathname || "", BASE_ROUTE)
    ) {
      if (!window.history.state.current.startsWith(BASE_ROUTE)) {
        window.history.state.current = BASE_ROUTE + (window.history.state.current || "");
        console.log("[CYBER_APP_ROUTER_AFTEREACH]: 执行了替换路由", window.history.state.current);
      }
    }
  });
}

export default router;
