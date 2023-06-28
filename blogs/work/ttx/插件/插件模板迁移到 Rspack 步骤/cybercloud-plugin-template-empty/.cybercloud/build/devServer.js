const config = require("../config");
const utils = require("./utils");

module.exports = () => {
  return utils.isDev()
    ? {
        hot: true,
        port: 21799,
        historyApiFallback: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        proxy: config.PROXY_RULE,
      }
    : undefined;
};
