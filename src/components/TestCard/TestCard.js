import React from "react";
import "./TestCard.css";

const TestCard = ({ test }) => {
  return (
    <div className="test-card">
      <div className="test-image">
        <div className="placeholder"></div>
      </div>
      <div className="test-details">
        <h3>Test {test.id}</h3>
        {test.sections.map((section, index) => (
          <p key={index}>Section {index + 1}: {section}</p>
        ))}
      </div>
    </div>
  );
};

export default TestCard;
