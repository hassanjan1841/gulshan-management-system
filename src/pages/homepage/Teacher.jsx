import React from "react";
import { motion } from "framer-motion";
import BilalSir from "@/assets/images/bilal-sir.jpeg";

const Teacher = ({ name, profession, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center shadow-md"
    >
      <img
        src={image}
        alt={name}
        className={
          "w-32 h-32 rounded-full mb-4 object-cover shadow-lg" +
          (!image ? " border" : "")
        }
      />
      <h3 className="text-lg font-semibold text-landing-text">{name}</h3>
      <p className="text-landing-text-light">{profession}</p>
    </motion.div>
  );
};

const Teachers = () => {
  const teachers = [
    {
      name: "Sir Bilal Attari",
      profession: "MERN Stack Developer",
      image: BilalSir,
    },
    {
      name: "Prof. John Doe",
      profession: "Data Science",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Sarah Johnson",
      profession: "UX Design",
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  return (
    <section id="teachers" className="py-20 bg-landing-background ">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-center mb-12 text-landing-text">
          Top Best Teachers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Teacher {...teacher} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
