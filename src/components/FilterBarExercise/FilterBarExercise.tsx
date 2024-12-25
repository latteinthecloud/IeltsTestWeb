import React, { useState } from "react";
import "./FilterBarExercise.css";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import userTestApi from "../../api/userTestApi.tsx";
import { useAuth } from "../../context/AuthContext.js";

interface FilterBarProps {
  onFilterChange: (filter: string) => void; 
  setModify: any;
}

const FilterBarExercise = ({ onFilterChange, setModify }: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<string>("reading");
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("general");
  const [sections, setSections] = useState<string[]>(["multiple_choice", "multiple_choice", "multiple_choice"]);
  const {user} = useAuth();
  const [error, setError] = useState("");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleCreateClick = () => {
    setActiveFilter("create");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setError("");
    setIsModalOpen(false);
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(event.target.value);
  };
  const handleNameChange = (event) => setTestName(event.target.value);
  const handleTypeChange = (event) => setTestType(event.target.value);
  const handleSectionChange = (index: number, value: string) => {
    setSections((prev) => {
      const updatedSections = [...prev];
      updatedSections[index] = value;
      return updatedSections;
    });
  };

  const handleConfirm = async () => {
    const request1 = {
      accountId: Number(user.id),
      name: testName,
      testType: testType,
      testSkill: selectedSkill,
    };
  
    let response: any = null;
  
    try {
      response = await userTestApi.create(request1);
  
      const request2 = {
        testId: Number(response.id),
        types: sections,
      };
  
      if (selectedSkill === "reading") {
        await userTestApi.createReading(request2);
      } else {
        await userTestApi.createListening(request2);
      }
      setModify(true);
      closeModal();
    } catch (error) {
      setError("Can't find a test that matches all the types described.");

      if (response?.id) {
        try {
          await userTestApi.delete(response.id);
        } catch (deleteError) {
          console.error("Failed to delete test:", deleteError);
        }
      }
    }
  };


  return (
    <div className="filter-container">
      <div className="filter-bar">
        <div className="filter-buttons">
          <button
            className={`filter-button ${
              activeFilter === "all" ? "active all-active" : "all-active"
            }`}
            onClick={() => handleFilterClick("all")}
          >
            <i className="fas fa-border-all"></i> All Skills
          </button>
          <button
            className={`filter-button ${
              activeFilter === "listening"
                ? "active listening-active"
                : "listening-active"
            }`}
            onClick={() => handleFilterClick("listening")}
          >
            <i className="fas fa-headphones-alt"></i> Listening
          </button>
          <button
            className={`filter-button ${
              activeFilter === "reading"
                ? "active reading-active"
                : "reading-active"
            }`}
            onClick={() => handleFilterClick("reading")}
          >
            <i className="fas fa-book"></i> Reading
          </button>
        </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end"}}>
               <img src={require("../../assets/close.png")} alt="close-button" onClick={closeModal}></img>
            </div>
            <h2>Create new test</h2>
            {error && <p className="error-message" style={{color: "red"}}>{error}</p>}
            <div style={{ margin: "0px"}}>
              <div className="first-row">
                <div className="form-group-hint">
                  <label htmlFor="name">Name</label>
                  <input style={{width: "210px"}} type="text" id="name" placeholder="Enter test name" onChange={handleNameChange} />
                </div>
                <div>
                <label htmlFor="skill">Type</label>
                  <select id="type" value={testType} onChange={handleTypeChange}>
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
                  <div>
                  <label htmlFor="skill">Skill</label>
                    <select
                      id="skill"
                      value={selectedSkill}
                      onChange={handleSkillChange}
                    >
                      <option value="reading">Reading</option>
                      <option value="listening">Listening</option>
                    </select>
                </div>
              </div>

              {/* Hiển thị nội dung dựa trên selectedSkill */}
              {selectedSkill === "reading" && (
                <div className="reading">
                  <div className="name-skill">
                    <div className="s1-s2">
                      <div className="form-group-s1">
                        <label htmlFor="section1">Section 1</label>
                        <select id="section1" onChange={(e) => handleSectionChange(0, e.target.value)}>
                          <option value="multiple_choice">
                            Multiple Choice
                          </option>
                          <option value="matching">Matching</option>
                          <option value="complete">Complete</option>
                          <option value="true_false">True/False</option>
                          <option value="diagram">Diagram</option>
                        </select>
                      </div>
                      <div className="form-group-s2">
                        <label htmlFor="section2">Section 2</label>
                        <select id="section2" onChange={(e) => handleSectionChange(1, e.target.value)}>
                          <option value="multiple_choice">
                            Multiple Choice
                          </option>
                          <option value="matching">Matching</option>
                          <option value="complete">Complete</option>
                          <option value="true_false">True/False</option>
                          <option value="diagram">Diagram</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group-s2">
                      <label htmlFor="section3">Section 3</label>
                      <select id="section3" onChange={(e) => handleSectionChange(2, e.target.value)}>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="matching">Matching</option>
                        <option value="complete">Complete</option>
                        <option value="true_false">True/False</option>
                        <option value="diagram">Diagram</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {selectedSkill === "listening" && (
                <div className="listening">
                  <label>Selected types</label>
                  <div className="lis-type">
                    <select id="section1" onChange={(e) => handleSectionChange(0, e.target.value)}>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="matching">Matching</option>
                      <option value="complete">Complete</option>
                      <option value="true_false">True/False</option>
                      <option value="diagram">Diagram</option>
                    </select>

                    <select id="section2" onChange={(e) => handleSectionChange(1, e.target.value)}>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="matching">Matching</option>
                      <option value="complete">Complete</option>
                      <option value="true_false">True/False</option>
                      <option value="diagram">Diagram</option>
                    </select>

                    <select id="section3" onChange={(e) => handleSectionChange(2, e.target.value)}>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="matching">Matching</option>
                      <option value="complete">Complete</option>
                      <option value="true_false">True/False</option>
                      <option value="diagram">Diagram</option>
                    </select>
                  </div>
                </div>
              )}
              <div style={{width: "100%", display:"flex", justifyContent: "center"}}>
                <RoundedButton
                  title="Confirm"
                  onClick={handleConfirm}
                  colors={["#001A72","#1E1E1E"]}>
                </RoundedButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <RoundedButton
            title="Create"
            onClick={handleCreateClick}
            colors={["#FFD700","#FFA500"]}
            icon={<i className="fa-solid fa-plus"></i>}/>
    </div>
  );
};

export default FilterBarExercise;
