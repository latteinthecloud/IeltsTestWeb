import React, { useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import { useNavigate } from "react-router-dom";import resultApi from "../../api/resultApi.tsx";
import { useAuth } from "../../context/AuthContext.js";
;

interface SubmitButtonProps{
    minute: number;
    totalQuestion: number;
    skill: any;
    testId: any;
    answers: Map<number, string>;
    access: any;
    questionIds: number[];
}


export default function SubmitButton({minute, totalQuestion, skill, testId, answers, access, questionIds}: SubmitButtonProps){
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response1: any = await resultApi.create(user.id, testId, access, formatMinutesToHHMMSS(minute));
            const resultId = response1.resultId;
            if (!resultId) throw new Error("Failed to get resultId from the API.");

            const response2: any = await resultApi.createDetails(resultId, answers,questionIds);
            const score = response2.score;
            const band = response2.band;
            console.log(response2);

            navigate("/result", {
                state: { resultId, testId, skill, timeSpent: minute, totalQuestion, answers, score, band },
            });
        } catch (error) {
            console.error("Error during API processing:", error.message);
        } finally {
            setIsLoading(false);
            setShowPopup(false);
        }
    };

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
                            <img src={require(`../../assets/${isLoading ? "info" : "question"}-circle.png`)} alt="question-icon"></img>
                            <h1 style={titleStyle}>{isLoading? "We are calculating your score..." : "Are you sure you want to submit?"}</h1>
                            { !isLoading &&
                                <div style={buttonPanel}>
                                    <RoundedButton 
                                        title="No" 
                                        onClick={()=>{setShowPopup(false)}}
                                        colors={["rgba(0, 0, 0, 0.3)","rgba(0, 0, 0, 0.5)"]}>
                                    </RoundedButton>
                                    <RoundedButton 
                                        title="Yes"
                                        colors={["rgb(51, 178, 199)","rgb(38, 134, 149)"]}
                                        onClick={handleSubmit}>
                                    </RoundedButton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

function formatMinutesToHHMMSS(minutes) {
    const totalSeconds = Math.floor(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;

    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(mins).padStart(2, '0'),
        String(secs).padStart(2, '0')
    ].join(':');

    return formattedTime;
}