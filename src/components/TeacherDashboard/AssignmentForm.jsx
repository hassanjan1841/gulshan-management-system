import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Upload } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerWithYearDropdown } from "../../pages/registration/DatePickerWithYearDropdown";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  description: z.string().optional(),
  file: z.instanceof(File).optional(),
});

function AssignmentForm({ assignmentData }) {
  const [fileNames, setFileNames] = useState([])
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: assignmentData || {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter assignment title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Controller
              name="dueDate"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="date_of_birth"
                    className="text-landing-button"
                  >
                    Date of Birth
                  </label>
                  <DatePickerWithYearDropdown
                    field={field}
                    className="p-5 w-full h-10  outline-none rounded-md"
                  />
                </div>
              )}
            />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter assignment description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide any additional details about the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
      control={form.control}
      name="pictures"
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel htmlFor="image-upload" className="sr-only">
            Upload Images
          </FormLabel>
          <FormControl>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Allowed file types: .jpg, .jpeg, .png, .gif
                  </p>
                  {fileNames.length > 0 && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Selected files: {fileNames.join(', ')}
                    </p>
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    onChange(files)
                    setFileNames(files.map(file => file.name))
                  }}
                  {...rest}
                />
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
        <Button type="submit" className='w-full'>
          {assignmentData ? "Update" : "Create"} Assignment
        </Button>
      </form>
    </Form>
  );
}

export default AssignmentForm;
