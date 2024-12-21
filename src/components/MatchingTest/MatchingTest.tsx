import React from "react";
import "./MatchingTest.css"

interface MatchingTestProps{
    questionOrder: number;
    content: string;
    optionCount: number;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
}

export default function MatchingTest({questionOrder, optionCount, content, answers, handleAnswerChange}: MatchingTestProps){
    const options = Array.from({ length: optionCount }, (_, i) => String.fromCharCode(65 + i));
    const selectedAnswer = answers.get(questionOrder) || "";
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const answer = e.target.value;
        handleAnswerChange(questionOrder, answer);
    };

    return(
        <div className="matching-test-container">
            <div className="matching-test-option">
                <h1>{questionOrder}.</h1>
                <select value={selectedAnswer} onChange={handleSelectChange}>
                    <option value=""></option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                        {option}
                        </option>
                    ))}
                </select>
                <h2>{content}</h2>
            </div>
        </div>
    );
}