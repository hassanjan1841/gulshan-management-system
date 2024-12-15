import React from "react";
import AssignmentTable from "./AssignmentTable";
import CreateAssignmentButton from "./CreateAssignmentButton";

function TeacherAssignment() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <CreateAssignmentButton />
      <AssignmentTable />
    </div>
  );
}

export default TeacherAssignment;
