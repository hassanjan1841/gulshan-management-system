'use client'

import React, { useState, useEffect } from "react";
import { Edit } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentDetailSheet from "./StudentDetailSheet";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const fetchStudents = async (course = "", batch = "", section = "") => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalItems = 50;
    const data = Array.from({ length: totalItems }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      picture: `https://via.placeholder.com/150?text=Student+${i + 1}`,
      course: `Course ${Math.floor(Math.random() * 5) + 1}`,
      batch: `Batch ${Math.floor(Math.random() * 4) + 1}`,
      section: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
      teacher: `Teacher ${Math.floor(Math.random() * 3) + 1}`,
      fatherName: `Father Name ${i + 1}`,
      age: 18 + Math.floor(Math.random() * 7),
      cnic: `12345-678901-${i}`,
      isEliminated: Math.random() < 0.1,
      isPassed: Math.random() > 0.5,
      education: "Bachelor's Degree",
    }));

    const filteredData = data.filter(
      (student) =>
        (!course || student.course === course) &&
        (!batch || student.batch === batch) &&
        (!section || student.section === section)
    );

    setIsLoading(false);
    return filteredData;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const allStudents = await fetchStudents();
      setStudents(allStudents);
      const uniqueCourses = [...new Set(allStudents.map((s) => s.course))];
      setCourses(uniqueCourses);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const courseBatches = [
        ...new Set(
          students
            .filter((s) => s.course === selectedCourse)
            .map((s) => s.batch)
        ),
      ];
      setBatches(courseBatches);
      setSelectedBatch("");
      setSelectedSection("");
    } else {
      setBatches([]);
      setSections([]);
    }
  }, [selectedCourse, students]);

  useEffect(() => {
    if (selectedBatch) {
      const batchSections = [
        ...new Set(
          students
            .filter(
              (s) => s.course === selectedCourse && s.batch === selectedBatch
            )
            .map((s) => s.section)
        ),
      ];
      setSections(batchSections);
      setSelectedSection("");
    } else {
      setSections([]);
    }
  }, [selectedBatch, selectedCourse, students]);

  useEffect(() => {
    const loadFilteredStudents = async () => {
      const filteredStudents = await fetchStudents(
        selectedCourse,
        selectedBatch,
        selectedSection
      );
      setStudents(filteredStudents);
    };
    loadFilteredStudents();
  }, [selectedCourse, selectedBatch, selectedSection]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Students</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="courses">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedBatch}
          onValueChange={setSelectedBatch}
          disabled={!selectedCourse}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="batches">All Batches</SelectItem>
            {batches.map((batch) => (
              <SelectItem key={batch} value={batch}>
                {batch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedSection}
          onValueChange={setSelectedSection}
          disabled={!selectedBatch}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sections">All Sections</SelectItem>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="text-center">Loading students...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card
              key={student.id}
              className="shadow-lg border border-border hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={student.picture}
                    alt={student.name}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div>
                    <CardTitle className="text-lg text-primary font-semibold">
                      {student.name}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-gray-500">
                        {student.section}
                      </Badge>
                      <Badge variant="secondary">{student.course}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Batch:</strong> {student.batch}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Teacher:</strong> {student.teacher}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <StudentDetailSheet student={student} />
                <Button variant="ghost">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;

