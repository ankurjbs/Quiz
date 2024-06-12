import { useCallback, useEffect, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const TIMER = 5000;
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // initially activeQuestionIndex will be zero , bcz initially useState is empty

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback( function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((preValue) => {
      return [...preValue, selectedAnswer];
    });
  },[]);

  const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz completed"></img>
        <h2>Quiz Completed !</h2>
      </div>
    );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        {/* key prop can be added to any element and any compo. Before we know that it is using when outputting the list data. Bcz this key helps React identify those diff list items. And it helps react to manage that list efficiently. But key prop also has another purpose , when it changes React will destroy old component instance and create new one. So it will unmount and remount basically. here activeQuestionsIndex are changing so progress bar resetting   */}
        <QuestionTimer
        key={activeQuestionIndex}
          timeout={TIMER}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
