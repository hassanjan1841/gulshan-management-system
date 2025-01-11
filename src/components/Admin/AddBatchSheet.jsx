import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
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
import {
  getAllBranchesByCities,
  getAllCitiesByCountry,
  getAllCountriesFromBranches,
} from "../../services/api/branches";
import ButtonSpinner from "@/components/ButtonSpinner";
import Cookies from "js-cookie";
import { createBatch } from "../../services/api/batches";
import { useBatchContext } from "../../context/batchContext";
import TimePicker from "../TimePicker";
// Zod schema for form validation
const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(50, { message: "Title must not exceed 50 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(200, { message: "Description must not exceed 120 characters." }),
  course: z.string().nonempty({ message: "course is required." }),
  country: z.string().nonempty({ message: "country is required." }),
  city: z.string().nonempty({ message: "city is required." }),
  branch: z.string().nonempty({ message: "branch is required." }),
  batch_limit: z.string().nonempty({ message: "batchLimit is required." }),
});

function AddBatchSheet({ courses }) {
  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [branch, setBranch] = useState(null);
  const { changingInBatch, SetChangingInBatch } = useBatchContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      course: "",
      description: "",
      country: "",
      city: "",
      branch: "",
      batch_limit: "",
    },
  });

  useEffect(() => {
    const getCountry = async () => {
      try {
        const countries = await getAllCountriesFromBranches();
        setCountries(countries.countries);
      } catch (error) {
        console.log("error in get country", country);
      }
    };
    getCountry();
  }, []);

  useEffect(() => {
    const allCities = async () => {
      if (country) {
        try {
          const cities = await getAllCitiesByCountry(country);
          setCities(cities.cities);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };
    allCities();
  }, [country]);

  useEffect(() => {
    const allBranches = async () => {
      if (city && country) {
        try {
          const branches = await getAllBranchesByCities(city, country);
          setBranch(branches.branches);
          console.log("branches>>", branches);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };
    allBranches();
  }, [city]);

  const handleAddBatch = async (data) => {
    console.log("data in batchf omr", data);
    try {
      const newBatch = await createBatch(data);
      form.reset();
      SetChangingInBatch(() => changingInBatch + 1);
      toast.success("New Batch Added.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    } catch (error) {
      console.log("error", error);
      if (error.response.data.error) {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark", // Change the theme if needed
        });
      }
      toast.error(error.message, {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Batch</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[400px] overflow-y-scroll overflow-x-hidden rounded-lg shadow-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold mb-5">
            Add New Batch
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddBatch)}
            className="space-y-6"
          >
            {/* country  */}
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCountry(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries?.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the available country.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* city  */}
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCity(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((city, index) => (
                        <SelectItem key={index} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the available city.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* branch  */}
            <FormField
              control={control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branch?.map((branch, index) => (
                        <SelectItem key={index} value={branch._id}>
                          {branch.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the available Branch.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* course  */}
            <FormField
              control={control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coure</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course._id} value={course._id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the available course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* title  */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage>{errors.title?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* batch_limit  */}
            <FormField
              control={control}
              name="batch_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Limit</FormLabel>
                  <FormControl>
                    <Input placeholder="Batch Limit" {...field} />
                  </FormControl>
                  <FormMessage>{errors.batch_limit?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* description  */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="">
              <Button type="submit" className="mt-4 w-full">
                {form.formState.isSubmitting ? (
                  <ButtonSpinner />
                ) : (
                  "Add New Batch"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AddBatchSheet;
