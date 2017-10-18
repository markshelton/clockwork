import React, { Component } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import styles from "./App.scss";

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <div className="content">
          <Header />
          <Main />
        </div>
        <Footer />
      </div>
    );
  };
}

export default App;
