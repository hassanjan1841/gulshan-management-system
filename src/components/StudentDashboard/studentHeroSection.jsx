import { Card, CardContent } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Brain, ArrowRight } from 'lucide-react'

export default function StudentPortalHero() {
    // This would typically come from your authentication system
    const studentName = "Alex Johnson"

    // These would be fetched from your backend
    const courseProgress = 65
    const assignmentsCompleted = 12
    const quizzesTaken = 8

    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-4">Welcome {studentName}!</h1>
                    </div>
                    <div className="mt-8 md:mt-0 md:w-1/2">
                        <Card className="bg-white/10 backdrop-blur-lg border-none">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span>Overall Course Progress</span>
                                            <span>{courseProgress}%</span>
                                        </div>
                                        {/* <Progress value={courseProgress} className="h-2 bg-white/20" indicatorClassName="bg-green-500" /> */}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <BookOpen className="h-5 w-5 mr-2" />
                                            <span>Assignments Completed</span>
                                        </div>
                                        <span className="font-semibold">{assignmentsCompleted}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Brain className="h-5 w-5 mr-2" />
                                            <span>Quizzes Taken</span>
                                        </div>
                                        <span className="font-semibold">{quizzesTaken}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

