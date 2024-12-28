import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-landing-text text-landing-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold text-landing-button mb-4"
            >
              EduTech
            </motion.div>
            <p className="text-landing-background-light">
              Empowering futures through education.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Courses", "Teachers", "Management", "Reviews"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item.toLowerCase()}
                      smooth={true}
                      duration={500}
                      className="text-landing-background-light hover:text-landing-button cursor-pointer"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-landing-background-light">
              <li>123 Education St.</li>
              <li>Anytown, ST 12345</li>
              <li>contact@edutech.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                (social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="text-landing-background-light hover:text-landing-button"
                  >
                    {social}
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-landing-background-dark text-center text-landing-background-light">
          <p>&copy; 2023 EduTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
