import React from "react";
import StartTestHeader from "../../components/StartTestHeader/StartTestHeader.tsx";
import ReadingSection from "../../components/ReadingPassage/ReadingPassage.tsx";
import "../../styles/StartTestPage.css";
import MultipleChoiceTest from "../../components/MultipleChoiceTest/MultipleChoiceTest.tsx";

export default function StartTestPage() {
  return (
    <div className="start-page-container">
      <StartTestHeader />
      <div className="content-container">
        <div className="part">
          <ReadingSection></ReadingSection>
        </div>
        <div className="part">
          <MultipleChoiceTest></MultipleChoiceTest>
        </div>
      </div>
    </div>
  );
}
