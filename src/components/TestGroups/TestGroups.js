import React from 'react';
import './TestGroups.css';

const testData = [
  {
    year: 2023,
    months: [
      { month: 'January', testsTaken: 1235875 },
      { month: 'February', testsTaken: 1235875 },
      // Add more months
    ],
  },
  {
    year: 2024,
    months: [
      { month: 'January', testsTaken: 1235875 },
      { month: 'February', testsTaken: 1235875 },
      // Add more months
    ],
  },
];

const TestGroups = () => {
  return (
    <div className="test-groups">
      {testData.map((group) => (
        <div key={group.year} className="test-group">
          <h3>IELTS Mock Test {group.year}</h3>
          <div className="months">
            {group.months.map((month, index) => (
              <button key={index} className="month">
                {month.month} <br />
                {month.testsTaken.toLocaleString()} test taken
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestGroups;
