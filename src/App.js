import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FrontPage from "./components/Frontpage";
import Login from "./components/test";
import Signup from "./components/Signup";
import AddSummary from "./components/AddSummary";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" exact component={FrontPage} />
      <Route path="/summaries/add" exact component={AddSummary} />
    </Router>
  );
};

export default App;
