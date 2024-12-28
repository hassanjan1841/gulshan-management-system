import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
  } from "@/components/ui/sheet";
  import { Eye } from "lucide-react";
  import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

  export default function StudentDetailSheet({ student }) {
return(
    <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">
        <Eye className="h-4 w-4 mr-2" /> View Details
      </Button>
    </SheetTrigger>
    <SheetContent
      side="right"
      className="w-[400px] bg-background "
    >
      <SheetHeader>
        <div className="flex flex-col items-start space-y-4 border border-foreground/20 p-6 pt-3 rounded-xl  bg-foreground/10 ">
          {/* Profile Picture */}
          <img
            src={student.picture}
            alt={student.name}
            className="w-20 h-20 rounded-full border-2 border-primary"
          />
          {/* Name and Age */}
          <div className="text-center">
            <SheetTitle className="text-xl font-bold">
              {student.name}
            </SheetTitle>
            <p className="text-muted-foreground flex gap-2 text-sm">
              <span>Age:</span>
              <br />
              <Badge>{student.age}</Badge>
            </p>
          </div>
        </div>
      </SheetHeader>

      <div className="mt-6 space-y-4 border p-6 rounded-xl bg-foreground/10 border-foreground/20">
        <p className="text-sm">
          <span className="text-muted-foreground">
            {"Father's"} Name:
          </span>
          <br />
          <Badge variant="secondary">{student.fatherName}</Badge>
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">CNIC:</span>
          <br />
          <Badge variant="outline">{student.cnic}</Badge>
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">
            Education:
          </span>
          <br />
          <Badge variant="secondary">{student.education}</Badge>
        </p>
        <p
          className={`text-sm font-semibold ${
            student.isPassed ? "text-green-600" : "text-red-300"
          }`}
        >
          <span>Status:</span>
          <br />
          <Badge
            variant={student.isPassed ? "outline" : "destructive"}
          >
            {student.isPassed ? "Passed" : "Not Passed"}
          </Badge>
        </p>
        <p
          className={`text-sm font-semibold ${
            student.isEliminated
              ? "text-red-300"
              : "text-green-600"
          }`}
        >
          <span>Eliminated:</span>
          <br />
          <Badge
            variant={
              student.isEliminated ? "destructive" : "outline"
            }
          >
            {student.isEliminated ? "Yes" : "No"}
          </Badge>
        </p>
      </div>
    </SheetContent>
  </Sheet>
)
  }