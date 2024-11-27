import React, { useState } from "react";
import "./FilterBar.css";
import { useNavigate } from "react-router-dom";

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("listening");
  const navigate = useNavigate(); // Hook để điều hướng

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Cập nhật trạng thái
    if (filter === "listening") {
      navigate("/listening"); // Điều hướng đến trang "Listening"
    } else if (filter === "reading") {
      navigate("/reading"); // Điều hướng đến trang "Reading"
    } else {
      navigate("/"); // Điều hướng về trang chính (All Skills)
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
      <i className="icon-all-skills"></i> All Skills
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
