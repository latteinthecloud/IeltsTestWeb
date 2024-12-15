
import React from "react";
import './RoundedButton.css';

interface RoundedButtonProps{
    title: string;
    colors?: string[];
    onClick: () => void;
}

export default function RoundedButton({title, colors=["#1FCD33", "#0F671A"], onClick}: RoundedButtonProps){
    const gradient = `linear-gradient(to bottom, ${colors.join(", ")})`;
    
    const style: React.CSSProperties = {
        borderRadius: "20px",
        padding: "10px 30px",
        background: gradient,
        fontSize: "16px",
        fontWeight: "600",
        width: "fit-content",
    };

    return (
        <button className="rounded-button"
            style={style}
            onClick={onClick}>
            {title}
        </button>
    )
}