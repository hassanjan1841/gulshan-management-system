import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { createSection } from "../../../services/api/sections";
import TimePicker from "../../TimePicker";
import { useEffect } from "react";
import { getCourses } from "../../../services/api/courses";
import { getAllUsers } from "../../../services/api/user";
import { getBatches } from "../../../services/api/batches";

import { useSectionContext } from "../../../context/sectionContext";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  course: z.string().min(1, {
    message: "Course is required.",
  }),
  batch: z.string().min(1, {
    message: "Batch is required.",
  }),
  teacher: z.string().min(1, {
    message: "Teacher is required.",
  }),
  status: z.enum(["pending", "ongoing", "merged", "finished"]),
  days: z.array(z.string()).min(1, {
    message: "At least one day must be selected.",
  }),
  startTime: z.string().min(1, {
    message: "Start time is required.",
  }),
  endTime: z.string().min(1, {
    message: "End time is required.",
  }),
  room: z.string().min(1, {
    message: "Room is required.",
  }),
});

const rooms = ["Room 101", "Room 102", "Room 103", "Lab 1", "Lab 2"];

const days = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

export function AddSectionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setChangingInSection } = useSectionContext();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      course: "",
      batch: "",
      teacher: "",
      status: "pending",
      days: [],
      startTime: "",
      endTime: "",
      room: "",
    },
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getCourses();
        setCourses(courses.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batches = await getBatches();
        console.log("batches", batches);
        setBatches(batches.batches);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchBatches();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachers = await getAllUsers("teacher");
        console.log("teachers", teachers);
        setTeachers(teachers.users);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  async function onSubmit(values) {
    console.log("values", values);
    setIsLoading(true);
    try {
      await createSection(values);
      setChangingInSection((prev) => prev + 1);
      toast.success("Section Added Successfully.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      form.reset();
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message,
        {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[400px] "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Section title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Section description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses?.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="max-w-[320px] w-full">
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {batches?.map((batch) => (
                    <SelectItem key={batch._id} value={batch._id}>
                      {batch?.title} - {batch?.branch?.title} -{" "}
                      {batch?.course?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers?.map((teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id}>
                      {teacher.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="merged">Merged</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="days"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Days</FormLabel>
                <FormDescription>
                  Select the days for this section.
                </FormDescription>
              </div>
              {days.map((day) => (
                <FormField
                  key={day.id}
                  control={form.control}
                  name="days"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={day.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(day.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, day.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== day.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {day.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <TimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <TimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>Select your preferred time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Section"}
        </Button>
      </form>
    </Form>
  );
}
