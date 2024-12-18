import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./AdminTestTabs.css";
import Pagination from "../Pagination/Pagination";
import testApi from "../../api/testApi";

const TestTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [testData, setTestData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("Reading");
  const [formData, setFormData] = useState({
    name: "",
    section1: "Multiple choice",
    section2: "Multiple choice",
    section3: "Multiple choice",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await testApi.getAll();
        if (Array.isArray(response)) setTestData(response);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTestClick = () => {
    navigate("/admin-add-test");
  };

  return (
    <div className="test-tab-container">
      <h2>Upload Test</h2>
      <div className="controls">
        <button className="add-test-btn" onClick={handleAddTestClick}>
          <i className="fas fa-plus"></i> Add Test File
        </button>
      </div>

      {/* Test Table */}
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
          {testData.map((test) => (
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
      <Pagination />
    </div>
  );
};

export default TestTab;
