import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const teacherServices = [
  {
    name: "Web and App Development",
    batches: [
      {
        name: "Batch 1",
        startDate: "2023-09-01",
        endDate: "2023-12-15",
        sections: [
          { time: "7 to 9", days: ["Mon", "Wed", "Fri"] },
          { time: "11 to 1", days: ["Tue", "Thu"] },
        ],
      },
      {
        name: "Batch 2",
        startDate: "2024-01-10",
        sections: [
          { time: "2 to 4", days: ["Mon", "Wed"] },
          { time: "5 to 7", days: ["Tue", "Thu", "Sat"] },
        ],
      },
    ],
  },
  {
    name: "Data Science Fundamentals",
    batches: [
      {
        name: "Batch A",
        startDate: "2023-11-15",
        endDate: "2024-03-20",
        sections: [
          { time: "9 to 11", days: ["Tue", "Thu", "Sat"] },
        ],
      },
    ],
  },
]

export default function TeacherServices() {
  return (
    <Card className="w-full max-w-3xl mx-auto my-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Services</CardTitle>
        <CardDescription className='text-md'>Your kind services in our institution</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {teacherServices.map((course, courseIndex) => (
            <AccordionItem value={`course-${courseIndex}`} key={courseIndex}>
              <AccordionTrigger className="text-lg font-semibold">
                {course.name}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.batches.map((batch, batchIndex) => (
                    <AccordionItem value={`batch-${courseIndex}-${batchIndex}`} key={batchIndex}>
                      <AccordionTrigger className="text-md font-medium">
                        {batch.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Start Date:</span>
                            <Badge variant="secondary">{batch.startDate}</Badge>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">End Date:</span>
                            {batch.endDate ? (
                              <Badge variant="secondary">{batch.endDate}</Badge>
                            ) : (
                              <Badge variant="outline">Ongoing</Badge>
                            )}
                          </div>
                        </div>
                        {batch.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold">Section {sectionIndex + 1}:</span>
                              <Badge variant="secondary">{section.time}</Badge>
                            </div>
                            <div className="flex gap-2">
                              {section.days.map((day, dayIndex) => (
                                <Badge key={dayIndex} variant="outline">{day}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

