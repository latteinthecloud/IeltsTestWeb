import React, { useEffect, useState } from "react";
import StartTestHeader from "../../components/StartTestHeader/StartTestHeader.tsx";
import ReadingPassage from "../../components/ReadingPassage/ReadingPassage.tsx";
import "../../styles/StartTestPage.css"
import StartTestFooter from "../../components/StartTestFooter/StartTestFooter.tsx";
import { useSearchParams } from "react-router-dom";
import sectionApi from "../../api/sectionApi.js";
import SectionComponent from "../../components/SectionComponent/SectionComponent.tsx";


export default function StartTestPage() {
    const [searchParams] = useSearchParams();
    const [activeSection, setActiveSection] = useState(1);
    const [sections, setSections] = useState<any[]>([]);
    const [answers, setAnswers] = useState<Map<number, string>>(new Map());
    const [questionNums, setQuestionNums] = useState<number[]>([]);
    const [questionIds, setQuestionIds] = useState<number[]>([]);

    const handleAnswerChange = (questionNumber: number, answer: string) => {
        setAnswers((prev) => {
            const newAnswers = new Map(prev);
            if (answer === "")
                newAnswers.delete(questionNumber);
            else
                newAnswers.set(questionNumber, answer);

            return newAnswers;
        });
    };


    const skill = searchParams.get("skill");
    const id = searchParams.get("test");
    const access = searchParams.get("access");

    useEffect(()=>{
        const fetchSections = async () => {
            try{
                const response = await sectionApi.getFull(id);
                if(Array.isArray(response)){
                    setSections(response);
                    const nums = response.map((section: any) => section.section.questionNum);
                    setQuestionNums(nums);
                    const questionIds = response.flatMap(item =>
                        item.questionLists.flatMap(qList =>
                          qList.questions.map(q => q.question.questionId)
                        )
                    );
                    setQuestionIds(questionIds);
                }
            }
            catch (error: any) {
                console.error("Error occurs: " + error.message);
            }
        };
        fetchSections();
    },[id]);

    return (
        <div className="start-page-container">
            <StartTestHeader 
                time={skill === "Reading" ? 60 : 32 }
                totalQuestion={getLastIndex(questionNums.length,questionNums)}
                answers={answers}
                skill={skill}
                testId={id}
                access={access}
                questionIds={questionIds}/>   
            <div className="content-container">
                <div className="left">
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
                <div className="right">
                    {
                        skill !== null &&
                        sections.map((section, index)=>{
                            return(
                                activeSection === index + 1 && 
                                <SectionComponent
                                    lastQuestionIndex={getLastIndex(index, questionNums)}
                                    questionLists={section.questionLists}
                                    answers={answers}
                                    handleAnswerChange={handleAnswerChange}>
                                </SectionComponent>
                            );
                        })
                    }
                </div>
            </div>
                
            <StartTestFooter 
                totalQuestion={questionNums}
                activeIndex={activeSection}
                setActiveIndex={setActiveSection}
                answers={answers}>
            </StartTestFooter>
        </div>
    );
}

function getLastIndex(sectionIndex: number, totalQuestion: number[]){
    let lastIndex = 0;
    for(let i=0; i< sectionIndex; i++)
        lastIndex+= totalQuestion[i];
    return lastIndex;
}
