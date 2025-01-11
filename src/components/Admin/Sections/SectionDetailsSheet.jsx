import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function SectionDetailsSheet({ section }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{section?.title}</SheetTitle>
          <SheetDescription>Section Details</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">
                {section?.description}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Course</h4>
              <p className="text-sm text-muted-foreground">
                {section?.course?.title}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Batch</h4>
              <p className="text-sm text-muted-foreground">
                {section?.batch?.title}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Teacher</h4>
              <p className="text-sm text-muted-foreground">
                {section?.teacher?.full_name}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <p className="text-sm text-muted-foreground">{section?.status}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Days</h4>
              <p className="text-sm text-muted-foreground">{section?.days}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Time</h4>
              <p className="text-sm text-muted-foreground">
                {section?.startTime} - {section?.endTime}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Room</h4>
              <p className="text-sm text-muted-foreground">{section?.room}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
