import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <ul className="menu-ul">
                    <li>Stats</li>
                    <li>History</li>
                    <li>Profile</li>
                </ul>
            </div>
        )
    }
}