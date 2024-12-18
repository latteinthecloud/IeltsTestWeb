import React, { useState } from "react";
import "../../components/Section/Section.css"; // Import CSS file
import "./SectionListen.css";

const SectionListen = ({ numberOfSections }) => {
  const [sections, setSections] = useState(
    Array.from({ length: numberOfSections }, (_, index) => ({
      id: index + 1,
      timestamp: "",
      contentFile: null,
      transFile: null,
    }))
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  const handleInputChange = (id, field, value) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: "",
      contentFile: null,
      imageFile: null,
    };
    setSections([...sections, newSection]);
  };

  const handleIconClick = (sectionId) => {
    setSelectedSection(sectionId);
    setShowModal(true);
  };

  const handleSaveTimestamp = () => {
    const formattedMinute = minute.padStart(2, "0");
    const formattedSecond = second.padStart(2, "0");
    const timestamp = `${formattedMinute}:${formattedSecond}`;
    handleInputChange(selectedSection, "timestamp", timestamp);
    setShowModal(false);
  };
  

  return (
    <div>
      <h3>Total Questions: {sections.length}</h3>
      {sections.map((section) => (
        <div key={section.id} className="container">
          <h4>
            <i className="fa-solid fa-circle"></i> Section {section.id}
          </h4>

          {/* Title (with readOnly) */}
          <div className="layout">
            <label>Timestamp</label>
            <div className="time-wrapper">
              <input
                type="timestamp"
                placeholder="00:00:00"
                value={section.timestamp}
                readOnly
              />
              <i
                className="fa-regular fa-clock button-time"
                onClick={() => handleIconClick(section.id)}
              ></i>
            </div>
          </div>

          {/* Transcript */}
          <div className="layout">
            <label>Transcript </label>
            <div className="file-wrapper">
              <input
                type="textSection"
                placeholder="Browse your file"
                value={section.transFile ? section.transFile.name : ""}
                readOnly
              />
              <input
                type="file"
                id={`trans-${section.id}`}
                className="hidden-file-input"
                onChange={(e) =>
                  handleInputChange(section.id, "transFile", e.target.files[0])
                }
              />
              <label htmlFor={`trans-${section.id}`} className="icon-button">
                <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
              </label>
            </div>
          </div>

          {/* Add Section Button */}
          <div className="add-section">
            <button onClick={handleAddSection} className="add-button">
              <i className="fa-solid fa-circle-plus"></i> Parts
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Select Timestamp</h4>
            <div className="modal-content">
              <label>Minute:</label>
              <input
              type="number"
              value={minute}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 && value <= 59) {
                  setMinute(value);
                }
              }}
              min="0"
              max="59"
            />
              <label>Second:</label>
              <input
                type="number"
                value={second}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0 && value <= 59) {
                    setSecond(value);
                  }
                }}
                min="0"
                max="59"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSaveTimestamp}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionListen;
