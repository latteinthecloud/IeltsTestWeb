import React, { useEffect, useState } from "react";
import "../../styles/ExercisePage.css";
import TestTabs from "../../components/TestTabs/TestTabs";
import FilterBarExercise from "../../components/FilterBarExercise/FilterBarExercise.tsx";
import UserTest from "../../components/UserTest/UserTest.tsx";
import Pagination from "../../components/Pagination/Pagination.js";
const itemsPerPage = 6;
// Dummy test data (giả sử bạn chưa có dữ liệu thật)
const testData = [
  {
    testId: 1,
    name: "Test 1",
    testType: "academic",
    testSkill: "listening",
    yearEdition: 2022,
    monthEdition: 5,
    userCompletedNum: 10, // Thêm trường completed
  },
  {
    testId: 2,
    name: "Test 2",
    testType: "general",
    testSkill: "reading",
    yearEdition: 2023,
    monthEdition: 2,
    userCompletedNum: 8, // Thêm trường completed
  },
  {
    testId: 3,
    name: "Test 3",
    testType: "academic",
    testSkill: "reading",
    yearEdition: 2023,
    monthEdition: 4,
    userCompletedNum: 8, // Thêm trường completed
  },
];

export default function ExercisePage() {
  const [activeTab, setActiveTab] = useState<string>("all"); // State cho TestTabs
  const [filter, setFilter] = useState<string>("all"); // State lưu giá trị filter
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
  const [sortOrder, setSortOrder] = useState("newest"); // State lưu giá trị sắp xếp
  const [filteredData, setFilteredData] = useState(testData); // State lưu dữ liệu đã lọc
  const [currentPage, setCurrentPage] = useState(1);
  // Xử lý khi thay đổi filter
  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  // Xử lý khi thay đổi tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Xử lý khi thay đổi thứ tự sắp xếp
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Lọc và sắp xếp dữ liệu
  useEffect(() => {
    let filteredTests = [...testData];

    // Lọc theo tab
    if (activeTab === "academic") {
      filteredTests = filteredTests.filter(
        (test) => test.testType === "academic"
      );
    } else if (activeTab === "general") {
      filteredTests = filteredTests.filter(
        (test) => test.testType === "general"
      );
    }

    // Lọc theo kỹ năng
    if (filter === "listening") {
      filteredTests = filteredTests.filter(
        (test) => test.testSkill === "listening"
      );
    } else if (filter === "reading") {
      filteredTests = filteredTests.filter(
        (test) => test.testSkill === "reading"
      );
    }

    // Lọc theo tìm kiếm
    if (searchTerm.trim()) {
      filteredTests = filteredTests.filter((test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp dữ liệu
    const sortedTests = [...filteredTests].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.yearEdition - a.yearEdition || b.monthEdition - a.monthEdition;
      } else {
        return a.yearEdition - b.yearEdition || a.monthEdition - b.monthEdition;
      }
    });

    setFilteredData(sortedTests);
  }, [activeTab, filter, searchTerm, sortOrder]);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="main-content">
      <h2>Exercise</h2>

      {/* TestTabs */}
      <TestTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* FilterBarExercise */}
      <FilterBarExercise onFilterChange={handleFilterChange} />

      {/* Nội dung */}
      <div className="content">
        {filter === "all"}
        {filter === "listening"}
        {filter === "reading"}
      </div>

      {/* Control */}
      <div className="control">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Hiển thị danh sách bài test */}
      <div className="test-group-list">
        {filteredData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((test) => (
            <UserTest
              key={test.testId}
              id={test.testId}
              name={test.name}
              month={test.monthEdition}
              year={test.yearEdition}
              type={
                test.testType.charAt(0).toUpperCase() + test.testType.slice(1)
              }
              skill={
                test.testSkill.charAt(0).toUpperCase() + test.testSkill.slice(1)
              }
              completed={test.userCompletedNum || 0} // Đảm bảo giá trị không undefined
            />
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
