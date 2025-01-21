import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonSpinner from "@/components/ButtonSpinner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AssignmentSubmissionSheet({
  assignmentId,
  file,
  setFile,
  deployLink,
  setDeployLink,
  githubLink,
  setGithubLink,
  videoLink,
  setVideoLink,
}) {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (!file) {
      toast.error("Please upload a valid image file before submitting.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    const formData = {
      assignmentId,
      fileName: file.name,
      deployLink,
      githubLink,
    };
    setLoading(false);
    console.log("Submission Details:", formData);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Submission Form</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-4">
        <SheetHeader>
          <SheetTitle>Submit Assignment</SheetTitle>
        </SheetHeader>
        <div className="border-t pt-4 mt-auto space-y-4 flex flex-col justify-end h-full">
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
                onClick={() => document.getElementById("assignment")?.click()}
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
          <Button className="w-full" onClick={handleSubmit} disabled={!file}>
            {loading ? <ButtonSpinner /> : "Submit Assignment"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
