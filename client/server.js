require("dotenv").config({ path: "../.env" });
const express = require("express");
const path = require("path");

const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const clientPort = process.env.CLIENT_PORT || 3050;

if (nodeEnv !== "production") {
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config.js");
  const history = require("connect-history-api-fallback");
  app.use(history());
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

app.listen(clientPort);
console.log("Client Listening on:", clientPort);

module.exports = { nodeEnv, clientPort };
