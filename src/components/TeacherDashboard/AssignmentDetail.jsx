import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionsTable from "./SubmissionsTable";

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAssignment({
        id,
        title: `Assignment ${id}`,
        description: `This is the description for Assignment ${id}. It contains details about the assignment, its objectives, and any specific instructions for students.`,
        dueDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        totalScore: 100,
      });
    };
    fetchAssignment();
  }, [id]);

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">{assignment.title}</h1>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="space-y-4">
            <p>
              <strong>Description:</strong> {assignment.description}
            </p>
            <p>
              <strong>Due Date:</strong> {assignment.dueDate}
            </p>
            <p>
              <strong>Total Score:</strong> {assignment.totalScore}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="submissions">
          <SubmissionsTable assignmentId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentDetails;
