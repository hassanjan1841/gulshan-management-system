"use client";

import { Download, Eye, Upload } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AllAssignmentCard({
  title,
  dueDate,
  description,
  status,
  sampleFile,
  submittedDate,
  totalScore,
  obtainedScore,
}) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle file upload logic here
    console.log("Uploading file:", file);
  };

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
    <Card className="w-full max-w-md min-w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View assignment details</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="space-y-4">
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>Due date: {dueDate}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {sampleFile && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sample File</h4>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={sampleFile} download>
                        <Download className="mr-2 h-4 w-4" />
                        Download Sample
                      </a>
                    </Button>
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
                    <p className="text-sm font-medium mt-2 w-fit py-2  rounded-md">
                      Score: {obtainedScore} / {totalScore}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {(status === "missed" || status === "pending") && (
              <div className="border-t pt-4 mt-auto space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="assignment">Upload Assignment</Label>
                  <div className="relative">
                    <Input
                      id="assignment"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        document.getElementById("assignment")?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {file ? file.name : "Choose File"}
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!file}
                >
                  Submit Assignment
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
          {getStatusBadge(status)}
        </div>
        {obtainedScore !== undefined && (
          <p className="text-sm font-medium mt-2 border-2 w-fit py-2 px-4 rounded-md">
            Score: {obtainedScore} / {totalScore}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
