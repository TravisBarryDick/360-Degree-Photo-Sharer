const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    viewer: "./src/viewer/viewer.ts",
    controller: "./src/controller/controller.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/viewer/viewer.html",
      chunks: ["viewer"],
      filename: "viewer.html",
      scriptLoading: "blocking",
      inject: "head",
      publicPath: "/",
    }),
    new HtmlWebpackPlugin({
      template: "./src/controller/controller.html",
      chunks: ["controller"],
      filename: "controller.html",
      publicPath: "/",
    }),
  ],
};
