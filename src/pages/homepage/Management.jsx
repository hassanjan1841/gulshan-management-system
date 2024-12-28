import React from "react";
import { motion } from "framer-motion";

const Manager = ({ name, role, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center shadow-md"
    >
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold text-landing-text">{name}</h3>
      <p className="text-landing-text-light">{role}</p>
    </motion.div>
  );
};

const Management = () => {
  const managers = [
    {
      name: "Emily Brown",
      role: "CEO",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Lisa Taylor",
      role: "COO",
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  return (
    <section id="management" className="pt-20 bg-landing-background-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-landing-text">
          Management Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {managers.map((manager, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Manager {...manager} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Management;
