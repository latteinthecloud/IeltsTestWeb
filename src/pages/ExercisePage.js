import React, { useState } from "react";
import "../styles/ExercisePage.css";
import TestCard from "../components/TestCard/TestCard";
import Pagination from "../components/Pagination/Pagination";

const testData = [
  {
    id: "T1",
    sections: [
      "Form Completion",
      "Map/Plan/Diagram Labeling- Sentence Completion",
      "Multiple Choice - Classification",
      "Note Completion",
    ],
  },
  {
    id: "T2",
    sections: [
      "Form Completion",
      "Map/Plan/Diagram Labeling- Sentence Completion",
      "Multiple Choice - Classification",
      "Note Completion",
    ],
  },
  {
    id: "T3",
    sections: [
      "Form Completion",
      "Map/Plan/Diagram Labeling- Sentence Completion",
      "Multiple Choice - Classification",
      "Note Completion",
    ],
  },
];

const ExercisePage = () => {
    const [activeTab, setActiveTab] = useState("academic");
    const [activeSkill, setActiveSkill] = useState("listening");
  
    return (
      <div className="exercise-page">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "academic" ? "active" : ""}
            onClick={() => setActiveTab("academic")}
          >
            <i className="fas fa-user-graduate"></i> Academic Test
          </button>
          <button
            className={activeTab === "general" ? "active" : ""}
            onClick={() => setActiveTab("general")}
          >
            <i className="fas fa-users"></i> General Training Test
          </button>
        </div>
  
        {/* Skill Filters and Create Test Button */}
        <div className="filters">
          <div className="skills">
            <button
              className={activeSkill === "listening" ? "active" : ""}
              onClick={() => setActiveSkill("listening")}
            >
              <i className="fas fa-headphones-alt"></i> Listening
            </button>
            <button
              className={activeSkill === "reading" ? "active" : ""}
              onClick={() => setActiveSkill("reading")}
            >
              <i className="fas fa-book"></i> Reading
            </button>
          </div>
          <button className="create-test">
            <i className="fas fa-plus"></i> Create Test
          </button>
        </div>
  
        {/* Test Cards */}
        <div className="test-cards">
          {testData.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
  
        {/* Pagination */}
        <Pagination />
      </div>
    );
  };

export default ExercisePage;
