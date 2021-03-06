import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Frontpage.css";
import Menu from "./menu.component.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ToggleMenu = props => {
	if (!props.show) {
		return null;
	}
	return (
		<div className="menu">
			<Menu />
		</div>
	);
};

const FrontPage = () => {
	const [showHamburger, setHamburger] = useState(false);
	const [username, setUsername] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const id = useSelector(state => state.userId);

	useEffect(() => {
		axios
			.get("/users")
			.then(res => {
				const d = res.data.find(e => e._id === id);
				setUsername(d.username);
				setIsLoaded(true);
			})
			.catch(err => console.log(err));
	}, [id]);

	return (
		<div>
			<div className="app">
				<div className="navbar">
					<div className="navbar-container">
						<div className="hamburger-icon">
							<img
								src="/menu.png"
								alt="hamburger"
								onClick={() => setHamburger(!showHamburger)}
							/>
						</div>
						<div className="logo">PLCHLDR</div>
					</div>
				</div>
				<ToggleMenu show={showHamburger} />
				{isLoaded ? (
					<div className="homescreen-grid">
						<div className="welcome">WELCOME</div>
						<div className="name">{username}</div>
						<div className="add-summary">add summary</div>
						<Link className="button-container" to="/summaries/add">
							<img
								src="/add.png"
								alt="plus-sign"
								className="add-btn"
							/>
						</Link>
					</div>
				) : (
					<div className="loader">
						<Loader
							type="BallTriangle"
							color="rgba(148, 187, 233, 1)"
							height={80}
							width={80}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default FrontPage;
