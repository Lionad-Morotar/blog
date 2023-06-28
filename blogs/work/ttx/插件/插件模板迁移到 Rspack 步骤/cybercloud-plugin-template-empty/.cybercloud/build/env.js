const path = require("path");

const dotenv = require("dotenv");
const dot = dotenv.config({ path: path.resolve(__dirname, "../meta") });
const EnvConfig = require("../config.js");

const toDefineEnvConfig = { ...dot.parsed, ...EnvConfig };

module.exports = () => {
  return {
    presetEnv: {
      targets: ["Chrome >= 89"],
    },
    define: {
      "process.env.PACK_TIME": JSON.stringify(new Date().toLocaleString()),
      CYBER_ENV: JSON.stringify(toDefineEnvConfig),
      "CYBER_ENV.REQUEST_TIMEOUT": JSON.stringify(toDefineEnvConfig.REQUEST_TIMEOUT),
      "CYBER_ENV.REQUEST_HEADERS": JSON.stringify(toDefineEnvConfig.REQUEST_HEADERS),
    },
    provide: {
      cyber: [path.resolve(__dirname, "../lib"), "default"],
    },
  };
};
