import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, GraduationCap } from "lucide-react";
import { Button } from "../../components/ui/button";
const CourseCard = ({ title, criteria, duration, lastDate, isOpen, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-landing-background rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-6 group"
    >
      {isOpen ? (
        <div className="absolute top-7 -right-12 bg-landing-other-button text-landing-background px-10 sm:px-12 sm:py-1 rotate-[45deg] sm:rotate-[35deg]">
          <span className="text-xs sm:text-sm font-semibold ">
            ADMISSION OPEN
          </span>
        </div>
      ) : (
        <div className="absolute top-7 -right-12 bg-red-300 text-landing-background px-10 sm:px-12 sm:py-1 rotate-[45deg] sm:rotate-[35deg]">
          <span className="text-xs sm:text-sm font-semibold ">
            ADMISSION CLOSED
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-landing-text mt-4 mb-4">
        {title}
      </h3>

      <div className="space-y-3 ">
        <div className="flex items-start gap-2">
          <GraduationCap className="w-5 h-5 text-landing-text-light mt-1" />
          <div>
            <p className="text-sm text-landing-text-light">Criteria</p>
            <p className="text-landing-text">{criteria}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-landing-text-light mt-1" />
          <div>
            <p className="text-sm text-landing-text-light">
              Last Date to Apply
            </p>
            <p className="text-landing-text">{isOpen ? lastDate : "---"}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="w-5 h-5 text-landing-text-light mt-1" />
          <div>
            <p className="text-sm text-landing-text-light">Duration</p>
            <p className="text-landing-text">{duration}</p>
          </div>
        </div>
      </div>
        {isOpen && (
          <div className="flex justify-end mt-4">
            <Button
              variant="secondary"
              className="bg-landing-other-button-dark  text-white hover:bg-landing-button transition duration-300"
            >
              Apply Now
            </Button>
          </div>
        )}
    </motion.div>
  );
};

const Courses = () => {
  const courses = [
    {
      title: "Data Science",
      criteria: "Bachelor's in Statistics/Mathematics",
      duration: "8 months",
      lastDate: "January 15, 2025",
      isOpen: true,
    },
    {
      title: "Web Development",
      criteria: "Bachelor's in Computer Science",
      duration: "6 months",
      lastDate: "January 30, 2025",
      isOpen: true,
    },
    {
      title: "UX Design",
      criteria: "Any Bachelor's Degree",
      duration: "4 months",
      lastDate: "February 15, 2025",
      isOpen: false,
    },
    {
      title: "Mobile App Development",
      criteria: "Bachelor's in Computer Science",
      duration: "6 months",
      lastDate: "March 1, 2025",
      isOpen: false,
    },
    {
      title: "Machine Learning",
      criteria: "Bachelor's in Computer Science/Mathematics",
      duration: "10 months",
      lastDate: "February 1, 2025",
      isOpen: true,
    },
    {
      title: "Digital Marketing",
      criteria: "Any Bachelor's Degree",
      duration: "3 months",
      lastDate: "January 20, 2025",
      isOpen: true,
    },
  ];

  return (
    <section id="courses" className="py-20 bg-landing-background-light">
      <div className="w-[90%] mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-landing-text">Our Courses</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-landing-other-button-dark text-landing-background px-4 py-2 border-none rounded-md hover:bg-landing-button transition duration-300"
          >
            View All
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
