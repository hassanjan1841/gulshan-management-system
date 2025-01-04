import Header from "@/components/Header";
import TeacherInfo from "./TeacherInfo";
import SectionInfoCard from "./SectionInfoCard";
import DetailedStats from "./DetailedStats";
import { Book, Users, Calendar, GraduationCap } from "lucide-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSectionById } from "../../services/api/sections";
import Loader from "../Loader";

export default function TeacherDashboardMain() {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(false);

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
      try {
        setLoading(true);
        const data = await getSectionById(id);
        setSection(data);
        console.log("section", section);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    gettingSections();
  }, [id]);
  if (loading) return <Loader />;
  return (
    <>
      <div className="flex flex-col gap-6 p-6 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TeacherInfo teacher={section?.teacher} />
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <SectionInfoCard title={"Section"} value={section?.title} />
              <SectionInfoCard
                title={"Course"}
                value={section?.course?.title}
              />
              <SectionInfoCard title={"Batch"} value={section?.batch?.title} />
              <SectionInfoCard
                title={"Total Students"}
                value={section?.title}
              />
            </div>
          </div>
        </div>
        <DetailedStats students={students} />
      </div>
    </>
  );
}
