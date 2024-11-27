import React, { useState } from "react";
import "../../styles/CreateReadingTestPage.css";

const sections = [
  {
    title: "Section 1",
    tasks: ["Completion", "Multiple Choice", "Matching", "True/False", "Diagram"],
  },
  {
    title: "Section 2",
    tasks: ["Completion", "Multiple Choice", "Matching", "True/False", "Diagram"],
  },
  {
    title: "Section 3",
    tasks: ["Completion", "Multiple Choice", "Matching", "True/False", "Diagram"],
  },
  {
    title: "Section 4",
    tasks: ["Completion", "Multiple Choice", "Matching", "True/False", "Diagram"],
  },
];

const CreateReadingTestPage = () => {
  const [activeType, setActiveType] = useState({}); // Tracks active task per section

  // Function to handle task activation
  const handleTaskClick = (sectionIndex, task) => {
    setActiveType((prevState) => ({
      ...prevState,
      [sectionIndex]: task,
    }));
  };

  return (
    <div className="create-reading-test-page">
      {/* Input field for Name */}
      <div className="input-name">
        <input
          type="text"
          id="testName"
          className="name-input"
          placeholder="Enter reading test name"
        />
      </div>

      {/* Sections */}
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h2>{section.title}:</h2>
          <div className="tasks">
            {section.tasks.map((task, taskIndex) => (
              <button
                key={taskIndex}
                className={`task-button ${
                  activeType[sectionIndex] === task ? "active" : ""
                }`}
                onClick={() => handleTaskClick(sectionIndex, task)}
              >
                {task}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Create button */}
      <div className="bottom-create">
        <button className="create-button">+ Create</button>
      </div>
    </div>
  );
};

export default CreateReadingTestPage;
