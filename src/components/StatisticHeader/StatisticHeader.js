import React from "react";
import "./StatisticHeader.css";

const StatisticHeader = () => {
  return (
    <header className="statistic-header">
      <h1>Statistic</h1>
      <div className="filter-group">
        <button className="active">Week</button>
        <button>Month</button>
        <button>Year</button>
      </div>
    </header>
  );
};

export default StatisticHeader;
