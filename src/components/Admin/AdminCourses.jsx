"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddCourseSheet } from "./AddCoursesSheet";
import { getCourses } from "../../services/api/courses";
import Loader from "../Loader";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock function to fetch courses
const fetchCourses = async (page, limit) => {
  let courses = await getCourses(page, limit);
  // console.log("courses", courses);
  return courses;
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 9;

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const newCourses = await fetchCourses(page, limit);
      console.log("newCourses", newCourses);
      setCourses(newCourses.courses);
      // setPage((prevPage) => prevPage + 1);
      setLoading(false);
    };
    loadCourses();
  }, [page]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <AddCourseSheet
          onCourseAdd={(values) =>
            setCourses((prevCourses) => [values, ...prevCourses])
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course, index) => (
          <Card key={course._id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="secondary">{course.duration}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <span className="text-sm font-medium ml-auto">
                  ${course.fee}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-end text-sm text-muted-foreground">
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link to={`/admin/dashboard/courses/${course._id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default AdminCourses;
