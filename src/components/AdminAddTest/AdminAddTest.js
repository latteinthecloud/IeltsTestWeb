import React, { useState, useEffect } from "react";
import testApi from "../../api/testApi";
import { useNavigate} from "react-router-dom";
import "./AdminAddTest.css";

const AddTestPage = () => {
  // State to store test data
  const [testData, setTestData] = useState({
    testType: "general", // Default value
    testSkill: "reading", // Default value
    name: "",
    monthEdition: 1, // Default value
    yearEdition: 2012, // Default value
  });

  // State to handle error or success messages
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("testData");
    if (savedData) {
      setTestData(JSON.parse(savedData));
    }
  }, []);

  // Handle input field changes and save to localStorage
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newTestData = { ...testData, [name]: value };
    setTestData(newTestData);
    localStorage.setItem("testData", JSON.stringify(newTestData)); // Save to localStorage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Gửi yêu cầu POST đến API để tạo bài kiểm tra mới
      const response = await testApi.create(testData);
  
      // Debug response structure
      console.log("API Response:", response);
  
      // Kiểm tra xem response có dữ liệu không
      // if (!response || !response.data) {
      //   throw new Error("Invalid response from server.");
      // }
  
      // Trích xuất testId và testSkill từ response
      const { testId} = response.testId;

  
      // Hiển thị thông báo thành công
      setMessage("Test Created!"); 
  
      // Chuyển hướng tới trang phù hợp dựa trên testSkill
      if (response.testSkill === "listening") {
        navigate("/admin-add-test/admin-add-section", {
          state: {testId },  // Pass testId to the listening section
        });
      } else if (response.testSkill === "reading") {
        navigate("/admin-add-test/admin-add-sectionR", {
          state: { testId },  // Pass testId to the reading section
        });
      } else {
        throw new Error("Invalid testSkill value");
      }
    } catch (err) {
      console.error("Error creating test:", err); // Log lỗi để dễ dàng debug
      setMessage("Error creating test: " + (err.response?.data?.message || err.message));
    } finally {
      // Đảm bảo setLoading luôn được đặt lại về false
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="add-test-page">
      <h1>Add New Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="testType">Test Type</label>
          <select
            id="testType"
            name="testType"
            value={testData.testType}
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="academic">Academic</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="testSkill">Test Skill</label>
          <select
            id="testSkill"
            name="testSkill"
            value={testData.testSkill}
            onChange={handleChange}
          >
            <option value="reading">Reading</option>
            <option value="listening">Listening</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Test Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={testData.name}
            onChange={handleChange}
            placeholder="Enter test name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="monthEdition">Month Edition</label>
          <input
            type="number"
            id="monthEdition"
            name="monthEdition"
            value={testData.monthEdition}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearEdition">Year Edition</label>
          <input
            type="number"
            id="yearEdition"
            name="yearEdition"
            value={testData.yearEdition}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTestPage;
