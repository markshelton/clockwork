const path = require("path");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const baseConfig = require("./webpack.base.js");

const config = {
  entry: path.resolve(__dirname, "..", "universal/client.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "public")
  }
};

module.exports = merge(baseConfig, config);
