import React from "react";
import "./CompleteTest.css";

interface CompleteTestProps {
  questionOrder: number;
  answer: string;
}

export default function CompleteTest({
  questionOrder,
  answer,
}: CompleteTestProps) {
  return (
    <input
      className="complete-test-input"
      placeholder={questionOrder.toString()}
    ></input>
  );
}
