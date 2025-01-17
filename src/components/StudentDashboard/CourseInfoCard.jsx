import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, GraduationCap } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
            {course?.course?.title}
          </CardTitle>
          <Badge variant={status === "Enrolled" ? "success" : "secondary"}>
            {course?.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{course?.course?.duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{course?.batch?.title}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {course?.batch?.branch?.city}, {course?.batch?.branch?.campus}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
