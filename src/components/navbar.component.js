import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="hamburger-icon">
                    <img 
                        src="/menu.png" 
                        alt="hamburger" 
                        onClick={this.props.toggle}
                    />
                </div>
                <div className="logo">
                    <img src="/like.png" alt="logo"/>
                </div>
            </div>
        )
    }
}