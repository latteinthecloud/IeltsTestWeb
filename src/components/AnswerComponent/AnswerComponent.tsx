import React from "react";
import ExplainButton from "../ExplainButton/ExplainButton.tsx";

interface AnswerComponentProps{
    answer: string;
    explain: string;
    state: string;
}

export default function AnswerComponent({answer, explain, state}: AnswerComponentProps){
    
    const answerStyle: React.CSSProperties={
        fontSize: "15px",
        margin: "0px",
        fontWeight: "500",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px"
    }

    const correctStyle : React.CSSProperties={
        color: state === "right"? "rgb(50, 120, 70)": "red"
    }

    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "5px"}}>
            <h1 style={answerStyle}>Answer: 
                <span style={{fontWeight: "bold", color: "rgb(0, 31, 128)"}}> {answer} </span>
                <span style={correctStyle}>{state === "right"? "correct": "incorrect"}</span>
                <img src={require(`../../assets/${state === "right" ? "check-circle" : "cross-circle"}.png`)} alt="correct-icon"></img>
            </h1>
            <ExplainButton content={explain}/>
        </div>
    );
}