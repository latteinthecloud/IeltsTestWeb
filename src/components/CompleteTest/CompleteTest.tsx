import React from "react";
import "./CompleteTest.css"

interface CompleteTestProps{
    questionOrder: number;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
}

export default function CompleteTest({questionOrder, answers, handleAnswerChange, status=1}: CompleteTestProps){
    const currentAnswer = answers.get(questionOrder) || "";
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleAnswerChange(questionOrder, value);
    };

    return (
        <input
            className="complete-test-input"
            placeholder={questionOrder.toString()}
            value={currentAnswer}
            onChange={handleChange}
            disabled={status === 0}
        />
    );
}