import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddSummary.css";
import { useSelector } from "react-redux";

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
    tag: "excersice",
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
  const [userId, setUserId] = setState("");
  const [username, setUsername] = setState("");
  const [hit_the_sack, set_hit_the_sack] = setState(0);
  const [wake_up, set_wake_up] = setState(0);
  const [nicotine, setNicotine] = setState(0);
  const [excersice, setExcersice] = setState(0);
  const [meditation, setMeditation] = setState(0);
  const [mood, setMood] = setState(0);
  const [currentIndex, setCurrentIndex] = setState(0);
  const id = useSelector(state => state.userId);

  useEffect(() => {
        setUserId(id);
  }, [id]);

  const onChangeHandler = (e, object) => {
    e.preventDefault();
    switch (object) {
      case 'hit_the_sack' :
        set_hit_the_sack(e.target.value);
        break ; 
      case 'wake_up' :
        set_wake_up(e.target.value);
        break ;
      case 'nicotine' :
        setNicotine(e.target.value);
        break ;
      case 'excercise' :
        setExcercise(e.target.value);
        break ;
      case 'meditation' :
        setMeditation(e.target.value);
        break ;
      case 'mood' :
        setMood(e.target.value);
        break ;
      default :
        return null;
    }

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
    setExcersice(0);
    setMeditation(0);
    setMood(0);
    setCurrentIndex(0);

    // change this
    window.location = "/home";
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
      .post("http://localhost:5000/summaries/add", newSummary)
      .then(res => console.log(res))
      .then(window.alert("Summary added !"))
      .then(() => {
        // change this 
        window.location = "/home";
      })
      .catch(err => console.log("Error : " + err));
  };

  render() {
    let current = statesArray[this.state.currentIndex];
    let _tag = current.tag;
    let value;

    if (this.state.currentIndex === 0) {
      if (this.state.hit_the_sack > 24) {
        value = this.state.hit_the_sack - 24 + ":00";
      } else {
        value = this.state[_tag] + ":00";
      }
    } else if (this.state.currentIndex === 1) {
      value = this.state[_tag] + ":00";
    } else {
      value = this.state[_tag];
    }

    return (
      <div>
        <div className="summary-grid">
          <button className="exit-btn" onClick={this.clickExit}>
            X
          </button>
          <div className="tag">
            {current.tag.toUpperCase().replace(/_/g, " ")}
          </div>
          <div className="summary-icon">
            <img src={"/" + _tag + ".png"} alt="icon" />
          </div>
          <div className="description">{current.text}</div>
          <div className="value">{value}</div>
          <div className="slider-container">
            <input
              type="range"
              min={current.min}
              max={current.max}
              value={this.state[_tag]}
              step={current.step}
              onChange={onChangeHandler(e, current.tag)}
              className="slider"
            />
          </div>
          <button className="back" onClick={this.clickBack}>
            back
          </button>
          <div className="next-container">
            {this.state.currentIndex === statesArray.length - 1 ? (
              <button className="submit-btn" onClick={this.clickSubmit}>
                submit
              </button>
            ) : (
              <button className="next-btn" onClick={this.clickNext}>
                next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddSummary;