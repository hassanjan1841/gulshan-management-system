import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardInfoCard from "../../components/dashboardInfoCard";
import Header from "../../components/UserDashboard/Header";
import { FolderClock, GraduationCap, NotebookPen } from "lucide-react";
import { AppSidebar } from "../../components/app-sidebar";
import AssignmentsCard from "../../components/UserDashboard/AssignmentCard";
import QuizCard from "../../components/UserDashboard/QuizCard";

export default function Student() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-10 bg-background">
          <div className="bg-muted/20 p-5 flex  items-center justify-between flex-wrap gap-3 max-sm:justify-center ">
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
          <div className=" flex gap-5 max-lg:items-center max-lg:flex-col md:justify-between rounded-xl">
            <AssignmentsCard />
            <QuizCard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
