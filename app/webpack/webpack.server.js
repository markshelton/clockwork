const path = require("path");
const merge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");

const baseConfig = require("./webpack.base.js");

const config = {
  target: "node", // Building bundle for nodeJS, rather than browser
  entry: path.resolve(__dirname, "..", "universal/server.js"), // Root file of our server application
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "build")
  },
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
