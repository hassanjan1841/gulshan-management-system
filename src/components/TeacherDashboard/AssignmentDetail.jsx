'use client'

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Trophy } from 'lucide-react'
import SubmissionsCards from "./SubmissionsCards"

const AssignmentDetails = () => {
  const { id } = useParams()
  const [assignment, setAssignment] = useState(null)

  useEffect(() => {
    const fetchAssignment = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAssignment({
        id,
        title: `Assignment ${id}`,
        description: `This is the description for Assignment ${id}. It contains details about the assignment, its objectives, and any specific instructions for students.`,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        totalScore: 100,
      })
    }
    fetchAssignment()
  }, [id])

  if (!assignment) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{assignment.title}</CardTitle>
          <CardDescription>Assignment Details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Due Date: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Score: {assignment.totalScore}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    Assignment {id}
                  </Badge>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="submissions">
              <SubmissionsCards assignmentId={id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AssignmentDetails

