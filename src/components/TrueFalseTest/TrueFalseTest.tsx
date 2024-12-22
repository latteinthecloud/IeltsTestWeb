import React from "react";
import "./TrueFalseTest.css"
import AnswerComponent from "../AnswerComponent/AnswerComponent.tsx";

interface TrueFalseTestProps{
    questionOrder: number;
    question: any;
    explanation: any;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
}

export default function TrueFalseTest({questionOrder, question, explanation, answers, handleAnswerChange, status=1}: TrueFalseTestProps){
    const selectedAnswer = answers.get(questionOrder) || "";
    const answerState = selectedAnswer === question.answer;
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const answer = e.target.value;
        handleAnswerChange(questionOrder, answer);
    };

    return (
        <div className="vertical-container">
            <div className="true-false-container">
                <h1><strong>{questionOrder}.</strong></h1>
                <select value={selectedAnswer} onChange={handleSelectChange} disabled={status === 0}>
                    <option value=""></option>
                    <option value="TRUE">TRUE</option>
                    <option value="FALSE">FALSE</option>
                    <option value="NOT GIVEN">NOT GIVEN</option>
                </select>
                <h1>{question.content}</h1>
            </div>
            {status === 0 && <AnswerComponent answer={question.answer} explain={explanation.content} state={answerState}/>}
        </div>
    );
}