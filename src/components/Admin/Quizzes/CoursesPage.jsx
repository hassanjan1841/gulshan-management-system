import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCoursesWithoutLimit } from "../../../services/api/courses";
import { getBatchesByCourseId } from "../../../services/api/batches";
import {
  createQuiz,
  deleteQuiz,
  getQuizzesByCourseAndBatch,
  updateQuizActiveStatus,
} from "../../../services/api/mainQuiz";

import { toast, ToastContainer } from "react-toastify";
import QuizCard from "./components/QuizCard";
import FilterSection from "./components/FilterSection";
import AddQuizDialog from "./components/AddQuizDialog";
import NoQuizzesMessage from "./components/NoQuizzesMessage";

function CoursesPage() {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    course: "",
    batch: "",
  });

  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [loadingQuizId, setLoadingQuizId] = useState(null);
  const [loadingDeleteQuizId, setLoadingDeleteQuizId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesWithoutLimit();
        setCourses(response.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const fetchBatches = async (course) => {
    try {
      if (course === "all") return;
      const response = await getBatchesByCourseId(course);
      setBatches(response);
    } catch (error) {
      console.error("Error fetching batches:", error);
      toast.error("Failed to fetch batches");
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      fetchBatches(selectedCourse);
    } else {
      setBatches([]);
    }
  }, [selectedCourse]);

  const fetchQuizzesByCourseAndBatch = async (course, batch) => {
    try {
      if (selectedCourse == "all" || selectedBatch == "all") {
        setQuizzes([]);
        return;
      }
      const data = await getQuizzesByCourseAndBatch(course, batch);
      setQuizzes(data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes by course and batch:", error);
      if (error.response?.status === 404) {
        setQuizzes([]);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (selectedCourse && selectedBatch) {
      fetchQuizzesByCourseAndBatch(selectedCourse, selectedBatch);
    }
  }, [selectedCourse, selectedBatch]);

  const handleNewQuizChange = async (field, value) => {
    setNewQuiz((prev) => ({ ...prev, [field]: value }));
    if (field === "course") {
      await fetchBatches(value);
    }
  };

  const toggleQuizActive = async (quizId) => {
    setLoadingQuizId(quizId);
    try {
      const convertedStatus = Boolean(
        !quizzes.find((quiz) => quiz._id === quizId).active
      );
      await updateQuizActiveStatus(quizId, convertedStatus);
      await fetchQuizzesByCourseAndBatch(selectedCourse, selectedBatch);
      toast.success("Quiz status updated successfully");
    } catch (error) {
      console.error("Error updating quiz active status:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoadingQuizId(null);
    }
  };

  const handleEditQuiz = async (quizId) => {
    setLoading(true);
    try {
      // Add your edit quiz logic here
      console.log("Quiz details fetched for editing:", quizId);
      toast.info("Edit functionality coming soon!");
    } catch (error) {
      console.error("Error editing quiz:", error);
      toast.error("Failed to edit quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    setLoading(true);
    setLoadingDeleteQuizId(quizId);
    try {
      await deleteQuiz(quizId);
      await fetchQuizzesByCourseAndBatch(selectedCourse, selectedBatch);
      toast.success("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    } finally {
      setLoading(false);
      setLoadingDeleteQuizId(null);
    }
  };

  const handleSubmitNewQuiz = async () => {
    setLoading(true);
    try {
      if (newQuiz.title && newQuiz.course && newQuiz.batch) {
        await createQuiz(newQuiz);
        await fetchQuizzesByCourseAndBatch(newQuiz.course, newQuiz.batch);
        setNewQuiz({
          title: "",
          course: "",
          batch: "",
        });
        setIsDialogOpen(false);
        toast.success("Quiz created successfully");
      } else {
        toast.warning("Please fill all required fields");
      }
    } catch (error) {
      console.error("Error adding new quiz:", error);
      toast.error("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <AddQuizDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          newQuiz={newQuiz}
          handleNewQuizChange={handleNewQuizChange}
          handleSubmitNewQuiz={handleSubmitNewQuiz}
          loading={loading}
          courses={courses}
          batches={batches}
        />
      </div>

      <FilterSection
        courses={courses}
        batches={batches}
        selectedCourse={selectedCourse}
        selectedBatch={selectedBatch}
        setSelectedCourse={setSelectedCourse}
        setSelectedBatch={setSelectedBatch}
      />

      {quizzes?.length === 0 ? (
        <NoQuizzesMessage
          selectedCourse={selectedCourse}
          selectedBatch={selectedBatch}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes?.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              loadingQuizId={loadingQuizId}
              loadingDeleteQuizId={loadingDeleteQuizId}
              toggleQuizActive={toggleQuizActive}
              handleEditQuiz={handleEditQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default CoursesPage;
