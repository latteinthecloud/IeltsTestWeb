import React, { useState } from "react";
import "./StatisticHeader.css";

const StatisticHeader = () => {

  const [activeFilter, setActiveFilter] = useState("Week");
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter); 
    console.log(`Filter changed to: ${filter}`); 
    // You can add additional logic here if needed
  };

  return (
    <header className="statistic-header">
      <h1>Statistic</h1>
      <div className="filter-group">
      <button
          className={activeFilter === "Week" ? "active" : ""}
          onClick={() => handleFilterClick("Week")}
        >
          Week
        </button>
        <button
          className={activeFilter === "Month" ? "active" : ""}
          onClick={() => handleFilterClick("Month")}
        >
          Month
        </button>
        <button
          className={activeFilter === "Year" ? "active" : ""}
          onClick={() => handleFilterClick("Year")}
        >
          Year
        </button>
      </div>
    </header>
  );
};

export default StatisticHeader;
