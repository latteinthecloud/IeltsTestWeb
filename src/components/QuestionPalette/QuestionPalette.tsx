import React from "react";
import "./QuestionPalette.css";

interface QuestionPaletteProps {
  sectionOrder: number;
  startQuestion: number;
  endQuestion: number;
  status?: string;
  onClick: () => void;
}

export default function QuestionPalette({
  sectionOrder,
  startQuestion,
  endQuestion,
  status = "",
  onClick,
}: QuestionPaletteProps) {
  const numList = Array.from(
    { length: endQuestion - startQuestion + 1 },
    (_, i) => startQuestion + i
  );

  return (
    <div
      className={`question-palette-container ${
        status === "active" ? "active" : ""
      }`}
      onClick={onClick}
    >
      <h1>Part {sectionOrder}</h1>
      {numList.map((num, index) => {
        return <h2 key={num}>{num}</h2>;
      })}
    </div>
  );
}
