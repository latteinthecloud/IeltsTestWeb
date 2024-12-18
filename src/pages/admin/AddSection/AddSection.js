import React, { useState } from "react";
import "./AddSection.css";
import { useLocation } from "react-router-dom";

const AddSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const number = queryParams.get("num"); // Lấy ID của section từ URL

  const [questionCount, setQuestionCount] = useState(3); // Số câu hỏi mặc định
  const [type, setType] = useState("Multiple choice"); // Loại câu hỏi mặc định

  return (
    <div className="layout-add-section">
      <div className="title">Section {number}</div>

      {/* Main Container */}
      <div className="add-section-container">
        {/* Row: Type và Number of Question */}
        <div className="header-row">
          <div className="form-group">
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="dropdown"
            >
              <option value="Multiple choice">Multiple choice</option>
              <option value="True/False">True/False</option>
              <option value="Short answer">Short answer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of question</label>
            <input
              type="number"
              min="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="number-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
