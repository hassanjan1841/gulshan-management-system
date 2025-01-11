import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddCourseSheet } from "./AddCoursesSheet";
import { UpdateCourseSheet } from "./UpdateCourseSheet";
import { getCourses, deleteCourse } from "@/services/api/courses";
import Loader from "../../Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePaginate } from "@/context/PaginateContext";
import Pagination from "@/components/Pagination";
import Cookies from "js-cookie";
import ConfirmDialog from "../../ConfirmDialog";
import { Link } from "react-router";

const fetchCourses = async (page, limit) => {
  let courses = await getCourses(page, limit);
  return courses;
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { page, limit, setTotalPages } = usePaginate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const newCourses = await fetchCourses(page, limit);
        setCourses(newCourses.courses);
        setTotalPages(newCourses.totalPages);
        setLoading(false);
      } catch (error) {
        if (error.message === "Network Error") {
          setLoading(false);
          toast({
            title: "Network Error",
            variant: "destructive",
          });
        }
        setLoading(false);
      }
    };
    loadCourses();
  }, [page, limit]);

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId, Cookies.get("token"));
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      toast({
        title: "Course deleted successfully",
        description: "The course has been removed from the system.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error deleting the course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };

  if (loading) return <Loader />;

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
        {courses?.map((course) => (
          <Card key={course._id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description.slice(0, 75)}...
              </p>
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="flex justify-between">
                  <span>Duration</span>
                  {course.duration}
                </Badge>
                <Badge variant="outline" className="flex justify-between">
                  <span>Level</span>
                  {course.level}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to={`/admin/dashboard/courses/${course._id}`}>
                    View Details
                  </Link>
                </Button>
                <UpdateCourseSheet
                  course={course}
                  onCourseUpdate={handleUpdateCourse}
                />
              </div>
              <ConfirmDialog
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete the course and remove the data from our servers."
                onConfirm={() => handleDeleteCourse(course._id)}
                triggerText="Delete"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default AdminCourses;
