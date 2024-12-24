'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CourseDetailSheet from './CourseDetailSheet'

// Mock function to fetch courses
const fetchCourses = async (page, pageSize) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  return Array.from({ length: pageSize }, (_, i) => ({
    id: page * pageSize + i + 1,
    title: `Course ${page * pageSize + i + 1}`,
    description: `Description for Course ${page * pageSize + i + 1}`,
    instructor: `Instructor ${page * pageSize + i + 1}`,
    duration: `${Math.floor(Math.random() * 12) + 1} weeks`,
    students: Math.floor(Math.random() * 100) + 20,
    rating: (Math.random() * 2 + 3).toFixed(1),
  }))
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
      setCourses(prev => [...prev, ...newCourses])
      setHasMore(newCourses.length === pageSize)
      setLoading(false)
    }
    loadCourses()
  }, [page])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card 
            key={course.id} 
            className="flex flex-col justify-between"
            ref={index === courses.length - 1 ? lastCourseElementRef : null}
          >
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">{course.duration}</Badge>
                <span className="text-sm text-muted-foreground">{course.students} students</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-semibold mr-2">Rating:</span>
                <Badge variant="outline">{course.rating}</Badge>
              </div>
              <CourseDetailSheet course={course} />
            </CardFooter>
          </Card>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more courses...</p>}
    </div>
  )
}

export default AdminCourses

