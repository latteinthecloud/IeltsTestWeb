
import React from "react";
import './RoundedButton.css';

interface RoundedButtonProps{
    title?: string;
    colors?: string[];
    onClick: () => void;
    icon?: React.ReactNode;
}

export default function RoundedButton({title, colors=["#1FCD33", "#0F671A"], onClick, icon}: RoundedButtonProps){
    const gradient = `linear-gradient(to bottom, ${colors.join(", ")})`;
    
    const style: React.CSSProperties = {
        borderRadius: "20px",
        padding: "10px 30px",
        background: gradient,
        fontSize: "16px",
        fontWeight: "600",
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "3px",
    };

    return (
        <button className="rounded-button"
            style={style}
            onClick={onClick}>
            {icon && <span>{icon}</span>}
            {title}
        </button>
    )
}