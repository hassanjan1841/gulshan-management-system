import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from 'lucide-react'

export default function UpcomingAssignments() {
    const assignments = [
        { id: 1, title: "JavaScript Basics Quiz", dueDate: "2023-06-15", timeLeft: "2 days" },
        { id: 2, title: "React Component Project", dueDate: "2023-06-18", timeLeft: "5 days" },
        { id: 3, title: "CSS Layout Challenge", dueDate: "2023-06-20", timeLeft: "1 week" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {assignments.map((assignment) => (
                        <li key={assignment.id} className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">{assignment.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <CalendarDays className="h-4 w-4 mr-1" />
                                    <span>Due: {assignment.dueDate}</span>
                                </div>
                            </div>
                            <Badge variant="secondary" className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {assignment.timeLeft}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

