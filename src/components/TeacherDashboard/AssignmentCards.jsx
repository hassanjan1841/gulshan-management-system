import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import ConfirmDialog from "../ConfirmDialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EditAssignmentButton from "./EditAssignmentButton";
import Loader from "../Loader";
import { useTeacherSectionContext } from "../../context/teacherSectionContext";
import {
  deleteAssignment,
  getAssignments,
} from "../../services/api/assignment";
import { usePaginate } from "../../context/PaginateContext";
import { useAssignmentContext } from "../../context/assignmentContext";
import { toast } from "react-toastify";
import Pagination from "../Pagination";

const AssignmentCards = () => {
  const { teacherSection } = useTeacherSectionContext();
  const { page, limit, setTotalPages } = usePaginate();
  const { changingInAssignment, setChangingInAssignment } =
    useAssignmentContext();

  const navigate = useNavigate();

  const fetchData = async (page, limit, sectionId) => {
    const assignments = await getAssignments(page, limit, sectionId);
    console.log("assignments", assignments);
    return assignments;
  };

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        if (!teacherSection || !teacherSection._id) {
          toast.info("Please select your section first", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          return;
        }
        setIsLoading(true);
        const allAssignments = await fetchData(page, limit, teacherSection._id);
        console.log("aslla", allAssignments);
        setAssignments(allAssignments.assignments);
        setTotalPages(allAssignments.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error.message == "Network Error") {
          toast.error("Network Error", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark", // Change the theme if needed
          });
        }
        console.log(error);
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          }
        );
      }
    };
    loadAssignments();
  }, [page, limit, changingInAssignment]);

  const handleDeleteAssignment = async (id) => {
    try {
      setIsLoading(true);
      await deleteAssignment(id); // Assuming deleteAssignment is an API call to delete the assignment
      setChangingInAssignment((prev) => !prev); // Trigger re-fetch of assignments
      toast.success("Assignment deleted successfully", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      if (error.message === "Network Error") {
        toast.error("Network Error", {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>
      {isLoading ? (
        <Loader />
      ) : assignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>
                    {assignment?.title.charAt(0).toUpperCase() +
                      assignment?.title.slice(1)}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">
                      {assignment?.section?.title}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {assignment?.submissions}
                  </p>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        navigate(`/teacher/assignments/${assignment._id}`)
                      }
                    >
                      View Details
                    </Button>
                    <EditAssignmentButton />
                  </div>
                  <ConfirmDialog
                    title="Are you sure?"
                    description="This action cannot be undone. This will permanently delete the branch and remove the data from our servers."
                    onConfirm={() => handleDeleteAssignment(assignment._id)}
                    triggerText="Delete"
                  />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No assignments found</p>
      )}
      <Pagination />
    </div>
  );
};

export default AssignmentCards;
