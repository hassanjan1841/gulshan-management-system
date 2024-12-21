import React from "react";
import { Eye, Edit } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const AdminStudents = () => {
  const fetchStudents = async (page = 0, pageSize = 12) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalItems = 50;
    const data = Array.from({ length: pageSize }, (_, i) => ({
      id: page * pageSize + i + 1,
      name: `Student ${page * pageSize + i + 1}`,
      picture: `https://cdn5.vectorstock.com/i/1000x1000/52/54/male-student-graduation-avatar-profile-vector-12055254.jpg`,
      course: `Course ${Math.floor(Math.random() * 5) + 1}`,
      batch: `Batch ${Math.floor(Math.random() * 4) + 1}`,
      section: `Section ${String.fromCharCode(
        65 + Math.floor(Math.random() * 3)
      )}`,
      teacher: `Teacher ${Math.floor(Math.random() * 3) + 1}`,
      fatherName: `Father Name ${i + 1}`,
      age: 18 + Math.floor(Math.random() * 7),
      cnic: `12345-678901-${i}`,
      isEliminated: Math.random() < 0.1,
      isPassed: Math.random() > 0.5,
      education: "Bachelor's Degree",
    }));

    return {
      data,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  };

  const [students, setStudents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      const { data } = await fetchStudents();
      setStudents(data);
      setIsLoading(false);
    };
    loadStudents();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Students</h1>
      {isLoading ? (
        <div className="text-center">Loading students...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card
              key={student.id}
              className="shadow-lg border border-border hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={student.picture}
                    alt={student.name}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div>
                    <CardTitle className="text-lg text-primary font-semibold">
                      {student.name}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-gray-500">
                        {student.section}
                      </Badge>
                      <Badge variant="secondary">{student.course}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Batch:</strong> {student.batch}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Teacher:</strong> {student.teacher}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" /> View Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="max-w-[400px] w-full bg-background pt-10"
                  >
                    <SheetHeader>
                      <div className="flex flex-col items-start space-y-4 border border-secondary/90 p-6  rounded-xl  bg-secondary/30 ">
                        {/* Profile Picture */}
                        <img
                          src={student.picture}
                          alt={student.name}
                          className="w-20 h-20 rounded-full border-2 border-primary"
                        />
                        {/* Name and Age */}
                        <div className="text-center">
                          <SheetTitle className="text-xl font-bold">
                            {student.name}
                          </SheetTitle>
                          <p className="text-muted-foreground flex gap-2 text-sm">
                            <span>Age:</span>
                            <br />
                            <Badge>{student.age}</Badge>
                          </p>
                        </div>
                      </div>
                    </SheetHeader>

                    <div className="mt-6 space-y-4 border p-6 rounded-xl bg-secondary/30 border-secondary/90">
                      <p className="text-sm">
                        <span className="text-muted-foreground">
                          {"Father's"} Name:
                        </span>
                        <br />
                        <Badge variant="secondary">{student.fatherName}</Badge>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">CNIC:</span>
                        <br />
                        <Badge variant="outline">{student.cnic}</Badge>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">
                          Education:
                        </span>
                        <br />
                        <Badge variant="secondary">{student.education}</Badge>
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          student.isPassed ? "text-green-600" : "text-red-300"
                        }`}
                      >
                        <span>Status:</span>
                        <br />
                        <Badge
                          variant={student.isPassed ? "outline" : "destructive"}
                        >
                          {student.isPassed ? "Passed" : "Not Passed"}
                        </Badge>
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          student.isEliminated
                            ? "text-red-300"
                            : "text-green-600"
                        }`}
                      >
                        <span>Eliminated:</span>
                        <br />
                        <Badge
                          variant={
                            student.isEliminated ? "destructive" : "outline"
                          }
                        >
                          {student.isEliminated ? "Yes" : "No"}
                        </Badge>
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button variant="ghost">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
