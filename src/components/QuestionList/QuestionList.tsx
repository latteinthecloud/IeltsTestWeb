import React from "react";
import CompleteTest from "../CompleteTest/CompleteTest.tsx";

interface QuestionListProps{
    startQuestion: number;
    endQuestion: number;
    type: string;
    choiceList?: string;
    img?: string;
    content?: string;
    completeAnswer?: string[];
    children?: React.ReactNode;
}

export default function QuestionList({startQuestion, endQuestion, type,
    content= "",choiceList = "", img = "", completeAnswer= [], children} : QuestionListProps){
    const options = choiceList !== null ? choiceList.split("\\n") : null;
    const parts = content !== null ? content.split("\\n"): null;

    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
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
    }

    const formatText: React.CSSProperties={
        textAlign: "left",
        fontSize: "15px",
        margin: "0px",
    }
    
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Question {startQuestion}-{endQuestion}</h1>
            
            {type === "multiple_choice" && <h2 style={instructionStyle}>Choose the correct letter <strong>A, B, C</strong> or <strong>D</strong>.</h2>}
            
            {type === "true_false" &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Do the following statements agree with the views of the writer in Reading Passage?</h2>
                    <h2 style={instructionStyle}><strong>TRUE</strong>: if the statement agrees with the information</h2>
                    <h2 style={instructionStyle}><strong>FALSE</strong>: if the statement contradicts the information</h2>
                    <h2 style={instructionStyle}><strong>NOT GIVEN</strong>: If there is no information on this</h2>
                </div> 
            }

            {type === "matching" && Array.isArray(options) && options.length > 0 &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Look at the following statements and the list below. Match each statement with the correct answer.</h2>
                    <div style={tableContainerStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th colSpan={2} style={{textAlign: "center"}}>{content}</th>
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
                </div>
            }

            {type === "diagram" && Array.isArray(options) && options.length > 0 &&
                <div style={containerStyle}>
                    <h2 style={instructionStyle}>Complete the labels. Write <strong style={{color: "red"}}>ONE WORD OR A NUMBER</strong> for each answer.</h2>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img style={{width: "50%"}} src={img}></img>
                    </div>
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
                                <p style={formatText}>{formatPapagraph(part, startQuestion + startIndex, startIndex, completeAnswer)}</p>
                            );
                        })
                    }
                </div>
            }

            {children}
        </div>
    );
}


function formatPapagraph(text: string, startIndex: number, prevIndex: number, completeAnswer: string[]) {
    const parts = text.split("<i>");
    return parts.flatMap((part, index) => [
        <span key={`text-${index}`}>{part}</span>,
        index < parts.length - 1 && (
          <CompleteTest key={`input-${index}`} questionOrder={ startIndex + index } answer={completeAnswer[ prevIndex + index]} />
        ),
      ]);
}

function countInput(text: string){
    return (text.match(/<i>/g) || []).length;
}

function getQuestionOrder(index: number){

}