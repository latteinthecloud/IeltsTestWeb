import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for React Router v6+
import "./AdminTestTabs.css";
import Pagination from "../Pagination/Pagination";
import testApi from "../../api/testApi";

const TestTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [testData, setTestData] = useState([]); // State for storing the fetched data

  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddTestClick = () => {
    // Navigate to the '/add-test' route when the button is clicked
    navigate("/admin-add-test");
  };

  // Fetch test data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await testApi.getAll(); // Replace with your actual API call
        if (Array.isArray(response)) {
          setTestData(response); // Set the fetched data
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, []); // Only fetch data when the component mounts

  const [currentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter the test data based on the search term
  const filteredData = testData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered data based on the selected sort order
  const sortedData = [...filteredData].sort((a, b) => {
    // Primary sort by yearEdition
    if (sortOrder === "newest") {
      return b.yearEdition - a.yearEdition;
    } else {
      return a.yearEdition - b.yearEdition;
    }
  });

  // Paginate the sorted data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="test-tab-container">
      <h2>Upload Test</h2>
      <div className="controls">
      <button className="add-test-btn" onClick={handleAddTestClick} >
      <i className="fas fa-plus"></i> Add Test File
      </button>

        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <table className="test-table">
        <thead>
          <tr>
            <th>Test ID</th>
            <th>Test Type</th>
            <th>Test Skill</th>
            <th>Name</th>
            <th>Month Edition</th>
            <th>Year Edition</th>
            <th>User Completed</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((test) => (
            <tr key={test.testId}>
              <td>{test.testId}</td>
              <td>{test.testType}</td>
              <td>{test.testSkill}</td>
              <td>{test.name}</td>
              <td>{test.monthEdition}</td>
              <td>{test.yearEdition}</td>
              <td>{test.userCompletedNum}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};

export default TestTab;
