import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { updateId } from "../actions";
import "./css/Login.css";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usersArray, setUsersArray] = useState([]);
	const [success, setSuccess] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("/users")
			.then(res => {
				setUsersArray(res.data);
			})
			.catch(error => {
				console.log(error);
			});
	});

	const onLogin = e => {
		e.preventDefault();
		let msg = document.getElementById("error-message-l");
		let usrnm = document.getElementById("username");
		let pswrd = document.getElementById("password");
		const user = usersArray.find(user => user.username === username);
		if (!user) {
			usrnm.value = "";
			pswrd.value = "";
			msg.innerHTML = "Wrong username or password";
		} else {
			if (password === user.password) {
				dispatch(updateId(user._id));
				setSuccess(true);
			} else {
				pswrd.value = "";
				usrnm.value = "";
				msg.innerHTML = "Wrong username or password";
			}
		}
	};

	const onChangeUsername = e => {
		e.preventDefault();
		setUsername(e.target.value);
	};

	const onChangePassword = e => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	return success ? (
		<Redirect to="/home" />
	) : (
		<div>
			<div className="login-screen">
				<div className="grid-container">
					<div className="logo-container fullwidth">
						<img src="/logo.png" alt="" id="logo" />
					</div>
					<div className="username-container fullwidth">
						<input
							id="username"
							type="text"
							placeholder="Username"
							onChange={onChangeUsername}
						/>
					</div>
					<div className="password-container">
						<input
							id="password"
							type="password"
							placeholder="Password"
							onChange={onChangePassword}
						/>
					</div>
					<div id="error-message-l" className="grid-center"></div>
					<div className="login-button-container fullwidth">
						<Link to="/home">
							<button id="login-button" onClick={onLogin}>
								LOGIN
							</button>
						</Link>
					</div>
					<div className="text-container">
						<Link to="/signup">Don 't have an account?</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
