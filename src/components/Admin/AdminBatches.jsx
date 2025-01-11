"use client";

import { useState, useEffect } from "react";
import AdminBatchesCard from "./AdminBatchesCard";
import Loader from "../Loader";
import { getCourses, getCoursesWithoutLimit } from "../../services/api/courses";
import { useToast } from "../../hooks/use-toast";
import { usePaginate } from "../../context/PaginateContext";
import Pagination from "../Pagination";
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
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import AddBatchSheet from "./AddBatchSheet";
import { useBatchContext } from "../../context/batchContext";

export function ComboboxList({ allCourses, setSelectedCourse }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // console.log("allCourses", allCourses);
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

const fetchCourses = async (page, limit, course) => {
  let courses = await getCourses(page, limit, course);
  return courses;
};

const AdminBatches = () => {
  const [courses, setCourses] = useState([]);
  const [allcourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { page, limit, setTotalPages } = usePaginate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { changingInBatch } = useBatchContext();

  // console.log("changingInBatch in admin", changingInBatch);

  const allCourses = async () => {
    let courses = await getCoursesWithoutLimit();
    // console.log("courses in all courses", courses);
    setAllCourses(courses.courses);
    // return courses;
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      const newCourses = await fetchCourses(page, limit, selectedCourse);
      // console.log(newCourses);
      setCourses(newCourses.courses);
      setTotalPages(newCourses.totalPages);
      setLoading(false);
    } catch (error) {
      if (error.message == "Network Error") {
        setLoading(false);
        toast({
          title: "Network Error",
          variant: "destructive",
        });
      }
      setLoading(false);
    }
  };
  useEffect(()=>{
    allCourses();
  },[])
  allCourses();
  useEffect(() => {
    loadCourses();
  }, [page, limit, selectedCourse, changingInBatch]);

  if (loading) return <Loader />;
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold">Batches</h1>
          <ComboboxList
            setSelectedCourse={setSelectedCourse}
            allCourses={allcourses}
          />
        </div>
        <AddBatchSheet courses={courses} />
      </div>
      <div className="flex flex-col space-y-8">
        {courses?.map((course, index) => (
          <>
            <h1 className="text-2xl">
              <span className="font-medium">Course Name: </span>
              {course.title}
            </h1>
            <AdminBatchesCard course={course} key={index} />
          </>
        ))}
      </div>
      <Pagination />
    </div>
  );
};
export default AdminBatches;
