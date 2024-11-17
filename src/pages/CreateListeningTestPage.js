import React from "react";
import "../styles/CreateListeningTestPage.css";

const CreateListeningTestPage = () => {
  const testOptions = [
    "Multiple Choice",
    "Matching",
    "Completion",
    "True-False",
    "Diagram",
  ];

  return (
    <div className="create-test-page">
      <h1>Name</h1>
      <h2>Choose Listen test type you want to practice</h2>
      <div className="test-options">
        {testOptions.map((option, index) => (
          <button key={index} className="test-option">
            {option}
          </button>
        ))}
      </div>
      <div className="bottom-create">
        <button className="create-button">+ Create</button>
      </div>
    </div>
  );
};

export default CreateListeningTestPage;
