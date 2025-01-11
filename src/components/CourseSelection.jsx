import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Mock data for courses and batches. Replace with actual data fetching logic.
const mockCourses = [
  { id: "1", name: "Course 1" },
  { id: "2", name: "Course 2" },
  { id: "3", name: "Course 3" },
];

const mockBatches = [
  { id: "1", name: "Batch 1" },
  { id: "2", name: "Batch 2" },
  { id: "3", name: "Batch 3" },
];

export function CourseSelection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2 mb-4">
          <FormField
            control={control}
            name={`courses.${index}.course`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`courses.${index}.batch`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockBatches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ course: "", batch: "" })}
        className="mt-2"
      >
        Add Course
      </Button>
    </div>
  );
}
