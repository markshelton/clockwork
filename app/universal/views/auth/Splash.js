import React from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

//import styles from "./Splash.scss";

const Splash = ({ route }) => {
  return (
    <div className="splash">
      <div className="filter">
        <div className="main">
          <div className="brand">
            <Link to="/">Clockwork</Link>
          </div>
          <div className="title">A Smarter Calendar</div>
          {renderRoutes(route.routes)}
        </div>
      </div>
    </div>
  );
};

const component = Splash;
export default { component };
