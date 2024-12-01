import React, { useState } from "react";
import "./FilterBar.css"

const FilterBar = ({ onFilterChange }) => { // Nhận onFilterChange như một prop
  const [activeFilter, setActiveFilter] = useState("all");
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter); // Gửi filter đã chọn lên MainContent
  };

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button
          className={`filter-button ${activeFilter === "all" ? "active all-active" : "all-active"}`}
          onClick={() => handleFilterClick("all")}
        >
          <i className="fas fa-border-all"></i> All Skills
        </button>
        <button
          className={`filter-button ${activeFilter === "listening" ? "active listening-active" : "listening-active"}`}
          onClick={() => handleFilterClick("listening")}
        >
          <i className="fas fa-headphones-alt"></i> Listening
        </button>
        <button
          className={`filter-button ${activeFilter === "reading" ? "active reading-active" : "reading-active"}`}
          onClick={() => handleFilterClick("reading")}
        >
          <i className="fas fa-book"></i> Reading
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
