import React from "react";
import "./DiagramTest.css"

interface DiagramTestProps{
    questionOrder: number;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
}

export default function DiagramTest({questionOrder, answers, handleAnswerChange}: DiagramTestProps){
    const currentAnswer = answers.get(questionOrder) || "";
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleAnswerChange(questionOrder, value);
    };
    
    return (
        <div className="diagram-test-container">
            <h1>{questionOrder}.</h1>
            <input 
                placeholder="Write down your answer"
                value={currentAnswer}
                onChange={handleChange}>
            </input>
        </div>
    );
}