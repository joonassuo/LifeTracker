import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
      {userSummaries.map((summary, i) => (
        <li key={i}>
          <div>userId: {userId}</div>
          <div>{summary.nicotine}</div>
        </li>
      ))}
    </ul>
  );
};

export default Summary;
