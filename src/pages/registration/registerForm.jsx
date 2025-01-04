import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Country,
  gender,
  cities,
  Degries,
  haveALaptops,
  courses,
  proficiency,
} from "@/lib/section";
import { DatePicker } from "@/components/datePicker";
import { useState } from "react";
import ButtonSpinner from "../../components/ButtonSpinner";

const formSchema = z.object({
  country: z.string().min(2).max(120),
  city: z.string().min(2).max(120),
  course: z.string().min(2).max(120),
  studentProficiency: z.string().min(2).max(120),
  name: z.string().min(2).max(50),
  fatherName: z.string().min(2).max(50),
  email: z.string(),
  number: z.string(),
  cnic: z.string(),
  fatherCnic: z.string(),
  dob: z.string(),
  gender: z.string(),
  address: z.string(),
  degree: z.string(),
  haveALaptop: z.string(),
  image: z.any().refine((file) => file instanceof File, {
    message: "Please upload a valid file.",
  }),
});

export default function RegisterForm({ session }) {
  // const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      city: "",
      course: "",
      studentProficiency: "",
      name: "",
      fatherName: "",
      email: "",
      number: "",
      cnic: "",
      fatherCnic: "",
      dob: "",
      gender: "",
      address: "",
      degree: "",
      haveALaptop: "",
      image: "",
    },
  });
  async function onSubmit(values) {
    console.log("values>>", values);
  }
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="flex max-w-[1100px] justify-center items-center bg-white  text-black p-10 gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="grid sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-2 gap-5 ">
            <FormField
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    Select Country
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full p-5">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Country.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* City Selection */}
            <FormField
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    Select City
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full p-5">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Course Selection*/}
            <div>
              <FormField
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Select Course or Event
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full p-5">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Computer Proficiency */}
            <div>
              <FormField
                name="studentProficiency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Computer Proficiency
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full p-5">
                        <SelectValue placeholder="Select Proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {proficiency.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* name section */}
            <div>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Father Name */}
            <div>
              <FormField
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Father Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Your Father name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Your Email Address"
                      className="p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    Mobile Number{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-5"
                      placeholder="e.g +923123456789"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">CNIC</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g 420110-5875269-3"
                      className="p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fatherCnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    {"Fathes's"} CNIC (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g 420110-5875269-3"
                      className="p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dob"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    Date of Birth
                  </FormLabel>
                  <br />
                  <DatePicker
                    selected={field.value} // Bind the value to form state
                    onChange={(date) => field.onChange(date)} // Update form state on change
                    className="p-5 w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full p-5">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {gender.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col w-full gap-3">
            <div>
              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Address
                    </FormLabel>
                    <Textarea
                      placeholder="Enter your address"
                      {...field}
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Enter Your Last Degree
                    </FormLabel>
                    <FormControl>
                      <Controller
                        name="degree"
                        control={form.control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange} // Bind value change to form state
                            value={field.value} // Use value from form state
                          >
                            <SelectTrigger className="mx-auto w-full p-5">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                {Degries.map((degree) => (
                                  <SelectItem
                                    className="bg-white text-black"
                                    key={degree}
                                    value={degree}
                                  >
                                    {degree}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Controller
                name="haveALaptop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-landing-button"
                      htmlFor="haveALaptop"
                    >
                      Do you have a laptop?
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange} // Bind value change to form state
                        value={field.value} // Use value from form state
                      >
                        <SelectTrigger className="mx-auto w-full p-5">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            {haveALaptops.map((haveALaptop) => (
                              <SelectItem
                                className="bg-white text-black"
                                key={haveALaptop}
                                value={haveALaptop}
                              >
                                {haveALaptop}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mt-2">
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="picture"
                    className="bg-gray-200 w-24 h-24 border border-dashed flex items-center justify-center rounded-md cursor-pointer text-landing-button"
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full object-cover h-full"
                      />
                    ) : (
                      "Picture"
                    )}
                  </FormLabel>
                  <Input
                    id="picture"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // setSelectedImage(file); // Update file state
                        field.onChange(file); // Bind file to form state

                        // Create a preview
                        const reader = new FileReader();
                        reader.onload = () => {
                          setSelectedImage(reader.result); // Set preview data URL
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <li>
              1. I hereby, solemnly declare that the data and facts mentioned
              herein are true and correct to the best of my knowledge. Further,
              I will abide by all the established and future regulations and
              policies of SWIT
            </li>
            <li>
              2. hereby accept the responsibilities of good conduct and
              guarantee that I will not be involved in any other activity,
              political or ethical, but learning during my stay in the program.
            </li>
            <li>
              3. Defiance will render my admission canceled at any point in
              time.
            </li>
            <li>
              4. Upon completion, of the course, I will complete the required
              project by SWIT.
            </li>
            <li>
              5. {"It's"} mandatory for female students to wear abaya/hijab in
              the class
            </li>
          </div>

          <Button
            type="submit"
            className="bg-registration-btn w-full text-white  font-bold sm:w-full hover:bg-landing-button "
          >
            {form.formState.isSubmitting ? <ButtonSpinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
