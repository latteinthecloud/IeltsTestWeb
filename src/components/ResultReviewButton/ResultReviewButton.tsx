import React, { useEffect, useState } from "react";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import { useNavigate } from "react-router-dom";
import sectionApi from "../../api/sectionApi.js";
import resultApi from "../../api/resultApi.tsx";

interface ResultReviewButtonProps {
  resultId: number;
  testId: number;
  skill: string;
  time: string;
  score: number;
}

export default function ResultReviewButton({
  resultId,
  testId,
  skill,
  time,
  score,
}: ResultReviewButtonProps) {
  const navigate = useNavigate();

  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [minute, setMinute] = useState<number>(0);
  const [band, setBand] = useState<number>(0);

  skill = skill.charAt(0).toUpperCase() + skill.slice(1);
  const formattedTime = getMinutes(time);

  useEffect(() => {
    const fetchData = async () => {
      const totalQuestionResult = await getTotalQuestion(testId);
      setTotalQuestion(totalQuestionResult);

      const answersResult = await getAnswers(resultId);
      setAnswers(answersResult);

      const bandResult = scoreToBand(score);
      setBand(bandResult);

      setMinute(formattedTime);
    };

    fetchData();
  }, [resultId, testId, score, formattedTime]);

  const handleClick = () => {
    navigate("/result", {
      state: {
        resultId,
        testId,
        skill,
        timeSpent: minute,
        totalQuestion,
        answers,
        score,
        band,
      },
    });
  };

  return <RoundedButton title="Review" onClick={handleClick} />;
}

function scoreToBand(score: number) {
  if (score <= 1) return 1.0;
  else if (score <= 3) return 2.0;
  else if (score <= 5) return 3.0;
  else if (score <= 7) return 3.5;
  else if (score <= 9) return 4.0;
  else if (score <= 12) return 4.5;
  else if (score <= 15) return 5.0;
  else if (score <= 19) return 5.5;
  else if (score <= 22) return 6.0;
  else if (score <= 26) return 6.5;
  else if (score <= 29) return 7.0;
  else if (score <= 32) return 7.5;
  else if (score <= 34) return 8.0;
  else if (score <= 36) return 8.5;
  else return 9.0;
}

async function getTotalQuestion(testId: number) {
  try {
    const response = await sectionApi.getAll(testId);
    if (Array.isArray(response)) {
      let totalQuestion = 0;
      response.forEach((res) => (totalQuestion += res.questionNum));
      return totalQuestion;
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}

async function getAnswers(resultId: number) {
  try {
    const response = await resultApi.getDetails(resultId);
    if (Array.isArray(response)) {
      const answers = new Map(
        response.map((item) => [item.questionOrder, item.userAnswer])
      );
      return answers;
    }
  } catch (error) {
    console.log(error);
  }
  return new Map();
}

function getMinutes(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":");
  return parseInt(minutes);
}
