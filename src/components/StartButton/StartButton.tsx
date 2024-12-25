import React, { useEffect, useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import "./StartButton.css"
import sectionApi from "../../api/sectionApi.js";
import { useNavigate } from "react-router-dom";
import userTestApi from "../../api/userTestApi.tsx";

interface StartButtonProps{
    id: number;
    skill: string;
    testAccess: string;
}

export default function StartButton({id, skill, testAccess}: StartButtonProps){
    //show popup
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // fetch test sections
    const [sections, setSections] = useState<any[]>([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    
    useEffect(()=>{
        const fetchSections = async () => {
            try{
                const response = testAccess === "public"? await sectionApi.getAll(id) : await userTestApi.getSections(id); 
                if(Array.isArray(response)){
                    setSections(response);
                    
                    const nums = response.map((section: any) => section.questionNum);
                    let sum = 0;
                    for(let i = 0; i< nums.length; i++)
                        sum += nums[i];
                    setTotalQuestions(sum);
                }
            }
            
            catch (error: any) {
                console.error("Error occurs: " + error.message);
            }
        };
        fetchSections();
    },[id, testAccess]);

    const handleNavigation = () =>{
        const params = new URLSearchParams({ skill: skill, test: id.toString(), access: testAccess });
        navigate("/start-test?"+ params.toString());
    }

    return (
        <>
            <RoundedButton title="Start" onClick={()=>{setShowPopup(true)}}>
            </RoundedButton>
            { showPopup && (
                <div className="overlay">
                    <div className="popup-container">
                        <button className="close-button" onClick={()=> setShowPopup(false)}>
                            <img src={require("../../assets/close.png")} alt="close-icon"></img>
                        </button>
                        <div className="container">
                            <div className="title-container">
                                <h1>Start the test</h1>
                                <h2>Practice your skills with our test and take the step toward mastering your goals today!</h2>
                            </div>

                            <div className="body">
                                <h3><strong>1. Test stucture:</strong> {sections.length} parts - {totalQuestions} questions</h3>
                                <div className="section-container">
                                    {   sections.map((section, index)=> (
                                            <div key={index} className="row">
                                                <img src={require("../../assets/dot.png")} alt="dot-icon"></img>
                                                <h4>Part {index + 1}: {section.questionNum} questions</h4>
                                            </div>
                                    ))}
                                </div>
                                <h3><strong>2. Time limit:</strong> {skill === "Reading"? "60 minutes" : "32 minutes"}</h3>
                            </div>
                
                            <RoundedButton title="Start now" onClick={handleNavigation}></RoundedButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}