import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StartScreen({ onStart }) {
  const [cnic, setCnic] = useState("");
  const [isValidCnic, setIsValidCnic] = useState(false);

  const validateCnic = (value) => {
    // Basic CNIC validation (13 digits)
    const cnicRegex = /^\d{13}$/;
    return cnicRegex.test(value);
  };

  const handleCnicChange = (e) => {
    const value = e.target.value;
    setCnic(value);
    setIsValidCnic(validateCnic(value));
  };

  const handleStart = () => {
    if (isValidCnic) {
      onStart(cnic);
    }
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-primary-foreground">
        Welcome to the Quiz
      </h1>
      <div className="mb-6">
        <label
          htmlFor="cnic"
          className="block text-sm font-medium text-primary-foreground mb-2"
        >
          Enter your CNIC (13 digits)
        </label>
        <input
          type="text"
          id="cnic"
          value={cnic}
          onChange={handleCnicChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-primary-foreground"
          placeholder="1234567890123"
          maxLength={13}
        />
      </div>
      <p className="text-lg mb-8 text-gray-600">
        Please note: After starting the quiz, the application will enter
        fullscreen mode.
      </p>
      <p className="text-lg mb-8 text-gray-600">
        If you press Escape, switch to another tab or window, or exit fullscreen
        mode, the quiz will terminate, and you will fail. Please ensure you're
        ready before starting.
      </p>
      <motion.button
        className={`bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
          isValidCnic ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleStart}
        disabled={!isValidCnic}
        whileHover={isValidCnic ? { scale: 1.05 } : {}}
        whileTap={isValidCnic ? { scale: 0.95 } : {}}
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
}
