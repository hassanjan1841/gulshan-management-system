import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { getSingleCourse } from "../../services/api/courses";
import { getAllUsers } from "../../services/api/user";
import Loader from "../Loader";
import { getBatchesByCourseId } from "../../services/api/batches";
import { useToast } from "../../hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CourseDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  console.log("id in course details=>", id);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([
    { _id: 1, full_name: "Alice Johnson", email: "alice@example.com" },
    { _id: 2, full_name: "Bob Williams", email: "bob@example.com" },
    { _id: 3, full_name: "Charlie Brown", email: "charlie@example.com" },
  ]);
  const [teachers, setTeachers] = useState([
    { _id: 1, full_name: "John Doe", specialization: "Frontend Development" },
    { _id: 2, full_name: "Jane Smith", specialization: "Backend Development" },
  ]);
  const [batches, setBatches] = useState([
    {
      _id: 1,
      title: "Morning Batch",
      time: "9:00 AM - 12:00 PM",
      course: {
        title: "Python",
      },
    },
    {
      _id: 2,
      title: "Afternoon Batch",
      time: "2:00 PM - 5:00 PM",
      course: {
        title: "Python",
      },
    },
    {
      _id: 3,
      title: "Evening Batch",
      time: "7:00 PM - 10:00 PM",
      course: {
        title: "Python",
      },
    },
  ]);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const courseData = await getSingleCourse(id);
        console.log("courseData", courseData);
        setCourse(courseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course", error);
        toast({
          variant: "destructive",
          title: error.message ? "Server Error" : "Something Went Wrong",
          description: error?.response?.data?.message
            ? error.response.data.message
            : error?.message,
        });
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      if (tab === "students") {
        const response = await getAllUsers("student");
        setStudents(response.users);
        console.log("students", response);
      } else if (tab === "teachers") {
        const response = await getAllUsers("teacher");
        setTeachers(response.users);
        console.log("teachers", response);
      } else if (tab === "batches") {
        const response = await getBatchesByCourseId(id);
        setBatches(response.batches);
        console.log("batches", response);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      toast({
        variant: "destructive",
        title: error.message ? "Server Error" : "Something Went Wrong",
        description: error?.response?.data?.message
          ? error.response.data.message
          : error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">{course?.title}</h1>
      <p className="text-muted-foreground mb-8">{course?.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Students Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{students?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{teachers?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{batches?.length}</p>
          </CardContent>
        </Card>
      </div>
      <Tabs
        defaultValue="details"
        onValueChange={(value) => fetchData(value)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary">
                    Course Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground mb-4">
                    {course?.description}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong className="text-primary">Duration:</strong>{" "}
                    {course?.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Level:</strong>{" "}
                    {course?.level}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="students">
          {loading ? (
            <Loader />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="">Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {students?.map((student) => (
                    <li key={student._id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {/* use the avatar from the shadcn components */}
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={
                                student.profilePic
                                  ? student.profilePic
                                  : "/placeholder.svg"
                              }
                              className="object-cover"
                              alt="Profile"
                            />
                            <AvatarFallback className="text-foreground bg-muted">
                              {student.full_name[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-primary">
                            {student.full_name}
                          </p>
                          <p className="text-sm truncate text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="teachers">
          {loading ? (
            <Loader />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="">Course Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {teachers.map((teacher) => (
                    <li key={teacher._id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={
                                teacher.profilePic
                                  ? teacher.profilePic
                                  : "/placeholder.svg"
                              }
                              className="object-cover"
                              alt="Profile"
                            />
                            <AvatarFallback className="text-foreground bg-muted">
                              {teacher.full_name[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-primary">
                            {teacher.full_name}
                          </p>
                          {/* <p className="text-sm truncate text-muted-foreground">
                          {teacher.specialization}
                        </p> */}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="batches">
          {loading ? (
            <Loader />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="">Available Batches</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {batches?.map((batch) => (
                    <li key={batch._id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center font-bold h-16 w-16 rounded-full bg-muted text-center leading-8 text-foreground">
                            {"B"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-primary">
                            {batch.title}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetails;
