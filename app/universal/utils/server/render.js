import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript"; // prevents XSS attacks
import { Helmet } from "react-helmet";

import routes from "../../state/routes";

export default (req, store) => {
  const css = new Set(); // CSS for all rendered React components
  const context = {
    insertCss: (...styles) => styles.forEach(style => css.add(style._getCss()))
  };
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  );
  const state = serialize(store.getState());
  const helmet = Helmet.renderStatic();
  const html = `
    <!DOCTYPE html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <style type="text/css">${[...css].join("")}</style>        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE= ${state};</script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
  return { html, context };
};
