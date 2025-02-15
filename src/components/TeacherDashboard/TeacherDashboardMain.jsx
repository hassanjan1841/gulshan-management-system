import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getTeacherSections } from "../../services/api/sections";
import Loader from "../Loader";
import { getUserById } from "../../services/api/user";
import Cookies from "js-cookie";
import TeacherInfo from "./TeacherInfo";
import SectionInfoCard from "./SectionInfoCard";
import SectionCard from "./SectionCard";

export default function TeacherDashboardMain() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacherInDashboard, setTeacherInDashboard] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      const teacherInDashboard = await getUserById(Cookies.get("token"));
      setTeacherInDashboard(teacherInDashboard);
      console.log("teacherInDashboard", teacherInDashboard);
    };
    fetchTeacher();
  }, []);

  useEffect(() => {
    const getSEctions = async () => {
      try {
        const myId = "678295d075ddbe69c232a8dd";
        setLoading(true);
        const secs = await getTeacherSections(myId);
        console.log("my sections", secs);
        setSections(secs.teacherSections);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getSEctions();
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      <div className="flex flex-col gap-6 p-6 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TeacherInfo teacher={teacherInDashboard} />
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <SectionInfoCard title={"Total Students"} value={"640"} />
              <SectionInfoCard title={"Total Section"} value={"7"} />
              <SectionInfoCard title={"Total Batch"} value={"4"} />
              <SectionInfoCard title={"Total Course"} value={"2"} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-10 bg-background">
        <h2 className="text-2xl font-semibold mb-4">Your Sections</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sections?.map((section) => (
            <SectionCard
              section={section}
              key={section.title}
              title={section.title}
              id={section._id}
              courseTitle={section.course.title}
              totalStudents={section.totalStudents}
            />
          ))}
        </div>
      </div>
    </>
  );
}
