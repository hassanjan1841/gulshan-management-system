import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import heroImage from "@/assets/images/hero/hero-image.jpg";
import heroImage2 from "@/assets/images/hero/hero-image-2.jpg";
import heroImage3 from "@/assets/images/hero/hero-image-3.jpg";

const heroContent = [
  {
    name: "Imran Hassan",
    recentAchievement: "Completed Advanced JavaScript Course",
    reward: "Gold Star Badge",
    image: heroImage,
  },
  {
    name: "Abdul Jabbar",
    recentAchievement: "Mastered React Hooks",
    reward: "Silver Star Badge",
    image: heroImage2,
  },
  {
    name: "Moin ALi",
    recentAchievement: "Built a Full-Stack Application",
    reward: "Bronze Star Badge",
    image: heroImage3,
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="py-20  section-height md:py-32 bg-gradient-to-br from-landing-background-light to-landing-background-dark"
    >
      <div className="w-[90%]  rounded-lg mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex max-sm:flex-col flex-row justify-between items-center"
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-landing-text">
                Congratulations, {heroContent[currentSlide].name}!
              </h1>
              <p className="text-xl mb-6 text-landing-text-light">
                Your hard work is paying off. Keep up the great progress!
              </p>
              <div className="bg-landing-background rounded-lg p-6 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-landing-text flex items-center">
                  <Award className="mr-2 text-landing-button" /> Recent
                  Achievement
                </h2>
                <p className="text-landing-text-light mb-2">
                  {heroContent[currentSlide].recentAchievement}
                </p>
                <p className="text-landing-text font-semibold">
                  Reward: {heroContent[currentSlide].reward}
                </p>
              </div>

              {/* <div className="space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-landing-button text-landing-background px-6 py-3 rounded-md hover:bg-landing-button-dark transition duration-300"
                >
                  Continue Learning
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-landing-other-button text-landing-background px-6 py-3 rounded-md hover:bg-landing-other-button-dark transition duration-300"
                >
                  View Achievements
                </motion.button>
              </div> */}
            </div>

            <div className="md:w-1/2 flex items-center justify-end">
              <motion.img
                src={heroContent[currentSlide].image}
                alt="Course preview"
                className="w-full sm:max-w-[600px]  sm:h-[400px] object-cover rounded-lg shadow-lg "
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
