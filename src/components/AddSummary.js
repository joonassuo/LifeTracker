import React, { Component } from "react";
import axios from "axios";
import "./AddSummary.css";

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

export default class AddSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      username: "",
      hit_the_sack: 0,
      wake_up: 0,
      nicotine: 0,
      excersice: 0,
      meditation: 0,
      mood: 0,
      currentIndex: 0
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    let user;
    axios
      .get("http://localhost:5000/usersession")
      .then(res => {
        user = res.data.slice(-1)[0];
        this.setState({
          userId: user.userId,
          username: user.username
        });
      })
      .catch(err => {
        console.log("Error : " + err);
      });
  }

  onChangeHandler = (e, object) => {
    this.setState({
      [object]: e.target.value
    });
  };

  clickNext = () => {
    if (this.state.currentIndex < statesArray.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  };

  clickBack = () => {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
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
          <div className="tag">
            {current.tag.toUpperCase().replace(/_/g, " ")}
          </div>
          <div className="summary-icon">
            <img src="/like.png" alt="icon" />
          </div>
          <div className="description">{current.text}</div>
          <div className="value">{value}</div>
          <div className="slider-container">
            <input
              type="range"
              min={current.min}
              max={current.max}
              defaultValue={current.min}
              step={current.step}
              onChange={e => this.onChangeHandler(e, current.tag)}
              className="slider"
            />
          </div>
          <button className="back" onClick={this.clickBack}>
            BACK
          </button>
          <button className="next" onClick={this.clickNext}>
            NEXT
          </button>
        </div>
      </div>
    );
  }
}
