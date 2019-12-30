import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Moment from "react-moment";
import "./History.css";

const Summary = () => {
  const [userId, setUserId] = useState("");
  const [userSummaries, setUserSummaries] = useState([]);
  const id = useSelector(state => state.userId);

  useEffect(() => {
    setUserId(id);
    axios
      .get("http://localhost:5000/summaries")
      .then(res => setUserSummaries(res.data))
      .catch(err => console.log(err));
  }, [id, userSummaries]);

  return (
    <ul>
      {userSummaries.reverse().map((summary, i) =>
        summary.userId === userId ? (
          <li className="history-card" key={i}>
            <div className="date">
              <Moment format="DD/MM/YYYY">{summary.date}</Moment>
            </div>
            <div className="history-card-item">
              <img
                className="history-card-item-icon"
                src="/nicotine.png"
                alt="nicotine"
              />
              <div className="history-card-item-value">{summary.nicotine}</div>
            </div>
            <div className="history-card-item">
              <img
                className="history-card-item-icon"
                src="/meditation.png"
                alt="meditation"
              />
              <div className="history-card-item-value">
                {summary.meditation}
              </div>
            </div>
            <div className="history-card-item">
              <img
                className="history-card-item-icon"
                src="/excercise.png"
                alt="excercise"
              />
              <div className="history-card-item-value">{summary.excersice}</div>
            </div>
            <div className="history-card-item">
              <img
                className="history-card-item-icon"
                src="/hit_the_sack.png"
                alt="hit_the_sack"
              />
              <div className="history-card-item-value">
                {summary.hit_the_sack}:00
              </div>
            </div>
            <div className="history-card-item">
              <img
                className="history-card-item-icon"
                src="/wake_up.png"
                alt="wake_up"
              />
              <div className="history-card-item-value">
                {summary.wake_up}:00
              </div>
            </div>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default Summary;
