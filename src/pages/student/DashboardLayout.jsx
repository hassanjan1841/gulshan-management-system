import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/Sidebar";

import { Outlet } from "react-router";
import Header from "../../components/Header";


export default function DashboardLayout() {
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
