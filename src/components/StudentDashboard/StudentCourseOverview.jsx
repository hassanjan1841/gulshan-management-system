import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react'

export default function CourseOverview() {
    const modules = [
        { id: 1, title: "Introduction to Web Development", status: "completed" },
        { id: 2, title: "HTML & CSS Fundamentals", status: "completed" },
        { id: 3, title: "JavaScript Basics", status: "in-progress" },
        { id: 4, title: "React Fundamentals", status: "upcoming" },
        { id: 5, title: "Backend Development with Node.js", status: "upcoming" },
    ]

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="h-5 w-5 text-green-500" />
            case "in-progress":
                return <PlayCircle className="h-5 w-5 text-blue-500" />
            default:
                return <Circle className="h-5 w-5 text-gray-300" />
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return <Badge variant="success">Completed</Badge>
            case "in-progress":
                return <Badge variant="info">In Progress</Badge>
            default:
                return <Badge variant="secondary">Upcoming</Badge>
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {modules.map((module) => (
                        <li key={module.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                                {getStatusIcon(module.status)}
                                <span className="ml-2 font-medium">{module.title}</span>
                            </div>
                            {getStatusBadge(module.status)}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

