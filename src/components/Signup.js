import React, { Component } from 'react';
import './Signup.css';

export default class Signup extends Component {
    render() {
        return (
            <div>
                <div className="signup-screen">
                    <div className="s-grid-container">
                        <div className="s-logo-container fullwidth">
                            <img src="/logo.png" alt="" id="s-logo"/>
                        </div>
                        <div className="s-email-container fullwidth">
                            <input id="s-email" type="text" placeholder="Email"/>
                        </div>
                        <div className="s-username-container fullwidth">
                            <input id="s-username" type="text" placeholder="Username"/>
                        </div>
                        <div className="s-password-container fullwidth">
                            <input id="s-password" type="password" placeholder="Password"/>
                        </div>
                        <div className="s-signup-button-container fullwidth">
                            <button id="s-signup-button">
                                SIGNUP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}