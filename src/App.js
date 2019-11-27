import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FrontPage from './components/Frontpage.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedUserId: "",
      isLogged: false
    }

    this.updateUserId = this.updateUserId.bind(this);
  }

  updateUserId = (userId) => {
    console.log('userId: ' + userId);
    this.setState({
      loggedUserId: userId,
      isLogged: true
    });
    console.log('state: ' + this.state.isLogged);
  }

  render() {
    return (
      <div>
      <Router>
        <Route path="/" exact component={() =>
          <Login 
              update={this.updateUserId}
          />
        }/>
        <Route path="/signup" component={Signup}/>
        <Route path="/home" exact component={() => 
          <FrontPage 
            user={this.state.loggedUserId}
          />
        }/>
      </Router>
      </div>
    )
  }
}