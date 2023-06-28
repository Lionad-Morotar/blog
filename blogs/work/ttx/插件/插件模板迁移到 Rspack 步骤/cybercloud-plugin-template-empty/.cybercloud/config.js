const mode = process.env.NODE_ENV;

const headers = {};

if (mode === "development") {
  // 当前应用 ID
  headers.contextId = "APPLICATION_ID";
  // 调试的 jwt token
  headers.jwt = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJjeWJlcmNsb3VkX2Rldl93ZWJfMTA1Iiwicm5TdHIiOiJGVVJ3M1gxeEpsV0R6QmRVTThFcVFlbmg4Wk1sdlk5dCIsImtleSI6ImN5YmVyY2xvdWQiLCJ0ZW5hbnRDb2RlIjoiY3liZXJjbG91ZCJ9.43fEgJiMJAMHEgZaCCwwqcgaD8Wx0E-FioNu7HBMWZQ`;
}

module.exports = {
  // 非生产模式接口的 baseURL , 生产模式固定使用 "/"
  REQUEST_BASEURL: "/",
  REQUEST_TIMEOUT: 15000,
  // 开发环境的代理环境
  PROXY_RULE: {
    "/api": {
      target: "http://www.baidu.com/api",
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    },
  },
  // 非生产环境下的 headers
  REQUEST_HEADERS: headers,
};
