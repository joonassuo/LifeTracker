import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateData = this.validateData.bind(this);

        this.state = {
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            creationDate: new Date()
        }
    }

    onChangeEmail = (e) => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
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

    onChangePasswordConfirm = (e) => {
        e.preventDefault();
        this.setState({
            passwordConfirm: e.target.value
        });
    }

    onChangeCreationDate = (date) => {
        date.preventDefault();
        this.setState({
            creationDate: date
        });
    }

    validateData = () => {
        let password = document.getElementById("s-password");
        let confirm = document.getElementById("s-confirm");
        let username = document.getElementById("s-username");
        let errorMessage = document.getElementById("error-message");
        if (this.state.password.length < 6) {
            password.value = '';
            confirm.value = '';
            errorMessage.innerHTML = 'Password should be at least 6 characters';
            return false;
        } else if (this.state.password !== this.state.passwordConfirm) {
            password.value = '';
            confirm.value = '';
            errorMessage.innerHTML = "Passwords don't match";
        } else if (this.state.username.length < 3) {
            username.value = '';
            errorMessage.innerHTML = "Username should be at least 3 characters";
        } else {
            return true;
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.validateData() === true) {
            const newUser = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                creationDate: this.state.creationDate
            }
            console.log(newUser);
            axios.post('http://localhost:5000/users/add', newUser)
                .then(res => console.log(res.data))
                .catch(() => console.log('Error!'));
        }
    }

    render() {
        return (
            <div>
                <div className="signup-screen">
                    <div className="s-grid-container">
                        <div className="s-logo-container fullwidth">
                            <img src="/logo.png" alt="" id="s-logo"/>
                        </div>
                        <div className="s-email-container fullwidth">
                            <input 
                                id="s-email"
                                type="text"
                                placeholder="Email"
                                onChange={this.onChangeEmail}/>
                        </div>
                        <div className="s-username-container fullwidth">
                            <input 
                                id="s-username"
                                type="text"
                                placeholder="Username"
                                onChange={this.onChangeUsername}/>
                        </div>
                        <div className="s-password-container fullwidth">
                            <input
                                id="s-password"
                                type="password"
                                placeholder="Password"
                                onChange={this.onChangePassword}/>
                        </div>
                        <div className="s-confirm-container fullwidth">
                            <input 
                                id="s-confirm"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={this.onChangePasswordConfirm}/>
                        </div>
                        <div id="error-message" className="grid-center"></div>
                        <div className="s-signup-button-container fullwidth"> 
                            <button id="s-signup-button" onClick={this.onSubmit}>
                                SIGNUP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}