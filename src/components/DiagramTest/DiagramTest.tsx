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
}

export default function DiagramTest({questionOrder, question, explanation, answers, handleAnswerChange, status=1}: DiagramTestProps){
    const currentAnswer = answers.get(questionOrder) || "";
    const answerState = currentAnswer.toLocaleLowerCase().trim() === question.answer.toLocaleLowerCase().trim();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleAnswerChange(questionOrder, value);
    };
    
    console.log(question.answer);
    
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
            {status === 0 && <AnswerComponent answer={question.answer} explain={explanation.content} state={answerState}/>}
        </div>
    );
}