import React, { useState } from "react";
import "./FilterBar.css";
import { useNavigate } from "react-router-dom";

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate(); // Hook to handle navigation

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Update the active filter state
    if (filter === "listening") {
      navigate("/listening"); // Navigate to "Listening" page
    } else if (filter === "reading") {
      navigate("/reading"); // Navigate to "Reading" page
    } else {
      navigate("/"); // Navigate to the main "All Skills" page
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button
          className={`filter-button ${
            activeFilter === "all" ? "active all-active" : "all-active"
          }`}
          onClick={() => handleFilterClick("all")}
        >
          <i className="fa-solid fa-border-all"></i> All Skills
        </button>
        <button
          className={`filter-button ${
            activeFilter === "listening" ? "active listening-active" : "listening-active"
          }`}
          onClick={() => handleFilterClick("listening")}
        >
          <i className="fas fa-headphones-alt"></i> Listening
        </button>
        <button
          className={`filter-button ${
            activeFilter === "reading" ? "active reading-active" : "reading-active"
          }`}
          onClick={() => handleFilterClick("reading")}
        >
          <i className="fas fa-book"></i> Reading
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
