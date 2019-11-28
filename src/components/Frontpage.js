import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Frontpage.css";
import Navbar from "./navbar.component.js";
import Menu from "./menu.component.js";

export default class FrontPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHamburger: false,
      userId: "",
      username: ""
    };

    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  componentDidMount() {
    let user;
    axios
      .get("http://localhost:5000/usersession")
      .then(res => {
        user = res.data.slice(-1)[0];
        this.setState({
          userId: user.userId,
          username: user.username
        });
      })
      .catch(err => {
        console.log("Error : " + err);
      });
  }

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
