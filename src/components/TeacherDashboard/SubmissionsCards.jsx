'use client'

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon } from 'lucide-react'
import GradeSubmission from './GradeSubmission'

const SubmissionsCards = ({ assignmentId }) => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockSubmissions = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        studentName: `Student ${i + 1}`,
        submissionDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        score: Math.random() > 0.3 ? Math.floor(Math.random() * 101) : null,
        status: Math.random() > 0.3 ? "Graded" : "Pending",
        hostedLink: `https://student-${i + 1}-assignment.vercel.app`,
      }))
      setSubmissions(mockSubmissions)
      setLoading(false)
    }
    fetchSubmissions()
  }, [assignmentId])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {submissions.map((submission) => (
        <Card key={submission.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {submission.studentName}
            </CardTitle>
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${submission.studentName}`} />
              <AvatarFallback>{submission.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <div className="text-2xl font-bold">{submission.score !== null ? `${submission.score}/100` : 'Not graded'}</div>
              <Badge 
                variant={submission.status === "Graded" ? "default" : "secondary"}
              >
                {submission.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Submitted on {submission.submissionDate}
            </p>
            <a 
              href={submission.hostedLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-blue-500 hover:underline flex items-center"
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              View Submission
            </a>
            <GradeSubmission 
              submissionId={submission.id} 
              currentScore={submission.score} 
              onGrade={(newScore) => {
                // Here you would typically update the backend
                // For now, we'll just update the local state
                setSubmissions(submissions.map(s => 
                  s.id === submission.id 
                    ? {...s, score: newScore, status: "Graded"} 
                    : s
                ))
              }} 
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default SubmissionsCards



