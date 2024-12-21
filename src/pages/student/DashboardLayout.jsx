import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet, useNavigate } from "react-router";
import Header from "../../components/Header";
import AppSidebar from "../../components/Sidebar";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
// import { SidebarInset } from "../../components/ui/sidebar";

export default function DashboardLayout({ role }) {
  const { currentUser } = useAuth();
  const { user, isAuthenticated } = currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAuthenticated) {
      if (user.role == "admin") {
        navigate("/");
      }
      if (user.role == role) {
        navigate(`/${user.role}`);
      }
    } else {
      navigate("/");
    }
  }, [user, isAuthenticated]);
  // const role = "teacher";
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-10 bg-background">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
