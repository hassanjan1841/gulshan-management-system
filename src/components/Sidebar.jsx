import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  Award,
  Users,
  TrendingUp,
  FileText,
  HelpCircle,
  Settings,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Link, useLocation } from "react-router";

const adminItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/admin/dashboard/students", icon: Users },
  { name: "Courses", href: "/admin/dashboard/courses", icon: BookOpen },
  { name: "Batches", href: "/admin/dashboard/batches", icon: BookOpen },
  { name: "Branches", href: "/admin/dashboard/branches", icon: BookOpen },
  { name: "Sections", href: "/admin/dashboard/sections", icon: BookOpen },
  { name: "Quizzes", href: "/admin/dashboard/quizzes", icon: BookOpen },
];

const teacherItems = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { name: "Assignments", href: "/teacher/assignments", icon: FileText },
  { name: "Quizzes", href: "/teacher/quizzes", icon: HelpCircle },
  { name: "Your Services", href: "/teacher/services", icon: TrendingUp },
];

const studentItems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Assignments", href: "/student/assignments", icon: PenTool },
  { name: "Quizzes", href: "/student/quizzes", icon: BookOpen },
  { name: "Certificates", href: "/student/certificates", icon: Award },
  {
    name: "Student Services",
    href: "/student/services",
    icon: Settings,
  },
];

export default function AppSidebar({ role, ...props }) {
  const { state } = useSidebar();

  const location = useLocation();

  const navItems =
    role === "teacher"
      ? location.pathname === "/teacher" || location.pathname === "/teacher/"
        ? teacherItems.filter((item) => item.name === "Sections")
        : teacherItems
      : role === "admin"
      ? adminItems
      : location.pathname === "/student" || location.pathname === "/student/"
      ? studentItems.filter((item) => item.name === "Sections")
      : studentItems;
  const title =
    role === "teacher" ? "Teacher" : role === "admin" ? "Admin" : "Student";

  return (
    <ShadcnSidebar
      {...props}
      collapsible="icon"
      className="transition-all overflow-hidden duration-300 ease-in-out"
    >
      <SidebarHeader>
        <div className="flex items-center p-4">
          <h2
            className={`text-2xl font-semibold text-primary transition-opacity duration-300 sm:min-w-[400px] ${
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
            <SidebarMenuItem key={item.name} className="w-full">
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
