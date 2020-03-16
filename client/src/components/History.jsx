import React, { useState } from "react";
import "./History.css";
import HistoryCards from "./history.cards.component";
import Graph from "./history.graph.component";

const History = () => {
  const [showCards, setShowCards] = useState(true);
  const [showGraph, setShowGraph] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const historyOnclick = () => {
    setShowCards(true);
    setShowGraph(false);
    setShowAnalysis(false);
  };

  const graphOnclick = () => {
    setShowCards(false);
    setShowGraph(true);
    setShowAnalysis(false);
  };

  const analysisOnclick = () => {
    setShowCards(false);
    setShowGraph(false);
    setShowAnalysis(true);
  };

  return (
    <div className="history-container">
      <div className="history-navbar">
        <div className="navbar-history" onClick={() => historyOnclick()}>
          history
        </div>
        <div className="navbar-graph" onClick={() => graphOnclick()}>
          graph
        </div>
        <div className="navbar-analysis" onClick={() => analysisOnclick()}>
          analysis
        </div>
      </div>
      <div className="content">
        {showCards ? (
          <div>
            <HistoryCards />
          </div>
        ) : showGraph ? (
          <div>
            <Graph />
          </div>
        ) : showAnalysis ? (
          <div>analysis</div>
        ) : null}
      </div>
    </div>
  );
};
export default History;
