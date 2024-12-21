import React from "react";
import "./MultipleChoiceTest.css"
import AnswerComponent from "../AnswerComponent/AnswerComponent.tsx";

interface MultipleChoiceTestProps{
    questionOrder: number;
    question: any;
    explanation: any;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
}

export default function MultipleChoiceTest({questionOrder, question, explanation, answers, handleAnswerChange, status = 1}: MultipleChoiceTestProps){
    const options = question.choiceList.split("<br>");
    const selectedAnswer = answers.get(questionOrder);
    const answerState = selectedAnswer === question.answer;

    return (
        <div className="test-panel__question-sm-group" data-num="27" data-q_type="6">
            <div className="test-panel__question-sm-title">
                {questionOrder}. {question.content}
            </div>
            <div className="test-panel__answer" data-question-item="27">
                {options.map((option, index) => {
                    const optionValue = String.fromCharCode(65 + index);
                    return (
                        <div key={index} className="test-panel__answer-item">
                            <span className="test-panel__answer-option">{optionValue}</span>
                            <label className="iot-radio">
                                <input
                                    type="radio"
                                    className="radio-iot"
                                    name={`q-${questionOrder}`}
                                    value={optionValue}
                                    defaultChecked={selectedAnswer === optionValue}
                                    disabled={status === 0}
                                    onChange={() => handleAnswerChange(questionOrder, optionValue)}
                                />
                                {option}
                            </label>
                        </div>
                    );
                })}
            </div>
            {status === 0 && <AnswerComponent answer={question.answer} explain={explanation.content} state={answerState}/>}
        </div>
    );
}