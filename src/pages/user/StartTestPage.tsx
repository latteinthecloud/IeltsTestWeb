import React, { useEffect, useState } from "react";
import StartTestHeader from "../../components/StartTestHeader/StartTestHeader.tsx";
import ReadingPassage from "../../components/ReadingPassage/ReadingPassage.tsx";
import "../../styles/StartTestPage.css";
import MultipleChoiceTest from "../../components/MultipleChoiceTest/MultipleChoiceTest.tsx";
import TrueFalseTest from "../../components/TrueFalseTest/TrueFalseTest.tsx";
import MatchingTest from "../../components/MatchingTest/MatchingTest.tsx";
import DiagramTest from "../../components/DiagramTest/DiagramTest.tsx";
import StartTestFooter from "../../components/StartTestFooter/StartTestFooter.tsx";
import QuestionList from "../../components/QuestionList/QuestionList.tsx";
import { useSearchParams } from "react-router-dom";
import sectionApi from "../../api/sectionApi.js";

export default function StartTestPage() {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState(1);
  const [sections, setSections] = useState<any[]>([]);

  const skill = searchParams.get("skill");
  const id = searchParams.get("test");

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
    <div className="start-page-container">
      <StartTestHeader />
      <div className="content-container">
        <div className="left">
          {sections.map((section, index) => {
            return (
              activeSection === index + 1 && (
                <ReadingPassage
                  sectionOrder={index + 1}
                  img={section.imageLink}
                  title={section.title}
                  content={section.content}
                ></ReadingPassage>
              )
            );
          })}
        </div>
        <div className="right">
          <QuestionList
            startQuestion={1}
            endQuestion={3}
            type="multiple_choice"
          >
            <MultipleChoiceTest
              questionOrder={1}
              content="What does the writer say about the performance of older typists on the test?"
              answer="A"
              choiceList="They used different motor skills from younger typists.\nThey had been more efficiently trained than younger typists.
                        \nThey used more time-saving techniques than younger typists.\nThey had better concentration skills than younger typists."
            ></MultipleChoiceTest>

            <MultipleChoiceTest
              questionOrder={2}
              content="The experiment with the rats showed that"
              answer="D"
              choiceList="brain structure only changed when the rats were given a familiar toy\nthe rats became anxious after a lengthy period of time alone
                        \nthe rats lived longer then they were part of a social group\nthe rats'brains expanded or shrank depending on the level of mental activity"
            ></MultipleChoiceTest>

            <MultipleChoiceTest
              questionOrder={3}
              content=" A comparison between adults and children who played chess showed that"
              answer="C"
              choiceList="the children were as capable as the adults of remembering a series of numbers\nthe children had better recall of the layout of pieces
                        \nthe adults stored memories of chess moves in a more logical manner\nthe adults had clearer memories of chess games they had played"
            ></MultipleChoiceTest>
          </QuestionList>

          <QuestionList startQuestion={4} endQuestion={7} type="true_false">
            <TrueFalseTest
              questionOrder={4}
              content="Heritage Farm is different from most other nearby farms."
              answer="TRUE"
            ></TrueFalseTest>

            <TrueFalseTest
              questionOrder={5}
              content="Most nongovernment-owned seed banks are bigger than Seed Savers Exchange."
              answer="FALSE"
            ></TrueFalseTest>

            <TrueFalseTest
              questionOrder={6}
              content="Diane Ott Whealy's grandfather taught her a lot about seed varieties."
              answer="NOT GIVEN"
            ></TrueFalseTest>

            <TrueFalseTest
              questionOrder={7}
              content="The seeds people give to the Seed Savers Exchange are stored outdoors."
              answer="TRUE"
            ></TrueFalseTest>
          </QuestionList>

          <QuestionList
            startQuestion={8}
            endQuestion={10}
            type="matching"
            content="List of people"
            choiceList="Stanley Rapoport\nMarion Diamond\nWarner Schaie"
          >
            <MatchingTest
              questionOrder={8}
              content="The educational system makes students aware of how their memory works."
              choiceList="A\nB\nC"
              answer="A"
            ></MatchingTest>

            <MatchingTest
              questionOrder={9}
              content="Being open to new ways of doing things can have a positive impact on your mental condition as we get older."
              choiceList="A\nB\nC"
              answer="B"
            ></MatchingTest>

            <MatchingTest
              questionOrder={10}
              content="Being open to new ways of doing things can have a positive impact on your mental condition as we get older."
              choiceList="A\nB\nC"
              answer="B"
            ></MatchingTest>
          </QuestionList>

          <QuestionList
            startQuestion={11}
            endQuestion={14}
            type="diagram"
            img="https://ieltsonlinetests.com/sites/default/files/2023-09/Screenshot%202023-09-12%20140046.png"
          >
            <DiagramTest questionOrder={11} answer=""></DiagramTest>
            <DiagramTest questionOrder={12} answer=""></DiagramTest>
            <DiagramTest questionOrder={13} answer=""></DiagramTest>
            <DiagramTest questionOrder={14} answer=""></DiagramTest>
          </QuestionList>

          <QuestionList
            startQuestion={15}
            endQuestion={17}
            type="complete"
            content="Psychologists distinguish between two different types of memory: <i> and <i> memory. A study was conducted into people's knowledge of
                    <i> to determine recall ability. This aspect of memory was found to be a function not of age but rather of length of tuition.\n
                    School also helps with a brain function called <i> . This is why a more highly educated person is generally more successful and does better in 
                    <i> tests."
          ></QuestionList>
        </div>
      </div>

      <StartTestFooter
        totalQuestion={[13, 14, 13]}
        activeIndex={activeSection}
        setActiveIndex={setActiveSection}
      ></StartTestFooter>
    </div>
  );
}
