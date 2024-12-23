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
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const [sortOrder, setSortOrder] = useState<string>("ascending");
  const [testData, setTestData] = useState<Test[]>([]); // Dữ liệu bài kiểm tra
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"reading" | "listening" | null>(
    null
  );

  const handleAddTestClick = () => {
    setShowModal(true); // Hiển thị modal
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchTests = async () => {
    setLoading(true);
    try {
      const response = await testApi.getAll(); // Gọi API lấy tất cả bài kiểm tra
      if (Array.isArray(response)) {
        setTestData(response as Test[]);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchTests = async (query: string) => {
    setLoading(true);
    try {
      const response = await testApi.find(query); // Gọi API tìm kiếm
      if (Array.isArray(response)) {
        setTestData(response as Test[]);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error searching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Lấy dữ liệu khi khởi tạo component
    fetchTests();
  }, []);

  const handleSave = () => {
    alert(
      `Saved data for ${
        activeTab === "reading" ? "Reading" : "Listening"
      } test.`
    );
    setShowModal(false); // Đóng modal
  };

  const handleClose = () => {
    setActiveTab(null);
    alert("Modal closed.");
    setShowModal(false); // Đóng modal
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchTests(); // Lấy tất cả dữ liệu nếu ô tìm kiếm trống
    } else {
      searchTests(searchTerm); // Gọi API tìm kiếm khi có từ khóa
    }
  }, [searchTerm]);

  const sortedData = [...testData].sort((a, b) =>
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
        width: "793px",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Test</h2>
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
          <input
            type="text"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              width: "300px",
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
              width: "120px",
            }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <RoundedButton
            title="Add Test File"
            icon={<i className="fas fa-plus"></i>}
            colors={["#2ecc71", "#27ae60"]}
            onClick={handleAddTestClick}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
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
                  ID
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Skill
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
                  Tests taken
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((test) => (
                <tr key={test.testId}>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "20px",
                    }}
                  >
                    {test.testId}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {test.testType.charAt(0).toUpperCase() +
                      test.testType.slice(1)}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {test.testSkill.charAt(0).toUpperCase() +
                      test.testSkill.slice(1)}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {test.name}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {test.monthEdition}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {test.yearEdition}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {test.userCompletedNum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={testData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />

          {/* Modal */}

          {showModal && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                  width: "500px",
                  textAlign: "center",
                }}
              >
                <h3 style={{ marginBottom: "20px" }}>Upload Test File</h3>

                {/* Nút Listening / Reading */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <RoundedButton
                    title="Listening"
                    colors={
                      activeTab === "listening"
                        ? ["#33B2C7", "#268695"] // Gradient xanh nước khi active
                        : ["#d3d3d3", "#a9a9a9"] // Gradient xám khi không active
                    }
                    onClick={() => setActiveTab("listening")}
                    icon={<i className="fa-solid fa-headphones-simple"></i>}
                  />
                  <RoundedButton
                    title="Reading"
                    colors={
                      activeTab === "reading"
                        ? ["#337845", "#265A35"] // Gradient xanh lá khi active
                        : ["#d3d3d3", "#a9a9a9"] // Gradient xám khi không active
                    }
                    onClick={() => setActiveTab("reading")}
                    icon={<i className="fa-regular fa-file"></i>}
                  />
                </div>

                {/* Nội dung của Reading */}
                {activeTab === "reading" && (
                  <div
                    style={{
                      border: "2px dashed #ddd",
                      borderRadius: "10px",
                      padding: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="fa-solid fa-upload"
                      style={{ fontSize: "30px", color: "#007bff" }}
                    ></i>
                    <p style={{ margin: "10px 0" }}>Drag and Drop here or</p>
                    <button
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => alert("Reading file selected")}
                    >
                      Select file
                    </button>
                  </div>
                )}

                {/* Nội dung của Listening */}
                {activeTab === "listening" && (
                  <>
                    {/* Upload file bài */}
                    <div
                      style={{
                        border: "2px dashed #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <i
                        className="fa-solid fa-upload"
                        style={{ fontSize: "30px", color: "#007bff" }}
                      ></i>
                      <p style={{ margin: "10px 0" }}>
                        Drag and Drop Test File here or
                      </p>
                      <button
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => alert("Listening test file selected")}
                      >
                        Select Test File
                      </button>
                    </div>

                    {/* Upload file âm thanh */}
                    <div
                      style={{
                        border: "2px dashed #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <i
                        className="fa-solid fa-upload"
                        style={{ fontSize: "30px", color: "#007bff" }}
                      ></i>
                      <p style={{ margin: "10px 0" }}>
                        Drag and Drop Audio File here or
                      </p>
                      <button
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => alert("Listening audio file selected")}
                      >
                        Select Audio File
                      </button>
                    </div>
                  </>
                )}

                {/* Nút Save và Close */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px", // Khoảng cách giữa hai nút
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={handleSave}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#2ecc71",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleClose}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TestTab;
