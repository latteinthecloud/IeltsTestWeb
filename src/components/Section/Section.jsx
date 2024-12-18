import React, { useState } from "react";
import "./Section.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Section = ({ numberOfSections }) => {
  const [sections, setSections] = useState(
    Array.from({ length: numberOfSections }, (_, index) => ({
      num: index + 1,
      title: "",
      contentFile: null,
      imageFile: null,
    }))
  );

  const handleInputChange = (num, field, value) => {
    const updatedSections = sections.map((section) =>
      section.num === num ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const navigate = useNavigate(); // Hook để chuyển hướng

  const handleAddSection = (num) => {
    navigate(`/admin-add-section?num=${num}`);
  };

  return (
    <div>
      <h3>Total Questions: {sections.length}</h3>
      {sections.map((section) => (
        <div key={section.num} className="container">
          <h4>
            <i className="fa-solid fa-circle"></i> Section {section.num}
          </h4>

          {/* Title */}
          <div className="layout">
            <label>Title: </label>
            <input
              type="textSection"
              placeholder="Enter section title"
              value={section.title}
              onChange={(e) =>
                handleInputChange(section.num, "title", e.target.value)
              }
            />
          </div>

          {/* Content */}
          <div className="layout">
            <label>Content: </label>
            <div className="file-wrapper">
              <input
                type="text"
                placeholder="Browse your file"
                value={section.contentFile ? section.contentFile.name : ""}
                readOnly
              />
              <input
                type="file"
                id={`content-${section.num}`}
                className="hidden-file-input"
                onChange={(e) =>
                  handleInputChange(section.num, "contentFile", e.target.files[0])
                }
              />
              <label
                htmlFor={`content-${section.num}`}
                className="icon-button"
              >
                <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
              </label>
            </div>
          </div>

          {/* Image */}
          <div className="layout">
            <label>Image: </label>
            <div className="file-wrapper">
              <input
                type="text"
                placeholder="Browse your file"
                value={section.imageFile ? section.imageFile.name : ""}
                readOnly
              />
              <input
                type="file"
                id={`image-${section.num}`}
                className="hidden-file-input"
                onChange={(e) =>
                  handleInputChange(section.num, "imageFile", e.target.files[0])
                }
              />
              <label
                htmlFor={`image-${section.num}`}
                className="icon-button"
              >
                <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
              </label>
            </div>
          </div>

          {/* Add Section Button */}
          <div className="add-section">
            <button
              onClick={() => handleAddSection(section.num)}
              className="add-button"
            >
              <i className="fa-solid fa-circle-plus"></i> Parts
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section;
