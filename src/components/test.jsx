import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Frontpage.css";
import Navbar from "./navbar.component.js";
import Menu from "./menu.component.js";
import { useSelector } from "react-redux";

const FrontPage = () => {

    const [showHamburger, setHamburger] = setState(false);
    const [userId, setUserId] = setState("");
    const id = useSelector(state => state.userId);

    useEffect(() => {
        setUserId(id);
    })


  toggleHamburger = event => {
    event.preventDefault();
    this.setState({
      showHamburger: !this.state.showHamburger
    });
  };

  render() {
    return (
      <div>
        <div className="app">
          <div className="navbar">
            <Navbar toggle={this.toggleHamburger} />
          </div>
          <div>
            {this.state.showHamburger ? (
              <div className="menu">
                <Menu />
              </div>
            ) : null}
          </div>
          <div className="homescreen-grid">
            <div className="welcome">WELCOME</div>
            <div className="name">{this.state.username}</div>
            <div className="add-summary">add summary</div>
            <Link className="button-container" to="/summaries/add">
              <img src="/add.png" className="add-btn" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
