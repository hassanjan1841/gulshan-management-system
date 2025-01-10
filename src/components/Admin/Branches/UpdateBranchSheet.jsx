import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { toast } from "react-toastify";

import { Pencil } from 'lucide-react';
import { updateBranch } from "../../../services/api/branches";
import { useBranchContext } from "../../../context/branchContext";
import ButtonSpinner from "../../ButtonSpinner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  students_limit: z.string().regex(/^\d+$/, {
    message: "Students limit must be a number.",
  }),
});

export function UpdateBranchSheet({ branch }) {
  const [isLoading, setIsLoading] = useState(false);
    const {changingInBranch, setChangingInBranch} = useBranchContext()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: branch.title,
      country: branch.country,
      city: branch.city,
      address: branch.address,
      students_limit: branch.students_limit,
    },
  });

  async function onSubmit(values) {
    try {
    setIsLoading(true);
      const branchUpdate = await updateBranch(branch._id , values)
      setChangingInBranch(() => changingInBranch + 1)
      toast.success(
              "Branch Updated Successfully.",
              {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark", // Change the theme if needed
              }
            )
    } catch (error) {
      toast.error(
              "something Went wrong.",
              {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark", // Change the theme if needed
              }
            )
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-scroll'>
        <SheetHeader>
          <SheetTitle>Update Branch</SheetTitle>
          <SheetDescription>
            Make changes to your branch here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your branch.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="students_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Students Limit</FormLabel>
                  <FormControl>
                    <Input placeholder="Students limit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit" disabled={isLoading}>
              {isLoading ? <ButtonSpinner/> : "Update Branch"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

