import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddBranchForm } from "./AddBranchForm";

export function AddBranchSheet({ onBranchAdd }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Branch</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add a new Branch</SheetTitle>
          <SheetDescription>
            Add a new branch to your organization. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <AddBranchForm onBranchAdd={onBranchAdd} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

