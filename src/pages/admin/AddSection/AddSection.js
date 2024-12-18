import React, { useState } from "react";
import "./AddSection.css";
import { useLocation } from "react-router-dom";
import MultipleChoice from "../../../components/MultipleChoice/MultipleChoice";
import TrueFalse from "../../../components/TrueFalse/TrueFalse";
import Matching from "../../../components/Matching/Matching";
// import Complete from "../../../components/Complete/Complete";
// import Diagram from "../../../components/Diagram/Diagram";

const AddSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const number = queryParams.get("num"); // Lấy ID của section từ URL

  // Quản lý trạng thái cho các section với thông tin riêng biệt
  const [sections, setSections] = useState([
    { id: 1, questionCount: 3, type: "Multiple choice" },
  ]);

  // Hàm thêm section mới
  const addSection = () => {
    setSections([
      ...sections,
      { id: sections.length + 1, questionCount: 3, type: "Multiple choice" },
    ]);
  };

  // Hàm cập nhật trạng thái cho từng section
  const updateSection = (id, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  // Hàm render các câu hỏi tùy thuộc vào loại
  const renderQuestions = (section) => {
    switch (section.type) {
      case "Multiple choice":
        return Array.from({ length: section.questionCount }).map((_, index) => (
          <MultipleChoice key={index} numberOfQuestion={index + 1} />
        ));
      case "True/False":
        return Array.from({ length: section.questionCount }).map((_, index) => (
          <TrueFalse key={index} numberOfQuestion={index + 1} />
        ));
      case "Matching":
        return Array.from({ length: section.questionCount }).map((_, index) => (
          <Matching key={index} numberOfQuestion={index + 1} />
        ));
      // case "Complete":
      //   return Array.from({ length: section.questionCount }).map((_, index) => (
      //     <Complete key={index} numberOfQuestion={index + 1} />
      //   ));
      // case "diagram":
      //   return Array.from({ length: section.questionCount }).map((_, index) => (
      //     <Diagram key={index} numberOfQuestion={index + 1} />
      //   ));
      default:
        return null;
    }
  };

  return (
    <div className="layout-add-section">
      <div className="title">Section {number}</div>
      <div className="section-header">
        <text>Total questions: </text>
        <div
          className="add-parts"
          onClick={addSection}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-circle-plus"></i>
          <text>Parts</text>
        </div>
      </div>

      {/* Render các Section */}
      {sections.map((section) => (
        <div key={section.id} className="add-section-container">
          {/* Row: Type và Number of Question */}
          <div className="header-row">
            <div className="form-group">
              <label>Type</label>
              <select
                value={section.type}
                onChange={(e) =>
                  updateSection(section.id, "type", e.target.value)
                }
                className="dropdown-type"
              >
                <option value="Multiple choice">Multiple choice</option>
                <option value="True/False">True/False</option>
                <option value="Matching">Matching</option>
                <option value="Complete">Complete</option>
                <option value="diagram">Diagram</option>
              </select>
            </div>

            <div className="form-group">
              <label>Number of question</label>
              <input
                type="number"
                min="1"
                value={section.questionCount}
                onChange={(e) =>
                  updateSection(
                    section.id,
                    "questionCount",
                    Number(e.target.value)
                  )
                }
                className="number-input"
              />
            </div>
          </div>

          {/* Render câu hỏi */}
          <div className="question">{renderQuestions(section)}</div>
        </div>
      ))}

      <div className="confirm-btn">Confirm</div>
    </div>
  );
};

export default AddSection;
