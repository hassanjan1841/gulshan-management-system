"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import StartScreen from "./StartScreen";
import QuizQuestion from "./QuizQuestion";
import Timer from "./Timer";
import ResultScreen from "./ResultScreen";
import { useFullscreen } from "./useFullScreen";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: ["Paris"],
    type: "single",
  },
  {
    question: "Which of the following are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: ["Red", "Blue", "Yellow"],
    type: "multiple",
  },
  // Add more questions here
];

export default function QuizApp() {
  const [quizState, setQuizState] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const handleQuizFailure = useCallback(() => {
    if (quizState === "quiz") {
      console.log("Quiz failed");
      exitFullscreen();
      setQuizState("failed");
    }
  }, [quizState, exitFullscreen]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && quizState === "quiz") {
        handleQuizFailure();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && quizState === "quiz") {
        handleQuizFailure();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [quizState, handleQuizFailure]);

  const startQuiz = () => {
    enterFullscreen();
    setQuizState("quiz");
  };

  const handleAnswer = (selectedOptions) => {
    const formattedAnswer = `answer ${
      currentQuestion + 1
    } {${selectedOptions.join(", ")}}`;
    setAnswers([...answers, formattedAnswer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState("result");
      exitFullscreen();
    }
  };

  console.log(answers);

  return (
    <div
      id="quiz-container"
      className="min-h-screen bg-background flex items-center justify-center"
    >
      <motion.div
        className="bg-foreground p-8 rounded-lg shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {quizState === "start" && <StartScreen onStart={startQuiz} />}
        {quizState === "quiz" && (
          <>
            <Timer
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              setQuizState={setQuizState}
            />
            <QuizQuestion
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
            />
          </>
        )}
        {(quizState === "result" || quizState === "failed") && (
          <ResultScreen
            answers={answers}
            questions={questions}
            failed={quizState === "failed"}
          />
        )}
      </motion.div>
    </div>
  );
}
