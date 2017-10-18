const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyles = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
  allChunks: true
});

const injectHTML = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "assets/index.html")
});

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/, // JS & JSX Files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-0"],
            sourceMap: true
          }
        }
      },
      {
        test: /\.css$/, // Regular CSS Files
        use: extractStyles.extract({
          use: ["css-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(sass|scss)$/, // SASS / SCSS Files
        use: extractStyles.extract({
          use: [
            { loader: "css-loader", options: { sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [injectHTML, extractStyles]
};
