import React from "react";
import "./DiagramTest.css";

export default function DiagramTest() {
  return (
    <div className="diagram-test-container">
      <img src="https://ieltsonlinetests.com/sites/default/files/2023-09/Screenshot%202023-09-12%20140046.png"></img>
      <div className="diagram-input-container">
        <h1>1.</h1>
        <div className="input-wrapper">
          <input placeholder="Write your answer"></input>
        </div>
      </div>
    </div>
  );
}
