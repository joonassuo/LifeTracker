import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import axios from "axios";

const data = {
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
};

const Graph = () => {
  const id = useSelector(state => state.userId);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/summaries")
      .then(res => {
        res.data.map(e => {
          if (e.userId === id) {
            setUserData(userData.concat(e));
          }
        });
      })
      .catch(err => console.log(err));
  }, [userData]);

  const test = () => {
    console.log("click");
    console.log(userData);
    data.datasets[0].data.push(4);
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
