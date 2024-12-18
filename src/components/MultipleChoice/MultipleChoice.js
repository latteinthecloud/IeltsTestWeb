import React, { useState } from "react";
import "./MultipleChoice.css";

const MultipleChoice = () => {
  const [hint, setHint] = useState("");
  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState("A");

  // Xử lý thay đổi input đáp án
  const handleOptionChange = (key, value) => {
    setOptions({ ...options, [key]: value });
  };

  return (
    <div className="question-container">
      {/* Hint Input */}
      <label className="label">Content</label>
      <input
        type="text"
        placeholder="Hint...."
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        className="input-hint"
      />

      {/* Các lựa chọn A, B, C, D */}
      {["A", "B", "C", "D"].map((option) => (
        <div key={option} className="option-row">
          <div className="icon"></div>
          <span className="option-label">{option}</span>
          <input
            type="text"
            placeholder={`Option ${option}`}
            value={options[option]}
            onChange={(e) => handleOptionChange(option, e.target.value)}
            className="input-option"
          />
        </div>
      ))}

      {/* Dropdown chọn đáp án đúng */}
      <div className="correct-answer">
        <label className="label">Correct answer</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="dropdown"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
  );
};

export default MultipleChoice;
