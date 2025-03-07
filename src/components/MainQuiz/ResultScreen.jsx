import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function ResultScreen({
  answers,
  questions,
  failed,
  cnic,
  timeRemaining,
}) {
  useEffect(() => {
    // Console log all quiz data
    console.log(cnic);
    console.log(failed);
    console.log({
      cnic,
      failed,
      timeRemaining,
      totalQuestions: questions.length,
      answers,
      score: failed ? 0 : calculateScore(),
    });
  }, []);

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      const userAnswers = answer.match(/\{(.+?)\}/)[1].split(", ");
      const correctAnswers = questions[index].correctAnswer;
      return (
        score +
        (JSON.stringify(userAnswers.sort()) ===
        JSON.stringify(correctAnswers.sort())
          ? 1
          : 0)
      );
    }, 0);
  };

  const score = calculateScore();
  const isFailed = score === 0;

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-primary-foreground">
        {isFailed ? "Quiz Failed" : "Quiz Completed"}
      </h2>
      {failed ? (
        <p className="text-xl text-red-600 mb-4">
          You either pressed Escape or switched to another tab/window. Your
          score is 0.
        </p>
      ) : (
        <>
          <p className="text-xl mb-4 text-primary-foreground">
            Your score: <span className="font-semibold">{score}</span> out of{" "}
            {questions.length}
          </p>
          <div className="mt-8 text-left text-primary-foreground">
            <h3 className="text-2xl font-semibold mb-4">Your Answers:</h3>
            {answers.map((answer, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{questions[index].question}</p>
                <p className="text-green-600">{answer}</p>
                <p className="text-blue-600">
                  Correct answer: answer {index + 1} {"{"}
                  {questions[index].correctAnswer.join(", ")}
                  {"}"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <motion.button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors mt-8"
        onClick={() => window.location.reload()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Restart Quiz
      </motion.button>
    </motion.div>
  );
}
