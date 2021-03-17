"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "医疗文本标注系统";

const port = process.env.port || process.env.npm_config_port || 9528;

module.exports = {
  publicPath: process.env.NODE_ENV !== "production" ? "/" : "/annotate/",
  // publicPath:
  //     process.env.NODE_ENV !== "production"
  //         ? "/"
  //         : "/annotate-system/frontend/dist/",

  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require("./mock/mock-server.js"),
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // 它可以提高第一个屏幕的速度，建议打开预加载
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/,
          /runtime\..*\.js$/,
        ],
        include: "initial",
      },
    ]);

    //当页面很多时，将导致太多毫无意义的请求
    config.plugins.delete("prefetch");

    // 设置svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime`必须与runtimeChunk名称相同。默认是“运行时”
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // 仅打包最初依赖的第三方
          },
          elementUI: {
            name: "chunk-elementUI", // 将elementUI拆分为一个包
            priority: 20, // 重量需要大于libs和app，否则将被打包到libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // 为了适应cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // 可以自定义您的规则
            minChunks: 3, //  最小共同数
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};
