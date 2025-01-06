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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { useState } from "react";
import ButtonSpinner from "../../components/ButtonSpinner";
import { DatePickerWithYearDropdown } from "./DatePickerWithYearDropdown";
import { createUser } from "../../services/api/user";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
const formSchema = z.object({
  country: z.string().min(2).max(120),
  city: z.string().min(2).max(120),
  course: z.string().min(2).max(120),
  computer_proficiency: z.string().min(2).max(120),
  full_name: z.string().min(2).max(50),
  father_name: z.string().min(2).max(50),
  email: z.string(),
  phone: z.string(),
  cnic: z.string(),
  father_cnic: z.string(),
  date_of_birth: z.date(),
  gender: z.string(),
  address: z.string(),
  degree: z.string(),
  has_laptop: z.string(),
  profilePic: z.any().refine((file) => file instanceof File, {
    message: "Please upload a valid file.",
  }),
});

let uploadPic = (image) => {
  console.log("image>>" , image);
  
  return new Promise((resolve, reject) => {
      let files = image
      console.log("files>>", files);
      const randomNum = Math.random().toString().slice(2)
      const storageRef = ref(storage, `images/${randomNum}`);
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on('state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                  case 'paused':
                      console.log('Upload is paused');
                      break;
                  case 'running':
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              reject(error.message)
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  resolve(downloadURL)
              });
          }
      );
  })

}
export default function RegisterForm({ session }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      city: "",
      course: "",
      computer_proficiency: "",
      full_name: "",
      father_name: "",
      email: "",
      phone: "",
      cnic: "",
      father_cnic: "",
      date_of_birth: "",
      gender: "",
      address: "",
      degree: "",
      has_laptop: "",
      profilePic: "",
    },
  });

  async function onSubmit(values) {
    values.role = "student";
    values.course = "675eaaf5d42dfcca480d93f2";
    values.age = 27;
    try {
    let formattedValues;
    const formattedDate = values.date_of_birth
    ? new Date(values.date_of_birth).toISOString().split("T")[0] : null;
    let res = await uploadPic(values.profilePic)
      values.profilePic = res
      formattedValues = {
        ...values,
        date_of_birth: formattedDate,
      };
      const newUser = await createUser(formattedValues);
      console.log("newUser>", newUser);
    } catch (error) {
      console.log("error in new uSer>", error);
    }
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

                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {Country.map((country) => (
                          <SelectItem
                            className="bg-white text-black"
                            key={country}
                            value={country}
                          >
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

                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {cities.map((city) => (
                          <SelectItem
                            className="bg-white text-black"
                            key={city}
                            value={city}
                          >
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

                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {courses.map((course) => (
                            <SelectItem
                              className="bg-white text-black"
                              key={course}
                              value={course}
                            >
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
                name="computer_proficiency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Computer Proficiency
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full p-5">
                        <SelectValue placeholder="Select Proficiency" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {proficiency.map((item) => (
                            <SelectItem
                              className="bg-white text-black"
                              key={item}
                              value={item}
                            >
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
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your name"
                        className="border-none shadow-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Father Name */}
            <div>
              <FormField
                name="father_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-landing-button">
                      Father Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Father name"
                        className="p-5 shadow-md border-none"
                      />
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
                      className="p-5 shadow-md border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    Mobile Number{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-5 shadow-md border-none"
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
                      className="p-5 shadow-md border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="father_cnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-landing-button">
                    {"Fathes's"} CNIC (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g 420110-5875269-3"
                      className="p-5 shadow-md border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="date_of_birth"
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
                    className="p-5 w-full h-10 border-none shadow-md outline-none rounded-md"
                  />
                </div>
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

                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {gender.map((item) => (
                          <SelectItem
                            className="bg-white text-black"
                            key={item}
                            value={item}
                          >
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
                name="has_laptop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-landing-button"
                      htmlFor="has_laptop"
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
              name="profilePic"
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
