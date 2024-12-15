import React, { useEffect, useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import "./StartButton.css";
import sectionApi from "../../api/sectionApi.js";

interface StartButtonProps {
  id: number;
  skill: string;
}

export default function StartButton({ id, skill }: StartButtonProps) {
  //show popup
  const [showPopup, setShowPopup] = useState(false);

  //fetch test sections
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await sectionApi.getAll(id);
        if (Array.isArray(response)) {
          setSections(response);
        }
      } catch (error: any) {
        console.error("Error occurs: " + error.message);
      }
    };
    fetchSections();
  }, [id]);

  return (
    <>
      <RoundedButton
        title="Start"
        onClick={() => {
          setShowPopup(true);
        }}
      ></RoundedButton>
      {showPopup && (
        <div className="overlay">
          <div className="popup-container">
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              <img
                src={require("../../assets/close.png")}
                alt="close-icon"
              ></img>
            </button>
            <div className="container">
              <div className="title-container">
                <h1>Start the test</h1>
                <h2>
                  Practice your skills with our test and take the step toward
                  mastering your goals today!
                </h2>
              </div>

              <div className="body">
                <h3>
                  <strong>1. Test stucture:</strong>{" "}
                  {skill === "Reading"
                    ? "3 parts - 40 questions"
                    : "4 parts - 40 questions"}
                </h3>
                <div className="section-container">
                  {sections.map((section, index) => (
                    <div key={id} className="row">
                      <img
                        src={require("../../assets/dot.png")}
                        alt="dot-icon"
                      ></img>
                      <h4>
                        Part {index + 1}: {section.questionNum} questions
                      </h4>
                    </div>
                  ))}
                </div>
                <h3>
                  <strong>2. Time limit:</strong>{" "}
                  {skill === "Reading" ? "60 minutes" : "32 minutes"}
                </h3>
              </div>

              <RoundedButton
                title="Start now"
                onClick={() => {}}
              ></RoundedButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
