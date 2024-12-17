import React, { useState, useEffect } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import "./StartTestHeader.css"

export default function StartTestHeader(){
    const [remainingMinutes, setRemainingMinutes] = useState(60);  // Số phút ban đầu

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
            <img className="logo-start" src={require("../../assets/logo.png")}>
            </img>
            <div className="timer-container">
                <img src={require("../../assets/alarm.png")} alt="logo"></img>
                <h1><span className="time-left">{remainingMinutes}</span> minutes remaining</h1>
            </div>
            <div className="start-header-button-container">
                <RoundedButton 
                    title="Review"
                    icon={<img src={require("../../assets/review.png")} alt="review-icon"></img>}
                    colors={["#33B2C7","#268695"]}
                    onClick={()=>{}}>
                </RoundedButton>
                <RoundedButton 
                    title="Submit"
                    icon={<img src={require("../../assets/send.png")} alt="send-icon"></img>} 
                    onClick={()=>{}}>
                </RoundedButton>
                <RoundedButton
                    title="Exit"
                    icon ={<img src={require("../../assets/logout.png")} alt="exit-icon"></img>}
                    colors={["#001f80","#040160"]}
                    onClick={()=>{}}>
                </RoundedButton>
            </div>
        </div>
    );
}