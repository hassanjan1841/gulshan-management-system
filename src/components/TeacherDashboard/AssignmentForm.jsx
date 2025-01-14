'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// import { cn } from "@/lib/utils"
import { MultipleImageUpload } from './MultipleImageUpload'
import ButtonSpinner from '../ButtonSpinner'

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pictures: z.array(z.instanceof(File)).optional(),
})

export default function AssignmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      pictures: [],
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    try {
      // Here you would typically send the form data to your backend
      console.log("values>>", values)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Assignment created successfully!')
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error creating the assignment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form} >
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

<FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date);
                      }
                    }}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the due date for the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
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

        <Button type="submit" className='w-full' disabled={isSubmitting}>
          {isSubmitting ? <ButtonSpinner/> : "Create Assignment"}
        </Button>
      </form>
    </Form>
  )
}

