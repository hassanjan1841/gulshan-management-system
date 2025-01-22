import { useEffect, useState } from "react";
import UploadExcel from "../UploadExcel";
import AllAssignmentCard from "./AllAssignmentCard";
import { useAuth } from "../../context/authContext";
import { usePaginate } from "../../context/PaginateContext";
import { toast } from "react-toastify";
import { getAssignments } from "../../services/api/assignment";
import { motion } from "framer-motion";
import { useAssignmentContext } from "../../context/assignmentContext";
import Loader from "../Loader";

// Mock data for assignments
const assignments = [
  {
    id: 1,
    title: "React Fundamentals Assignment",
    dueDate: "December 20, 2024",
    description:
      "Create a simple React application demonstrating the use of hooks, components, and state management.",
    status: "late",
    sampleFile: "/sample-react.pdf",
    submittedDate: "December 21, 2024",
    obtainedScore: 85,
    totalScore: 100,
  },
  {
    id: 2,
    title: "Database Design Project",
    dueDate: "December 22, 2024",
    description:
      "Design and implement a normalized database schema for a social media application.",
    status: "pending",
    sampleFile: "/sample-db.pdf",
    submittedDate: null,
  },
  {
    id: 3,
    title: "API Integration Task",
    dueDate: "December 25, 2024",
    description:
      "Implement RESTful API endpoints and integrate them with the frontend application.",
    status: "missed",
    sampleFile: "/sample-api.pdf",
    submittedDate: null,
  },
  {
    id: 4,
    title: "UI/UX Design Assignment",
    dueDate: "December 28, 2024",
    description:
      "Create wireframes and prototypes for an e-commerce mobile application.",
    status: "submitted",
    sampleFile: "/sample-design.pdf",
    submittedDate: "December 27, 2024",
    obtainedScore: 8,
    totalScore: 10,
  },
];

export default function StudentAssignment() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [status, setStatus] = useState("pending");
  const { page, limit, setTotalPages } = usePaginate();
  const { changingInAssignment } = useAssignmentContext();
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        // console.log("user incurrent", currentUser.section._id);
        const response = await getAssignments(
          page,
          limit,
          currentUser?.section?._id
        );
        // console.log("response assignments", response);
        setAssignments(response.assignments);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (error) {
        if (error.message === "Network Error") {
          toast({
            title: "Network Error",
            variant: "destructive",
          });
        }
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [page, limit, currentUser, changingInAssignment]);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-8">Assignments</h1>
          <div className="flex justify-start mb-4 space-x-2">
            {["pending", "submitted", "missed", "late"].map((status) => (
              <motion.button
                key={status}
                className={`px-4 py-2 rounded ${
                  status === "pending"
                    ? "bg-muted"
                    : status === "submitted"
                    ? "bg-muted"
                    : status === "missed"
                    ? "bg-muted"
                    : "bg-muted"
                } text-white`}
                onClick={() => setStatus(status)}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 0 }}
                animate={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {loading ? (
            <Loader />
          ) : (
            assignments.map((assignment) => (
              <AllAssignmentCard key={assignment._id} assignment={assignment} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
