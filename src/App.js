import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FrontPage from "./components/test";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import AddSummary from "./components/AddSummary.js";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" exact component={FrontPage} />
          <Route path="/summaries/add" exact component={AddSummary} />
        </Router>
      </div>
    );
  }
}
