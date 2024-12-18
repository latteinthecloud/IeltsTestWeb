import React, { useState } from "react";
import "../MultipleChoice/MultipleChoice.css";
import "./TrueFalse.css";

const TrueFalse = ({ numberOfQuestion }) => {
  const [selectedOption, setSelectedOption] = useState("TRUE"); // Giá trị mặc định là TRUE
  const [inputValue, setInputValue] = useState(""); // Input text cho Option A

  return (
    <div className="true-false-container">
      <div className="question-row">
        {/* Ô input để nhập nội dung câu hỏi */}
        <div className="icon"></div>
        <input
          type="text"
          className="question-input"
          placeholder="Option A"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* Dropdown để chọn TRUE hoặc FALSE */}
        <select
          className="true-false-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="TRUE">TRUE</option>
          <option value="FALSE">FALSE</option>
        </select>
      </div>
    </div>
  );
};

export default TrueFalse;
