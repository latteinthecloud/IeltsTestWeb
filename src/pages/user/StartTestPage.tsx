import React from "react";
import StartTestHeader from "../../components/StartTestHeader/StartTestHeader.tsx";
import ReadingPassage from "../../components/ReadingPassage/ReadingPassage.tsx";
import "../../styles/StartTestPage.css";
import MultipleChoiceTest from "../../components/MultipleChoiceTest/MultipleChoiceTest.tsx";
import TrueFalseTest from "../../components/TrueFalseTest/TrueFalseTest.tsx";
import MatchingTest from "../../components/MatchingTest/MatchingTest.tsx";
import DiagramTest from "../../components/DiagramTest/DiagramTest.tsx";
import StartTestFooter from "../../components/StartTestFooter/StartTestFooter.tsx";
import QuestionList from "../../components/QuestionList/QuestionList.tsx";

export default function StartTestPage() {
  return (
    <div className="start-page-container">
      <StartTestHeader />
      <div className="content-container">
        <div className="left">
          <ReadingPassage
            sectionOrder={1}
            title="How the mind ages"
            img="https://iotcdn.oss-ap-southeast-1.aliyuncs.com/2024-02/How%20the%20mind%20ages%402x.png"
            content="The way mental function changes is largely determined by three factors-mental lifestyle,
                         the impact of chronic disease and flexibility of the mind.\nExperiments have shown that younger monkeys consistently outperform their older colleagues on memory tests. Formerly, psychologists concluded that memory and other mental functions in humans deteriorate over time because of changes in the brain. Thus mental decline after young adulthood appeared inevitable.
                          The truth, however, is not quite so simple.\nStanley Rapoport at the National Institute of Health in the United States measured the flow of blood in the brains of old and young people as they completed different tasks.
                           Since blood flow reflects neural activity. Rapoport could compare which networks of neurons were the same, the neural networks they used were significantly different.
                            The older subjects used different internal strategies to accomplish comparable results at the same time, Rapoport says. At the Georgia Institute of Technology,
                             psychologist Timothy Salthouse compared a group of fast and accurate typists of college age with another group in their 60s. Both groups typed 60 words a minute. The older typists, it turned out, achieved their speed with cunning little strategies that made them more efficient than their younger counterparts.
                              They made fewer finger shifts, gaining a fraction of a second here and there. They also read ahead in the test. The neural networks involved in typing appear to have been reshaped to compensate for losses in motor skills or other age changes.
                              \nIn fact, there is evidence that deterioration in mental functions can actually be reversed. Neuropsychologist Marion Diamond at the University of California has shown that mental activity maks neurons sprout new dendrites* which establish connections with other neurons.
                               The dendrites shrink when the mind is idle. For example, when a rat is kept in isolation, the animal brain shrinks, but if we put that rat with other rats in a large cage and give them an assortment of toys, we can show, after four days, significant differences in its brain. says Diamond. After a month in the enriched surroundings,
                                the whole cerebral cortex has expanded, as has its blood supply.But even in the enriched surroundings, rats get bored unless the toys are varied. Animals are just like we are. They need stimulation, says Diamond. A busy mental lifestyle keeps the human mind fit, says Warner Schaie of Penn State University.
                                 People who regularly participate in challenging tasks retain their intellectual abilities better than mental couch potatoes.\nIn his studies, Schaie detected a decline in mental function among individuals who underwent lengthy stays in hospital for chronic illness. He postulated it might be due to the mental passivity encouraged by hospital routine.
                                 \nOne of the most profoundly important mental functions is memory. Memory exists in more than one form, what we call knowledge- facts- is what psychologists such as Harry Bahrick of Ohio Wesleyan University call semantic memory.
                                  Events, conversations and occurrences in time and space, on the other hand, make up episodic memory. It is true that episodic memory begins to decline when most people are in their 50s, but it is never perfect at any age."
          ></ReadingPassage>
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

      <StartTestFooter totalQuestion={[13, 14, 13]}></StartTestFooter>
    </div>
  );
}
