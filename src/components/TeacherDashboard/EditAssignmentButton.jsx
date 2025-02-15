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
import CreateAssignmentForm from "./AssignmentForm";
import { Edit, Pencil } from "lucide-react";

export default function EditAssignmentButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil/>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Assignment</SheetTitle>
          <SheetDescription>
            Fill in the details to Edit a assignment.
          </SheetDescription>
        </SheetHeader>
        <CreateAssignmentForm
          onSuccess={() => setOpen(false)}
          assignmentData={{
            title: "fdsafdsf",
            description: "sfasdf dfdsaf",
            dueDate: Date.now(),
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
