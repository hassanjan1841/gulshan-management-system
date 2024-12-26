import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../hooks/use-toast";
// import { useNavigate } from "react-router-dom";


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
import { createCourse } from "../../services/api/courses";
import { useState } from "react";
import Cookies from "js-cookie";


// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(120, { message: "Title must not exceed 120 characters." }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters." })
    .max(200, { message: "Description must not exceed 120 characters." }),
  duration: z.string().nonempty({ message: "Duration is required." }),
  fee: z.string().nonempty({ message: "Fee is required." }),
  level: z.string().nonempty({ message: "Level is required." }),
});

export function AddCourseForm({ onCourseAdd }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      fee: "",
      level: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const course = await createCourse(values, Cookies.get("token"));
      toast({
        title: "Course Added",
        message: "Course has been added successfully.",
        type: "success",
      });

      onCourseAdd(values);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: error.message ? "Server Error" : "User Validation",
        description: error?.response?.data?.message
          ? error.response.data.message
          : error?.message,
      });
    } finally {
      setLoading(false);
    }
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
                <Input placeholder="Enter course description" {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Level Field */}
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the difficulty level of the course.
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
        <Button type="submit" className="w-full" loading={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
