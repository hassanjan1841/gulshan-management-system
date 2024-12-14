import AllQuizCard from "./AllQuizCard";

// Mock data for quizzes
const quizzes = [
  {
    id: 1,
    title: "React Hooks Quiz",
    dueDate: "December 22, 2024",
    description:
      "Test your knowledge of React Hooks and their usage in functional components.",
    status: "completed",
    duration: 30, // in minutes
    totalQuestions: 20,
    score: 18,
  },
  {
    id: 3,
    title: "RESTful API Design Principles",
    dueDate: "December 27, 2024",
    description:
      "Test your knowledge of RESTful API design best practices and principles.",
    status: "missed",
    duration: 40, // in minutes
    totalQuestions: 30,
  },
  {
    id: 4,
    title: "UI/UX Fundamentals Quiz",
    dueDate: "December 30, 2024",
    description:
      "Evaluate your understanding of core UI/UX design principles and best practices.",
    status: "upcoming",
    duration: 35, // in minutes
    totalQuestions: 22,
  },
];

export default function StudentQuiz() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Quizzes</h1>
      <div className="flex flex-wrap  gap-4">
        {quizzes.map((quiz) => (
          <AllQuizCard
            key={quiz.id}
            title={quiz.title}
            dueDate={quiz.dueDate}
            description={quiz.description}
            status={quiz.status}
            duration={quiz.duration}
            totalQuestions={quiz.totalQuestions}
            score={quiz.score}
          />
        ))}
      </div>
    </div>
  );
}
