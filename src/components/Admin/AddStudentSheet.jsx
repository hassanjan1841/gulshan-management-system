import React from "react";
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
import ButtonSpinner from "../../components/ButtonSpinner";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Zod schema for form validation
const formSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .refine((val) => typeof val === "string", {
      message: "Full name must be a string",
    }),
  email: z.string().email("Email must be valid"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must be valid"),
  cnic: z.string().length(13, "CNIC must be exactly 13 characters"),
  date_of_birth: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Date of birth must be a valid date"
    ),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender must be Male, Female, or Other",
  }),
  address: z
    .string()
    .min(1, "Address is required")
    .refine((val) => typeof val === "string", {
      message: "Address must be a string",
    }),
  computer_proficiency: z.enum(["Basic", "Intermediate", "Advanced"], {
    message: "Computer proficiency must be Basic, Intermediate, or Advanced",
  }),
  age: z
    .number()
    .min(1, "Age is required")
    .max(100, "Age must be less than 100"),
  courses: z.string().min(1, "Course is required"),
});

function AddStudentSheet({ onAddStudent }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      cnic: "",
      date_of_birth: "",
      gender: "Male",
      address: "",
      computer_proficiency: "Basic",
      age: "",
      courses: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleAddStudent = (data) => {
    console.log("Student Data: ", data);
    onAddStudent(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add Student</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] overflow-y-scroll p-6 rounded-lg shadow-xl">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold mb-5">
            Add New Student
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(handleAddStudent)} className="space-y-4">
            <FormField
              control={control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.full_name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC</FormLabel>
                  <FormControl>
                    <Input placeholder="13-digit CNIC" {...field} />
                  </FormControl>
                  <FormMessage>{errors.cnic?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>{errors.date_of_birth?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.gender?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="computer_proficiency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Computer Proficiency</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Intermediate"></SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {errors.computer_proficiency?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button className='w-full' type="submit">
              {form.formState.isSubmitting ? <ButtonSpinner/> : "Add Student"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AddStudentSheet;
