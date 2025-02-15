import { useState } from "react";
import { toast } from "react-toastify";
import OptionItem from "./OptionItem";

function QuestionOptions({
  question,
  tempCorrectAnswers,
  setTempCorrectAnswers,
  setQuestions,
}) {
  const [editingOption, setEditingOption] = useState(null);
  const [tempIsCorrect, setTempIsCorrect] = useState(false);

  const handleOptionEdit = (
    questionId,
    optionIndex,
    newOptionText,
    isAccepted
  ) => {
    if (!isAccepted) {
      setEditingOption(null);
      setTempIsCorrect(false);
      setTempCorrectAnswers((prev) => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
      return;
    }

    try {
      if (
        question.type === "single" &&
        tempCorrectAnswers[questionId]?.length === 1 &&
        !tempCorrectAnswers[questionId]?.includes(question.options[optionIndex])
      ) {
        toast.error(
          "Please unselect the current correct answer before selecting a new one."
        );
        return;
      }

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId
            ? {
                ...q,
                options: q.options.map((opt, idx) =>
                  idx === optionIndex ? newOptionText : opt
                ),
                correctAnswer:
                  tempCorrectAnswers[questionId] || q.correctAnswer,
              }
            : q
        )
      );

      setEditingOption(null);
      setTempIsCorrect(false);
      setTempCorrectAnswers((prev) => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
      toast.success("Option updated successfully!");
    } catch (error) {
      toast.error("Failed to update option");
      console.error("Error updating option:", error);
    }
  };

  const toggleTempCorrectAnswer = (questionId, optionIndex) => {
    const currentAnswers =
      tempCorrectAnswers[questionId] || question.correctAnswer;

    let newAnswers;
    if (question.type === "single") {
      newAnswers = currentAnswers.includes(question.options[optionIndex])
        ? []
        : [question.options[optionIndex]];
    } else {
      newAnswers = currentAnswers.includes(question.options[optionIndex])
        ? currentAnswers.filter((ans) => ans !== question.options[optionIndex])
        : [...currentAnswers, question.options[optionIndex]];
    }

    setTempCorrectAnswers((prev) => ({
      ...prev,
      [questionId]: newAnswers,
    }));
    setTempIsCorrect(!tempIsCorrect);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
          <OptionItem
            key={optionIndex}
            question={question}
            option={option}
            optionIndex={optionIndex}
            editingOption={editingOption}
            setEditingOption={setEditingOption}
            tempCorrectAnswers={tempCorrectAnswers}
            setTempCorrectAnswers={setTempCorrectAnswers}
            handleOptionEdit={handleOptionEdit}
            toggleTempCorrectAnswer={toggleTempCorrectAnswer}
            tempIsCorrect={tempIsCorrect}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionOptions;
