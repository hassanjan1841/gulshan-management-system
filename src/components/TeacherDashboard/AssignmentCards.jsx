"use client";

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
import { getAssignments } from "../../services/api/assignment";
import { usePaginate } from "../../context/PaginateContext";
import { useAssignmentContext } from "../../context/assignmentContext";
import { toast } from "react-toastify";
import Pagination from "../Pagination";

const AssignmentCards = () => {
    const {teacherSection, setTeacherSection} = useTeacherSectionContext()
    const { page, limit, setTotalPages } = usePaginate();
      const {changingInAssignment, setChangingInAssignment} = useAssignmentContext()
    
  
  const navigate = useNavigate();

  const fetchData = async (page, limit, sectionId) => {
      const assignments = await getAssignments(page, limit , sectionId)
      return assignments
  };

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setIsLoading(true);
        const allAssignments = await fetchData(page, limit, teacherSection._id);
        setAssignments(allAssignments.assignments);
        setTotalPages(allAssignments.totalPages)
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
        toast.error("something went wrong please try again", {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark", 
        });
      }
    };
    loadAssignments();
  }, [page, limit, changingInAssignment]);

 const handleDeleteAssignment = (id) => {
  console.log("delte function call", id);
  
 }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.sNo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{assignment.section}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {assignment.submissions}
                  </p>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex space-x-2">
                  <Button
                      variant="ghost"
                      onClick={() =>
                        navigate(`/teacher/assignments/${assignment.sNo}`)
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
      )}
    <Pagination/>
    </div>
  );
};

export default AssignmentCards;
