'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CourseDetailSheet from './CourseDetailSheet'
import { AddCourseSheet } from './AddCoursesSheet'
import { getCourses } from '../../services/api/courses'
import dayjs from 'dayjs'

// Mock function to fetch courses
const fetchCourses = async (page, pageSize) => {
  let courses = await getCourses(page, pageSize)
  return courses.courses
}

const AdminCourses = () => {
  const [courses, setCourses] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef(null)
  const pageSize = 10

  const lastCourseElementRef = useCallback((node) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      const newCourses = await fetchCourses(page, pageSize)
      setCourses(newCourses)
      setLoading(false)
    }
    loadCourses()
  }, [page])

  return (
    <div className="container mx-auto py-6">
      <div className='flex justify-between mb-8'>
      <h1 className="text-3xl font-bold">Courses</h1>
      <AddCourseSheet/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course, index) => (
     <Card  key={course._id} className="flex flex-col justify-between">
     <CardHeader>
       <CardTitle>{course.title}</CardTitle>
     </CardHeader>
     <CardContent>
       <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
       <div className="flex flex-wrap gap-2 items-center">
         <Badge variant="secondary">{course.duration}</Badge>
         <Badge variant="outline">{course.level}</Badge>
         <span className="text-sm font-medium ml-auto">
           ${course.fee}
         </span>
       </div>
     </CardContent>
     <CardFooter className="flex flex-col text-sm text-muted-foreground">
      <div className='flex flex-col w-full'>
       <div className='flex justify-between'>
         <p>Created:</p> 
         <p>{dayjs(course.createdAt).format("DD-MM-YYYY")}</p>
       </div>
       <div className='flex justify-between'>
         <p>Updated:</p> 
         <p>{dayjs(course.updatedAt).format("DD-MM-YYYY")}</p>
       </div>
      </div>
      <div className='mt-4'>
       <CourseDetailSheet course={course} />
      </div>
     </CardFooter>
   </Card>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading courses...</p>}
    </div>
  )
}

export default AdminCourses

