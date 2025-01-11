import { Edit, Pencil } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import AdminStudentSheet from "./AdminStudentSheet";
import { capitalizeName } from "@/lib/helper";
import ConfirmDialog from "../ConfirmDialog";
import { deleteUser } from "../../services/api/user";
import { useStudentContext } from "../../context/studentContext";
import { toast } from "react-toastify";

const AdminStudentCard = ({ student }) => {
  // console.log("students in adminstudencard", student);
  const { setChangingInStudent } = useStudentContext();

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteUser(studentId);
      setChangingInStudent((prev) => prev + 1);
      // await loadSections();
      toast.success("Section Deleted Successfully.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Something went wrong.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <Card className="shadow-sm hover:scale-105 transition-transform">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <img
            src={student?.profilePic}
            alt={capitalizeName(student?.full_name)}
            className="w-12 h-12 rounded-full border-2 border-primary"
          />
          <div>
            <CardTitle className="text-lg text-primary font-semibold">
              {capitalizeName(student?.full_name)}
            </CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <Badge variant="outline" className="text-gray-500">
                {student?.section?.title}
              </Badge>
              <Badge variant="secondary">
                {student?.courses[0]?.course?.title}
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <strong>Batch:</strong> {student?.section?.courses[0]?.batch?.title}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Teacher:</strong> {student?.section?.teacher?.full_name}
        </p>
      </CardContent>
      {/* <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex space-x-2">
          <BatchDetailSheet batchData={batch} />
          <UpdateBatchSheet batch={batch} />
        </div>

        <ConfirmDialog
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete the branch and remove the data from our servers."
          onConfirm={() => handleDeleteBatch(batch._id)}
          triggerText="Delete"
        />
      </CardFooter> */}
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex space-x-2">
          <AdminStudentSheet student={student} />
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <ConfirmDialog
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete the branch and remove the data from our servers."
          onConfirm={() => handleDeleteStudent(student?._id)}
          triggerText="Delete"
        />
      </CardFooter>
    </Card>
  );
};

export default AdminStudentCard;
