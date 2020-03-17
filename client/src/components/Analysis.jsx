import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./css/Analysis.css";

const Analysis = () => {
	const [wakeUp_c, setWakeUp_c] = useState(0);
	const [goToBed_c, setGoToBed_c] = useState(0);
	const [nicotine_c, setNicotine_c] = useState(0);
	const [excersice_c, setExcersice_c] = useState(0);
	const [meditation_c, setMeditation_c] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const id = useSelector(state => state.userId);

	const getData = data => {
		var res = {
			wake_up: [],
			hit_the_sack: [],
			nicotine: [],
			excersice: [],
			meditation: [],
			mood: []
		};

		for (let i = 0; i < data.length; i++) {
			res.wake_up.push(data[i].wake_up);
			res.hit_the_sack.push(data[i].hit_the_sack);
			res.nicotine.push(data[i].nicotine);
			res.excersice.push(data[i].excersice);
			res.meditation.push(data[i].meditation);
			res.mood.push(data[i].mood);
		}
		return res;
	};

	const correlation = (X, Y) => {
		let sum_X = 0;
		let sum_Y = 0;
		let sum_XY = 0;
		let squaresum_X = 0;
		let squaresum_Y = 0;
		let n = X.length;

		for (let i = 0; i < n; i++) {
			sum_X += X[i];
			sum_Y += Y[i];
			sum_XY += X[i] * Y[i];
			squaresum_X += X[i] * X[i];
			squaresum_Y += Y[i] * Y[i];
		}

		let corr =
			(n * sum_XY - sum_X * sum_Y) /
			Math.sqrt(
				(n * squaresum_X - sum_X * sum_X) *
					(n * squaresum_Y - sum_Y * sum_Y)
			);

		return Math.round(corr * 100) / 100;
	};

	useEffect(() => {
		axios
			.get("/summaries")
			.then(res => {
				let array = [];
				res.data.forEach(summary => {
					if (summary.userId === id) {
						array.push(summary);
					}
				});
				return array;
			})
			.then(res => {
				const d = getData(res);
				const happ = d.mood;
				setWakeUp_c(correlation(d.wake_up, happ));
				setGoToBed_c(correlation(d.hit_the_sack, happ));
				setNicotine_c(correlation(d.nicotine, happ));
				setExcersice_c(correlation(d.excersice, happ));
				setMeditation_c(correlation(d.meditation, happ));
			})
			.then(setIsLoaded(true))
			.catch(err => console.log(err));
	}, []);

	return (
		<div>
			<div className="analysis-container">
				{isLoaded ? (
					<div>
						<div className="middle-line"></div>
						<img src="/mood.png" alt="mood" id="analysis-mood" />
						<h2 id="legend">CORRELATION</h2>
						<div className="bar-container">
							<img src="/wake_up.png" alt="wakeup" />
							<div
								className="bar"
								style={{
									width: wakeUp_c * 100 + "%",
									transform:
										wakeUp_c < 0 ? "translateX(-100%)" : 0
								}}
							></div>
							<div className="value">{wakeUp_c}</div>
						</div>
						<div className="bar-container">
							<img src="/hit_the_sack.png" alt="sleep" />
							<div
								className="bar"
								style={{
									width: goToBed_c * 100 + "%",
									transform:
										goToBed_c < 0 ? "translateX(-100%)" : 0
								}}
							></div>
							<div className="value">{goToBed_c}</div>
						</div>
						<div className="bar-container" id="bar-nicotine">
							<img src="/nicotine.png" alt="nicotine" />
							<div
								className="bar"
								style={{
									width: nicotine_c * 100 + "%",
									transform:
										nicotine_c < 0 ? "translateX(-100%)" : 0
								}}
							></div>
							<div className="value">{nicotine_c}</div>
						</div>
						<div className="bar-container">
							<img src="/excercise.png" alt="excercise" />
							<div
								className="bar"
								style={{
									width: excersice_c * 100 + "%",
									transform:
										excersice_c < 0
											? "translateX(-100%)"
											: 0
								}}
							></div>
							<div className="value">{excersice_c}</div>
						</div>
						<div className="bar-container">
							<img src="/meditation.png" alt="meditation" />
							<div
								className="bar"
								style={{
									width: meditation_c * 100 + "%",
									transform:
										meditation_c < 0
											? "translateX(-100%)"
											: 0
								}}
							></div>
							<div className="value">{meditation_c}</div>
						</div>
					</div>
				) : (
					<div>Loading</div>
				)}
			</div>
		</div>
	);
};

export default Analysis;
