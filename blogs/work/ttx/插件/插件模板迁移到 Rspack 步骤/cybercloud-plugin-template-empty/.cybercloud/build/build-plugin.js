const path = require("path");
const htmlPlugin = require("@rspack/plugin-html");
const { VueLoaderPlugin } = require("vue-loader");

const alias = require("./alias");
const env = require("./env");
const host = require("./host");
const devServer = require("./devServer");
const utils = require("./utils");
const htmlPath = path.resolve(__dirname, "../index.html");
const entryPath = path.resolve(__dirname, "../index.js");

module.exports = function (mode) {
  const isProd = mode === "production";

  const { presetEnv, define, provide } = env();
  const externals = utils.isProd() ? host.provide : {};

  return {
    target: ["web", "es2015"],
    builtins: {
      define,
      provide,
      presetEnv,
      copy: {
        patterns: [
          {
            from: path.resolve(__dirname, "../manifest.json"),
          },
        ],
      },
    },
    entry: entryPath,
    output: isProd
      ? {
          clean: true,
          publicPath: "./",
          filename: "[name].[contenthash:8].bundle.js",
          assetModuleFilename: "[name].[contenthash:8].[ext]",
        }
      : {
          clean: true,
          publicPath: "/",
        },
    devtool: isProd ? false : "cheap-source-map",
    externalsType: "window",
    externals,
    resolve: {
      alias: alias(),
    },
    plugins: [
      new VueLoaderPlugin(),
      new htmlPlugin({
        title: "插件模板",
        template: htmlPath,
      }),
    ],
    devServer: devServer(),
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
  };
};
