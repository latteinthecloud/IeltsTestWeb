import React from "react";
import "./TrueFalseTest.css";

interface TrueFalseTestProps {
  questionOrder: number;
  content: string;
  answers: Map<number, string>;
  handleAnswerChange: (questionNumber: number, answer: string) => void;
}

export default function TrueFalseTest({
  questionOrder,
  content,
  answers,
  handleAnswerChange,
}: TrueFalseTestProps) {
  const selectedAnswer = answers.get(questionOrder) || "";
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const answer = e.target.value;
    handleAnswerChange(questionOrder, answer);
  };

  return (
    <div className="true-false-container">
      <h1>
        <strong>{questionOrder}.</strong>
      </h1>
      <select value={selectedAnswer} onChange={handleSelectChange}>
        <option value=""></option>
        <option value="TRUE">TRUE</option>
        <option value="FALSE">FALSE</option>
        <option value="NOT GIVEN">NOT GIVEN</option>
      </select>
      <h1>{content}</h1>
    </div>
  );
}
