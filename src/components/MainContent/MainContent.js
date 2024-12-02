import React, { useState, useEffect } from 'react';
import TestTabs from '../TestTabs/TestTabs';
import FilterBar from '../FilterBar/FilterBar';
import './MainContent.css';
import Pagination from "../Pagination/Pagination";
import Cover from '../../assets/Cover.png';
import testApi from "../../api/testApi";

const itemsPerPage = 5;

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
      if (newSortOrder === "newest") {
        return b.yearEdition - a.yearEdition;
      } else {
        return a.yearEdition - b.yearEdition;
      }
    });

    setFilteredData(sortedData);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const onFilterChange = (filter) => {
    setActiveFilter(filter); // Update filter state
  };

  return (
    <div className="main-content">
      <h2>IELTS Exam Library</h2>
      <TestTabs activeTab={activeTab} setActiveTab={setActiveTab} /> {/* Pass props */}
      <FilterBar onFilterChange={onFilterChange} />
      <div className="test-groups">
        <div className="control">
          <div className="search-container">
            <i className="fas fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input-user"
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
          {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((test, index) => (
            <div key={index} className="test-group-item">
              <img src={Cover} alt="Cover" className="cover-placeholder" />
              <div className="test-group-details">
                <strong>Name:</strong> {test.name} <br />
                <strong>Year Edition:</strong> {test.yearEdition} <br />
                <strong>Completed Users:</strong> {test.userCompletedNum} <br />
                <strong>Type:</strong> {test.testType} <br />
                <strong>Skill:</strong> {test.testSkill}
              </div>
            </div>
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