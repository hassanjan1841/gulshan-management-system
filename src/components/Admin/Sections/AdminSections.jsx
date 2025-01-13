import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddSectionSheet } from "./AddSectionSheet";
import { UpdateSectionSheet } from "./UpdateSectionSheet";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { usePaginate } from "@/context/PaginateContext";
import Pagination from "@/components/Pagination";
import Loader from "../../Loader";
import SectionDetailsSheet from "./SectionDetailsSheet";
import ConfirmDialog from "../../ConfirmDialog";
import { deleteSection, getSections } from "../../../services/api/sections";
import TimePicker from "../../TimePicker";
import { useSectionContext } from "../../../context/sectionContext";
import SectionDetails from "./SectionDetails";
import { Link } from "react-router";

// Mock function to fetch sections
const fetchSections = async (page, limit) => {
  let sections = await getSections(page, limit);
  return sections;
};

const AdminSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const { changingInSection, setChangingInSection } = useSectionContext();

  const { page, limit, setTotalPages } = usePaginate();

  const loadSections = async () => {
    try {
      setLoading(true);
      const newSections = await fetchSections(page, limit);
      console.log("newsecitons", newSections);
      setSections(newSections.sections);
      setTotalPages(newSections.totalPages);
      setLoading(false);
    } catch (error) {
      if (error.message === "Network Error") {
        setLoading(false);
        toast({
          title: "Network Error",
          variant: "destructive",
        });
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSections();
  }, [page, limit, changingInSection]);

  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteSection(sectionId);
      // setChangingInSection((prev) => prev + 1);
      await loadSections();
      toast.success("Section Deleted Successfully.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Something went wrong.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Sections</h1>

        <AddSectionSheet />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections?.map((section) => (
          <Card key={section._id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Course Name: {section?.course?.title}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Batch: {section?.batch?.title}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Teacher: {section?.teacher?.full_name}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
               Days: {section.days
                  .map((day) => day.charAt(0).toUpperCase())
                  .join(" ")}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
               Time: {section.startTime} - {section.endTime}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="secondary">{section?.status}</Badge>
                <Badge variant="outline">{section?.room}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex space-x-2">
                <Button variant='outline' asChild>
                  <Link to={`/admin/dashboard/sections/${section._id}`}>
                    View Details
                  </Link>
                </Button>
                <UpdateSectionSheet section={section} />
              </div>
              <ConfirmDialog
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete the section and remove the data from our servers."
                onConfirm={() => handleDeleteSection(section?._id)}
                triggerText="Delete"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination />
      {loading && <Loader />}
    </div>
  );
};

export default AdminSections;
