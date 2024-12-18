import React, { useState, useEffect } from "react";
import "./Matching.css";

const Matching = ({ initialCount = 1 }) => {
  const [title, setTitle] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Khởi tạo state choices và matchings
  const [choices, setChoices] = useState([]);
  const [matchings, setMatchings] = useState([]);

  // Khi initialCount thay đổi, cập nhật choices và matchings
  useEffect(() => {
    const count = Math.min(Math.max(initialCount, 1), 26); // Giới hạn từ 1 -> 26
    setChoices((prevChoices) => {
      const updatedChoices = Array(count).fill("");
      return updatedChoices.map((_, idx) => prevChoices[idx] || "");
    });
    setMatchings((prevMatchings) => {
      const updatedMatchings = Array(count).fill({ option: "", match: "A" });
      return updatedMatchings.map(
        (_, idx) => prevMatchings[idx] || { option: "", match: "A" }
      );
    });
  }, [initialCount]);

  // Cập nhật choices
  const updateChoice = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  // Cập nhật Matching
  const updateMatching = (index, field, value) => {
    const updatedMatchings = [...matchings];
    updatedMatchings[index][field] = value;
    setMatchings(updatedMatchings);
  };

  return (
    <div className="matchingContainer">
      {/* Tiêu đề */}
      <div className="title-section">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
      </div>

      {/* Choices */}
      <div className="choices-section">
        <label>Choices</label>
        {choices.map((_, index) => (
          <div key={index} className="choice-row">
            <span className="choice-label">
              <div class="icon"></div> {alphabet[index]}
            </span>
            <input
              type="text"
              placeholder={`Option ${alphabet[index]}`}
              value={choices[index]}
              onChange={(e) => updateChoice(index, e.target.value)}
              className="input-choice"
            />
          </div>
        ))}
      </div>

      {/* Matching */}
      <div className="matching-section">
        <label>Matching</label>
        {matchings.map((match, index) => (
          <div key={index} className="matching-row">
            <input
              type="text"
              placeholder="Matching option"
              value={match.option}
              onChange={(e) => updateMatching(index, "option", e.target.value)}
              className="input-matching"
            />
            <select
              value={match.match}
              onChange={(e) => updateMatching(index, "match", e.target.value)}
              className="dropdown-matching"
            >
              {choices.map((_, choiceIndex) => (
                <option key={choiceIndex} value={alphabet[choiceIndex]}>
                  {alphabet[choiceIndex]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matching;
