import React from "react";
import StartButton from "../StartButton/StartButton.tsx";
interface UserTestProps {
  id: number;
  name: string;
  type: string;
  skill: string;
  completed: number;
  createDate: string;
}

export default function UserTest({
  id,
  name,
  type,
  skill,
  completed,
  createDate
}: UserTestProps) {
  return (
    <div className="test-container">
      <div className="test">
        <img
          className="test-cover"
          src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/avatar-chat-2-29-13-53-35.jpg"
          alt="cover"
        />

        <div className="info-container">
          <div style={{ display: "flex", justifyContent:"flex-start", alignItems: "center", gap: "10px"}}>
            <h2>{name}</h2>
            <img src={require("../../assets/edit.png")} alt="edit-icon"></img>
          </div>
          <div className="type-container">
            <h4>{type}</h4>
            <h4>{createDate}</h4>
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
            <img
              src={require("../../assets/flag.png")}
              alt="flag-icon">
            </img>
            <h3>{completed} completed</h3>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center", // Căn giữa theo chiều dọc
          flexDirection: "column", // Hiển thị theo chiều dọc
          gap: "60px", // Khoảng cách giữa các phần tử
        }}
      >
        <i
          className="fa-regular fa-trash-can"
          style={{
            color: "red",
            fontSize: "24px",
            marginLeft: "60px",
          }}
        ></i>
        <StartButton id={id} skill={skill} testAccess="public"></StartButton>
      </div>
    </div>
  );
}
