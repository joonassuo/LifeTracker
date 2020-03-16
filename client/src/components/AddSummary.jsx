import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddSummary.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const statesArray = [
	{
		tag: "hit_the_sack",
		min: 20,
		max: 28,
		step: 1,
		unit: "",
		text: "What time did you hit the sack last night?"
	},
	{
		tag: "wake_up",
		min: 5,
		max: 15,
		step: 1,
		unit: "",
		text: "What time did you wake up today?"
	},
	{
		tag: "nicotine",
		min: 0,
		max: 20,
		step: 1,
		unit: "portions",
		text: "How much nicotine did you consume today? (in portions)"
	},
	{
		tag: "excercise",
		min: 0,
		max: 240,
		step: 10,
		unit: "min",
		text: "How much did you exercise today? (in minutes)"
	},
	{
		tag: "meditation",
		min: 0,
		max: 60,
		step: 5,
		unit: "min",
		text: "How much did you meditate today? (in minutes)"
	},
	{
		tag: "mood",
		min: 0,
		max: 10,
		step: 1,
		text: "How was your overall mood throughout the day?"
	}
];

const AddSummary = () => {
	const [userId, setUserId] = useState("");
	const [hit_the_sack, set_hit_the_sack] = useState(0);
	const [wake_up, set_wake_up] = useState(0);
	const [nicotine, setNicotine] = useState(0);
	const [excersice, setExcercise] = useState(0);
	const [meditation, setMeditation] = useState(0);
	const [mood, setMood] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [exit, setExit] = useState(false);
	const id = useSelector(state => state.userId);

	useEffect(() => {
		setUserId(id);
	}, [id]);

	const onChangeHandler = (e, object) => {
		e.preventDefault();
		switch (object) {
			case "hit_the_sack":
				set_hit_the_sack(e.target.value);
				break;
			case "wake_up":
				set_wake_up(e.target.value);
				break;
			case "nicotine":
				setNicotine(e.target.value);
				break;
			case "excercise":
				setExcercise(e.target.value);
				break;
			case "meditation":
				setMeditation(e.target.value);
				break;
			case "mood":
				setMood(e.target.value);
				break;
			default:
				return null;
		}
	};

	const clickNext = () => {
		if (currentIndex < statesArray.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const clickBack = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	// is this even necessary of will it reset the state on rerender?
	const clickExit = () => {
		set_hit_the_sack(0);
		set_wake_up(0);
		setNicotine(0);
		setExcercise(0);
		setMeditation(0);
		setMood(0);
		setCurrentIndex(0);
		setExit(true);
	};

	const clickSubmit = () => {
		const newSummary = {
			userId,
			hit_the_sack,
			wake_up,
			nicotine,
			excersice,
			meditation,
			mood,
			date: Date.now()
		};

		axios
			.post("/summaries/add", newSummary)
			.then(res => console.log(res))
			.then(window.alert("Summary added !"))
			.then(() => {
				setExit(true);
			})
			.catch(err => console.log("Error : " + err));
	};

	const getValue = () => {
		let current = statesArray[currentIndex];
		let _tag = current.tag;
		let value;
		let suffix = "";

		switch (_tag) {
			case "hit_the_sack":
				value = hit_the_sack;
				suffix = ":00";
				break;
			case "wake_up":
				value = wake_up;
				suffix = ":00";
				break;
			case "nicotine":
				value = nicotine;
				break;
			case "excercise":
				value = excersice;
				break;
			case "meditation":
				value = meditation;
				break;
			case "mood":
				value = mood;
				break;
			default:
				break;
		}

		return {
			current,
			_tag,
			value,
			suffix
		};
	};

	return exit ? (
		<Redirect to="/home" />
	) : (
		<div>
			<div className="summary-grid">
				<button className="exit-btn" onClick={clickExit}>
					X
				</button>
				<div className="tag">
					{getValue()
						._tag.toUpperCase()
						.replace(/_/g, " ")}
				</div>
				<div className="summary-icon">
					<img src={"/" + getValue()._tag + ".png"} alt="icon" />
				</div>
				<div className="description"> {getValue().current.text} </div>
				<div className="value">
					{currentIndex === 0
						? (getValue().value % 24) + getValue().suffix
						: getValue().value + getValue().suffix}
				</div>
				<div className="slider-container">
					<input
						type="range"
						min={getValue().current.min}
						max={getValue().current.max}
						value={getValue().value}
						step={getValue().current.step}
						onChange={e =>
							onChangeHandler(e, getValue().current.tag)
						}
						className="slider"
					/>
				</div>
				<button className="back" onClick={clickBack}>
					back
				</button>
				<div className="next-container">
					{currentIndex === statesArray.length - 1 ? (
						<button className="submit-btn" onClick={clickSubmit}>
							submit
						</button>
					) : (
						<button className="next-btn" onClick={clickNext}>
							next
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddSummary;
