import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";
import Header from "../../components/StudentDashboard/Header";
import AppSidebar from "./Sidebar";

export default function DashboardLayout() {
  const role = "teacher";
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-10 bg-background ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
