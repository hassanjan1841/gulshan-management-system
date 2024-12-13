import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function AssignmentsCard() {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary/50">
              <span className="text-sm font-medium">Submitted</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">8</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary/30">
              <span className="text-sm font-medium">Missed</span>
              <span className="text-lg font-semibold text-red-600 dark:text-red-400">4</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  