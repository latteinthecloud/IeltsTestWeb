import React from "react";
import "../styles/CreateReadingTestPage.css"

const sections = [
  {
    title: "Section 1",
    tasks: ["Form Completion", "Note Completion", "Table Completion", "Form Completion"],
  },
  {
    title: "Section 2",
    tasks: ["Sentence Completion", "Multiple Choice", "Map/Plan/Diagram Labeling", "Matching"],
  },
  {
    title: "Section 3",
    tasks: ["Classification", "Multiple Choice", "Map/Plan/Diagram Labeling", "Flow Chart Completion"],
  },
  {
    title: "Section 4",
    tasks: ["Note Completion", "Sentence Completion", "Summary Completion", "Table/Chart Completion"],
  },
];

const CreateReadingTestPage = () => {
  return (
    <div className="create-reading-test-page">
      <h1>Name</h1>
      {sections.map((section, index) => (
        <div key={index} className="section">
          <h2>{section.title}:</h2>
          <div className="tasks">
            {section.tasks.map((task, idx) => (
              <button key={idx} className="task-button">
                {task}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="bottom-create">
        <button className="create-button">+ Create</button>
      </div>
    </div>
  );
};

export default CreateReadingTestPage;
