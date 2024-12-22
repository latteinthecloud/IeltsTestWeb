import React from "react";
import QuestionList from "../QuestionList/QuestionList.tsx";

interface SectionComponentProps{
    questionLists: any;
    lastQuestionIndex: number;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
}

export default function SectionComponent({questionLists, lastQuestionIndex, answers, handleAnswerChange, status=1}: SectionComponentProps){
    return (
            <div style={{display: "flex", flexDirection: "column", gap: "20px", transition: "all 0.3s ease"}}>
                {
                    questionLists.map((ql, index)=>{
                        let startIndex = 0;

                        for(let i = 0; i< index; i++)
                            startIndex += questionLists[i].questionList.qnum; 

                        return(
                            <QuestionList 
                                key={index}
                                startQuestion={lastQuestionIndex + startIndex + 1}
                                endQuestion={lastQuestionIndex + startIndex + ql.questionList.qnum}
                                questionList={ql.questionList}
                                questions={ql.questions}
                                answers={answers}
                                handleAnswerChange={handleAnswerChange}
                                status={status}>
                            </QuestionList>
                        );
                    })
                }
            </div>
        );
}