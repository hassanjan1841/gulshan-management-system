import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import QuestionOptions from "./QuestionOptions";
import QuestionEditForm from "./QuestionEditForm";
import QuestionDisplay from "./QuestionDisplay";

function QuestionItem({
  question,
  index,
  editingQuestion,
  setEditingQuestion,
  handleQuestionEdit,
  tempCorrectAnswers,
  setTempCorrectAnswers,
  setQuestions,
  handleDeleteQuestion,
  setLoading,
}) {
  return (
    <AccordionItem key={question._id} value={`item-${index}`}>
      <AccordionTrigger className="text-left">
        {editingQuestion === question._id ? (
          <QuestionEditForm
            question={question}
            setEditingQuestion={setEditingQuestion}
            handleQuestionEdit={handleQuestionEdit}
          />
        ) : (
          <QuestionDisplay
            question={question}
            setEditingQuestion={setEditingQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
            setLoading={setLoading}
          />
        )}
      </AccordionTrigger>
      <AccordionContent>
        <QuestionOptions
          question={question}
          tempCorrectAnswers={tempCorrectAnswers}
          setTempCorrectAnswers={setTempCorrectAnswers}
          setQuestions={setQuestions}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

export default QuestionItem;
