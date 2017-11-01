// Startup point for the rendering server application
// Only runs on the server

import "babel-polyfill";
import dotenv from "dotenv";
import express from "express";
import { matchRoutes } from "react-router-config";

import routes from "./state/routes";
import render from "./utils/server/render";
import createStore from "./utils/server/store";

dotenv.config({ path: "../.env" });
const { APP_PORT } = process.env;

const app = express();

app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore(req);
  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, req) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });
  Promise.all(promises).then(() => {
    const { content, context } = render(req, store);
    if (context.url) return res.redirect(301, context.url);
    if (context.notFound) res.status(404);
    res.send(content);
  });
});

app.listen(APP_PORT, console.log(`APP: Listening on Port ${APP_PORT}`));
