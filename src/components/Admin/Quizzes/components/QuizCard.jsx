import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router";
import SmallLoader from "../../../SmallLoader";

function QuizCard({ 
  quiz, 
  loadingQuizId, 
  loadingDeleteQuizId, 
  toggleQuizActive, 
  handleEditQuiz, 
  handleDeleteQuiz 
}) {
  return (
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
            <SmallLoader />
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
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link to={`/admin/dashboard/quizzes/${quiz._id}`}>
            View Quiz
          </Link>
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleEditQuiz(quiz._id)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteQuiz(quiz._id)}
          >
            {loadingDeleteQuizId === quiz._id ? (
              <SmallLoader />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default QuizCard; 