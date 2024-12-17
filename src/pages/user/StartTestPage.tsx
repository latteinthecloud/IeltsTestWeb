import React from "react";
import StartTestHeader from "../../components/StartTestHeader/StartTestHeader.tsx";
import ReadingSection from "../../components/ReadingPassage/ReadingPassage.tsx";
import "../../styles/StartTestPage.css"
import MultipleChoiceTest from "../../components/MultipleChoiceTest/MultipleChoiceTest.tsx";
import TrueFalseTest from "../../components/TrueFalseTest/TrueFalseTest.tsx";
import MatchingTest from "../../components/MatchingTest/MatchingTest.tsx";
import DiagramTest from "../../components/DiagramTest/DiagramTest.tsx";
import StartTestFooter from "../../components/StartTestFooter/StartTestFooter.tsx";


export default function StartTestPage() {
    return (
        <div className="start-page-container">
            <StartTestHeader/>
            <div className="content-container">
                <div className="part">
                    <ReadingSection></ReadingSection>
                </div>
                <div className="part">
                <MultipleChoiceTest></MultipleChoiceTest>
                <TrueFalseTest></TrueFalseTest>
                <MatchingTest></MatchingTest>
                <DiagramTest></DiagramTest>
                </div>
            </div>
            <StartTestFooter></StartTestFooter>
        </div>
    );
}
