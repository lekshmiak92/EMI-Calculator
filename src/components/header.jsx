import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="headerWrap">
        <h1 className="appName">EMI CALCULATOR</h1>
      </div>
    );
  }
}

export default Header;
