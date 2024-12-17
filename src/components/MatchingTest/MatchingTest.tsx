import React from "react";
import "./MatchingTest.css";

export default function MatchingTest() {
  return (
    <div className="matching-test-container">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>List of people</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong>A</strong>
            </td>
            <td>A content</td>
          </tr>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>B content</td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>C content</td>
          </tr>
        </tbody>
      </table>

      <div className="matching-test-option">
        <h1>12.</h1>
        <select>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <h1>
          The educational system makes students aware of how their memory works.
        </h1>
      </div>
    </div>
  );
}
