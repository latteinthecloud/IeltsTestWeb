import React, { useState, useEffect } from "react";
import "./Complete.css";

const Complete = ({ initialCount = 4 }) => {
  const [content, setContent] = useState(""); // State cho ô input content
  const [answers, setAnswers] = useState(Array(initialCount).fill("")); // State cho các câu trả lời

  // Cập nhật khi initialCount thay đổi
  useEffect(() => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = Array(initialCount).fill("");
      return updatedAnswers.map((_, idx) => prevAnswers[idx] || "");
    });
  }, [initialCount]);

  // Cập nhật giá trị cho từng ô answer
  const updateAnswer = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // Hàm xử lý file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Lấy file đầu tiên được chọn
    if (file) {
      setContent(file.name); // Cập nhật tên file vào state content
    }
  };

  return (
    <div className="complete-container">
      {/* Content */}
      <div className="content-section">
        <label className="section-title">Content</label>
        <div className="content-input-wrapper">
          <input
            type="textComplete"
            placeholder="C:/Download"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-content"
            readOnly
          />
          {/* Input file ẩn */}
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
          </label>
        </div>
      </div>

      {/* Answer */}
      <div className="answer-section">
        <label className="section-title">Answer</label>
        {answers.map((answer, index) => (
          <div key={index} className="answer-row">
            <div className="icon"></div>
            <input
              type="textComplete"
              placeholder={`Answer ${index + 1}`}
              value={answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
              className="input-answer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complete;
