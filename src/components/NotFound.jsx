"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-teal-100 to-green-200">
      <motion.div
        className="text-center p-8 bg-white bg-opacity-70 rounded-xl backdrop-blur-md shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-9xl font-extrabold mb-4 text-blue-600"
          variants={childVariants}
        >
          404
        </motion.h1>
        <motion.p
          className="text-2xl mb-8 text-green-700"
          variants={childVariants}
        >
          Oops! Page not found
        </motion.p>
        <motion.div variants={childVariants}>
          <Button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white hover:bg-green-500 transition-colors duration-300"
          >
            Go Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
