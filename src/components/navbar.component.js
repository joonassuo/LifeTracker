import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar-container">
                <img src="/like.png" alt="logo" className="logo"/>
                <img 
                    src="/hamburger.png" 
                    alt="hamburger" 
                    className="hamburger-icon"
                    onClick={this.props.toggle}
                />
            </div>
        )
    }
}