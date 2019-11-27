import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            usersArray: []
        }

        this.onLogin = this.onLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({
                    usersArray: res.data
                })
            })
            .catch((error) => {
                console.log('Error: ' + error);
            })
    }

    onLogin = (e) => {
        e.preventDefault();
        let message = document.getElementById("error-message-l");
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        const test = this.state.usersArray.find(user => user.username === this.state.username);
        if(!test) {
            username.value = "";
            password.value = "";
            message.innerHTML = "Wrong username or password";
        } else {
            if (this.state.password === test.password) {
                window.location = '/home';
            } else {
                password.value = "";
                username.value = "";
                message.innerHTML = "Wrong username or password";
            }
        }
        console.log(test);
    }

    onChangeUsername = (e) => {
        e.preventDefault();
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword = (e) => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="login-screen">
                    <div className="grid-container">
                        <div className="logo-container fullwidth">
                            <img src="/logo.png" alt="" id="logo"/>
                        </div>
                        <div className="username-container fullwidth">
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                onChange={this.onChangeUsername}/>
                        </div>
                        <div className="password-container">
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                onChange={this.onChangePassword}/>
                        </div>
                        <div id="error-message-l" className="grid-center"></div>
                        <div className="login-button-container fullwidth">
                            <button id="login-button" onClick={this.onLogin}>
                                LOGIN
                            </button>
                        </div>
                            <div className="text-container">
                                <Link to='/signup'>
                                    Don't have an account?
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}