import React from "react";
import "./MatchingTest.css";

interface MatchingTestProps {
  questionOrder: number;
  content: string;
  choiceList: string;
  answer: string;
}

export default function MatchingTest({
  questionOrder,
  choiceList,
  content,
  answer,
}: MatchingTestProps) {
  const options = choiceList.split("\\n");

  return (
    <div className="matching-test-container">
      <div className="matching-test-option">
        <h1>{questionOrder}.</h1>
        <select>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <h2>{content}</h2>
      </div>
    </div>
  );
}
