import React, { useState, useEffect } from "react";
import "../TestGroups/TestGroups.css";
import Pagination from "../Pagination/Pagination";
import Cover from '../../assets/Cover.png';
import testApi from "../../api/testApi";

const itemsPerPage = 3;

const TestGroups = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Store the search term (name or year)
  const [sortOrder, setSortOrder] = useState("newest"); // Store sort order
  const [testData, setTestData] = useState([]); // Store all test data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data (based on search)

  useEffect(() => {
    // Fetch all test data once on mount for sorting purposes
    const fetchData = async () => {
      try {
        const response = await testApi.getAll();
        if (Array.isArray(response)) {
          setTestData(response);
          setFilteredData(response); // Initially, filtered data matches all data
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
    const fetchFilteredData = async () => {
      try {
        const response = await testApi.find(searchTerm);
        if (Array.isArray(response)) {
          setFilteredData(response);
        } else {
          console.error("Invalid response format:", response);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching filtered test data:", error);
      }
    };

    if (searchTerm.trim()) {
      fetchFilteredData();
    } else {
      // If no search term, reset filtered data to all testData
      setFilteredData(testData);
    }
  }, [searchTerm]); // Only runs when searchTerm changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to the first page when sort order changes

    const sortedData = [...filteredData].sort((a, b) => {
      if (newSortOrder === "newest") {
        return b.yearEdition - a.yearEdition;
      } else {
        return a.yearEdition - b.yearEdition;
      }
    });

    setFilteredData(sortedData);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
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
        {currentItems.map((test, index) => (
          <div key={index} className="test-group-item">
            <img src={Cover} alt="Cover" className="cover-placeholder" />
            <div className="test-group-details">
              <strong>Name:</strong> {test.name} <br />
              <strong>Year Edition:</strong> {test.yearEdition} <br />
              <strong>Completed Users:</strong> {test.userCompletedNum}
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
  );
};

export default TestGroups;