import SectionCard from "@/components/TeacherDashboard/SectionCard";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getSections } from "../../services/api/sections";

export default function TeacherDashboardMain() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const getSEctions = async () => {
      const secs = await getSections();
      console.log("sections", secs.sections);
      setSections(secs.sections);
    };
    getSEctions();
  }, []);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-10 bg-background">
        <h2 className="text-2xl font-semibold mb-4">Your Sections</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <SectionCard
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
