import React, { useState } from 'react';
import TestTabs from '../TestTabs/TestTabs';
import FilterBar from '../FilterBar/FilterBar';
import TestGroups from '../TestGroups/TestGroups';
import TestGroupsLis from '../TestGroupLis/TestGroupLis';
import TestGroupsRead from '../TestGroupRead/TestGroupRead';
import './MainContent.css';

const MainContent = () => {
  const [activeFilter, setActiveFilter] = useState("all"); // Trạng thái filter

  const onFilterChange = (filter) => {
    setActiveFilter(filter); // Cập nhật filter khi người dùng chọn filter
  };
  return (
    <div className="main-content">
      <h2>IELTS Exam Library</h2>
      <TestTabs />
      <FilterBar onFilterChange={onFilterChange} /> {/* Truyền hàm vào FilterBar */}
      {activeFilter === "listening" && <TestGroupsLis />}
      {activeFilter === "reading" && <TestGroupsRead />}
      {activeFilter === "all" && <TestGroups />}
    </div>
  );
};

export default MainContent;
