const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

const alias = require("./alias");
const env = require("./env");
const host = require("./host");
const manifest = require("../manifest.json");

const dialogs = (manifest.dialogs || []).filter((i) => !i.disabled);

const entries = {};
dialogs.forEach((dialog) => {
  entries[dialog.code] = path.resolve(__dirname, "../expose/dialogs/" + dialog.code + `.js`);
});

const genConfig = (dialog) => {
  const entry = dialog.lifecycle || {};
  const { presetEnv, define, provide } = env();

  if (Object.keys(entry).length === 0) return null;

  Object.keys(entry).forEach((key) => {
    entry[key] = entry[key] + `${dialog.typescript ? ".ts" : ".js"}`;
  });

  return {
    builtins: {
      presetEnv,
      define,
      provide,
    },
    target: ["web", "es2015"],
    devtool: false,
    entry,
    externalsType: "window",
    externals: host.provide,
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../../dist/expose/dialogs/" + dialog.code + "/lifecycle"),
      library: {
        name: "_CYBER_PLUGIN_LIFECYCLE_HANDLER",
        type: "umd",
      },
    },
    resolve: {
      alias: alias(),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            experimentalInlineMatchResource: true,
          },
        },
        {
          test: /\.less$/,
          loader: "less-loader",
          type: "css",
        },
        {
          test: /\.s[ca]ss$/,
          use: [
            {
              loader: "sass-loader",
              options: {},
            },
          ],
          type: "css",
        },
        {
          test: /\.styl(us)?$/,
          loader: "stylus-loader",
          type: "css",
        },
        {
          test: /\.(png|jpe?g|gif|webp|ttf)(\?.*)?$/i,
          type: "asset",
        },
        {
          test: /\.svg/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  };
};
module.exports = dialogs
  .map((i) => {
    return genConfig(i);
  })
  .filter((i) => !!i);
