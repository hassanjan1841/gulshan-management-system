import { LayoutDashboard, BookOpen, PenTool, Award } from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Link } from "react-router";

// agar role student ho to ye sidebar dikhega
const adminItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
];

const teacherItems = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { name: "Students", href: "/teacher/students", icon: LayoutDashboard },
  { name: "Assignments", href: "/teacher/assignments", icon: PenTool },
  { name: "Schedule", href: "/teacher/schedule", icon: PenTool },
  { name: "Quizzes", href: "/teacher/quizzes", icon: BookOpen },
];

const studentItems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Assignments", href: "/student/assignments", icon: PenTool },
  { name: "Quizzes", href: "/student/quizzes", icon: BookOpen },
  { name: "Certificates", href: "/student/certificates", icon: Award },
];

export default function AppSidebar({ role, ...props }) {
  const { state } = useSidebar();
  console.log("role=> ", role);
  const navItems =
    role === "teacher"
      ? teacherItems
      : role === "admin"
      ? adminItems
      : studentItems;
  const title =
    role === "teacher" ? "Teacher" : role === "admin" ? "Admin" : "Student";

  return (
    <ShadcnSidebar
      {...props}
      collapsible="icon"
      className="transition-all overflow-hidden duration-300 ease-in-out "
    >
      <SidebarHeader>
        <div className="flex items-center p-4 ">
          <h2
            className={`text-2xl font-semibold text-primary  transition-opacity duration-300 sm:min-w-[400px] ${
              state === "collapsed" ? "opacity-0" : "opacity-100"
            }`}
          >
            {title} Portal
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems?.map((item) => (
            <SidebarMenuItem key={item.name} className="flex justify-center">
              <SidebarMenuButton asChild>
                <Link
                  to={item.href}
                  className="flex items-center px-4 py-2 text-primary hover:text-black transition-all duration-300 ease-in-out"
                >
                  <item.icon
                    className="mr-3"
                    style={{ height: 20, width: 20 }}
                  />
                  <span
                    className={`transition-opacity duration-300 ${
                      state === "collapsed" ? "opacity-0 hidden" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
