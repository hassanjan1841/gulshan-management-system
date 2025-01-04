import Header from "@/components/Header";
import TeacherInfo from "./TeacherInfo";
import CourseInfoCard from "./CourseInfoCard";
import DetailedStats from "./DetailedStats";
import { Book, Users, Calendar, GraduationCap } from "lucide-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSectionById } from "../../services/api/sections";

export default function TeacherDashboardMain() {
  const [section, setSection] = useState(null);
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);

  const teacherInfo = {
    name: "John Doe",
    age: 35,
    specialization: "React Developer",
    description:
      "Experienced web developer with a passion for creating interactive and responsive user interfaces using React and related technologies.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  };

  const courseInfo = [
    {
      title: "Course",
      value: "Web and Mobile App Development",
      icon: <Book className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Section",
      value: "MWF - 07:00-09:00",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Batch",
      value: "Batch 11",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Students",
      value: "25",
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  const students = [
    {
      id: "1",
      name: "Alice Johnson",
      assignmentsCompleted: 8,
      totalAssignments: 10,
    },
    {
      id: "2",
      name: "Bob Smith",
      assignmentsCompleted: 7,
      totalAssignments: 10,
    },
    {
      id: "3",
      name: "Charlie Brown",
      assignmentsCompleted: 9,
      totalAssignments: 10,
    },
    {
      id: "4",
      name: "Diana Ross",
      assignmentsCompleted: 6,
      totalAssignments: 10,
    },
    {
      id: "5",
      name: "Ethan Hunt",
      assignmentsCompleted: 10,
      totalAssignments: 10,
    },
  ];
  const { id } = useParams();
  useEffect(() => {
    const gettingSections = async () => {
      const data = await getSectionById(id);
      setSection(data);
      setCourse(data.course);
      setTeacher(data.teacher);
      console.log(section, course, teacher);
    };
    gettingSections();
  }, [id]);
  return (
    <>
      <div className="flex flex-col gap-6 p-6 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TeacherInfo teacher={teacher} />
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {courseInfo.map((info, index) => (
                <CourseInfoCard key={index} {...info} />
              ))}
            </div>
          </div>
        </div>
        <DetailedStats students={students} />
      </div>
    </>
  );
}
