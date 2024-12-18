import React from "react";
import "./QuestionPalette.css"

interface QuestionPaletteProps{
    sectionOrder: number;
    startQuestion: number;
    endQuestion: number;
}

export default function QuestionPalette({sectionOrder, startQuestion, endQuestion}: QuestionPaletteProps){
    const numList = Array.from({ length: endQuestion - startQuestion + 1 }, (_, i) => startQuestion + i);
    
    return (
        <div className="question-palette-container">
            <h1>Part {sectionOrder}</h1>
            { numList.map((num, index)=>{
                return(
                    <h2 key={num}>{num}</h2>
                );
            })}
        </div>
    );
}