import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

function QuestionEditForm({ question, setEditingQuestion, handleQuestionEdit }) {
  return (
    <div className="flex items-center space-x-2">
      <Input
        defaultValue={question.question}
        onBlur={(e) => handleQuestionEdit(question._id, e.target.value)}
      />
      <Button size="sm" onClick={() => setEditingQuestion(null)}>
        <X />
      </Button>
      <Button
        size="sm"
        onClick={() =>
          handleQuestionEdit(
            question._id,
            document.getElementById(`question-${question._id}`).value
          )
        }
      >
        <Check />
      </Button>
    </div>
  );
}

export default QuestionEditForm; 