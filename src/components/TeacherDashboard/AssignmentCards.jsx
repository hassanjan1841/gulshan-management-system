'use client'

import React from "react"
import { useNavigate } from "react-router-dom"
import { Edit, Trash2, Eye } from 'lucide-react'
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EditAssignmentButton from "./EditAssignmentButton"

const AssignmentCards = () => {
  const navigate = useNavigate()

  const fetchData = async (page = 0, pageSize = 12) => {
    console.log(`Fetching data: page ${page}, size ${pageSize}`)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const totalItems = 100
    const data = Array.from({ length: pageSize }, (_, i) => ({
      sNo: page * pageSize + i + 1,
      title: `Assignment ${page * pageSize + i + 1}`,
      submissions: Math.floor(Math.random() * 100),
      section: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
    }))

    return {
      data,
      totalPages: Math.ceil(totalItems / pageSize),
    }
  }

  const [assignments, setAssignments] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadAssignments = async () => {
      setIsLoading(true)
      const { data } = await fetchData()
      setAssignments(data)
      setIsLoading(false)
    }
    loadAssignments()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>
      {isLoading ? (
        <div className="text-center">Loading assignments...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.sNo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{assignment.section}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{assignment.submissions}</p>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <div className="flex space-x-2">
                    <EditAssignmentButton />
                    <Button variant="ghost" size="icon" onClick={() => console.log("Delete", assignment)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => navigate(`/teacher/assignments/${assignment.sNo}`)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AssignmentCards

