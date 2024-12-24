import React, { useEffect, useState } from "react";
import "../../styles/ResultPage.css";
import BandScore from "../../components/BandScore/BandScore.tsx";
import ReadingPassage from "../../components/ReadingPassage/ReadingPassage.tsx";
import { useLocation } from "react-router-dom";
import sectionApi from "../../api/sectionApi.js";
import SectionComponent from "../../components/SectionComponent/SectionComponent.tsx";
import ListeningController from "../../components/ListeningController/ListeningController.tsx";

export default function ResultPage(){
    const location = useLocation();
    const { timeSpent, totalQuestion, skill, testId, answers, score, band } = location.state || {};
    const [sections, setSections] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState(1);
    const [questionNums, setQuestionNums] = useState<number[]>([]);
    const [sound, setSound] = useState<any>();

    useEffect(() => {
            const fetchSoundUrl = async () => {
                if (skill === "Listening") {
                    try {
                        const response = await getSound(testId);
                        if (response!== null) setSound(response);
                    } catch (error) {
                        console.error("Error fetching sound URL:", error);
                    }
                }
            };
            fetchSoundUrl();
        }, [testId, skill]);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = skill === "Reading"? await sectionApi.getReadingFull(testId): await sectionApi.getListeningFull(sound.id);
                if (Array.isArray(response)) {
                    setSections(response);
                    const nums = response.map((section: any) => section.section.questionNum);
                    setQuestionNums(nums);
                }
            } catch (error: any) {
                console.error("Error occurs: " + error.message);
            }
        };
        fetchSections();
    }, [skill, testId, sound]);

    return (
        <div className="main-content">
            <h2>Overall view</h2>
            <div className="circle-header-container">
                <div className="panel">
                    <h1 style={{color: "#001f80"}}>Correct answers</h1>
                    <div className="correct-circle">
                        <h2>{score}/{totalQuestion}</h2>
                    </div>
                </div>
                <div className="panel">
                    <h1 style={{color: "#327846"}}>Score</h1>
                    <div className="score-circle">
                        <h2>{band}</h2>
                    </div>
                </div>
                <div className="panel">
                    <h1 style={{color: "#33B2C7"}}>Time spent</h1>
                    <div className="time-circle">
                        <h2>{timeSpent}:00</h2>
                    </div>
                </div>
            </div>
            <BandScore userBand={band}/>
            <h2>Review & Explanations</h2>
            {skill === "Listening" && sound && (
                    <ListeningController testId={testId} audioSource={`http://localhost:8080${sound.url}`} />
            )}
            <div className="review-container">
                <div className="left" style={{ height: "500px"}} hidden={skill === "Listening"}>
                {
                    skill === "Reading" &&
                    sections.map((section, index)=>{
                        return( 
                            activeSection === index + 1 && 
                            <ReadingPassage
                                sectionOrder={index+1}
                                img={section.section.imageLink}
                                title={section.section.title}
                                content={section.section.content}>
                            </ReadingPassage>
                        );
                    })
                }
                </div>
                <div className="right" style={{ height: "500px", width: skill === "Listening" ? "100%" : "50%"}}>
                {
                    sections.map((section, index)=>{
                        return(
                            activeSection === index + 1 && 
                            <SectionComponent
                                lastQuestionIndex={getLastIndex(index, questionNums)}
                                questionLists={section.questionLists}
                                answers={answers}
                                handleAnswerChange={(questionNumber, answer)=>{}}
                                status={0}>
                            </SectionComponent>
                        );
                    })
                }
                </div>
            </div>
            <div className="bottom-button-container">
                <button 
                    className="simple-blue-button" 
                    onClick={()=> setActiveSection(activeSection - 1 > 0 ? activeSection - 1 : 1)}>
                    « Previous</button>
                <button 
                    className="simple-blue-button"
                    onClick={()=> setActiveSection(activeSection + 1 > sections.length? sections.length: activeSection + 1)}>
                    Next »
                </button>
            </div>
        </div>
    );
}

function getLastIndex(sectionIndex: number, totalQuestion: number[]){
    let lastIndex = 0;
    for(let i=0; i< sectionIndex; i++)
        lastIndex+= totalQuestion[i];
    return lastIndex;
}

async function getSound(id: string | null) {
    if (!id) return "";
    try {
        const response = await sectionApi.getSound(id);
        return response;
    } catch (error) {
        console.error("Error fetching sound URL:", error);
    }
}
