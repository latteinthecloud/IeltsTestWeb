import React from "react";
import "./DiagramTest.css"

interface DiagramTestProps{
    questionOrder: number;
    answer?: string;
}

export default function DiagramTest({questionOrder}: DiagramTestProps){
    return (
        <div className="diagram-test-container">
            <h1>{questionOrder}.</h1>
            <input placeholder="Write down your answer"></input>
        </div>
    );
}