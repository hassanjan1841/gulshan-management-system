import React, { useState } from "react";
import { motion } from "framer-motion";

export default function QuizQuestion({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    if (question.type === "single") {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    }
  };

  const handleSubmit = () => {
    onAnswer(selectedOptions);
    setSelectedOptions([]);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-muted">
        {question.question}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type={question.type === "single" ? "radio" : "checkbox"}
              id={`option-${index}`}
              name="quiz-option"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="mr-3"
            />
            <label
              htmlFor={`option-${index}`}
              className="text-lg text-muted cursor-pointer"
            >
              {option}
            </label>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <span className="text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <motion.button
          className="bg-blue-500 text-foreground px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentQuestion === totalQuestions - 1 ? "Finish" : "Next"}
        </motion.button>
      </div>
    </motion.div>
  );
}
