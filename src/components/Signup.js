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

        this.state = {
            email: '',
            username: '',
            password: '',
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

    onChangeCreationDate = (date) => {
        date.preventDefault();
        this.setState({
            creationDate: date
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            creationDate: this.state.creationDate
        }
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data)); 
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
                            <input id="s-confirm" type="password" placeholder="Confirm Password"/>
                        </div>
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