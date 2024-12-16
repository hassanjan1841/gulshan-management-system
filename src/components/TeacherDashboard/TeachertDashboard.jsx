import { FolderClock, GraduationCap, NotebookPen } from "lucide-react";
import DashboardInfoCard from "../dashboardInfoCard";
import StatCard from "./TeacherStatCard";

export default function TeacherDashboard() {
  const stats = [
    { title: "Total Students", value: 55 },
    { title: "Completed Modules", value: 2 },
    { title: "Remaining Modules", value: 2 },
    { title: "Total Quizzes", value: 3 },
    { title: "Total Assignment", value: 6 },
  ]
  return (
    <>
      <div className="bg-muted/20 p-5 flex  items-center justify-between flex-wrap gap-5 max-sm:justify-center ">
        {/* <div className=""> */}
        <DashboardInfoCard
          icon={<GraduationCap />}
          detail={{ title: "Instructor", name: "Imran Shah" }}
        />
        <DashboardInfoCard
          icon={<GraduationCap />}
          iconClassName={"bg-[#C37955] text-primary-foreground"}
          detail={{ title: "Batch", name: "11" }}
        />
        <DashboardInfoCard
          icon={<NotebookPen />}
          iconClassName={"bg-[#55A7C3] text-primary-foreground"}
          detail={{ title: "Course", name: "WMA" }}
        />
        <DashboardInfoCard
          icon={<FolderClock />}
          iconClassName={"bg-[#55C38C] text-primary-foreground"}
          detail={{ title: "Section", name: "TTS - (19 - 21)" }}
        />
      </div>
      <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
        />
      ))}
      </div>
    </>
  );
}
