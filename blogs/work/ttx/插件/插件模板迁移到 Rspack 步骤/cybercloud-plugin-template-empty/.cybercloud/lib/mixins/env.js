// import { RouteMeta } from "./types";
function dispatch(type, data) {
  window?.microApp?.dispatch({
    type,
    data,
  });
}

/**
 * 通知基座跳转路由
 * data描述
 * @param route
 * @param mode
 * @param appName 当
 */
function dispatchRouter(route, appName, mode = "push") {
  dispatch("router", {
    route,
    mode,
    appName,
  });
}

function dispatchRegisteAction(handleKey, handler) {
  dispatch("action-register", {
    appName: window.__MICRO_APP_NAME__,
    handler,
    handleKey,
  });
}

function dispatchCallAction(
  handleKey,
  params,
  options = {
    appName: window.__MICRO_APP_NAME__,
  }
) {
  const { appName } = options;
  return new Promise((res, rej) => {
    dispatch("call", {
      appName,
      callKey: `${appName}:${handleKey}`,
      params,
      end: res,
      error: rej,
    });
  });
}

function dispatchLanuchFinish(success = true, message = "") {
  dispatch("plugin-lanuch-finish", { success, message });
}

// 如果当前是弹框控件, 调用该方法关闭弹框
function dispatchDialogClose() {
  dispatch("close");
}

// 向弹框发出自定义事件
function dispathDialogCustomEvent(eventName, data = null) {
  dispatch(eventName, data);
}

function getDialogProps() {
  return window?.microApp?.getData() || {};
}

export default function install(Ctor) {
  const isMicro = !!window.__MICRO_APP_ENVIRONMENT__;

  const microAppEnvironment = window.__MICRO_APP_ENVIRONMENT__;

  Ctor.prototype.isMicro = isMicro;

  Ctor.prototype.env = { isMicro, baseRoute: window.__MICRO_APP_BASE_ROUTE__, microAppEnvironment };

  Ctor.prototype.dispatch = dispatch;

  Ctor.prototype.dispatchs = {
    dispatchRouter,
    dispatchRegisteAction,
    dispatchCallAction,
    dispatchLanuchFinish,
    dispatchDialogClose,
    dispathDialogCustomEvent,
  };

  Ctor.prototype.getDialogProps = getDialogProps;

  Ctor.prototype.CYBER_ENV = CYBER_ENV;

  Ctor.prototype.mode = process.env.NODE_ENV;

  if (isMicro) {
    if (window.__MICRO_APP_PUBLIC_PATH__ != null) {
      __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__;
    }
  }
}
