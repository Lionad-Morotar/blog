const fs = require("fs");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const htmlPlugin = require("@rspack/plugin-html");

const alias = require("./alias");
const env = require("./env");
const host = require("./host");
const manifest = require("../manifest.json");
const dialogs = (manifest.dialogs || []).filter((i) => !i.disabled);

const genCode = (i) => {
  return `
    import { createApp } from 'vue'
    import App from '${i.component}/index.vue'
    import entry from '${i.component}/index.${i.typescript ? "ts" : "js"}'
    const renderNodeId = '#expose-dialogs-root'
    const app = createApp(App)
    if(entry.created) {
      entry.created(app)
    }
    app.mount(renderNodeId)
    if(entry.mounted) {
       entry.mounted(app,renderNodeId)
    }
    `;
};

const exists = fs.existsSync(path.resolve(__dirname, "../expose/dialogs"));

if (exists) fs.rmSync(path.resolve(__dirname, "../expose/dialogs"), { recursive: true });

dialogs.forEach((dialog) => {
  const code = genCode(dialog);
  const filePath = path.resolve(__dirname, "../expose/dialogs");
  const filename = dialog.code + ".js";
  fs.mkdirSync(filePath, { recursive: true });
  const fullPath = path.join(filePath, filename);
  fs.writeFileSync(fullPath, code);
});

const entries = {};
dialogs.forEach((dialog) => {
  entries[dialog.code] = path.resolve(__dirname, "../expose/dialogs/" + dialog.code + `.js`);
});

const genConfig = (dialog) => {
  const { presetEnv, define, provide } = env();

  return {
    builtins: {
      presetEnv,
      define,
      provide,
    },
    target: ["web", "es2015"],
    devtool: false,
    entry: {
      index: entries[dialog.code],
    },
    externalsType: "window",
    externals: host.provide,
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "../../dist/expose/dialogs/" + dialog.code),
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
    plugins: [
      new VueLoaderPlugin(),
      new htmlPlugin({
        template: path.resolve(__dirname, "../expose/dialog.template.ejs"),
        filename: (entryName) => {
          return `index.html`;
        },
      }),
    ],
  };
};
const runConfigs = dialogs.map((i) => {
  return genConfig(i);
});

module.exports = Promise.all(
  runConfigs.map((task) => {
    return Promise.resolve(task);
  })
);

runConfigs.parallelism = 3;
