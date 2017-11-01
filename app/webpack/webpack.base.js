const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyles = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
  allChunks: true
});

const injectHTML = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "..", "static/index.html")
});

baseConfig = {
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
        test: /\.(sass|scss)$/, // SASS / SCSS Files
        use: extractStyles.extract({
          use: [
            { loader: "css-loader", options: { sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.css$/, // Regular CSS Files
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  plugins: [injectHTML, extractStyles]
};

module.exports = baseConfig;
