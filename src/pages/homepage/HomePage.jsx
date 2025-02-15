import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Courses from "./Courses";
import Teachers from "./Teacher";
import Management from "./Management";
import Reviews from "./Reviews";
import Footer from "./Footer";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-landing-background text-landing-text"
    >
      <Header />
      <Hero />
      <Courses />
      {/* <Teachers /> */}
      <Management />
      <Reviews />
      <Footer />
    </motion.div>
  );
};

export default HomePage;
