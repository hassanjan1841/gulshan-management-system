import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const AdminStudentSheet = ({ student }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" /> View Details
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="max-w-[400px] w-full bg-background pt-10"
      >
        <SheetHeader>
          <div className="flex flex-col items-start space-y-4 border border-secondary/90 p-6  rounded-xl  bg-secondary/30 ">
            {/* Profile Picture */}
            <img
              src={student?.picture}
              alt={student?.name}
              className="w-20 h-20 rounded-full border-2 border-primary"
            />
            {/* Name and Age */}
            <div className="text-center flex flex-col items-start gap-2 space-y-2 w-full">
              <SheetTitle className="text-xl font-bold">
                {student?.name}
              </SheetTitle>
              <p className="text-muted-foreground flex gap-2 text-sm">
                <span>Age:</span>
                <br />
                <Badge>{student?.age}</Badge>
              </p>
              <div className="flex justify-between w-full">
                <p
                  className={`text-sm font-semibold flex gap-1 ${
                    student?.isPassed ? "text-green-600" : "text-red-300"
                  }`}
                >
                  <span>Status:</span>
                  <br />
                  <Badge
                    variant={student?.isPassed ? "outline" : "destructive"}
                  >
                    {student?.isPassed ? "Passed" : "Not Passed"}
                  </Badge>
                </p>
                <p
                  className={`text-sm font-semibold flex gap-1  ${
                    student?.isEliminated ? "text-red-300" : "text-green-600"
                  }`}
                >
                  <span>Eliminated:</span>
                  <br />
                  <Badge
                    variant={student?.isEliminated ? "destructive" : "outline"}
                  >
                    {student?.isEliminated ? "Yes" : "No"}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4 border p-6 rounded-xl bg-secondary/30 border-secondary/90">
          <p className="text-sm">
            <span className="text-muted-foreground">{"Father's"} Name:</span>
            <br />
            <Badge variant="secondary">{student?.fatherName}</Badge>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">CNIC:</span>
            <br />
            <Badge variant="outline">{student?.cnic}</Badge>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Education:</span>
            <br />
            <Badge variant="secondary">{student?.education}</Badge>
          </p>
        </div>

        <div className="mt-6 space-y-4 border p-6 rounded-xl bg-secondary/30 border-secondary/90">
          <p className="text-sm">
            <span className="text-muted-foreground">Course:</span>
            <br />
            <Badge variant="secondary">{student?.course}</Badge>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Batch:</span>
            <br />
            <Badge variant="outline">{student?.batch}</Badge>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Section:</span>
            <br />
            <Badge variant="secondary">{student?.teacher}</Badge>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminStudentSheet;
