import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AssignmentForm from "./AssignmentForm";

function CreateAssignmentButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="mb-4">Create Assignment</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-scroll'>
        <SheetHeader>
          <SheetTitle>Create New Assignment</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new assignment.
          </SheetDescription>
        </SheetHeader>
        <AssignmentForm onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export default CreateAssignmentButton;
