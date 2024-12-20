import React from "react";
import "./MatchingTest.css";

interface MatchingTestProps {
  questionOrder: number;
  content: string;
  optionCount: number;
  answer?: string;
}

export default function MatchingTest({
  questionOrder,
  optionCount,
  content,
}: MatchingTestProps) {
  const options = Array.from({ length: optionCount }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="matching-test-container">
      <div className="matching-test-option">
        <h1>{questionOrder}.</h1>
        <select>
          <option value=""></option>
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
