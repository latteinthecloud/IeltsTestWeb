import React from "react";
import "./MultipleChoiceTest.css";

interface MultipleChoiceTestProps {
  questionOrder: number;
  content: string;
  choiceList: string;
  answers: Map<number, string>;
  handleAnswerChange: (questionNumber: number, answer: string) => void;
}

interface MultipleChoiceTestProps {
  questionOrder: number;
  content: string;
  choiceList: string;
  answer?: string;
}

export default function MultipleChoiceTest({
  questionOrder,
  content,
  choiceList,
}: MultipleChoiceTestProps) {
  const options = choiceList.split("<br>");

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
        <div className="test-panel__answer-item">
          <span className="test-panel__answer-option">A</span>
          <label className="iot-radio">
            <input
              type="radio"
              className="radio-iot iot-lr-question"
              name="q-27"
              data-num="27"
              value="A"
              id="radio-78074-A"
            />
            {options[0]}
          </label>
        </div>
        <div className="test-panel__answer-item">
          <span className="test-panel__answer-option">B</span>
          <label className="iot-radio">
            <input
              type="radio"
              className="radio-iot iot-lr-question"
              name="q-27"
              data-num="27"
              value="B"
              id="radio-78075-B"
            />
            {options[1]}
          </label>
        </div>
        <div className="test-panel__answer-item">
          <span className="test-panel__answer-option">C</span>
          <label className="iot-radio">
            <input
              type="radio"
              className="radio-iot iot-lr-question"
              name="q-27"
              data-num="27"
              value="C"
              id="radio-78076-C"
            />
            {options[2]}
          </label>
        </div>
        <div className="test-panel__answer-item">
          <span className="test-panel__answer-option">D</span>
          <label className="iot-radio">
            <input
              type="radio"
              className="radio-iot iot-lr-question"
              name="q-27"
              data-num="27"
              value="D"
              id="radio-78077-D"
            />
            {options[3]}
          </label>
        </div>
      </div>
    </div>
  );
}
