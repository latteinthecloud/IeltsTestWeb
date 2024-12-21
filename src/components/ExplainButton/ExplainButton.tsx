import React, { useState } from "react";
import "./ExplainButton.css"

interface ExplainButtonProps{
    content: string;
}

export default function ExplainButton({content}: ExplainButtonProps){
    const [open, setOpen] = useState(false);

    const [hover, setHover] = useState(false);

    const style: React.CSSProperties = {
        width: "100px",
        background: hover ? "#327846" : "transparent",
        border: "1px solid #327846",
        borderRadius: "20px",
        color: hover ? "#fff" : "#327846", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        padding: "5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontSize: "14px"
    };

    const exStyle: React.CSSProperties = {
        border: "1px solid rgba(168, 168, 168, 0.3)",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px",
    }

    const containerStyle: React.CSSProperties ={
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }

    const pStyle: React.CSSProperties={
        textAlign: "left",
        color: "black",
        margin: "0px"
    }

    return (
        <div style={containerStyle}>
            <button
                style={style}
                onClick={() => setOpen(!open)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img
                    src={require(`../../assets/${hover ? "ex-white" : "ex"}.png`)}
                    alt="explain-icon"
                />
                Explain
            </button>
            {
                open &&
                <div style={exStyle}>
                    <p style={pStyle}>{content}</p>
                </div>
            }
        </div>
    );
}