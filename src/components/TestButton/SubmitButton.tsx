import React, { useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";

export default function SubmitButton(){
    const [showPopup, setShowPopup] = useState(false);

    const buttonPanel: React.CSSProperties={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
    }

    const infoStyle: React.CSSProperties={
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "15px",
        width: "94%",
    }

    const titleStyle: React.CSSProperties={
        color: "#001f80",
        fontSize: "26px",
        fontWeight: "bold",
        margin: "0px"
    }

    return (
        <>
            <RoundedButton 
                title="Submit"
                icon={<img src={require("../../assets/send.png")} alt="send-icon"></img>} 
                onClick={()=>{setShowPopup(true)}}>
            </RoundedButton>
            {
                showPopup && 
                <div className="overlay">
                    <div className="popup-container">
                        <button className="close-button" onClick={()=> setShowPopup(false)}>
                            <img src={require("../../assets/close.png")} alt="close-icon"></img>
                        </button>
                        <div style={infoStyle}>
                            <img src={require("../../assets/question-circle.png")} alt="question-icon"></img>
                            <h1 style={titleStyle}>Are you sure you want to submit?</h1>
                            <div style={buttonPanel}>
                                <RoundedButton 
                                    title="No" 
                                    onClick={()=>{setShowPopup(false)}}
                                    colors={["rgba(0, 0, 0, 0.3)","rgba(0, 0, 0, 0.5)"]}>
                                </RoundedButton>
                                <RoundedButton 
                                    title="Yes"
                                    colors={["rgb(51, 178, 199)","rgb(38, 134, 149)"]}
                                    onClick={()=>{}}>
                                </RoundedButton>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}