import React, { useState, useEffect } from "react";
import AdminStudentCard from "./AdminStudentCard";
import AddStudentSheet from "./AddStudentSheet";
import FilterStudents from "./FilterStudents";

const AdminStudents = () => {
  const fetchStudents = async (page = 0, pageSize = 12) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalItems = 50;
    const data = Array.from({ length: pageSize }, (_, i) => ({
      id: page * pageSize + i + 1,
      name: `Student ${page * pageSize + i + 1}`,
      picture: `https://cdn5.vectorstock.com/i/1000x1000/52/54/male-student-graduation-avatar-profile-vector-12055254.jpg`,
      course: `Course ${Math.floor(Math.random() * 5) + 1}`,
      batch: `Batch ${Math.floor(Math.random() * 4) + 1}`,
      section: `Section ${String.fromCharCode(
        65 + Math.floor(Math.random() * 3)
      )}`,
      teacher: `Teacher ${Math.floor(Math.random() * 3) + 1}`,
      fatherName: `Father Name ${i + 1}`,
      age: 18 + Math.floor(Math.random() * 7),
      cnic: `12345-678901-${i}`,
      isEliminated: Math.random() < 0.1,
      isPassed: Math.random() > 0.5,
      education: "Bachelor's Degree",
    }));

    return {
      data,
      totalPages: Math.ceil(totalItems / pageSize),
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
    name: "",
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
      const { data } = await fetchStudents();
      setStudents(data);
      setIsLoading(false);
    };
    loadStudents();
  }, []);

  // Handle the filters change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
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
        ? student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
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
      name: "",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <AdminStudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
