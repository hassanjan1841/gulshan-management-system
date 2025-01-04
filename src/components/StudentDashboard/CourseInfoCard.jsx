import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, GraduationCap } from "lucide-react";

export default function CourseCard({ course }) {
  const { id, title, duration, status, batch, city, campus } = course;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <Badge variant={status === "Enrolled" ? "success" : "secondary"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{batch}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {city}, {campus}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
