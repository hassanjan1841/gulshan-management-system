"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Country, gender, cities, Degries, haveALaptops, courses, proficiency, } from "../lib/section";

import { DatePicker } from "./datePicker";



const formSchema = z.object({
  country: z.string().min(2).max(120),
  city: z.string().min(2).max(120),
  course: z.string().min(2).max(120),
  studentProficiency: z.string().min(2).max(120),
  name: z.string().min(2).max(50),
  fatherName: z.string().min(2).max(50),
  email: z.string().email,
  number: z.string(),
  cnic: z.string(),
  fcnic: z.string(),
  fatherCnic: z.string(),
  dob: z.string(),
  gender: z.string(),
  address: z.string(),
  degree: z.string(),
  haveALaptop: z.string(),
  image: z.string(),
});

export default function ApplyForm({ session }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      city: "",
      course: "",
      studentProficiency: "",
      name: "",
      atherName: "",
      email: "",
      number: "",
      cnic: "",
      atherCnic: "",
      dob: "",
      gender: "",
      address: "",
      degree: "",
      haveALaptop: "",
      image: "",
    },
  });
  async function onSubmit(values) {
    console.log(values);
    values.preventDefault()
    const response = await addRequest(values);
    console.log("response=>", response)
    if (response.error) {
      form.reset();
      toast({
        title: "Your Application is submitted",
        description: "You will be informed by email in 3 working Days."
      })
    }
  }

  return (
    <div className="flex justify-center items-center bg-white  text-black p-10 gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="grid sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-2 gap-5">
            <div >
              <Select >

                <FormLabel htmlFor="picture" className="text-blue-500">Select Country</FormLabel>

                <SelectTrigger className="  mx-auto w-full p-5 text-gray-400">
                  <SelectValue placeholder="Select Country " />
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
            </div>

            <div>
              <Select>
                <FormLabel htmlFor="picture" className="text-blue-500">Select City</FormLabel>
                <SelectTrigger className="  mx-auto w-full p-5  text-gray-400">
                  <SelectValue placeholder="Select " />
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
            </div>

            <div>
              <Select>
                <FormLabel htmlFor="picture" className="text-blue-500">Select Course or Event</FormLabel>
                <SelectTrigger className="  mx-auto w-full p-5 text-gray-400">
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
            </div>

            <div>
              <Select>
                <FormLabel htmlFor="picture" className="text-blue-500">Select Your Computer Proficiency</FormLabel>
                <SelectTrigger className="  mx-auto w-full p-5 text-gray-400">
                  <SelectValue placeholder="Select " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {proficiency.map((proficiency) => (
                      <SelectItem key={proficiency} value={proficiency}>
                        {proficiency}
                      </SelectItem>

                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500 "> Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name" {...field} className=" p-5"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fatherName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500" >Father's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Father Name" className='p-5' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email Address" className='p-5' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Mobile Number </FormLabel>
                  <FormControl>
                    <Input type="number" {...field}  className='p-5'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cnic"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">CNIC</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g 420110-5875269-3" className='p-5' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fcnic"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500"> Fathes's CNIC (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g 420110-5875269-3" className='p-5' {...field} />
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
                  <FormLabel className="text-blue-500">Date of Birth</FormLabel>
                  <div >
                    <DatePicker className="bg-white p-5"/>
                  </div>
                  <FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500 ">Select Gender </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" className='p-5' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {gender.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
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
            <div className=" flex flex-col w-full gap-3">
              <div>
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-500">Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Address" {...field} className="w-full mx-auto" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div>
              <FormField
                name="degree"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-500">Enter Your last Degree? </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="mx-auto w-full">
                          <SelectValue placeholder="Select " className='p-5'/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Degries.map((degree) => (
                              <SelectItem key={degree} value={degree}>
                                {degree}
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
              <div>
                <Select>
                  <FormLabel htmlFor="picture " className="text-blue-500">Do you have a laptop?</FormLabel>
                  <SelectTrigger className="mx-auto w-full ">
                    <SelectValue placeholder="Select" className='p-5' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {haveALaptops.map((haveALaptop) => (
                        <SelectItem key={haveALaptop} value={haveALaptop}>
                          {haveALaptop}
                        </SelectItem>

                      ))}

                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
              <div className="grid w-full max-w-sm items-center gap-2 mt-2" >
                <FormLabel htmlFor="picture" className="text-blue-500">Picture</FormLabel>
                <Input id="picture" type="file" placeholder="Upload Image " className="bg-gray-200 w-24 h-24  border-dashed" />
              </div>
          <div className="flex flex-col">
            <li>
              1. I hereby, solemnly declare that the data and facts mentioned herein are true and correct to the best of my knowledge. Further, I will abide by all the established and future regulations and policies of SWIT
            </li>
            <li>2.  hereby accept the responsibilities of good conduct and guarantee that I will not be involved in any other activity, political or ethical, but learning during my stay in the program.
            </li>
            <li>3. Defiance will render my admission canceled at any point in time.
            </li>
            <li>4. Upon completion, of the course, I will complete the required project by SWIT.
            </li>
            <li>5. It's mandatory for female students to wear abaya/hijab in the class
            </li>



          </div>


          <Button type="submit" className="bg-blue-500 w-full text-white  font-bold sm:w-full bg-blue-500 hover:bg-gray-500  " >
            {form.formState.isSubmitting ? "Loading" : "Submit"}

          </Button>
        </form>
      </Form >
    </div>
  )
}