import React from "react";
import "./MultipleChoiceTest.css";

interface MultipleChoiceTestProps {
  questionOrder: number;
  content: string;
  choiceList: string;
  answers: Map<number, string>;
  handleAnswerChange: (questionNumber: number, answer: string) => void;
}

export default function MultipleChoiceTest({
  questionOrder,
  content,
  choiceList,
  answers,
  handleAnswerChange,
}: MultipleChoiceTestProps) {
  const options = choiceList.split("<br>");
  const selectedAnswer = answers.get(questionOrder);

  return (
    <div
      className="test-panel__question-sm-group"
      data-num="27"
      data-q_type="6"
    >
      <div className="test-panel__question-sm-title">
        {questionOrder}. {content}
      </div>
      <div className="test-panel__answer" data-question-item="27">
        {options.map((option, index) => {
          const optionValue = String.fromCharCode(65 + index);
          return (
            <div key={index} className="test-panel__answer-item">
              <span className="test-panel__answer-option">{optionValue}</span>
              <label className="iot-radio">
                <input
                  type="radio"
                  className="radio-iot"
                  name={`q-${questionOrder}`}
                  value={optionValue}
                  defaultChecked={selectedAnswer === optionValue}
                  onChange={() =>
                    handleAnswerChange(questionOrder, optionValue)
                  }
                />
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
