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
import { toast } from "react-toastify";

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
  const [deployLink, setDeployLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid image file before submitting.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setFile(null);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload a valid image file before submitting.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    const formData = {
      fileName: file.name,
      deployLink,
      githubLink,
      videoLink,
    };

    console.log("Submission Details:", formData);
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
            {(status === "missed" || status === "pending") && (
              <div className="border-t pt-4 mt-auto space-y-4">
                <div className="grid w-full items-center gap-1.5">
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
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="deployLink">Deploy Link</Label>
                  <Input
                    id="deployLink"
                    type="url"
                    placeholder="Enter deploy link"
                    value={deployLink}
                    onChange={(e) => setDeployLink(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="githubLink">GitHub Link</Label>
                  <Input
                    id="githubLink"
                    type="url"
                    placeholder="Enter GitHub link"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="videoLink">Video Link</Label>
                  <Input
                    id="videoLink"
                    type="url"
                    placeholder="Enter video link"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
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
