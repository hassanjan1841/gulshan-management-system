import React, { useState, useEffect } from "react";
import AdminStudentCard from "./AdminStudentCard";
import AddStudentSheet from "./AddStudentSheet";
import FilterStudents from "./FilterStudents";
import { createUser, getAllUsers } from "../../services/api/user";
import { useToast } from "../../hooks/use-toast";
import Loader from "../Loader";
import NoDataFound from "../NoDataFound";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    status: "",
    batch: "",
    teacher: "",
    course: "",
    search: "",
  });

  const loadStudents = async (currentPage = page) => {
    try {
      setError(null);
      setIsLoading(true);

      const adjustedFilters = {
        ...filters,
        teacher: filters.teacher === "all" ? "" : filters.teacher,
        batch: filters.batch === "all" ? "" : filters.batch,
        status: filters.status === "all" ? "" : filters.status,
        course: filters.course === "all" ? "" : filters.course,
      };

      console.log("filters in loadStudents", adjustedFilters);

      const data = await getAllUsers(
        "student",
        currentPage,
        6, // Limit per page
        adjustedFilters.teacher,
        adjustedFilters.status,
        adjustedFilters.batch,
        adjustedFilters.course
      );

      console.log("data in loadStudents", data);
      setStudents(data); // Assuming the API returns { users, totalUsers }
      setTotalPages(Math.ceil(data.length / 6)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching students:", error.message);
      toast({
        variant: "destructive",
        title: error.message ? "Server Error" : "User Validation",
        description: error?.response?.data?.message
          ? error.response.data.message
          : error?.message,
      });
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents(); // Fetch students on initial load and when filters change
  }, [filters, page]); // Trigger fetch on page or filter change

  const handleFilterChange = (e) => {
    console.log("e.target students filter", e);
    setFilters((prevFilters) => ({ ...prevFilters, ...e }));
  };

  const handleAddStudent = async (data) => {
    const newData = data;
    newData.role = "student";
    console.log("Student Data: ", newData);
    try {
      const response = await createUser(newData);
      setStudents([
        ...students,
        response.data,
      ]);
      toast({
        variant: "success",
        title: "Student Added",
        description: "The student has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding student:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message
          ? error.response.data.message
          : error?.message,
      });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Students</h1>
        <AddStudentSheet onAddStudent={handleAddStudent} />
      </div>

      <FilterStudents
        filters={filters}
        handleFilterChange={handleFilterChange}
        setFilters={setFilters}
      />

      {error ? (
        <NoDataFound />
      ) : isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students?.map((student) => (
              <AdminStudentCard key={student._id} student={student} />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-end items-center mt-6">
            <button
              className={`px-4 py-2 mx-2 bg-gray-400 rounded ${
                page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
              }`}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm mx-2">
              Page {page} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 mx-2 bg-gray-400 rounded ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
              }`}
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;

