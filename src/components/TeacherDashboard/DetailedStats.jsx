import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DetailedStats({ students }) {
  const totalStudents = students.length;
  const totalAssignments = students[0]?.totalAssignments || 0;
  const averageCompletion =
    (students.reduce(
      (acc, student) =>
        acc + student.assignmentsCompleted / student.totalAssignments,
      0
    ) /
      totalStudents) *
    100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detailed Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">
              Total Students: {totalStudents}
            </p>
            <p className="text-sm font-medium">
              Total Assignments: {totalAssignments}
            </p>
            <p className="text-sm font-medium">
              Average Assignment Completion: {averageCompletion.toFixed(2)}%
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Student Assignment Progress
            </h3>
            {students.map((student) => (
              <div key={student.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{student.name}</span>
                  <span>
                    {student.assignmentsCompleted}/{student.totalAssignments}
                  </span>
                </div>
                <Progress
                  value={
                    (student.assignmentsCompleted / student.totalAssignments) *
                    100
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
