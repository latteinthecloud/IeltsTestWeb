import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for React Router v6+
import testApi from "../../api/testApi";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import Pagination from "../Pagination/Pagination.js";

interface Test {
  testId: string;
  testType: string;
  testSkill: string;
  name: string;
  monthEdition: string;
  yearEdition: number;
  userCompletedNum: number;
}

function TestTab() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("ascending");
  const [testData, setTestData] = useState<Test[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleAddTestClick = () => {
    navigate("/admin-add-test");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await testApi.getAll();
        if (Array.isArray(response)) {
          setTestData(response as Test[]);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = testData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "newest"
      ? b.yearEdition - a.yearEdition
      : a.yearEdition - b.yearEdition
  );

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Tests</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <RoundedButton
            title="Add Test File"
            icon={<i className="fas fa-plus"></i>}
            colors={["#2ecc71", "#27ae60"]}
            onClick={handleAddTestClick}
          />
          <input
            type="text"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              width: "200px",
            }}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              width: "200px",
            }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              Test ID
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              Test Type
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              Test Skill
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              Name
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              Month Edition
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              Year Edition
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
              }}
            >
              User Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((test) => (
            <tr key={test.testId}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "20px" }}>
                {test.testId}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {test.testType}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {test.testSkill}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {test.name}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {test.monthEdition}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {test.yearEdition}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {test.userCompletedNum}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default TestTab;
