import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Graph = () => {
	const id = useSelector(state => state.userId);
	const [userData, setUserData] = useState([]);
	const [data, setData] = useState({
		labels: [],
		datasets: [
			{
				data: [],
				label: "Wake Up",
				borderColor: "#3e95cd",
				fill: false
			},
			{
				data: [],
				label: "Sleep",
				borderColor: "#8e5ea2",
				fill: false
			},
			{
				data: [],
				label: "Nicotine",
				borderColor: "#3cba9f",
				fill: false
			},
			{
				data: [],
				label: "Excercise",
				borderColor: "#e8c3b9",
				fill: false
			},
			{
				data: [],
				label: "Meditation",
				borderColor: "#c45850",
				fill: false
			},
			{
				data: [],
				label: "Mood",
				borderColor: "#c45850",
				fill: false
			}
		]
	});

	useEffect(() => {
		axios
			.get("http://localhost:5000/summaries")
			.then(res => {
				setUserData(res.data);
			})
			.catch(err => console.log(err));
	}, []);

	const test = () => {
		userData.forEach(e => {
			data.labels.push(e.date.substr(5, 5));
			data.datasets[0].data.push(e.wake_up);
			data.datasets[1].data.push(e.hit_the_sack);
			data.datasets[2].data.push(e.nicotine);
			data.datasets[3].data.push(e.excersice);
			data.datasets[4].data.push(e.meditation);
			data.datasets[5].data.push(e.mood);
		});
	};

	return (
		<div>
			<div className="chart">
				<Line data={data} />
			</div>
			<button onClick={() => test()}>X</button>
		</div>
	);
};

export default Graph;
