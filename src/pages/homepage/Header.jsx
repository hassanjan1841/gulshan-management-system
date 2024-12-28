import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Image from "../../assets/images.png";
const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 left-0 right-0 bg-landing-background shadow-md z-50"
    >
      <div className="mx-auto px-4  flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.1 }}>
          <img className="w-[70px] h-[70px]" src={Image} alt="" />
        </motion.div>
        <nav className="hidden md:flex space-x-6">
          {["Home", "Courses", "Teachers", "Management", "Reviews"].map(
            (item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                className="text-landing-text hover:text-landing-button cursor-pointer"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-landing-button text-landing-background px-4 py-2 rounded-md hover:bg-landing-other-button-dark transition duration-300"
          >
            Student Portal
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-landing-other-button text-landing-background px-4 py-2 rounded-md hover:bg-landing-button-dark transition duration-300"
          >
            Registration
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
