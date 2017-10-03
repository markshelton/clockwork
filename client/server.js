const express = require("express");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config.js");
  const history = require('connect-history-api-fallback');  
  app.use(history());
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

app.listen(3050, (err) => {
    if(err) return console.error(err);
    console.log("Listening on Port 3050");
  }
);
