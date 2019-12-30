import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <ul className="menu-ul">
          <Link to="/history/home">
            <li>History</li>
          </Link>
          <li>Stats</li>
          <li>Profile</li>
        </ul>
      </div>
    );
  }
}
