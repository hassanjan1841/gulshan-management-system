import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { AddCourseSheet } from "./AddCoursesSheet";
import { UpdateCourseSheet } from "./UpdateCourseSheet";
import Loader from "../../Loader";
import { Button } from "@/components/ui/button";
import { usePaginate } from "@/context/PaginateContext";
import Pagination from "@/components/Pagination";
import Cookies from "js-cookie";
import ConfirmDialog from "../../ConfirmDialog";
import { Link } from "react-router";
import {
  deleteCourse,
  getCourses,
  getCoursesWithoutLimit,
} from "../../../services/api/courses";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCourseContext } from "../../../context/courseContext ";
import { toast } from "react-toastify";

const fetchCourses = async (page, limit, courseId) => {
  let courses = await getCourses(page, limit, courseId);
  return courses;
};

const allCourses = async () => {
  let courses = await getCoursesWithoutLimit();
  return courses;
};

export function ComboboxList({ allCourses, setSelectedCourse }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? allCourses?.find((course) => course.value === value)?.title
            : "Select Course..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {allCourses?.map((course) => {
                course.value = course.title.toLowerCase();
                return (
                  <>
                    <CommandItem
                      key={course._id}
                      value={course.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setSelectedCourse(course._id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          value === course.title ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {course.title}
                    </CommandItem>
                  </>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allcourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { page, limit, setTotalPages } = usePaginate();
  const { changingInCourse, setChangingInCourse } = useCourseContext();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courses = await allCourses();
        setAllCourses(courses.courses);
      } catch (error) {
        console.log("error>>", error);
      }
    };
    loadCourses();
  }, [changingInCourse]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const newCourses = await fetchCourses(page, limit, selectedCourse);
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
  }, [page, limit, selectedCourse, changingInCourse]);

  const handleDeleteCourse = async (courseId) => {
    try {
      const courseDelete = await deleteCourse(courseId);
      setChangingInCourse(() => changingInCourse + 1);
      toast.success("Branch Deleted.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    } catch (error) {
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
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <ComboboxList
            setSelectedCourse={setSelectedCourse}
            allCourses={allcourses}
          />
        </div>
        <AddCourseSheet />
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
      {loading && <Loader />}
    </div>
  );
};

export default AdminCourses;
