import React, { useState, useEffect } from 'react';
import TestTabs from '../TestTabs/TestTabs';
import FilterBar from '../FilterBar/FilterBar';
import './MainContent.css';
import Pagination from "../Pagination/Pagination";
import testApi from "../../api/testApi";
import TestComponent from '../TestComponent/TestComponent.tsx';

const itemsPerPage = 6;

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("all"); // State for current tab
  const [activeFilter, setActiveFilter] = useState("all"); // Filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [sortOrder, setSortOrder] = useState("newest"); // Store sort order
  const [testData, setTestData] = useState([]); // Store all test data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await testApi.getAll();
        if (Array.isArray(response)) {
          setTestData(response);
          setFilteredData(response); // Initially, all data is shown
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredTests = [...testData];

    // Apply tab filter
    if (activeTab === "academic") {
      filteredTests = filteredTests.filter(test => test.testType === "academic");
    } else if (activeTab === "general") {
      filteredTests = filteredTests.filter(test => test.testType === "general");
    }

    // Apply skill filter
    if (activeFilter === "listening") {
      filteredTests = filteredTests.filter(test => test.testSkill === "listening");
    } else if (activeFilter === "reading") {
      filteredTests = filteredTests.filter(test => test.testSkill === "reading");
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filteredTests = filteredTests.filter(test =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filteredTests);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [activeTab, activeFilter, searchTerm, testData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);

    const sortedData = [...filteredData].sort((a, b) => {
      // First, compare by yearEdition
      if (newSortOrder === "newest") {
        if (b.yearEdition !== a.yearEdition) {
          return b.yearEdition - a.yearEdition;
        }
      } else {
        if (a.yearEdition !== b.yearEdition) {
          return a.yearEdition - b.yearEdition;
        }
      }
    
      // If yearEdition is the same, compare by monthEdition
      if (b.monthEdition !== a.monthEdition) {
        return b.monthEdition - a.monthEdition;
      }
    
      return 0; // If both yearEdition and monthEdition are the same, return 0 (no change)
    });

    setFilteredData(sortedData);
  };
  
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const onFilterChange = (filter) => {
    setActiveFilter(filter); // Update filter state
  };

  // popup
  const [openPopup, setOpenPopup] = useState({}); // Khởi tạo state với object rỗng
  const handlePopupToggle = (testId) => {
    setOpenPopup(prevState => ({
      ...prevState,
      [testId]: !prevState[testId] // Chuyển đổi trạng thái popup cho testId
    }));
  };
  

  return (
    <div className="main-content">
      <h2>IELTS Exam Library</h2>
      <TestTabs activeTab={activeTab} setActiveTab={setActiveTab} /> {/* Pass props */}
      <FilterBar onFilterChange={onFilterChange} />
      <div className="test-groups">
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

        <div className="test-group-list">
          {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((test) => (
            <TestComponent 
              key={test.testId}
              id={test.testId}
              name={test.name}
              month={test.monthEdition}
              year={test.yearEdition}
              type={test.testType.charAt(0).toUpperCase() + test.testType.slice(1)}
              skill={test.testSkill.charAt(0).toUpperCase() + test.testSkill.slice(1)}
              completed={test.userCompletedNum}> {/* Use test.id as key */}
            </TestComponent>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MainContent;
