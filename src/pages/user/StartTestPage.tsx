import React from "react";
import StartTestHeader from "../../components/StartTestHeader/StartTestHeader.tsx";
import ReadingPassage from "../../components/ReadingPassage/ReadingPassage.tsx";
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
                                  Events, conversations and occurrences in time and space, on the other hand, make up episodic memory. It is true that episodic memory begins to decline when most people are in their 50s, but it is never perfect at any age.">
                    </ReadingPassage>
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
