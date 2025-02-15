import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ContactAdminForm } from "@/components/StudentDashboard/ContactAdminForm";
import { ComboboxList } from "@/components/ComboboxList";

const courses = [
  {
    _id: "1",
    title: "Introduction to Programming",
    value: "introduction-to-programming",
  },
  { _id: "2", title: "Data Structures", value: "data-structures" },
  { _id: "3", title: "Algorithms", value: "algorithms" },
  { _id: "4", title: "Web Development", value: "web-development" },
];

const branches = [
  { _id: "1", title: "Computer Science", value: "computer-science" },
  {
    _id: "2",
    title: "Electrical Engineering",
    value: "electrical-engineering",
  },
  {
    _id: "3",
    title: "Mechanical Engineering",
    value: "mechanical-engineering",
  },
];

const sections = [
  { _id: "1", title: "Section A", value: "section-a", seats: 5 },
  { _id: "2", title: "Section B", value: "section-b", seats: 0 },
  { _id: "3", title: "Section C", value: "section-c", seats: 3 },
];

const StudentWelcome = () => {
  const [step, setStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  const handleContinue = () => {
    setStep(1);
  };

  const handleContactAdmin = () => {
    setShowContactForm(true);
  };

  const getAvailableSeats = () => {
    const section = sections.find((s) => s._id === selectedSection);
    return section ? section.seats : 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent w-full">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                Welcome, Student!
              </h1>
              <p className="text-lg text-center text-gray-600 mb-8">
                {"We're"} excited to have you join us. {"Let's"} get you started
                on your academic journey!
              </p>
              <Button onClick={handleContinue} className="w-full">
                Continue
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="selection"
              initial={{ opacitzy: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Select Your Course, Branch, and Section
              </h2>
              <div className="space-y-4">
                <ComboboxList
                  items={courses}
                  placeholder="Select Course"
                  onSelect={setSelectedCourse}
                />
                <ComboboxList
                  items={branches}
                  placeholder="Select Branch"
                  onSelect={setSelectedBranch}
                />
                <ComboboxList
                  items={sections}
                  placeholder="Select Section"
                  onSelect={setSelectedSection}
                />
                {selectedSection && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-600"
                  >
                    {getAvailableSeats() > 0
                      ? `${getAvailableSeats()} seats available`
                      : "No seats left in this section"}
                  </motion.p>
                )}
                <Button
                  onClick={handleContactAdmin}
                  variant="outline"
                  className="w-full"
                >
                  Contact Administrator
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContactForm && (
            <motion.div
              key="contact-form-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowContactForm(false)}
            >
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <ContactAdminForm
                  onClose={() => setShowContactForm(false)}
                  branches={branches}
                  sections={sections}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentWelcome;
