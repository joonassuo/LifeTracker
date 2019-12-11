import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Frontpage.css";
import Menu from "./menu.component.js";
import { useSelector } from "react-redux";

const ToggleMenu = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="menu">
      <Menu />
    </div>
  );
};

const FrontPage = () => {
  const [showHamburger, setHamburger] = useState(false);
  const [userId, setUserId] = useState("");
  const id = useSelector(state => state.userId);

  useEffect(() => {
    setUserId(id);
  }, [id]);

  return (
    <div>
      <div className="app">
        <div className="navbar">
          <div className="navbar-container">
            <div className="hamburger-icon">
              <img
                src="/menu.png"
                alt="hamburger"
                onClick={() => setHamburger(!showHamburger)}
              />
            </div>
            <div className="logo">PLCHLDR</div>
          </div>
        </div>
        <ToggleMenu show={showHamburger} />
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
