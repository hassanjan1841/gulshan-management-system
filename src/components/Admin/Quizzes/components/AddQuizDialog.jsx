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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

function AddQuizDialog({ 
  isOpen, 
  setIsOpen, 
  newQuiz, 
  handleNewQuizChange, 
  handleSubmitNewQuiz, 
  loading, 
  courses, 
  batches 
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" /> Add Quiz
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Quiz</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-quiz-title">Quiz Title</Label>
            <Input
              id="new-quiz-title"
              value={newQuiz.title}
              onChange={(e) => handleNewQuizChange("title", e.target.value)}
              placeholder="Enter quiz title"
            />
          </div>
          <div>
            <Label htmlFor="new-quiz-course">Course</Label>
            <Select
              onValueChange={(value) => handleNewQuizChange("course", value)}
              value={newQuiz.course}
            >
              <SelectTrigger id="new-quiz-course">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses?.map((course) => (
                  <SelectItem key={course._id} value={course._id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="new-quiz-batch">Batch</Label>
            <Select
              onValueChange={(value) => handleNewQuizChange("batch", value)}
              value={newQuiz.batch}
            >
              <SelectTrigger id="new-quiz-batch">
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {batches?.map((batch) => (
                  <SelectItem key={batch._id} value={batch._id}>
                    {batch.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmitNewQuiz}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="relative w-6 h-6">
                  <div className="absolute w-full h-full border-4 border-black border-t-transparent animate-spin rounded-full"></div>
                </div>
              </div>
            ) : (
              "Create Quiz"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddQuizDialog; 