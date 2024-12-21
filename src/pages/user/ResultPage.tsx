import React from "react";
import "../../styles/ResultPage.css";
import BandScore from "../../components/BandScore/BandScore.tsx";
import ReadingPassage from "../../components/ReadingPassage/ReadingPassage.tsx";

export default function ResultPage(){
    return (
        <div className="main-content">
            <h2>Overall view</h2>
            <div className="circle-header-container">
                <div className="panel">
                    <h1 style={{color: "#001f80"}}>Correct answers</h1>
                    <div className="correct-circle">
                        <h2>4/24</h2>
                    </div>
                </div>
                <div className="panel">
                    <h1 style={{color: "#327846"}}>Score</h1>
                    <div className="score-circle">
                        <h2>3.5</h2>
                    </div>
                </div>
                <div className="panel">
                    <h1 style={{color: "#33B2C7"}}>Time spent</h1>
                    <div className="time-circle">
                        <h2>52:00</h2>
                    </div>
                </div>
            </div>
            <BandScore/>
            <h2>Review & Explanations</h2>
            <div className="review-container">
              <div className="left">
                <ReadingPassage
                    sectionOrder={1}
                    img="https://iotcdn.oss-ap-southeast-1.aliyuncs.com/2024-02/How%20the%20mind%20ages%402x.png"
                    title="How the mind ages"
                    content="The way mental function changes is largely determined by three factors-mental lifestyle, the impact of chronic disease and flexibility of the mind.
                    <br>Experiments have shown that younger monkeys consistently outperform their older colleagues on memory tests. 
                    Formerly, psychologists concluded that memory and other mental functions in humans deteriorate over time because of changes in the brain.
                     Thus mental decline after young adulthood appeared inevitable. The truth, however, is not quite so simple.">
                </ReadingPassage>
              </div>
            </div>
        </div>
    );
}   