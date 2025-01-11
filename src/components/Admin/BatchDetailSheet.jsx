import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { getSections } from "../../services/api/sections";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";

function SectionCard({ section }) {
  console.log("section selected>", section);

  return (
    <div className="bg-foreground/10 shadow-md rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
      <p className="text-sm text-foreground mb-2">{section.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p>
          <span className="font-medium">Days:</span>{" "}
          {section.days.map((day) => day.charAt(0).toUpperCase()).join(" ")}
        </p>
        <p>
          <span className="font-medium">Time:</span> {section.startTime} -{" "}
          {section.endTime}
        </p>
        <p>
          <span className="font-medium">Room:</span> {section.room}
        </p>
        <p>
          <span className="font-medium">Status:</span> {section.status}
        </p>
      </div>
    </div>
  );
}

function BatchDetailSheet({ batchData }) {
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [batch, setBatch] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setBatch(batchData);
  }, [batchData]);

  useEffect(() => {
    const loadBatch = async () => {
      try {
        setLoading(true);

        if (batch) {
          // Fetch the sections for the given batch
          const sectionsResponse = await getSections(1, 100, batch._id);
          setSections(sectionsResponse.sections);
        }
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    const handleFetchError = (error) => {
      if (error.message === "Network Error") {
        toast({
          title: "Network Error",
          variant: "destructive",
        });
      }
    };

    // Call the loader function if batch exists
    if (batch) {
      loadBatch();
    }
  }, [batch, toast]);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Show Detail</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto py-8">
        <SheetHeader>
          <SheetTitle>{batch?.title}</SheetTitle>
          <SheetDescription>
            <p className="text-sm ">
              <span className="font-medium">Course:</span>{" "}
              {batch?.course?.title}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium">Description:</span>{" "}
              {batch?.description}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium">Batch Limit:</span>{" "}
              {batch?.batch_limit}
            </p>
            <p className="text-sm">
              <span className="font-medium">Admission:</span>{" "}
              {batch?.is_admission_open ? "Open" : "Closed"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created:</span>{" "}
              {new Date(batch?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-sm">
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(batch?.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          {loading ? (
            <p>Loading sections...</p>
          ) : sections.length > 0 ? (
            sections.map((section) => (
              <SectionCard key={section._id} section={section} />
            ))
          ) : (
            <p>No sections available for this batch.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default BatchDetailSheet;
