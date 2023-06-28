const isProd = process.env.NODE_ENV !== "development";
export default {
  title: "插件模板",
  fetch: {
    baseURL: isProd ? "/" : CYBER_ENV.REQUEST_BASEURL,
    timeout: CYBER_ENV.REQUEST_TIMEOUT,
    headers: CYBER_ENV.REQUEST_HEADERS,
  },
};
