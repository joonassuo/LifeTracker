import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import "./Frontpage.css";
//import Navbar from "./navbar.component.js";
import Menu from "./menu.component.js";
import { useSelector } from "react-redux";

const FrontPage = () => {
  const [showHamburger, setHamburger] = useState(false);
  const [userId, setUserId] = useState("");
  const id = useSelector(state => state.userId);

  useEffect(() => {
    console.log(showHamburger);
    setUserId(id);
  }, [id, showHamburger]);

  return (
    <div>
      <div className="app">
        <div className="navbar">
          <div className="navbar-container">
            <div className="hamburger-icon">
              <img
                src="/menu.png"
                alt="hamburger"
                onClick={() => setHamburger(true)}
              />
            </div>
            <div className="logo">PLCHLDR</div>
          </div>
        </div>
        <div>
          {showHamburger} ? (
          <div className="menu">
            <Menu />
          </div>
          ) : null}
        </div>
        <div className="homescreen-grid">
          <div className="welcome">WELCOME</div>
          <div className="name">{userId}</div>
          <div className="add-summary">add summary</div>
          <Link className="button-container" to="/summaries/add">
            <img src="/add.png" alt="plus-sign" className="add-btn" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
