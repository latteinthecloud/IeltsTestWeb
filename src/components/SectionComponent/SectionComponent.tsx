import React from "react";
import QuestionList from "../QuestionList/QuestionList.tsx";

interface SectionComponentProps {
  questionLists: any;
  lastQuestionIndex: number;
}

export default function SectionComponent({
  questionLists,
  lastQuestionIndex,
}: SectionComponentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {questionLists.map((ql, index) => {
        let startIndex = 0;

        for (let i = 0; i < index; i++)
          startIndex += questionLists[i].questionList.qnum;

        return (
          <QuestionList
            key={index}
            startQuestion={lastQuestionIndex + startIndex + 1}
            endQuestion={lastQuestionIndex + startIndex + ql.questionList.qnum}
            questionList={ql.questionList}
            questions={ql.questions}
          ></QuestionList>
        );
      })}
    </div>
  );
}
