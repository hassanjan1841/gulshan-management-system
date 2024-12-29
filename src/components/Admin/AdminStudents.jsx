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
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    status: "",
    batch: "",
    teacher: "",
    course: "",
    search: "",
  });
  const [newStudent, setNewStudent] = useState();

  useEffect(() => {
    const loadStudents = async () => {
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
          1,
          5,
          adjustedFilters.teacher,
          adjustedFilters.status,
          adjustedFilters.batch,
          adjustedFilters.course
        );
        console.log("data in loadStudents", data);
        setStudents(data);
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
    loadStudents();
  }, [filters]);

  // Handle the filters change
  const handleFilterChange = (e) => {
    console.log("e.target students filter", e);
    setFilters((prevFilters) => ({ ...prevFilters, ...e }));
  };

  // Handle the addition of a new student
  const handleAddStudent = async (data) => {
    const newData = data;
    newData.role = "student";
    console.log("Student Data: ", newData);
    try {
      const response = await createUser(newData); // Assuming addStudent is a function that makes an API call to add a student
      setStudents([
        ...students,
        response.data, // Assuming the API response contains the new student data
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Students</h1>
        <AddStudentSheet onAddStudent={handleAddStudent} />
      </div>
      {/* Filters Section */}
      <FilterStudents
        filters={filters}
        handleFilterChange={handleFilterChange}
        setFilters={setFilters}
      />
      {/* Students List */}

      {error ? (
        <NoDataFound />
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students?.map((student) => (
            <AdminStudentCard key={student._id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
