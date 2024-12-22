import React, { useState } from "react";
import "../../styles/ExercisePage.css";
import TestTabs from "../../components/TestTabs/TestTabs";
import Pagination from "../../components/Pagination/Pagination";
import FilterBarExercise from "../../components/FilterBarExercise/FilterBarExercise.tsx";

export default function ExercisePage() {
  const [activeTab, setActiveTab] = useState<string>("all"); // State cho TestTabs
  const [filter, setFilter] = useState<string>("all"); // State lưu giá trị filter

  const handleFilterChange = (selectedFilter: string) => {
    console.log("Filter selected:", selectedFilter); // Log filter được chọn
    setFilter(selectedFilter); // Cập nhật state filter
  };

  return (
    <div className="main-content">
      <h2>Exercise</h2>
      {/* Sử dụng TestTabs */}
      <TestTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sử dụng FilterBarExercise */}
      <FilterBarExercise onFilterChange={handleFilterChange} />

      <div className="content">
        {filter === "all" && <p>Showing all skills...</p>}
        {filter === "listening" && <p>Showing Listening skills...</p>}
        {filter === "reading" && <p>Showing Reading skills...</p>}
      </div>
    </div>
  );
}
