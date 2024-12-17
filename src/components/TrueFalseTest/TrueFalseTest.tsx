import React from "react";
import "./TrueFalseTest.css";

export default function TrueFalseTest() {
  return (
    <div className="true-false-container">
      <h1>14.</h1>
      <select>
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
        <option value="not-given">NOT GIVEN</option>
      </select>
      <h1>Heritage Farm is different from most other nearby farms.</h1>
    </div>
  );
}
