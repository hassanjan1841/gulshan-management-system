import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const performanceData = {
  "Last 6 Months": [
    { name: "Jan", quizScore: 65, assignmentScore: 70 },
    { name: "Feb", quizScore: 68, assignmentScore: 72 },
    { name: "Mar", quizScore: 75, assignmentScore: 78 },
    { name: "Apr", quizScore: 80, assignmentScore: 82 },
    { name: "May", quizScore: 85, assignmentScore: 88 },
    { name: "Jun", quizScore: 87, assignmentScore: 90 },
  ],
  "Last 3 Months": [
    { name: "Apr", quizScore: 80, assignmentScore: 82 },
    { name: "May", quizScore: 85, assignmentScore: 88 },
    { name: "Jun", quizScore: 87, assignmentScore: 90 },
  ],
  "Last Month": [{ name: "Jun", quizScore: 87, assignmentScore: 90 }],
  Batches: [
    { name: "Batch A", quizScore: 75, assignmentScore: 80 },
    { name: "Batch B", quizScore: 70, assignmentScore: 75 },
    { name: "Batch C", quizScore: 85, assignmentScore: 88 },
    { name: "Batch D", quizScore: 78, assignmentScore: 82 },
  ],
  Courses: [
    { name: "Web Development", quizScore: 82, assignmentScore: 85 },
    { name: "UI/UX", quizScore: 78, assignmentScore: 80 },
    { name: "Data Science", quizScore: 75, assignmentScore: 78 },
    { name: "Machine Learning", quizScore: 70, assignmentScore: 72 },
  ],
};
export default function Charts() {
  const [selectedFilter, setSelectedFilter] = useState("Last 6 Months");

  return (
    <Card>
      <CardHeader className="w-full">
        <CardTitle>Performance Overview</CardTitle>
        <div className="flex max-w-[500px] w-full ">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border rounded p-2"
          >
            <optgroup label="Months">
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last Month">Last Month</option>
            </optgroup>
            <optgroup label="Batches">
              <option value="Batches">All Batches</option>
              {performanceData.Batches.map((batch) => (
                <option key={batch.name} value={batch.name}>
                  {batch.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Courses">
              <option value="Courses">All Courses</option>
              {performanceData.Courses.map((course) => (
                <option key={course.name} value={course.name}>
                  {course.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </CardHeader>
      <CardContent>
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
            <BarChart data={performanceData[selectedFilter]}>
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
      </CardContent>
    </Card>
  );
}
