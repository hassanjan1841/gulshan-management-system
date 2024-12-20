import DashboardInfoCard from "../dashboardInfoCard";
import { FolderClock, GraduationCap, NotebookPen } from "lucide-react";
import AssignmentsCard from "./DasboardAssignmentCard";
import QuizCard from "./QuizCard";

export default function StudentDashboard() {
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
      <div className=" bg-muted/20 p-5 flex gap-5 max-lg:items-center max-lg:flex-col md:justify-between xl:justify-around rounded-xl">
        <AssignmentsCard />
        <QuizCard />
      </div>
    </>
  );
}
