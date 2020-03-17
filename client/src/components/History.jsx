import React, { useState } from "react";
import "./css/History.css";
import HistoryCards from "./history.cards.component";
import Graph from "./history.graph.component";
import { Redirect } from "react-router-dom";
import Analysis from "./Analysis";

const History = () => {
	const [showCards, setShowCards] = useState(true);
	const [showGraph, setShowGraph] = useState(false);
	const [showAnalysis, setShowAnalysis] = useState(false);
	const [exit, setExit] = useState(false);

	const exitOnclick = () => {
		setExit(true);
	};

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

	return exit ? (
		<Redirect to="/home" />
	) : (
		<div className="history-container">
			<div className="history-navbar">
				<img
					className="left-arrow"
					src="/left.png"
					alt="arrow"
					onClick={() => exitOnclick()}
				/>
				<div
					className="navbar-history"
					onClick={() => historyOnclick()}
				>
					history
				</div>
				<div className="navbar-graph" onClick={() => graphOnclick()}>
					graph
				</div>
				<div
					className="navbar-analysis"
					onClick={() => analysisOnclick()}
				>
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
					<div>
						<Analysis />
					</div>
				) : null}
			</div>
		</div>
	);
};
export default History;
