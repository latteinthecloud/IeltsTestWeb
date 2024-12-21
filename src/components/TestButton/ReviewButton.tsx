import React, { useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";

interface ReviewButtonProps{
    totalQuestion: number;
    answers: Map<number,string>;
}

export default function ReviewButton({totalQuestion, answers}: ReviewButtonProps){
    const [showPopup, setShowPopup] = useState(false);
    const rows = Math.ceil(totalQuestion / 4);

    const tableStyle: React.CSSProperties={
        border: "1px solid rgba(0, 0, 0, 0.5)",
        padding: "10px",
        textAlign: "left",
        borderCollapse: "collapse",
    }

    const dataStyle: React.CSSProperties={
        border: "1px solid #999",
        width: "200px",
        padding: "10px",
        color: "rgba(0, 0, 0, 0.5)"
    }

    const infoStyle: React.CSSProperties={
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "15px",
    }

    const titleContainerStyle: React.CSSProperties={
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

    const titleStyle: React.CSSProperties={
        color: "#001f80",
        fontSize: "26px",
        fontWeight: "bold",
    }


    const tableRows = Array.from({ length: rows }, (_, rowIndex) => {
        const cells = Array.from(
          { length: Math.min(4, totalQuestion - rowIndex * 4) },
          (_, cellIndex) => <td style={dataStyle} key={cellIndex}>Q{rowIndex * 4 + cellIndex + 1}: 
          <span style={{fontWeight: "bold", color: "#001f80"}}> {answers.get(rowIndex * 4 + cellIndex + 1) !== undefined ?  answers.get(rowIndex * 4 + cellIndex + 1): ""}</span></td>
        );
        return <tr key={rowIndex}>{cells}</tr>;
    });

    return (
        <>
           <RoundedButton 
                title="Review"
                icon={<img src={require("../../assets/review.png")} alt="review-icon"></img>}
                colors={["#33B2C7","#268695"]}
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
                            <div style={titleContainerStyle}>
                                <h1 style={titleStyle}>Review your answers</h1>
                                <h2>This window is to review your answers only, you cannot change the answers in here</h2>
                            </div>
                            <table style={tableStyle}>
                                <tbody>
                                    {tableRows}
                                </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}