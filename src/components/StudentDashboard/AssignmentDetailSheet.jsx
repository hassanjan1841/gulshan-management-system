import React from "react";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Download } from "lucide-react";

export function AssignmentDetailSheet({
  title,
  dueDate,
  description,
  sampleFile,
  status,
  submittedDate,
  obtainedScore,
  totalScore,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="success" className="bg-green-500">
            Submitted
          </Badge>
        );
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      case "late":
        return (
          <Badge variant="warning" className="bg-yellow-500">
            Late
          </Badge>
        );
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <SheetHeader className="space-y-4">
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              Due date: {dayjs(dueDate).format("DD/MM/YYYY")}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {sampleFile && sampleFile?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sample Files</h4>
                {sampleFile?.map((file, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start mb-2"
                    asChild
                  >
                    <a href={file} target="_blank" download>
                      <Download className="mr-2 h-4 w-4" />
                      File {index + 1}
                    </a>
                  </Button>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Status</h4>
              {getStatusBadge(status)}
              {status === "submitted" && submittedDate && (
                <p className="text-sm text-muted-foreground">
                  Submitted on: {submittedDate}
                </p>
              )}
            </div>
            {obtainedScore !== undefined && (
              <div className="space-y-2">
                <p className="text-sm font-medium mt-2 w-fit py-2 rounded-md">
                  Score: {obtainedScore} / {totalScore}
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
