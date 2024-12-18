'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon, CheckIcon } from 'lucide-react'


const GradeSubmission = ({ submissionId, currentScore, onGrade }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [score, setScore] = useState(currentScore !== null ? currentScore.toString() : '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const numScore = parseInt(score)
    if (!isNaN(numScore) && numScore >= 0 && numScore <= 100) {
      onGrade(numScore)
      setIsEditing(false)
    } else {
      alert('Please enter a valid score between 0 and 100')
    }
  }

  if (!isEditing) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2" 
        onClick={() => setIsEditing(true)}
      >
        <PencilIcon className="h-4 w-4 mr-2" />
        {currentScore !== null ? 'Edit Grade' : 'Grade Submission'}
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center space-x-2">
      <Input
        type="number"
        min="0"
        max="100"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Enter score (0-100)"
        className="w-32"
      />
      <Button type="submit" size="sm">
        <CheckIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default GradeSubmission

