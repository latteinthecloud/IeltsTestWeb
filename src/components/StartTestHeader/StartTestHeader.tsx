import React, { useState, useEffect } from "react";
import "./StartTestHeader.css"
import ReviewButton from "../TestButton/ReviewButton.tsx";
import ExitButton from "../TestButton/ExitButton.tsx";
import SubmitButton from "../TestButton/SubmitButton.tsx";

interface StartTestHeaderProps{
  time: number;
  totalQuestion: number;
  answers: Map<number,string>;
  skill: any;
  testId: any;
}

export default function StartTestHeader({time, totalQuestion, answers, skill, testId}: StartTestHeaderProps){
    const [remainingMinutes, setRemainingMinutes] = useState(time);

    useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingMinutes(prev => {
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
            <img className="logo-start" src={require("../../assets/logo.png")} alt="logo">
            </img>
            <div className="timer-container">
                <img src={require("../../assets/alarm.png")} alt="timer"></img>
                <h1><span className="time-left">{remainingMinutes}</span> minutes remaining</h1>
            </div>
            <div className="start-header-button-container">
                <ReviewButton answers={answers} totalQuestion={totalQuestion}/>
                <SubmitButton 
                    minute={time - remainingMinutes}
                    totalQuestion={totalQuestion}
                    skill={skill}
                    testId={testId}
                    answers={answers}>
                </SubmitButton>
                <ExitButton/>
            </div>
        </div>
    );
}