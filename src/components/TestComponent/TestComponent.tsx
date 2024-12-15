import React from "react";
import "./TestComponent.css";
import StartButton from "../StartButton/StartButton.tsx";
interface TestComponentProps {
  id: number;
  name: string;
  year: number;
  month: number;
  type: string;
  skill: string;
  completed: number;
}

export default function TestComponent({
  id,
  name,
  year,
  month,
  type,
  skill,
  completed,
}: TestComponentProps) {
  return (
    <div className="test-container">
      <div className="left">
        <img
          className="test-cover"
          src={require("../../assets/Cover.png")}
          alt="cover"
        ></img>

        <div className="info-container">
          <h2>{name}</h2>
          <div className="type-container">
            <h4>{type}</h4>
            <h4>
              {month}/{year}
            </h4>
          </div>
          <div className="text-icon">
            {(skill === "Listening" && (
              <img
                src={require("../../assets/headphones.png")}
                alt="listening-iconcler"
              ></img>
            )) || (
              <img
                src={require("../../assets/message-circle-dots.png")}
                alt="reading-icon"
              ></img>
            )}
            <h3>{skill}</h3>
          </div>
          <div className="text-icon">
            <img src={require("../../assets/user-1.png")} alt="user-icon"></img>
            <h3>{completed} tests taken</h3>
          </div>
        </div>
      </div>
      <StartButton id={id} skill={skill}></StartButton>
    </div>
  );
}
