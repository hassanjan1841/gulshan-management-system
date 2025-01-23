import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Timer({
  timeRemaining,
  setTimeRemaining,
  setQuizState,
}) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizState("failed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeRemaining, setQuizState]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <motion.div
      className="text-xl font-semibold text-right mb-4 text-muted"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Time remaining: {minutes}:{seconds.toString().padStart(2, "0")}
    </motion.div>
  );
}
