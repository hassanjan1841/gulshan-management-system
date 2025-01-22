"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Trophy } from "lucide-react";
import SubmissionsCards from "./SubmissionsCards";
import Loader from "../Loader";
import { getAssignmentById } from "../../services/api/assignment";

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  console.log("AssignmentDetails", id);
  useEffect(() => {
    const fetchAssignment = async () => {
      const response = await getAssignmentById(id);
      console.log("response single aass", response);
      setAssignment(response);
    };
    fetchAssignment();
  }, [id]);

  if (!assignment) {
    return <Loader />;
  }
  console.log(assignment);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className=" mx-auto w-full">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {assignment.title}
          </CardTitle>
          <CardDescription>Assignment Details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid max-w-xl grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {assignment.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Due Date: {formatDate(assignment.dueDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Total Score: {assignment.totalScore}
                    </span>
                  </div>
                  {/* <Ba/adge> */}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="submissions">
              <SubmissionsCards assignmentId={id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentDetails;
