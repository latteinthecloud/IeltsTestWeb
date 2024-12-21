import React, { useEffect, useState } from "react";
import CompleteTest from "../CompleteTest/CompleteTest.tsx";
import MultipleChoiceTest from "../MultipleChoiceTest/MultipleChoiceTest.tsx";
import MatchingTest from "../MatchingTest/MatchingTest.tsx";
import TrueFalseTest from "../TrueFalseTest/TrueFalseTest.tsx";
import DiagramTest from "../DiagramTest/DiagramTest.tsx";
import sectionApi from "../../api/sectionApi.js";
import AnswerComponent from "../AnswerComponent/AnswerComponent.tsx";

interface QuestionListProps{
    startQuestion: number;
    endQuestion: number;
    questionList: any;
    questions: any;
    answers: Map<number, string>;
    handleAnswerChange: (questionNumber: number, answer: string) => void;
    status?: number;
}

export default function QuestionList({startQuestion, endQuestion, questionList, questions, answers, handleAnswerChange, status=1} : QuestionListProps){
    const type = questionList.type;
    const [fectString, setFetchString] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (type === "matching") {
                const result = await fetchChoiceList(questionList.id);
                setFetchString(result);
            }

            if(type === "diagram"){
                const result = await fetchImage(questionList.id);
                setFetchString(result);
            }
        };

        fetchData();
    }, [questionList.id, type]);

    const options = type === "matching" ? fectString.split("<br>") : null;
    const parts = questionList.content !== null? questionList.content.split("<br>") : null;

    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        transition: "all 0.3s ease",
    }

    const titleStyle: React.CSSProperties = {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#001f80",
        margin: "0px"
    }

    const instructionStyle: React.CSSProperties={
        fontSize: "15px",
        fontWeight: "normal",
        margin: "0px",
        textAlign: "left"
    }

    const tableContainerStyle: React.CSSProperties={
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const tableStyle: React.CSSProperties={
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "10px",
        textAlign: "left",
        transition: "all 0.3s ease",
    }

    const formatText: React.CSSProperties={
        textAlign: "left",
        fontSize: "15px",
        margin: "0px",
    }

    const completeAnswerContainer:React.CSSProperties={
        display: "flex",
        justifyContent:"flex-start",
        alignItems: "flex-start",
        gap: "5px",
    }

    const numberStyle: React.CSSProperties={
        fontSize: "15px",
        marginTop: "2px",
        fontWeight: "700",
        color: "rgb(0, 31, 128)",
    }
    
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Question {startQuestion}-{endQuestion}</h1>
            
            {type === "multiple_choice" &&
            <div style={containerStyle}>
                <h2 style={instructionStyle}>Choose the correct letter <strong>A, B, C</strong> or <strong>D</strong>.</h2>
                {
                    questions.map((question, index)=>{
                    return(
                        <MultipleChoiceTest
                            questionOrder={startQuestion + index}
                            question={question.question}
                            explanation={question.explanation}
                            handleAnswerChange={handleAnswerChange}
                            answers={answers}
                            status={status}>
                        </MultipleChoiceTest>);
                    })
                }
            </div>
            }
            
            {type === "true_false" &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Do the following statements agree with the views of the writer in Reading Passage?</h2>
                    <h2 style={instructionStyle}><strong>TRUE</strong>: if the statement agrees with the information</h2>
                    <h2 style={instructionStyle}><strong>FALSE</strong>: if the statement contradicts the information</h2>
                    <h2 style={instructionStyle}><strong>NOT GIVEN</strong>: If there is no information on this</h2>
                    {
                        questions.map((question, index)=>{
                            return (
                                <TrueFalseTest
                                    questionOrder={startQuestion + index}
                                    question={question.question}
                                    explanation={question.explanation}
                                    answers={answers}
                                    handleAnswerChange={handleAnswerChange}
                                    status={status}>
                                </TrueFalseTest>
                            );
                        })
                    }
                </div>
                
            }

            {type === "matching" && Array.isArray(options) && options.length > 0 &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Look at the following statements and the list below. Match each statement with the correct answer.</h2>
                    <div style={tableContainerStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th colSpan={2} style={{textAlign: "center"}}>{questionList.content}</th>
                                </tr>   
                            </thead>

                            <tbody>
                                {options.map((option, index) => (
                                    <tr key={index}>
                                        <td style={{width: "20px"}}><strong>{String.fromCharCode(65 + index)}</strong></td>
                                        <td>{option}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {
                        questions.map((question, index)=>{
                            return (
                                <MatchingTest
                                    questionOrder={startQuestion + index}
                                    question={question.question}
                                    explanation={question.explanation}
                                    optionCount={options.length}
                                    answers={answers}
                                    handleAnswerChange={handleAnswerChange}
                                    status={status}>
                                </MatchingTest>
                            );
                        })
                    }
                    
                </div>
            }

            {type === "diagram" &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Complete the labels. Write <strong style={{color: "red"}}>ONE WORD OR A NUMBER</strong> for each answer.</h2>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img style={{width: "50%", transition: "all 0.3s ease"}} src={"http://localhost:8080"+fectString} alt="ql-img"></img>
                    </div>
                    {
                        questions.map((question, index)=> {
                            return(
                                <DiagramTest 
                                    questionOrder={startQuestion + index}
                                    answers={answers}
                                    question={question.question}
                                    explanation={question.explanation}
                                    handleAnswerChange={handleAnswerChange}
                                    status={status}>
                                </DiagramTest>
                            );
                        })
                    }

                </div>
            }

            {type === "complete" && parts !== null &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Complete the paragraph below.</h2>
                    <h2 style={instructionStyle}>Choose <strong style={{color: "red"}}>ONE WORD ONLY</strong> from the passage for each answer.</h2>
                    {
                        parts.map((part, index) => {
                            let startIndex = 0;
                            
                            for(let i = 0; i < index; i++){
                                startIndex+= countInput(parts[i]);
                            }

                            return (
                                <p style={formatText}>{formatPapagraph(part, startQuestion + startIndex, answers, status, handleAnswerChange)}</p>
                            );
                        })
                    }
                    { status === 0 &&
                        questions.map((question,index)=>{
                            return(
                                <div style={completeAnswerContainer}>
                                    <h1 style={numberStyle}>{startQuestion + index}.</h1>
                                    <AnswerComponent 
                                        answer={question.question.answer}
                                        explain={question.explanation.content}
                                        state=""
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}


function formatPapagraph(text: string, startIndex: number, answers, status: number, handleAnswerChange) {
    const parts = text.split("<i>");
    return parts.flatMap((part, index) => [
        <span key={`text-${index}`}>{part}</span>,
        index < parts.length - 1 && (
          <CompleteTest 
            key={`input-${index}`} 
            questionOrder={ startIndex + index } 
            answers={answers}
            handleAnswerChange={handleAnswerChange}
            status={status}/>
        ),
      ]);
}

function countInput(text: string){
    return (text.match(/<i>/g) || []).length;
}

async function fetchChoiceList(id: number): Promise<string>{
    try {
        const response = await sectionApi.getChoiceList(id);
        if (typeof response === 'string')
            return response;
        else
            return "";
    } catch (error) {
        console.error(error);
        return "error";
    }
}

async function fetchImage(id: number): Promise<string>{
    try {
        const response = await sectionApi.getImg(id);
        if (typeof response === 'string')
            return response;
        else
            return "";
    } catch (error) {
        console.error(error);
        return "error";
    }
}