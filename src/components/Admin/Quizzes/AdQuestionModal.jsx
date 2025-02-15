import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addQuestionToQuiz } from "../../../services/api/mainQuiz";
import SmallLoader from "../../SmallLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddQuestionModal({ quizId, refreshQuestions }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: [],
    type: "single",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmitNewQuestion = async () => {
    console.log("submitted", newQuestion);
    setLoading(true);
    if (
      newQuestion.question &&
      newQuestion.options.some((opt) => opt) &&
      newQuestion.correctAnswer.length > 0
    ) {
      try {
        const response = await addQuestionToQuiz(quizId, newQuestion);
        console.log("New question submitted:", response);

        setNewQuestion({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: [],
          type: "single",
        });
        setIsDialogOpen(false);
        await refreshQuestions();
        toast.success("Question added successfully!");
      } catch (error) {
        console.error("Error submitting new question:", error);
        toast.error("Failed to add question");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.warning("Please fill all required fields");
    }
  };

  const handleNewQuestionChange = (field, value, index = null) => {
    if (field === "options") {
      setNewQuestion((prev) => ({
        ...prev,
        options: prev.options.map((opt, idx) => (idx === index ? value : opt)),
      }));
    } else {
      setNewQuestion((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleNewQuestionCorrectToggle = (index) => {
    setNewQuestion((prev) => {
      const option = prev.options[index];
      let correctAnswer;
      if (prev.type === "single") {
        correctAnswer = prev.correctAnswer.includes(option) ? [] : [option];
      } else {
        correctAnswer = prev.correctAnswer.includes(option)
          ? prev.correctAnswer.filter((ans) => ans !== option)
          : [...prev.correctAnswer, option];
      }

      return {
        ...prev,
        correctAnswer,
      };
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <>
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
                onChange={(e) =>
                  handleNewQuestionChange("question", e.target.value)
                }
                placeholder="Enter the question"
              />
            </div>
            <div>
              <Label htmlFor="question-type">Question Type</Label>
              <div className="flex space-x-2">
                <Button
                  variant={newQuestion.type === "single" ? "" : "secondary"}
                  onClick={() => handleNewQuestionChange("type", "single")}
                >
                  Single
                </Button>
                <Button
                  variant={newQuestion.type === "multiple" ? "" : "secondary"}
                  onClick={() => handleNewQuestionChange("type", "multiple")}
                >
                  Multiple
                </Button>
              </div>
            </div>
            {newQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Button
                  variant={
                    newQuestion.correctAnswer.includes(option)
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => handleNewQuestionCorrectToggle(index)}
                  disabled={
                    newQuestion.type === "single" &&
                    newQuestion.correctAnswer.length > 0 &&
                    !newQuestion.correctAnswer.includes(option)
                  }
                >
                  {newQuestion.correctAnswer.includes(option)
                    ? "Correct"
                    : "Incorrect"}
                </Button>
                <Input
                  value={option}
                  onChange={(e) =>
                    handleNewQuestionChange("options", e.target.value, index)
                  }
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}
            <Button onClick={handleSubmitNewQuestion}>
              {loading ? <SmallLoader /> : "Submit Question"}
            </Button>
          </div>
        </DialogContent>
      </>
    </Dialog>
  );
}
