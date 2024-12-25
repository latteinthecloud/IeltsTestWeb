import React from "react";
import "./StatisticHeader.css";

const StatisticHeader = ({activeFilter, setActiveFilter}) => {
  const handleFilterClick = (filter) => {
    setActiveFilter(filter); 
    console.log(`Filter changed to: ${filter}`); 
  };

  return (
    <header className="statistic-header">
      <div className="filter-group">
      <button
          className={activeFilter === "week" ? "active" : ""}
          onClick={() => handleFilterClick("week")}
        >
          Week
        </button>
        <button
          className={activeFilter === "month" ? "active" : ""}
          onClick={() => handleFilterClick("month")}
        >
          Month
        </button>
        <button
          className={activeFilter === "year" ? "active" : ""}
          onClick={() => handleFilterClick("year")}
        >
          Year
        </button>
      </div>
    </header>
  );
};

export default StatisticHeader;
