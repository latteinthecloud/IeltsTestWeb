import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ExercisePage.css";
import TestCard from "../../components/TestCard/TestCard";
import Pagination from "../../components/Pagination/Pagination";

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
  const [activeSkill, setActiveSkill] = useState("listening");
  const navigate = useNavigate();

  const handleCreateTest = () => {
    if (activeSkill === "listening") {
      navigate("/exercise/create-listening-test");
    } else if (activeSkill === 'reading') { 
      navigate("/exercise/create-reading-test")   
     }
  };

  return (
    <div className="exercise-page">
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
        <button className="create-test" onClick={handleCreateTest}>
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
