import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function QuestionDisplay({
  question,
  setEditingQuestion,
  handleDeleteQuestion,
  setLoading,
}) {
  const onDelete = async () => {
    try {
      setLoading(true);
      await handleDeleteQuestion(question._id);
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3">
        <span>{question.question}</span>
        <QuestionTypeTag type={question.type} />
      </div>
      <div className="flex items-center space-x-2">
        <div onClick={(e) => e.stopPropagation()}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingQuestion(question._id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  question and all its data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

const QuestionTypeTag = ({ type }) => (
  <span
    className={`px-2 py-0.5 text-xs rounded-full ${
      type === "single"
        ? "bg-blue-100 text-blue-700"
        : "bg-purple-100 text-purple-700"
    }`}
  >
    {type === "single" ? "Single Answer" : "Multiple Answers"}
  </span>
);

export default QuestionDisplay;
