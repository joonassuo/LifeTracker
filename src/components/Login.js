import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="login-screen">
                    <div className="grid-container">
                        <div className="logo-container fullwidth">
                            <img src="/logo.png" alt="" id="logo"/>
                        </div>
                        <div className="username-container fullwidth">
                            <input id="username" type="text" placeholder="username"/>
                        </div>
                        <div className="password-container">
                            <input id="password" type="password" placeholder="password"/>
                        </div>
                        <div className="login-button-container fullwidth">
                            <button id="login-button">
                                LOGIN
                            </button>
                        </div>
                        <div className="text-container">
                            sign-up?<br/>forgot password?
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}