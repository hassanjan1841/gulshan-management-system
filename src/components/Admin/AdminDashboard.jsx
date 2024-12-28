import { Users, GraduationCap, BookOpen, Briefcase } from "lucide-react";
import DashboardInfoCard from "../dashboardInfoCard";

export default function AdminDashboard() {
  return (
    <div className="bg-muted/20 p-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Students */}
      <DashboardInfoCard
        icon={<Users />}
        iconClassName="bg-blue-500 text-primary-foreground"
        detail={{ title: "Total Students", name: "450" }}
        bottomInfo="15 students joined this week"
      />

      {/* Total Trainers */}
      <DashboardInfoCard
        icon={<GraduationCap />}
        iconClassName="bg-green-500 text-primary-foreground"
        detail={{ title: "Total Trainers", name: "25" }}
      />

      {/* Total Courses */}
      <DashboardInfoCard
        icon={<BookOpen />}
        iconClassName="bg-yellow-500 text-primary-foreground"
        detail={{ title: "Total Courses", name: "15" }}
      />

      {/* Total Batches */}
      <DashboardInfoCard
        icon={<Briefcase />}
        iconClassName="bg-purple-500 text-primary-foreground"
        detail={{ title: "Total Batches", name: "8" }}
      />
    </div>
  );
}
