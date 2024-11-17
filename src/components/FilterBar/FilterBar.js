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
          <i className="icon-listening"></i> Listening
        </button>
        <button
          className={activeFilter === "reading" ? "active" : ""}
          onClick={() => setActiveFilter("reading")}
        >
          <i className="icon-reading"></i> Reading
        </button>
        <button
          className={activeFilter === "writing" ? "active" : ""}
          onClick={() => setActiveFilter("writing")}
        >
          <i className="icon-writing"></i> Writing
        </button>
        <button
          className={activeFilter === "speaking" ? "active" : ""}
          onClick={() => setActiveFilter("speaking")}
        >
          <i className="icon-speaking"></i> Speaking
        </button>
      </div>

      {/* Search Box and Sort Menu */}
      <div className="search-sort">
        <input type="text" placeholder="Search..." />
        <select>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
