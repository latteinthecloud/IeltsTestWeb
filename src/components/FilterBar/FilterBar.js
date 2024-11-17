import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="filter-bar">
      {/* Skills List */}
      <div className="filter-buttons">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          <i className="icon-all-skills"></i> All Skills
        </button>
        <button
          className={activeFilter === "listening" ? "active" : ""}
          onClick={() => setActiveFilter("listening")}
        >
          <i className="fas fa-headphones-alt"></i> Listening
        </button>
        <button
          className={activeFilter === "reading" ? "active" : ""}
          onClick={() => setActiveFilter("reading")}
        >
          <i className="fas fa-book"></i> Reading
        </button>

      </div>
    </div>
  );
};

export default FilterBar;
