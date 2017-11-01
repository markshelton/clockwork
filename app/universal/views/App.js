import React, { Component } from "react";
import { renderRoutes } from "react-router-config";

//import styles from "./App.scss";

const App = ({ route }) => {
  return <div className="app">{renderRoutes(route.routes)}</div>;
};

const component = App;
export default { component };
