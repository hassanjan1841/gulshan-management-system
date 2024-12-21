import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { SelectLabel } from "../ui/select";
import { Label } from "../ui/label";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age is required"),
  fatherName: z.string().min(1, "Father's Name is required"),
  batch: z.string().min(1, "Batch is required"),
  course: z.string().min(1, "Course is required"),
  teacher: z.string().min(1, "Teacher is required"),
  isPassed: z.boolean(),
});

function AddStudentSheet({ onAddStudent }) {
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    fatherName: "",
    batch: "",
    course: "",
    teacher: "",
    isPassed: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: newStudent,
  });

  const handleAddStudent = (data) => {
    console.log("Student Data: ", data);
    // Handle adding student logic
    onAddStudent(data); // Pass data to the parent component or handle here
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={() => setNewStudent(true)}>Add Student</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] p-6 rounded-lg shadow-xl">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold mb-5">
            Add New Student
          </SheetTitle>
        </SheetHeader>

        <Form {...control}>
          <form onSubmit={handleSubmit(handleAddStudent)} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Age" {...field} />
                  </FormControl>
                  <FormMessage>{errors.age?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Father's Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.fatherName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Batch 1">Batch 1</SelectItem>
                        <SelectItem value="Batch 2">Batch 2</SelectItem>
                        <SelectItem value="Batch 3">Batch 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.batch?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Course 1">Course 1</SelectItem>
                        <SelectItem value="Course 2">Course 2</SelectItem>
                        <SelectItem value="Course 3">Course 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.course?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Teacher 1">Teacher 1</SelectItem>
                        <SelectItem value="Teacher 2">Teacher 2</SelectItem>
                        <SelectItem value="Teacher 3">Teacher 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.teacher?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isPassed"
              className="flex items-center space-x-2"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Label>Passed</Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Add Student
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AddStudentSheet;
