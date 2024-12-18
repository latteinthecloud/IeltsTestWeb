import React from "react";
import "./StartTestFooter.css"
import QuestionPalette from "../../components/QuestionPalette/QuestionPalette.tsx"

export default function StartTestFooter(){
    return(
        <div className="start-footer-container">
            <QuestionPalette 
                sectionOrder={1}
                startQuestion={1}
                endQuestion={17}>
            </QuestionPalette>
            <QuestionPalette
                sectionOrder={2}
                startQuestion={18}
                endQuestion={30}>
            </QuestionPalette>
            <QuestionPalette
                sectionOrder={3}
                startQuestion={31}
                endQuestion={40}>
            </QuestionPalette>
        </div>
    );
}