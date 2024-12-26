import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddCourseForm } from "./AddCourseForm";

export function AddCourseSheet({ onCourseAdd }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Course</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new Course</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <AddCourseForm onCourseAdd={onCourseAdd} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
