import React, { useState, useEffect, useCallback } from "react";
import AdminStudentCard from "./AdminStudentCard";
import AddStudentSheet from "./AddStudentSheet";
import FilterStudents from "./FilterStudents";
import Loader from "../Loader";
import { toast } from "react-toastify";
import NoDataFound from "../NoDataFound";
import Pagination from "@/components/Pagination"; // Import the Pagination component
import { usePaginate } from "@/context/PaginateContext";
import { debounce } from "@/lib/helper"; // Import the debounce function
import { createUser, getAllUsers } from "../../services/api/user";
import { useStudentContext } from "../../context/studentContext";
import { useForm } from "react-hook-form";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { changingInStudent, setChangingInStudent } = useStudentContext();
  const [filters, setFilters] = useState({
    status: "",
    batch: "",
    teacher: "",
    course: "",
    search: "",
  });
  const form = useForm();
  const { page, limit, setTotalPages } = usePaginate();

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
        search: filters.search,
      };
      

      const data = await getAllUsers(
        "student",
        currentPage,
        limit, // Limit per page
        adjustedFilters.teacher,
        adjustedFilters.status,
        adjustedFilters.batch,
        adjustedFilters.course,
        adjustedFilters.search
      );

      setStudents(data.users); // Assuming the API returns { users, totalUsers }
      console.log("students in loadStudent>", students);

      setTotalPages(data.totalPages); // Calculate total pages
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
  }, [filters, page, limit, changingInStudent]); // Trigger fetch on page, limit, or filter change
console.log("filteres Search", filters.search);

  const handleFilterChange = (e) => {
    console.log("e in handleFilterChange", e);
    
    setFilters((prevFilters) => ({ ...prevFilters, ...e }));

  };

  const handleAddStudent = async (data) => {
    // console.log("data in handle add student>", data);

    try {
      const newData = data;
      newData.role = "student";
      const response = await createUser(newData);
      setChangingInStudent(() => changingInStudent + 1);
      form.reset();
      toast.success("New Student Added.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    } catch (error) {
      console.error("Error adding student:", error.message);
      toast.error("Branch error", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    }
  };

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Students</h1>
        <AddStudentSheet onAddStudent={handleAddStudent} />
      </div>

      <FilterStudents
        filters={filters}
        handleFilterChange={handleFilterChange}
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

          {/* Use the Pagination component */}
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
