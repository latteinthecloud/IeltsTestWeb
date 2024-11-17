import React, { useState } from "react";
import "./TestTab.css";

const TestTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const testData = [
    { id: 1, name: "Test 01", user: "Michael", date: "10/12/2024", type: "Reading", exam: "Academic", status: "Completed" },
    { id: 2, name: "Test 02", user: "Chovy", date: "06/12/2024", type: "Listening", exam: "General Training", status: "Completed" },
    { id: 3, name: "Test 03", user: "Faker", date: "10/11/2024", type: "Listening", exam: "Academic", status: "Completed" },
    // Add more test data here...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = testData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="test-tab-container">
      <h2>Upload Test</h2>
      <div className="controls">
        <button className="add-test-btn">+ Add Test File</button>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="sort-dropdown">
          <option value="month">Sort by: Month</option>
          <option value="date">Date</option>
          <option value="year">Year</option>
        </select>
      </div>

      <table className="test-table">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Upload User</th>
            <th>Upload Date</th>
            <th>Test Type</th>
            <th>Exam</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.user}</td>
              <td>{item.date}</td>
              <td>{item.type}</td>
              <td>{item.exam}</td>
              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestTab;
