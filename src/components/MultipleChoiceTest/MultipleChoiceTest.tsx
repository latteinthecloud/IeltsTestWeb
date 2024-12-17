import React from "react";
import "./MultipleChoiceTest.css";

export default function MultipleChoiceTest() {
  return (
    <div
      className="test-panel__question-sm-group"
      data-num="27"
      data-q_type="6"
    >
      <div className="test-panel__question-sm-title">
        27. The optimum amount of fluorine in fluoridated water is calculated
        partly according to
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
            how hot the area is.
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
            how warm the water is.
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
            how many dental problems there are in the community.
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
            how much fluorine the community chooses to have in its water.
          </label>
        </div>
      </div>
    </div>
  );
}
