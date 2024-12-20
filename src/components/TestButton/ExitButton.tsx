import React, { useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import { useNavigate } from "react-router-dom";

export default function ExitButton() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const infoStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    width: "93%",
  };

  const buttonPanel: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  };

  const PopupContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "10px",
  };

  const titleContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const titleStyle: React.CSSProperties = {
    color: "#001f80",
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0px",
  };

  const instructionStyle: React.CSSProperties = {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: "16px",
    margin: "0px",
    fontWeight: "400",
  };

  return (
    <>
      <RoundedButton
        title="Exit"
        icon={
          <img src={require("../../assets/logout.png")} alt="exit-icon"></img>
        }
        colors={["#001f80", "#040160"]}
        onClick={() => {
          setShowPopup(true);
        }}
      ></RoundedButton>
      {showPopup && (
        <div className="overlay">
          <div style={PopupContainer}>
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              <img
                src={require("../../assets/close.png")}
                alt="close-icon"
              ></img>
            </button>
            <div style={infoStyle}>
              <img
                src={require("../../assets/warning-circle.png")}
                alt="warning-icon"
              ></img>
              <div style={titleContainerStyle}>
                <h1 style={titleStyle}>Are you sure to exit the test?</h1>
                <h2 style={instructionStyle}>
                  Your answers will not be saved when exist.
                </h2>
              </div>
              <div style={buttonPanel}>
                <RoundedButton
                  title="No"
                  onClick={() => {
                    setShowPopup(false);
                  }}
                  colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.5)"]}
                ></RoundedButton>
                <RoundedButton
                  title="Yes"
                  onClick={() => {
                    navigate("/");
                  }}
                  colors={["rgb(51, 178, 199)", "rgb(38, 134, 149)"]}
                ></RoundedButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
