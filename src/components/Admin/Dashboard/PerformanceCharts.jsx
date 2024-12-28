import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const databaseData = [
  {
    name: "Jan",
    quizScore: 65,
    assignmentScore: 70,
    batch: "Batch A",
    course: "Web Development",
  },
  {
    name: "Feb",
    quizScore: 68,
    assignmentScore: 72,
    batch: "Batch A",
    course: "Web Development",
  },
  {
    name: "Mar",
    quizScore: 75,
    assignmentScore: 78,
    batch: "Batch B",
    course: "UI/UX",
  },
  {
    name: "Apr",
    quizScore: 80,
    assignmentScore: 82,
    batch: "Batch B",
    course: "UI/UX",
  },
  {
    name: "May",
    quizScore: 85,
    assignmentScore: 88,
    batch: "Batch C",
    course: "Data Science",
  },
  {
    name: "Jun",
    quizScore: 87,
    assignmentScore: 90,
    batch: "Batch C",
    course: "Data Science",
  },
  {
    name: "Jul",
    quizScore: 90,
    assignmentScore: 92,
    batch: "Batch D",
    course: "Machine Learning",
  },
  {
    name: "Aug",
    quizScore: 92,
    assignmentScore: 94,
    batch: "Batch D",
    course: "Machine Learning",
  },
];

const performanceData = {
  "Last 6 Months": databaseData.slice(-6),
  "Last 3 Months": databaseData.slice(-3),
  "Last Month": databaseData.slice(-1),
  Batches: [...new Set(databaseData.map((item) => item.batch))].map(
    (batch) => ({
      name: batch,
      quizScore:
        databaseData
          .filter((item) => item.batch === batch)
          .reduce((acc, item) => acc + item.quizScore, 0) /
        databaseData.filter((item) => item.batch === batch).length,
      assignmentScore:
        databaseData
          .filter((item) => item.batch === batch)
          .reduce((acc, item) => acc + item.assignmentScore, 0) /
        databaseData.filter((item) => item.batch === batch).length,
    })
  ),
  Courses: [...new Set(databaseData.map((item) => item.course))].map(
    (course) => ({
      name: course,
      quizScore:
        databaseData
          .filter((item) => item.course === course)
          .reduce((acc, item) => acc + item.quizScore, 0) /
        databaseData.filter((item) => item.course === course).length,
      assignmentScore:
        databaseData
          .filter((item) => item.course === course)
          .reduce((acc, item) => acc + item.assignmentScore, 0) /
        databaseData.filter((item) => item.course === course).length,
    })
  ),
};

export default function PerformanceCharts() {
  const [selectedMonth, setSelectedMonth] = useState("Last 6 Months");
  const [selectedBatch, setSelectedBatch] = useState("Batches");
  const [selectedCourse, setSelectedCourse] = useState("Courses");

  const filterData = () => {
    let data = performanceData[selectedMonth] || [];

    if (selectedBatch !== "Batches") {
      data = data.filter((item) => item.batch === selectedBatch);
    }

    if (selectedCourse !== "Courses") {
      data = data.filter((item) =>
        item.course.toLowerCase().includes(selectedCourse.toLowerCase())
      );
    }
    console.log(data);
    return data;
  };

  return (
    <Card>
      <CardHeader className="w-full">
        <CardTitle className="mb-2">Student Performance Overview</CardTitle>
        <div className="flex max-w-[500px]  w-full ">
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="w-full border rounded p-2">
              <SelectValue placeholder="Select a filter">
                {selectedMonth}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={selectedBatch}
            onValueChange={(value) => setSelectedBatch(value)}
          >
            <SelectTrigger className="w-full border rounded p-2">
              <SelectValue placeholder="Select a batch">
                {selectedBatch}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Batches</SelectLabel>
                <SelectItem value="Batches">All Batches</SelectItem>
                {performanceData.Batches.map((batch) => (
                  <SelectItem key={batch.name} value={batch.name}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={selectedCourse}
            onValueChange={(value) => setSelectedCourse(value)}
          >
            <SelectTrigger className="w-full border rounded p-2">
              <SelectValue placeholder="Select a course">
                {selectedCourse}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                <SelectItem value="Courses">All Courses</SelectItem>
                {performanceData.Courses.map((course) => (
                  <SelectItem key={course.name} value={course.name}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filterData().length > 0 ? (
          <ChartContainer
            config={{
              quizScore: {
                label: "Quiz Score",
                color: "hsl(var(--chart-1))",
              },
              assignmentScore: {
                label: "Assignment Score",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filterData()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quizScore" fill="var(--color-quizScore)" />
                <Bar
                  dataKey="assignmentScore"
                  fill="var(--color-assignmentScore)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500 text-lg">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
