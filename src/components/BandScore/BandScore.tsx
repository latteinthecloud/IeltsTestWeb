import React, { useState } from "react";

interface BandScoreProps{
    userBand: number;
}

export default function BandScore({userBand}: BandScoreProps){
    const bands = [3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9];
    const [activeBand, setActiveBand] = useState(bands.indexOf(userBand));
    const correctAnswers = ["6-7","8-9","10-12","13-14","15-18","19-22","23-26","27-29","30-32","33-34","35-36","37-38","39-40"];
    const skillLevels = ["Extremely limited user","Extremely limited user","Limited user","Limited user","Modest user","Modest user","Competent user","Competent user","Good user","Good user","Very good user","Very good user","Expert user"];
    const descriptions = ["You convey and understand only general meaning in very familiar situations. There are frequent breakdowns in communication.",
        "You convey and understand only general meaning in very familiar situations. There are frequent breakdowns in communication.",
        "Your basic competence is limited to familiar situations. You frequently show problems in understanding and expression. You are not able to use complex language.",
        "Your basic competence is limited to familiar situations. You frequently show problems in understanding and expression. You are not able to use complex language.",
        "You have a partial command of the language, and cope with overall meaning in most situations, although you are likely to make many mistakes. You should be able to handle basic communication in your own field.",
        "You have a partial command of the language, and cope with overall meaning in most situations, although you are likely to make many mistakes. You should be able to handle basic communication in your own field.",
        "Generally you have an effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings. You can use and understand fairly complex language, particularly in familiar situations.",
        "Generally you have an effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings. You can use and understand fairly complex language, particularly in familiar situations.",
        "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally you handle complex language well and understand detailed reasoning.",
        "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally you handle complex language well and understand detailed reasoning.",
        "You have a fully operational command of the language with only occasional unsystematic inaccuracies and inappropriate usage. You may misunderstand some things in unfamiliar situations. You handle complex detailed argumentation well.",
        "You have a fully operational command of the language with only occasional unsystematic inaccuracies and inappropriate usage. You may misunderstand some things in unfamiliar situations. You handle complex detailed argumentation well.",
        "You have a full operational command of the language. Your use of English is appropriate, accurate and fluent, and you show complete understanding."
    ]

    const buttonStyle: React.CSSProperties={
        background: "transparent",
        fontSize: "16px",
        fontWeight: "700",
        color: "rgb(41, 69, 99)",
    }

    const styleActive: React.CSSProperties={
        background: "transparent",
        fontSize: "16px",
        fontWeight: "700",
        color: "rgb(41, 69, 99)",
        borderBottom: "3px solid rgb(41, 69, 99)",
    }

    const headerStyle: React.CSSProperties={
        fontSize: "16px",
        fontWeight: "400",
        width: "150px",
        color: "rgb(41, 69, 99)",
        verticalAlign: "top",
    }

    const underlineStyle: React.CSSProperties={
        borderBottom: "1px solid #eaeaea"
    }

    const descriptionStyle: React.CSSProperties={
        fontSize: "16px",
        fontWeight: "700",
        color: "rgb(41, 69, 99)"
    }

    const bandStyle: React.CSSProperties={
        textAlign: "left",
        fontSize: "20px",
        color: "rgb(41, 69, 99)",
        margin: "5px"
    }

    return(
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "80%"}}>
                <img src={require("../../assets/star.png")} alt="start-icon"></img>
                <h1 style={bandStyle}>Band score</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "10px", width: "80%"}}>
                <div style={{ display: "flex", gap: "20px"}}>
                    {
                        bands.map((band, index) =>{
                            return(
                                <button 
                                    style={activeBand === index?styleActive:buttonStyle}
                                    onClick={()=> setActiveBand(index)}>
                                    {band}
                                </button>
                            );
                        })
                    }
                </div>
                {
                    <table style={{ display: "flex", flexDirection: "column"}}>
                        <tr style={underlineStyle}>
                            <td style={headerStyle}>Correct Answers:</td>
                            <td style={descriptionStyle}>{correctAnswers[activeBand]}</td>
                        </tr>
                        <tr style={underlineStyle}>
                            <td style={headerStyle}>Skill level:</td>
                            <td style={descriptionStyle}>{skillLevels[activeBand]}</td>
                        </tr>
                        <tr>
                            <td style={headerStyle}>Description:</td>
                            <td style={descriptionStyle}>{descriptions[activeBand]}</td>
                        </tr>
                    </table>
                }
            </div>
        </div>
    );
}