import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllQuestionsFromQuiz,
  deleteQuestionFromQuiz,
  getSingleQuiz,
} from "../../../services/api/mainQuiz";
import AddQuestionModal from "./AdQuestionModal";
import QuestionItem from "./components/QuestionItem";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// Move the fetch function outside
const fetchQuestionsFromQuiz = async (quizId, setLoading, setQuestions) => {
  setLoading(true);
  try {
    const response = await getAllQuestionsFromQuiz(quizId);
    console.log("response in questionspage", response);
    setQuestions(response.questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    toast.error("Failed to fetch questions");
  } finally {
    setLoading(false);
  }
};

const PageHeader = ({
  handleGoBack,
  quizId,
  setLoading,
  setQuestions,
  quizTitle,
}) => (
  <>
    <div className="flex justify-between items-center mb-4">
      <Button onClick={handleGoBack}>Back to Quizzes</Button>
      <AddQuestionModal
        quizId={quizId}
        refreshQuestions={() =>
          fetchQuestionsFromQuiz(quizId, setLoading, setQuestions)
        }
        addQuestion={() =>
          fetchQuestionsFromQuiz(quizId, setLoading, setQuestions)
        }
      />
    </div>
    <h1 className="text-3xl font-bold mb-6">
      Questions for {`'${quizTitle}'`}
    </h1>
  </>
);

function QuestionsPage() {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState(""); // Add this state
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempCorrectAnswers, setTempCorrectAnswers] = useState({});

  useEffect(() => {
    fetchQuestionsFromQuiz(quizId, setLoading, setQuestions);
    // Add this effect to fetch the quiz title
    const fetchQuizTitle = async () => {
      try {
        const response = await getSingleQuiz(quizId);
        console.log("quiz in questions page", response);
        setQuizTitle(response.quiz.title);
      } catch (error) {
        console.error("Error fetching quiz title:", error);
        toast.error("Failed to fetch quiz title");
      }
    };
    fetchQuizTitle();
  }, [quizId]);

  const handleQuestionEdit = (questionId, newQuestionText) => {
    try {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId ? { ...q, question: newQuestionText } : q
        )
      );
      setEditingQuestion(null);
      toast.success("Question updated successfully!");
    } catch (error) {
      toast.error("Failed to update question");
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestionFromQuiz(quizId, questionId);
      await fetchQuestionsFromQuiz(quizId, setLoading, setQuestions);
      toast.success("Question deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete question");
      console.error("Error deleting question:", error);
      throw error;
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
      <PageHeader
        handleGoBack={() => navigate(-1)}
        quizId={quizId}
        setLoading={setLoading}
        setQuestions={setQuestions}
        quizTitle={quizTitle}
      />

      <Accordion type="single" collapsible className="w-full">
        {questions?.map((question, index) => (
          <QuestionItem
            key={question._id}
            question={question}
            index={index}
            editingQuestion={editingQuestion}
            setEditingQuestion={setEditingQuestion}
            handleQuestionEdit={handleQuestionEdit}
            tempCorrectAnswers={tempCorrectAnswers}
            setTempCorrectAnswers={setTempCorrectAnswers}
            setQuestions={setQuestions}
            handleDeleteQuestion={handleDeleteQuestion}
            setLoading={setLoading}
          />
        ))}
      </Accordion>
    </motion.div>
  );
}

export default QuestionsPage;
