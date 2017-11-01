import React from "react";
import { renderRoutes } from "react-router-config";

import Header from "./components/Header";
import Footer from "./components/Footer";

//import styles from "./Home.scss";

const Home = ({ route }) => {
  return (
    <div className="home">
      <Header />
      <div className="main">{renderRoutes(route.routes)}</div>
      <Footer />
    </div>
  );
};

const component = Home;
export default { component };
