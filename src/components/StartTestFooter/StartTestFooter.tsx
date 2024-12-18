import React, { useState } from "react";
import "./StartTestFooter.css"
import QuestionPalette from "../../components/QuestionPalette/QuestionPalette.tsx"

interface StartTestFooterProps{
    totalQuestion: number[];
}

export default function StartTestFooter({totalQuestion}: StartTestFooterProps){
    const [activeIndex, setActiveIndex] = useState(1);

    return(
        <div className="start-footer-container">
        {
            totalQuestion.map((questions, index) =>{
                let startIndex = 0;
                for(let i = 0;i < index; i++)
                    startIndex+= totalQuestion[i];

                return(
                    <QuestionPalette key={index + 1}
                        sectionOrder={index + 1}
                        startQuestion={startIndex + 1}
                        endQuestion={startIndex + questions}
                        onClick = {()=> setActiveIndex(index + 1)}
                        status={activeIndex === index + 1 ? "active" : ""}>
                    </QuestionPalette>
                );
            })
        }
        </div>
    );
}