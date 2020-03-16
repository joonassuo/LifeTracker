import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./History.css";

const Graph = () => {
	const id = useSelector(state => state.userId);
	const [isLoaded, setIsLoaded] = useState(false);

	const [wakeUp_d, setWakeUp_d] = useState([]);
	const [goToBed_d, setGoToBed_d] = useState([]);
	const [nicotine_d, setNicotine_d] = useState([]);
	const [excersice_d, setExcersice_d] = useState([]);
	const [meditation_d, setMeditation_d] = useState([]);
	const [mood_d, setMood_d] = useState([]);

	const makeDataStruct = (dates, data, label, color) => {
		const res = {
			labels: dates,
			datasets: [
				{
					data,
					label,
					backgroundColor: color
				}
			]
		};
		return res;
	};

	var options = {
		layout: {
			padding: {
				left: 30,
				right: 40,
				top: 40,
				bottom: 0
			}
		},
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				label: function(tooltipItem) {
					console.log(tooltipItem);
					return tooltipItem.yLabel;
				}
			}
		},
		elements: {
			point: {
				radius: 0
			}
		},
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
				const colors = [
					"rgba(37, 142, 166, 1)",
					"rgba(84, 159, 147, 1)",
					"rgba(159, 175, 144, 1)",
					"rgba(226, 177, 177, 1)",
					"rgba(226, 194, 255, 1)",
					"rgba(37, 142, 166, 1)"
				];
				const dates = [];
				res.forEach(e => {
					dates.push(e.date.substr(5, 5));
				});
				const data = getData(res);

				setWakeUp_d(
					makeDataStruct(dates, data.wake_up, "Wake Up", colors[0])
				);
				setGoToBed_d(
					makeDataStruct(
						dates,
						data.hit_the_sack,
						"Go to Bed",
						colors[1]
					)
				);
				setNicotine_d(
					makeDataStruct(dates, data.nicotine, "Nicotine", colors[2])
				);
				setExcersice_d(
					makeDataStruct(
						dates,
						data.excersice,
						"Excersice",
						colors[3]
					)
				);
				setMeditation_d(
					makeDataStruct(
						dates,
						data.meditation,
						"Meditation",
						colors[4]
					)
				);
				setMood_d(makeDataStruct(dates, data.mood, "Mood", colors[5]));
			})
			.then(() => {
				setIsLoaded(true);
			})
			.catch(err => console.log(err));
	}, [id]);

	return (
		<div>
			<div className="chart-container">
				{isLoaded ? (
					<div>
						<p className="legend">GO TO BED</p>
						<Line data={goToBed_d} options={options} />
						<p className="legend">WAKE UP</p>
						<Line data={wakeUp_d} options={options} />
						<p className="legend">NICOTINE</p>
						<Line data={nicotine_d} options={options} />
						<p className="legend">EXCERSICE</p>
						<Line data={excersice_d} options={options} />
						<p className="legend">MEDITATION</p>
						<Line data={meditation_d} options={options} />
						<p className="legend">MOOD</p>
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
