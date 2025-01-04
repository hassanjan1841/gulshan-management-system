import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeacherInfo({ teacher }) {
  console.log("teacher", teacher);
  return (
    <Card className="w-full h-full flex items-start">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar className="w-48 h-48">
            <AvatarImage
              src={teacher?.profilePic}
              className="object-cover"
              alt={name}
            />
            <AvatarFallback>
              {teacher?.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{teacher?.full_name}</h2>
            <p className="text-muted-foreground">{"React Developer"}</p>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
