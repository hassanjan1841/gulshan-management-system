import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export default function SectionCard({ title, id, courseTitle, totalStudents }) {
  return (
    <Link to={`/teacher/section/${id}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-md text-foreground mb-2">Course: {courseTitle}</p>
          <p className="text-sm text-muted-foreground">
            Total Students: {totalStudents}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
