import { useState, useMemo } from "react";
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

function QuizzesPage({ quizzes, onQuizSelect }) {
  const [courseFilter, setCourseFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  const courses = useMemo(() => {
    if (!Array.isArray(quizzes)) return [];
    return [...new Set(quizzes.map((quiz) => quiz.course))];
  }, [quizzes]);

  const batches = useMemo(() => {
    if (!Array.isArray(quizzes) || !courseFilter) return [];
    return [
      ...new Set(
        quizzes
          .filter((quiz) => quiz.course === courseFilter)
          .map((quiz) => quiz.batch)
      ),
    ];
  }, [quizzes, courseFilter]);

  const toggleQuizActive = (quizId) => {
    if (!Array.isArray(quizzes)) return;
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === quizId
        ? { ...quiz, active: true }
        : { ...quiz, active: false }
    );
    // Assuming you have a function to update quizzes in the parent component
    // updateQuizzes(updatedQuizzes)
  };

  const filteredQuizzes = useMemo(() => {
    if (!Array.isArray(quizzes) || !courseFilter || !batchFilter) return [];
    return quizzes.filter(
      (quiz) => quiz.course === courseFilter && quiz.batch === batchFilter
    );
  }, [quizzes, courseFilter, batchFilter]);

  const handleCourseChange = (course) => {
    setCourseFilter(course);
    setBatchFilter(""); // Reset batch filter when course changes
  };

  if (!Array.isArray(quizzes)) {
    return <p className="text-center text-lg">No quizzes available.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
      <div className="flex space-x-4 mb-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="course-filter">Select Course</Label>
          <Select onValueChange={handleCourseChange} value={courseFilter}>
            <SelectTrigger id="course-filter">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {courseFilter && (
          <div className="flex flex-col space-y-2">
            <Label htmlFor="batch-filter">Select Batch</Label>
            <Select onValueChange={setBatchFilter} value={batchFilter}>
              <SelectTrigger id="batch-filter">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {!courseFilter ? (
        <p className="text-center text-lg">
          Please select a course to view available batches.
        </p>
      ) : !batchFilter ? (
        <p className="text-center text-lg">
          Please select a batch to view quizzes.
        </p>
      ) : filteredQuizzes.length === 0 ? (
        <p className="text-center text-lg">
          No quizzes found for the selected course and batch.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="w-full">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{quiz.questionCount} questions in this quiz</p>
                <p>Course: {quiz.course}</p>
                <p>Batch: {quiz.batch}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id={`quiz-${quiz.id}-active`}
                    checked={quiz.active}
                    onCheckedChange={() => toggleQuizActive(quiz.id)}
                  />
                  <label htmlFor={`quiz-${quiz.id}-active`}>Active</label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => onQuizSelect(quiz.id)}>
                  View Questions
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default QuizzesPage;
