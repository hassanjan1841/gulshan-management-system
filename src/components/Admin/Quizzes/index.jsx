import { AnimatePresence } from "framer-motion";
import CoursesPage from "./CoursesPage";
import { ToastContainer } from "react-toastify";
function Quiz() {
  // const toggleQuizActive = (quizId) => {
  //   setQuizzes((prevQuizzes) =>
  //     prevQuizzes.map((quiz) =>
  //       quiz._id === quizId ? { ...quiz, active: !quiz.active } : quiz
  //     )
  //   );
  // };

  return (
    <AnimatePresence mode="wait">
      <ToastContainer />
      <CoursesPage />
    </AnimatePresence>
  );
}

export default Quiz;
