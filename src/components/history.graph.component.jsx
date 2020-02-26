import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Graph = () => {
	const id = useSelector(state => state.userId);
	const [isLoaded, setIsLoaded] = useState(false);

	const [wakeUp_d, setWakeUp_d] = useState([]);
	const [goToBed_d, setGoToBed_d] = useState([]);
	const [nicotine_d, setNicotine_d] = useState([]);
	const [excersice_d, setExcersice_d] = useState([]);
	const [meditation_d, setMeditation_d] = useState([]);
	const [mood_d, setMood_d] = useState([]);

	const makeDataStruct = (dates, data, label, borderColor) => {
		const res = {
			labels: dates,
			datasets: [
				{
					data,
					label,
					borderColor
				}
			]
		};
		return res;
	};

	var options = {
		fill: false,
		scales: {
			xAxes: [
				{
					gridLines: {
						display: false
					}
				}
			],
			yAxes: [
				{
					gridLines: {
						display: false
					}
				}
			]
		}
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
				return d;
			})
			.then(res => {
				const dates = [];
				res.forEach(e => {
					dates.push(e.date.substr(5, 5));
				});
				const data = getData(res);

				setWakeUp_d(
					makeDataStruct(
						dates,
						data.wake_up,
						"Wake Up",
						"rgba(157, 133, 141, 1)"
					)
				);
				setGoToBed_d(
					makeDataStruct(
						dates,
						data.hit_the_sack,
						"Go to Bed",
						"rgba(187, 160, 178, 1)"
					)
				);
				setNicotine_d(
					makeDataStruct(
						dates,
						data.nicotine,
						"Nicotine",
						"rgba(164, 168, 209, 1)"
					)
				);
				setExcersice_d(
					makeDataStruct(
						dates,
						data.excersice,
						"Excersice",
						"rgba(164, 191, 235, 1)"
					)
				);
				setMeditation_d(
					makeDataStruct(
						dates,
						data.meditation,
						"Meditation",
						"rgba(140, 171, 190, 1)"
					)
				);
				setMood_d(
					makeDataStruct(
						dates,
						data.mood,
						"Mood",
						"rgba(140, 171, 190, 1)"
					)
				);
			})
			.then(() => {
				setIsLoaded(true);
			})
			.catch(err => console.log(err));
	}, [id]);

	return (
		<div>
			<div className="chart">
				{isLoaded ? (
					<div>
						<Line data={goToBed_d} options={options} />
						<Line data={wakeUp_d} options={options} />
						<Line data={nicotine_d} options={options} />
						<Line data={excersice_d} options={options} />
						<Line data={meditation_d} options={options} />
						<Line data={mood_d} options={options} />
					</div>
				) : (
					<div>Loading</div>
				)}
			</div>
		</div>
	);
};

export default Graph;
