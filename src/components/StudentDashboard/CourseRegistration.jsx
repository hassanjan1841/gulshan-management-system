import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '../../hooks/use-toast'


const availableCourses = [
    { id: 'web101', name: 'Web Development Fundamentals' },
    { id: 'js201', name: 'Advanced JavaScript' },
    { id: 'react301', name: 'React and Redux' },
    { id: 'node401', name: 'Backend Development with Node.js' },
    { id: 'db501', name: 'Database Design and SQL' },
]

export default function CourseRegistration() {
    const toast = useToast()

    const [selectedCourses, setSelectedCourses] = useState([])

    const handleCourseToggle = (courseId) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the registration to your backend
        console.log('Registering for courses:', selectedCourses)
        toast({
            title: "Courses Registered",
            description: `You have registered for ${selectedCourses.length} courses.`,
        })
        setSelectedCourses([])
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {availableCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-2">
                    <Checkbox
                        id={course.id}
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={() => handleCourseToggle(course.id)}
                    />
                    <label
                        htmlFor={course.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {course.name}
                    </label>
                </div>
            ))}
            <Button type="submit" disabled={selectedCourses.length === 0}>
                Register for Selected Courses
            </Button>
        </form>
    )
}

