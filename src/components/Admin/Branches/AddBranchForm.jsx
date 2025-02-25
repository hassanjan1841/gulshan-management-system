import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "react-toastify";
import { createBranch } from "../../../services/api/branches";
import Cookies from 'js-cookie'
import { useBranchContext } from "../../../context/branchContext";

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
  students_limit:z.string().min(1,{
    message:"Students limit should be greater than 0"
  })
  
});

export function AddBranchForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {changingInBranch, setChangingInBranch} = useBranchContext()
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      country: "",
      city: "",
      address: "",
      students_limit:""
      
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const data = await createBranch(values, Cookies.get('token'))
      setChangingInBranch(() => changingInBranch + 1)
      toast.success(
        "Branch Added Successfully.",
        {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark", // Change the theme if needed
        }
      )
      form.reset();
    } catch (error) {
      toast.error("Branch error",{
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
                <Input placeholder="Students Limit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Branch"}
        </Button>
      </form>
    </Form>
  );
}

