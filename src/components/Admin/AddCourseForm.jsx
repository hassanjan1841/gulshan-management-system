"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {textarea} from "@/components/ui/textarea";

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters." })
    .max(120, { message: "Title must not exceed 120 characters." }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters." })
    .max(120, { message: "Description must not exceed 120 characters." }),
  duration: z.string().nonempty({ message: "Duration is required." }),
  fee: z.string().nonempty({ message: "Fee is required." }),
});

export function AddCourseForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      fee: "",
    },
  });

  function onSubmit(values) {
    console.log("Submitted Values:", values); // Form values will log here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title for your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea placeholder="Enter course description" {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Field */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="Enter course duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fee Field */}
        <FormField
          control={form.control}
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee</FormLabel>
              <FormControl>
                <Input placeholder="Enter course fee" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
