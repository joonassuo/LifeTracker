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
          <li className="card-item" key={i}>
            <div className="date">
              <Moment format="DD/MM/YYYY">{summary.date}</Moment>
            </div>
            <div>{summary.userId}</div>
            <div>{summary.nicotine}</div>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default Summary;
