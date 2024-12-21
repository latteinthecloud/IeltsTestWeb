import React from "react";
import "./MatchingTest.css"
import AnswerComponent from "../AnswerComponent/AnswerComponent.tsx";

interface MatchingTestProps{
    questionOrder: number;
    question: any;
    explanation: any;
    optionCount: number;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
    answerState?: string;
}

export default function MatchingTest({questionOrder, optionCount, question, explanation, answers, handleAnswerChange, status = 1, answerState=""}: MatchingTestProps){
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
                <select value={selectedAnswer} onChange={handleSelectChange} disabled={status === 0}>
                    <option value=""></option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                        {option}
                        </option>
                    ))}
                </select>
                <h2>{question.content}</h2>
            </div>
            <div style={{width: "100%"}}>
                {status === 0 && <AnswerComponent answer={question.answer} explain={explanation.content} state={answerState}/>}
            </div>
        </div>
    );
}