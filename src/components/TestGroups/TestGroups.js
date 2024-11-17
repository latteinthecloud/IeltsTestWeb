import React from "react";
import "./TestGroups.css";

const testData = [
  {
    year: 2023,
    months: [
      { name: "January", testsTaken: 1235875 },
      { name: "February", testsTaken: 1235875 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 1235875 },
      { name: "May", testsTaken: 1235875 },
      { name: "June", testsTaken: 1235875 },
      { name: "July", testsTaken: 1235875 },
      { name: "August", testsTaken: 1235875 },
      { name: "September", testsTaken: 1235875 },
      { name: "October", testsTaken: 1235875 },
      { name: "February", testsTaken: 1235875 },
      { name: "March", testsTaken: 1235875 },
    ],
  },
  {
    year: 2024,
    months: [
      { name: "January", testsTaken: 1235875 },
      { name: "February", testsTaken: 1235875 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 1235875 },
      { name: "May", testsTaken: 1235875 },
      { name: "June", testsTaken: 1235875 },
      { name: "July", testsTaken: 1235875 },
      { name: "August", testsTaken: 1235875 },
      { name: "September", testsTaken: 1235875 },
      { name: "October", testsTaken: 1235875 },
      { name: "February", testsTaken: 1235875 },
      { name: "March", testsTaken: 1235875 },
    ],
  },
];

const TestGroups = () => {
  return (
    <div className="test-groups">
      {testData.map((group, index) => (
        <div key={index} className="test-group">
          <h3>IELTS Mock Test {group.year}</h3>
          <div className="test-layout">
            {/* Left Section: Cover */}
            <div className="cover">
              <div className="cover-placeholder"> {/* Replace with an image */}
                <p>Cover Placeholder</p>
              </div>
            </div>

            {/* Right Section: Grid of Months */}
            <div className="months">
              {group.months.map((month, idx) => (
                <div key={idx} className="month">
                  <p className="month-name">{month.name}</p>
                  <p className="tests-taken">
                    <i className="icon-lightning"></i> {month.testsTaken.toLocaleString()} tests taken
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestGroups;
