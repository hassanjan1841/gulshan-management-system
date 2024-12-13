import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function QuizCard() {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-semibold">10</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary/70">
              <span className="text-sm font-medium">Attempted</span>
              <span className="text-lg font-semibold text-primary">7</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary/50">
              <span className="text-sm font-medium">Passed</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">5</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary/30">
              <span className="text-sm font-medium">Failed</span>
              <span className="text-lg font-semibold text-red-600 dark:text-red-400">2</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  