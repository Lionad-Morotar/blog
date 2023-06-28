const path = require("path");

const alias = {
  // 后向兼容，弹窗编译过程的中间产物
  "/src": path.resolve(__dirname, "../../src"),

  /** .cybercloud 代码 */

  "@cybercloud-plugin": path.resolve(__dirname, ".."),
  // 后向兼容，某些插件有过这种改发
  "@cybercloud-internal": path.resolve(__dirname, ".."),
  "@cyber": "@cybercloud-plugin/lib/index.js",
  "@router": "@cybercloud-plugin/router/index.js",
  "@store": "@cybercloud-plugin/store/index.js",

  /** 插件项目代码 */

  "@": path.resolve(__dirname, "../../src"),
};

module.exports = function getAlias() {
  return alias;
};
