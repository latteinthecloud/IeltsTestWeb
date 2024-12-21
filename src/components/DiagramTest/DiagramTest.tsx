import React from "react";
import "./DiagramTest.css"
import AnswerComponent from "../AnswerComponent/AnswerComponent.tsx";

interface DiagramTestProps{
    questionOrder: number;
    question: any;
    explanation: any;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
    answerState?: string;
}

export default function DiagramTest({questionOrder, question, explanation, answers, handleAnswerChange, status=1, answerState=""}: DiagramTestProps){
    const currentAnswer = answers.get(questionOrder) || "";
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleAnswerChange(questionOrder, value);
    };
    
    return (
        <div className="diagram">
            <div className="diagram-test-container">
                <h1>{questionOrder}.</h1>
                <input 
                    placeholder="Write down your answer"
                    value={currentAnswer}
                    onChange={handleChange}
                    disabled={status === 0}>
                </input>
            </div>
            {status === 0 && <AnswerComponent answer={question.answers} explain={explanation.content} state={answerState}/>}
        </div>
    );
}