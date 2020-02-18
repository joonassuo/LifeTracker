import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Graph = () => {
	const id = useSelector(state => state.userId);
	const [userData, setUserData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	let wakeUp_d;
	let goToBed_d;
	let nicotine_d;
	let excersice_d;
	let meditation_d;
	let mood_d;

	const makeDataStruct = (dates, data, label, borderColor, fill) => {
		const res = {
			labels: dates,
			datasets: [
				{
					data: data,
					label: label,
					borderColor: borderColor,
					fill: fill
				}
			]
		};
		return res;
	};

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

	useEffect(() => {
		axios
			.get("http://localhost:5000/summaries")
			.then(res => {
				const d = res.data.filter(el => {
					return el.userId === id;
				});
				setUserData(d);
			})
			.catch(err => console.log(err));
	}, id);

	const test = () => {
		const dates = [];
		userData.forEach(e => {
			dates.push(e.date.substr(5, 5));
		});
		const data = getData(userData);
		console.log(data.mood);

		wakeUp_d = makeDataStruct(
			dates,
			getData(data.wake_up),
			"Wake Up",
			"rgba(157, 133, 141, 1)",
			false
		);
		goToBed_d = makeDataStruct(
			dates,
			getData(data.hit_the_sack),
			"Go to Bed",
			"rgba(187, 160, 178, 1)",
			false
		);
		nicotine_d = makeDataStruct(
			dates,
			getData(data.nicotine),
			"Nicotine",
			"rgba(164, 168, 209, 1)",
			false
		);
		excersice_d = makeDataStruct(
			dates,
			getData(data.excersice),
			"Excersice",
			"rgba(164, 191, 235, 1)",
			false
		);
		meditation_d = makeDataStruct(
			dates,
			getData(data.meditation),
			"Meditation",
			"rgba(140, 171, 190, 1)",
			false
		);
		mood_d = makeDataStruct(
			dates,
			getData(data.mood),
			"Mood",
			"rgba(140, 171, 190, 1)",
			false
		);
		console.log(mood_d);

		setIsLoaded(true);
	};

	return (
		<div>
			<div className="chart">
				{isLoaded ? <Line data={mood_d} /> : <div>Loading</div>}
				<button onClick={() => test()}>X</button>
			</div>
		</div>
	);
};

export default Graph;
