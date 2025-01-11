import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddSectionForm } from "./AddSectionForm";

import { useState } from "react";

export function AddSectionSheet() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Section</Button>
      </SheetTrigger>
      <SheetContent className="max-w-[400px] overflow-y-scroll overflow-x-hidden ">
        <SheetHeader>
          <SheetTitle>Add a new Section</SheetTitle>
          <SheetDescription>
            Add a new section to your organization. Click save when {"you're"}{" "}
            done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 max-w-[400px]">
          <AddSectionForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
