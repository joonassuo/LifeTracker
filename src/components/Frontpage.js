import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Frontpage.css';
import Navbar from './navbar.component.js';
import Menu from './menu.component.js'

export default class FrontPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showHamburger: false
    }

    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  toggleHamburger = (event) => {
    event.preventDefault();
    this.setState({
      showHamburger: !this.state.showHamburger
    })
  }

  render() {
    return (
      <div>
        <div className="app">
          <div className="navbar">
            <Navbar toggle={this.toggleHamburger}/>
          </div>
          {
            this.state.showHamburger ?
            (
              <div className="menu">
                <Menu />
              </div>
            ) : ( null )
          }
        </div>
      </div>
    ) 
  }
}