import React from "react";
import { motion } from "framer-motion";

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-muted">
        Welcome to the Quiz
      </h1>
      <p className="text-lg mb-4 text-gray-600">
        Please note: After starting the quiz, the application will enter
        fullscreen mode.
      </p>
      <p className="text-lg mb-8 text-gray-600">
        If you press Escape, switch to another tab or window, or exit fullscreen
        mode, the quiz will terminate, and you will fail. Please ensure you're
        ready before starting.
      </p>
      <motion.button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
}
