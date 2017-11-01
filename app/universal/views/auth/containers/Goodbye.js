import React, { Component } from "react";

class Goodbye extends Component {
  render = () => {
    return (
      <div>
        <div className="title">Goodbye</div>
        <div className="message">Sorry to see you go...</div>
      </div>
    );
  };
}

const component = Goodbye;
export default { component };
