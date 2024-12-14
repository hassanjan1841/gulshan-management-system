import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "../../components/UserDashboard/Header";
import { AppSidebar } from "../../components/app-sidebar";

import { Outlet } from "react-router";

export default function StudentDashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-10 bg-background">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
