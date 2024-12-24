import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
const CourseDetailSheet = ({course}) => {
  return (
    <div>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">See Details</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{course.title}</SheetTitle>
          <SheetDescription>{course.description}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <span className="font-semibold">Instructor:</span> {course.instructor}
          </div>
          <div>
            <span className="font-semibold">Duration:</span> {course.duration}
          </div>
          <div>
            <span className="font-semibold">Students Enrolled:</span> {course.students}
          </div>
          <div>
            <span className="font-semibold">Rating:</span> <Badge variant="outline">{course.rating}</Badge>
          </div>
          <Button className="w-full">Add New Batch</Button>
        </div>
      </SheetContent>
    </Sheet>
    </div>
  )
}

export default CourseDetailSheet
