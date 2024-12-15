import React, { useState, useEffect } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import "./StartTestHeader.css";

export default function StartTestHeader() {
  const [remainingMinutes, setRemainingMinutes] = useState(5); // Số phút ban đầu

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingMinutes((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          alert("Test is over!");
          return 0;
        }
        return prev - 1;
      });
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="start-header-container">
      <img className="logo-start" src={require("../../assets/logo.png")}></img>
      <div className="timer-container">
        <img src={require("../../assets/alarm.png")} alt="logo"></img>
        <h1>
          <span className="time-left">{remainingMinutes}</span> minutes
          remaining
        </h1>
      </div>
      <div className="start-header-button-container">
        <RoundedButton
          title="Review"
          icon={
            <img
              src={require("../../assets/review.png")}
              alt="review-icon"
            ></img>
          }
          colors={["#FFCA44", "#B79339"]}
          onClick={() => {}}
        ></RoundedButton>
        <RoundedButton
          title="Submit"
          icon={
            <img src={require("../../assets/send.png")} alt="send-icon"></img>
          }
          onClick={() => {}}
        ></RoundedButton>
        <button className="exit-button">
          <img src={require("../../assets/logout.png")}></img>
        </button>
      </div>
    </div>
  );
}
