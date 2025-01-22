import { Download, Eye, Upload } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";

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
import { toast } from "react-toastify";
import { AssignmentDetailSheet } from "./AssignmentDetailSheet";
import { AssignmentSubmissionSheet } from "./AssignmentSubmissionSheet";

export default function AllAssignmentCard({ assignment }) {
  const {
    _id,
    title,
    dueDate,
    description,
    status,
    sampleFile,
    submittedDate,
    totalScore,
    obtainedScore,
  } = assignment;

  const [file, setFile] = useState(null);
  const [deployLink, setDeployLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile && selectedFile.type.startsWith("image/")) {
  //     setFile(selectedFile);
  //   } else {
  //     toast.error("Please upload a valid image file before submitting.", {
  //       position: "bottom-right",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "dark",
  //     });
  //     setFile(null);
  //   }
  // };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
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
    <Card className="w-full max-w-md min-w-[300px] border shadow-md rounded-lg overflow-hidden">
      <CardHeader className="flex flex-col items-start p-4 bg-muted-background border-b">
        <CardTitle className="text-lg font-semibold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Due date: {dayjs(dueDate).format("DD/MM/YYYY")}
          </p>
          {getStatusBadge(status)}
        </div>
        <div className="flex gap-2 justify-between w-full">
          {/* Assignment Detail Sheet */}
          <AssignmentDetailSheet
            title={title}
            dueDate={dueDate}
            description={description}
            sampleFile={sampleFile}
            status={status}
            submittedDate={submittedDate}
            obtainedScore={obtainedScore}
            totalScore={totalScore}
          />
          {/* Submission Form Sheet */}
          {(status.toLowerCase() === "missed" ||
            status.toLowerCase() === "pending") && (
            <AssignmentSubmissionSheet
              assignmentId={_id}
              file={file}
              setFile={setFile}
              deployLink={deployLink}
              setDeployLink={setDeployLink}
              githubLink={githubLink}
              setGithubLink={setGithubLink}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
            />
          )}
        </div>
        {obtainedScore !== undefined && (
          <p className="text-sm font-medium mt-2 bg-gray-50 border rounded-md px-3 py-2 text-gray-700">
            Score: {obtainedScore} / {totalScore}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
