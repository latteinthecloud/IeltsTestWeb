import React from "react";
import "./TrueFalseTest.css";

interface TrueFalseTestProps {
  questionOrder: number;
  content: string;
  answer?: string;
}

export default function TrueFalseTest({
  questionOrder,
  content,
}: TrueFalseTestProps) {
  return (
    <div className="true-false-container">
      <h1>
        <strong>{questionOrder}.</strong>
      </h1>
      <select>
        <option value=""></option>
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
        <option value="not-given">NOT GIVEN</option>
      </select>
      <h1>{content}</h1>
    </div>
  );
}
