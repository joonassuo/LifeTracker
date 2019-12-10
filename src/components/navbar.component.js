import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="hamburger-icon">
          <img src="/menu.png" alt="hamburger" onClick={this.props.toggle} />
        </div>
        <div className="logo">PLCHLDR</div>
      </div>
    );
  }
}
