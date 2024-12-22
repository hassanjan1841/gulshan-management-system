import React, { useState, useEffect } from "react";
import AdminStudentCard from "./AdminStudentCard";
import AddStudentSheet from "./AddStudentSheet";
import FilterStudents from "./FilterStudents";
import { getAllUsers } from "../../services/api/user";

const AdminStudents = () => {
  const fetchStudents = async (role) => {
    const users = await getAllUsers(role);
    return {
      data: users,
      total: users.length,
    };
  };

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    batch: "",
    teacher: "",
    course: "",
    search: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    full_name: "",
    age: "",
    batch: "",
    section: "",
    course: "",
    teacher: "",
    isPassed: false,
    fatherName: "",
    cnic: "",
  });

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      const { data } = await fetchStudents("student");
      console.log("data in loadStudents", data);
      setStudents(data.users);
      setIsLoading(false);
    };
    loadStudents();
  }, []);

  // Handle the filters change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.full_name]: e.target.value,
    });
  };

  // Apply filters to students list
  const filteredStudents = students.filter((student) => {
    return (
      (filters.status
        ? student.isPassed.toString() === filters.status
        : true) &&
      (filters.batch ? student.batch === filters.batch : true) &&
      (filters.teacher ? student.teacher === filters.teacher : true) &&
      (filters.course ? student.course === filters.course : true) &&
      (filters.search
        ? student.full_name
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          student.fatherName
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        : true)
    );
  });

  // Handle the addition of a new student
  const handleAddStudent = () => {
    setStudents([
      ...students,
      {
        ...newStudent,
        id: students.length + 1,
        picture:
          "https://cdn5.vectorstock.com/i/1000x1000/52/54/male-student-graduation-avatar-profile-vector-12055254.jpg",
      },
    ]);
    setIsAdding(false);
    setNewStudent({
      full_name: "",
      age: "",
      batch: "",
      section: "",
      course: "",
      teacher: "",
      isPassed: false,
      fatherName: "",
      cnic: "",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Students</h1>
        <AddStudentSheet />
      </div>
      {/* Filters Section */}
      <FilterStudents
        filters={filters}
        handleFilterChange={handleFilterChange}
        setFilters={setFilters}
      />
      {/* Students List */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <AdminStudentCard key={student._id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
