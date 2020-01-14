const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    // baseUrl: "/",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    host: "localhost",
    port: 8081
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      };
    }
  },
  productionSourceMap: false
};
