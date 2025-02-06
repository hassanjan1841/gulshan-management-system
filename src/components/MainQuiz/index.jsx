import React, { useState, useEffect } from "react";
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
    correctAnswer: ["Red"],
    type: "multiple",
  },
  // Add more questions here
];

export default function MainQuiz() {
  const [quizState, setQuizState] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [cnic, setCnic] = useState("");

  const { enterFullscreen } = useFullscreen();

  useEffect(() => {
    if (quizState !== "quiz") return;

    // Disable all keyboard interactions
    const handleKeyDown = (event) => {
      event.preventDefault();
      endQuiz(true);
    };

    // Detecting Alt+Tab or window blur
    const handleBlur = () => {
      endQuiz(true);
    };

    // Detecting Tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        endQuiz(true);
      }
    };

    // Detecting Fullscreen Exit (Escape Key or Manual Exit)
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        endQuiz(true);
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keypress", handleKeyDown);
    document.addEventListener("keyup", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      // Cleanup on quiz end
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keypress", handleKeyDown);
      document.removeEventListener("keyup", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [quizState]);

  const startQuiz = (userCnic) => {
    setCnic(userCnic);
    enterFullscreen();
    setQuizState("quiz");
  };

  const endQuiz = (failed = false) => {
    setQuizState(failed ? "failed" : "result");
  };

  const handleAnswer = (selectedOptions) => {
    const formattedAnswer = `answer ${
      currentQuestion + 1
    } {${selectedOptions.join(", ")}}`;
    setAnswers([...answers, formattedAnswer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      endQuiz();
    }
  };

  return (
    <div
      id="quiz-container"
      className="min-h-screen bg-gray-100 flex items-center justify-center"
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
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
            cnic={cnic}
            timeRemaining={timeRemaining}
          />
        )}
      </motion.div>
    </div>
  );
}
