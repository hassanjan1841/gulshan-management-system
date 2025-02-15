import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { cn } from "@/lib/utils"
import { MultipleImageUpload } from "./MultipleImageUpload";
import ButtonSpinner from "../ButtonSpinner";
import { DatePickerWithYearDropdown } from "../../pages/registration/DatePickerWithYearDropdown";
import { createAssignment } from "../../services/api/assignment";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { useAssignmentContext } from "../../context/assignmentContext";
import { useTeacherSectionContext } from "../../context/teacherSectionContext";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pictures: z.array(z.instanceof(File)).optional(),
});

let uploadPics = (images) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Normalize input: If it's a single image, convert it to an array
      const files = Array.isArray(images) ? images : [images];

      let uploadPromises = files.map((file) => {
        return new Promise((res, rej) => {
          const randomNum = Math.random().toString().slice(2);
          const storageRef = ref(storage, `assignmentImages/${randomNum}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              rej(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                res(downloadURL);
              });
            }
          );
        });
      });

      // Wait for all uploads to finish
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("downloadurls", downloadURLs);
      resolve(downloadURLs); // Resolve with an array of download URLs
    } catch (error) {
      reject(error.message);
    }
  });
};

export default function AssignmentForm() {
  const { changingInAssignment, setChangingInAssignment } =
    useAssignmentContext();

  const { teacherSection } = useTeacherSectionContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("teacherSection", teacherSection);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      pictures: [],
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      values.section = teacherSection?._id;
      values.createdBy = teacherSection?.teacher?._id;
      console.log("values>>", values);
      // Simulate API call
      const images = await uploadPics(values.pictures);
      console.log("iages", images);
      values.pictures = images;
      const assignment = await createAssignment(values);
      setChangingInAssignment(() => changingInAssignment + 1);
      console.log("response assignment", assignment);
      toast.success("New Assignment Added.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
      form.reset();
    } catch (error) {
      toast.error(error.message ? error.message : error.response.data.message, {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter assignment title" {...field} />
              </FormControl>
              <FormDescription>
                Provide a clear and concise title for the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          name="dueDate"
          control={form.control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label htmlFor="dueDate" className="text-landing-button">
                Due Date
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
                  className="resize-y"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pictures</FormLabel>
              <FormControl>
                <div className="max-h-60 overflow-y-scroll">
                  <MultipleImageUpload
                    onChange={field.onChange}
                    value={field.value}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Upload any relevant images for the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting ? (
            <ButtonSpinner />
          ) : (
            "Create Assignment"
          )}
        </Button>
      </form>
    </Form>
  );
}
