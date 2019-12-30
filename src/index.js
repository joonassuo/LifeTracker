import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FrontPage from "./components/Frontpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddSummary from "./components/AddSummary.jsx";
import History from "./components/History.jsx";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" exact component={FrontPage} />
      <Route path="/summaries/add" exact component={AddSummary} />
      <Route path="/history/home" exact component={History} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
