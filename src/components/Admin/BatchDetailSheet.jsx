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
import { getSingleBatch } from "../../services/api/batches";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";

function SectionCard({ section }) {
  console.log("section selected>", section);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{section.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p>
          <span className="font-medium">Days:</span> {section.days}
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

function BatchDetailSheet({ id }) {
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [batch, setBatch] = useState([]);
  const { toast } = useToast();

  const getBatch = async (id) => {
    try {
      const thisBatch = await getSingleBatch(id);
      setBatch(thisBatch.batch);
      return thisBatch;
    } catch (error) {
      throw error;
    }
  };
  const getSectionsOfThisBatch = async (batch) => {
    try {
      const sections = await getSections(batch);
      return sections;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const loadBatch = async () => {
      try {
        // Fetch the batch data based on the provided ID
        const thisBatch = await getBatch(id);

        if (thisBatch) {
          setLoading(true);

          try {
            // Fetch the sections for the given batch
            const sectionsResponse = await getSectionsOfThisBatch(
              thisBatch.batch._id
            );
            setSections(sectionsResponse.sections);
          } catch (error) {
            // Handle errors while fetching sections
            handleFetchError(error);
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
        // Handle errors while fetching the batch
        handleBatchError(error);
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

    const handleBatchError = (error) => {
      toast({
        title: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    };

    loadBatch();
  }, []);

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
            <p className="text-sm">
              <span className="font-medium">Admission:</span>{" "}
              {batch?.is_admission_open ? "Open" : "Closed"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created:</span>{" "}
              {new Date(batch.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-sm">
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(batch.updatedAt).toLocaleDateString("en-US", {
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
