import React from "react";
import "./StartTestFooter.css";
import QuestionPalette from "../../components/QuestionPalette/QuestionPalette.tsx";

export default function StartTestFooter() {
  return (
    <div className="start-footer-container">
      <QuestionPalette></QuestionPalette>
    </div>
  );
}
