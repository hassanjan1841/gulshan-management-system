import React, { useState, useEffect } from "react";
import AdminStudentCard from "./AdminStudentCard";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "lucide-react";
import { SelectContent } from "../ui/select";
import AddStudentSheet from "./AddStudentSheet";

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
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary" onClick={() => setIsAdding(true)}>
              Add Student
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[400px] p-6 rounded-lg shadow-xl"
          >
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                Add New Student
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <Input
                label="Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                placeholder="Student Name"
              />
              <Input
                label="Age"
                type="number"
                value={newStudent.age}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, age: e.target.value })
                }
                placeholder="Age"
              />
              <Input
                label="Father's Name"
                value={newStudent.fatherName}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, fatherName: e.target.value })
                }
                placeholder="Father's Name"
              />
              <Select
                value={newStudent.batch}
                onValueChange={(value) =>
                  setNewStudent({ ...newStudent, batch: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Batch 1">Batch 1</SelectItem>
                  <SelectItem value="Batch 2">Batch 2</SelectItem>
                  <SelectItem value="Batch 3">Batch 3</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newStudent.course}
                onValueChange={(value) =>
                  setNewStudent({ ...newStudent, course: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Course 1">Course 1</SelectItem>
                  <SelectItem value="Course 2">Course 2</SelectItem>
                  <SelectItem value="Course 3">Course 3</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newStudent.teacher}
                onValueChange={(value) =>
                  setNewStudent({ ...newStudent, teacher: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher 1">Teacher 1</SelectItem>
                  <SelectItem value="Teacher 2">Teacher 2</SelectItem>
                  <SelectItem value="Teacher 3">Teacher 3</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center">
                <label className="mr-2">Passed</label>
                <input
                  type="checkbox"
                  checked={newStudent.isPassed}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, isPassed: e.target.checked })
                  }
                />
              </div>
              <Button
                variant="primary"
                className="mt-4"
                onClick={handleAddStudent}
              >
                Add Student
              </Button>
            </div>
          </SheetContent>
        </Sheet> */}
        <AddStudentSheet />
      </div>
      {/* Filters Section */}
      <div className="mb-4">
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <Input
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or father's name"
          />
          <Select
            value={filters.status}
            name="status"
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Passed</SelectItem>
              <SelectItem value="false">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.batch}
            name="batch"
            onValueChange={(value) => setFilters({ ...filters, batch: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="Batch 1">Batch 1</SelectItem>
              <SelectItem value="Batch 2">Batch 2</SelectItem>
              <SelectItem value="Batch 3">Batch 3</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.teacher}
            name="teacher"
            onValueChange={(value) =>
              setFilters({ ...filters, teacher: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              <SelectItem value="Teacher 1">Teacher 1</SelectItem>
              <SelectItem value="Teacher 2">Teacher 2</SelectItem>
              <SelectItem value="Teacher 3">Teacher 3</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.course}
            name="course"
            onValueChange={(value) => setFilters({ ...filters, course: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="Course 1">Course 1</SelectItem>
              <SelectItem value="Course 2">Course 2</SelectItem>
              <SelectItem value="Course 3">Course 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="primary">Filter Students</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="p-6 rounded-t-lg shadow-xl">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold text-start mb-4">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-4">
                <Input
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by name or father's name"
                />
                <Select
                  value={filters.status}
                  name="status"
                  onValueChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="true">Passed</SelectItem>
                    <SelectItem value="false">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.batch}
                  name="batch"
                  onValueChange={(value) =>
                    setFilters({ ...filters, batch: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    <SelectItem value="Batch 1">Batch 1</SelectItem>
                    <SelectItem value="Batch 2">Batch 2</SelectItem>
                    <SelectItem value="Batch 3">Batch 3</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.teacher}
                  name="teacher"
                  onValueChange={(value) =>
                    setFilters({ ...filters, teacher: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teachers</SelectItem>
                    <SelectItem value="Teacher 1">Teacher 1</SelectItem>
                    <SelectItem value="Teacher 2">Teacher 2</SelectItem>
                    <SelectItem value="Teacher 3">Teacher 3</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.course}
                  name="course"
                  onValueChange={(value) =>
                    setFilters({ ...filters, course: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="Course 1">Course 1</SelectItem>
                    <SelectItem value="Course 2">Course 2</SelectItem>
                    <SelectItem value="Course 3">Course 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
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
