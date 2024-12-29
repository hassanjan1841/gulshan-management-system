import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function RecentQuizResults() {
  const quizResults = [
    { id: 1, title: "React Hooks Quiz", score: 85 },
    { id: 2, title: "RESTful API Design Principles", score: 92 },
    { id: 3, title: "UI/UX Fundamentals Quiz", score: 78 },
  ];

  return (
    <Card className="max-w-[600px] w-full">
      <CardHeader>
        <CardTitle>Recent Quiz Results</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {quizResults.map((quiz) => (
            <li key={quiz.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{quiz.title}</span>
                <span className="text-sm">{quiz.score}%</span>
              </div>
              <Progress value={quiz.score} className="h-2" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
