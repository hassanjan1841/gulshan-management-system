"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { getCoursesWithoutLimit } from "../../../services/api/courses";
import { getBatchesByCourseId } from "../../../services/api/batches";
import {
  getQuizzesByCourseAndBatch,
  updateQuizActiveStatus,
} from "../../../services/api/mainQuiz";
import { Link } from "react-router";

function CoursesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    course: "",
    batch: "",
  });

  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [loadingQuizId, setLoadingQuizId] = useState(null);

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await getCoursesWithoutLimit();
        setCourses(response.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const fetchBatches = async () => {
        try {
          if (selectedCourse === "all") return;
          const response = await getBatchesByCourseId(selectedCourse);
          // console.log("Batches:", response, "selectedcourse", selectedCourse);
          setBatches(response);
        } catch (error) {
          console.error("Error fetching batches:", error);
        }
      };

      fetchBatches();
    } else {
      setBatches([]);
    }
  }, [selectedCourse]);

  useEffect(() => {
    const fetchQuizzesByCourseAndBatch = async () => {
      try {
        if (selectedCourse == "all" || selectedBatch == "all") return;
        const data = await getQuizzesByCourseAndBatch(
          selectedCourse,
          selectedBatch
        );
        console.log(
          "Quizzes:",
          data,
          "course and batch",
          selectedCourse,
          selectedBatch
        );
        setQuizzes(data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes by course and batch:", error);
      }
    };

    if (selectedCourse && selectedBatch) {
      fetchQuizzesByCourseAndBatch();
    }
  }, [selectedCourse, selectedBatch]);

  const handleNewQuizChange = (field, value) => {
    setNewQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const toggleQuizActive = async (quizId) => {
    console.log("toggleQuizActive", quizId);
    setLoadingQuizId(quizId);
    try {
      const convertedStatus = Boolean(
        !quizzes.find((quiz) => quiz._id === quizId).active
      );
      // Assuming you have an API function to update the quiz active status
      const response = await updateQuizActiveStatus(quizId, convertedStatus);
      console.log(
        "Quiz active status updated:",
        response,
        "quiz which converted",
        convertedStatus
      );
      // Fetch updated quizzes
      const data = await getQuizzesByCourseAndBatch(
        selectedCourse,
        selectedBatch
      );
      console.log("Quizzes:", data);
      setQuizzes(data.quizzes);
    } catch (error) {
      console.error("Error updating quiz active status:", error);
    } finally {
      setLoadingQuizId(null);
    }
  };

  const handleSubmitNewQuiz = () => {
    console.log("submitted", newQuiz);
    // if (newQuiz.title && newQuiz.course && newQuiz.batch) {
    //   onAddQuiz({
    //     ...newQuiz,
    //     id: Date.now(),
    //     questionCount: 0,
    //     active: false,
    //   });
    //   setNewQuiz({
    //     title: "",
    //     course: "",
    //     batch: "",
    //   });
    //   setIsDialogOpen(false);
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" /> Add Quiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-quiz-title">Quiz Title</Label>
                <Input
                  id="new-quiz-title"
                  value={newQuiz.title}
                  onChange={(e) => handleNewQuizChange("title", e.target.value)}
                  placeholder="Enter quiz title"
                />
              </div>
              <div>
                <Label htmlFor="new-quiz-course">Course</Label>
                <Select
                  onValueChange={(value) =>
                    handleNewQuizChange("course", value)
                  }
                  value={newQuiz.course}
                >
                  <SelectTrigger id="new-quiz-course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new-quiz-batch">Batch</Label>
                <Select
                  onValueChange={(value) => handleNewQuizChange("batch", value)}
                  value={newQuiz.batch}
                >
                  <SelectTrigger id="new-quiz-batch">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches?.map((batch) => (
                      <SelectItem key={batch._id} value={batch._id}>
                        {batch.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmitNewQuiz}>Create Quiz</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-4 mb-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="course-filter">Filter by Course</Label>
          <Select
            onValueChange={(value) => setSelectedCourse(value)}
            value={selectedCourse}
          >
            <SelectTrigger id="course-filter">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses?.map((course) => (
                <SelectItem key={course._id} value={course._id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedCourse && (
          <div className="flex flex-col space-y-2">
            <Label htmlFor="batch-filter">Filter by Batch</Label>
            <Select
              onValueChange={(value) => setSelectedBatch(value)}
              value={selectedBatch}
            >
              <SelectTrigger id="batch-filter">
                <SelectValue placeholder="All Batches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches?.map((batch) => (
                  <SelectItem key={batch._id} value={batch._id}>
                    {batch.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {quizzes?.length === 0 ? (
        <p className="text-center text-lg">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes?.map((quiz) => (
            <Card key={quiz._id} className="w-full">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Number of questions: {quiz.numberOfQuestions} </p>
                <p>Course: {quiz.course.title}</p>
                <p>Batch: {quiz.batch.title}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {loadingQuizId === quiz._id ? (
                    <div className="flex items-center justify-center">
                      <div className="relative w-3 h-3">
                        <div className="absolute w-full h-full border-4 border-white border-t-transparent animate-spin rounded-full"></div>
                      </div>
                    </div>
                  ) : (
                    <Switch
                      id={`quiz-${quiz._id}-active`}
                      checked={quiz.active}
                      onCheckedChange={() => toggleQuizActive(quiz._id)}
                    />
                  )}
                  <label htmlFor={`quiz-${quiz._id}-active`}>Active</label>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to={`/admin/quizzes/${quiz._id}`}>View Quiz</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default CoursesPage;
