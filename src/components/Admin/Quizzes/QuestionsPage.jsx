"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Edit, Check, X, Plus } from "lucide-react"

function QuestionsPage({ questions: initialQuestions, onBack, quizId }) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [editingOption, setEditingOption] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  })

  const handleQuestionEdit = (questionId, newQuestionText) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, question: newQuestionText } : q)),
    )
    setEditingQuestion(null)
  }

  const handleOptionEdit = (questionId, optionIndex, newOption) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.map((opt, idx) => (idx === optionIndex ? newOption : opt)) }
          : q,
      ),
    )
    setEditingOption(null)
  }

  const handleCorrectAnswerChange = (questionId, optionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.map((opt, idx) => ({ ...opt, isCorrect: idx === optionIndex })) }
          : q,
      ),
    )
  }

  const handleNewQuestionChange = (field, value, index = null) => {
    if (field === "options") {
      setNewQuestion((prev) => ({
        ...prev,
        options: prev.options.map((opt, idx) => (idx === index ? { ...opt, text: value } : opt)),
      }))
    } else {
      setNewQuestion((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleNewQuestionCorrectToggle = (index) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) => (idx === index ? { ...opt, isCorrect: !opt.isCorrect } : opt)),
    }))
  }

  const handleSubmitNewQuestion = () => {
    if (newQuestion.question && newQuestion.options.some((opt) => opt.text && opt.isCorrect)) {
      const newQuestionData = {
        ...newQuestion,
        id: Date.now(),
      }
      console.log("New question submitted:", newQuestionData)
      setQuestions((prev) => [...prev, newQuestionData])
      setNewQuestion({
        question: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      })
      setIsDialogOpen(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onBack}>Back to Quizzes</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" /> Add Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-question">Question</Label>
                <Input
                  id="new-question"
                  value={newQuestion.question}
                  onChange={(e) => handleNewQuestionChange("question", e.target.value)}
                  placeholder="Enter the question"
                />
              </div>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Switch checked={option.isCorrect} onCheckedChange={() => handleNewQuestionCorrectToggle(index)} />
                  <Input
                    value={option.text}
                    onChange={(e) => handleNewQuestionChange("options", e.target.value, index)}
                    placeholder={`Enter option ${index + 1}`}
                  />
                </div>
              ))}
              <Button onClick={handleSubmitNewQuestion}>Submit Question</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-3xl font-bold mb-6">Questions for Quiz {quizId}</h1>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((question, index) => (
          <AccordionItem key={question.id} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {editingQuestion === question.id ? (
                <div className="flex items-center space-x-2">
                  <Input
                    defaultValue={question.question}
                    onBlur={(e) => handleQuestionEdit(question.id, e.target.value)}
                  />
                  <Button size="sm" onClick={() => setEditingQuestion(null)}>
                    <X />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleQuestionEdit(question.id, document.getElementById(`question-${question.id}`).value)
                    }
                  >
                    <Check />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span>{question.question}</span>
                  <Button size="sm" variant="ghost" onClick={() => setEditingQuestion(question.id)}>
                    <Edit />
                  </Button>
                </div>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <Checkbox
                      id={`question-${question.id}-option-${optionIndex}`}
                      checked={option.isCorrect}
                      onCheckedChange={() => handleCorrectAnswerChange(question.id, optionIndex)}
                    />
                    {editingOption === `${question.id}-${optionIndex}` ? (
                      <>
                        <Input
                          defaultValue={option.text}
                          onBlur={(e) =>
                            handleOptionEdit(question.id, optionIndex, { ...option, text: e.target.value })
                          }
                        />
                        <Button size="sm" onClick={() => setEditingOption(null)}>
                          <X />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleOptionEdit(question.id, optionIndex, {
                              ...option,
                              text: document.getElementById(`option-${question.id}-${optionIndex}`).value,
                            })
                          }
                        >
                          <Check />
                        </Button>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor={`question-${question.id}-option-${optionIndex}`}
                          className={`flex-grow ${option.isCorrect ? "font-bold text-green-500" : ""}`}
                        >
                          {option.text}
                        </label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingOption(`${question.id}-${optionIndex}`)}
                        >
                          <Edit />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  )
}

export default QuestionsPage

