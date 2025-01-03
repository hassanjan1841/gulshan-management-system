import { Edit } from "lucide-react";
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

const AdminStudentCard = ({ student }) => {
  // console.log("students in adminstudencard", student);
  return (
    <Card className="shadow-lg border border-border hover:shadow-2xl hover:scale-105 transition-transform">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <img
            src={student?.profilePic}
            alt={student?.full_name}
            className="w-12 h-12 rounded-full border-2 border-primary"
          />
          <div>
            <CardTitle className="text-lg text-primary font-semibold">
              {student?.full_name}
            </CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <Badge variant="outline" className="text-gray-500">
                {student?.section?.name}
              </Badge>
              <Badge variant="secondary">
                {student?.section?.course?.title}
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <strong>Batch:</strong> {student?.section?.batch?.title}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Teacher:</strong> {student?.section?.teacher?.full_name}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AdminStudentSheet student={student} />
        <Button variant="ghost">
          <Edit className="h-4 w-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminStudentCard;
