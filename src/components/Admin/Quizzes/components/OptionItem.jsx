import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Edit } from "lucide-react";

function OptionItem({
  question,
  option,
  optionIndex,
  editingOption,
  setEditingOption,
  tempCorrectAnswers,
  setTempCorrectAnswers,
  handleOptionEdit,
  toggleTempCorrectAnswer,
  tempIsCorrect,
}) {
  const isCorrect =
    tempCorrectAnswers[question._id]?.includes(question.options[optionIndex]) ||
    (!tempCorrectAnswers[question._id] &&
      question.correctAnswer?.includes(question.options[optionIndex]));

  if (editingOption === optionIndex) {
    return (
      <div className="flex items-center space-x-2 w-full">
        <Button
          size="sm"
          variant={isCorrect ? "default" : "outline"}
          onClick={() => toggleTempCorrectAnswer(question._id, optionIndex)}
          className={`text-black hover:bg-white ${
            isCorrect ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {isCorrect ? <Check /> : <X />}
        </Button>
        <Input id={`${question._id}`} defaultValue={option} />
        <Button
          size="sm"
          onClick={() => {
            handleOptionEdit(question._id, optionIndex, option, false);
          }}
        >
          <X className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() =>
            handleOptionEdit(
              question._id,
              optionIndex,
              document.getElementById(`${question._id}`).value,
              true
            )
          }
        >
          <Check className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3 flex-grow">
        {question.correctAnswer?.includes(question.options[optionIndex]) && (
          <div className="bg-white p-1 rounded-full shadow-sm">
            <Check className="w-5 h-5 text-black" />
          </div>
        )}
        <span className="flex-grow">{option}</span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setEditingOption(optionIndex);
          setTempCorrectAnswers((prev) => ({
            ...prev,
            [question._id]: question.correctAnswer,
          }));
        }}
      >
        <Edit className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default OptionItem; 