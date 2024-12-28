import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  Award,
  Layers,
  Users,
  TrendingUp,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "./ui/sidebar";
import { Link } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const adminItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/admin/dashboard/students", icon: Users },
  { name: "Courses", href: "/admin/dashboard/courses", icon: BookOpen },
  { name: "Batches", href: "/admin/dashboard/batches", icon: BookOpen },
];

const teacherItems = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  {
    name: "Courses",
    icon: Layers,
    subItems: [
      {
        name: "Web and App Development",
        icon: Layers,
        batches: [
          {
            name: "Batch 5",
            sections: [
              {
                name: "TTS (9 to 11)",
                href: "/teacher/courses/web-and-app-development/batch-5/tts-9-11",
                subItems: [
                  {
                    name: "Assignments",
                    href: "/teacher/assignments",
                    icon: FileText,
                  },
                  {
                    name: "Quizzes",
                    href: "/teacher/quizzes",
                    icon: HelpCircle,
                  },
                ],
              },
              {
                name: "MWF (5 to 7)",
                href: "/teacher/courses/web-and-app-development/batch-5/mwf-5-7",
                subItems: [
                  {
                    name: "Assignments",
                    href: "/teacher/assignments",
                    icon: FileText,
                  },
                  {
                    name: "Quizzes",
                    href: "/teacher/quizzes",
                    icon: HelpCircle,
                  },
                ],
              },
            ],
          },
          {
            name: "Batch 6",
            sections: [
              {
                name: "TTS (9 to 11)",
                href: "/teacher/courses/web-and-app-development/batch-6/tts-9-11",
                subItems: [
                  {
                    name: "Assignments",
                    href: "/teacher/assignments",
                    icon: FileText,
                  },
                  {
                    name: "Quizzes",
                    href: "/teacher/quizzes",
                    icon: HelpCircle,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { name: "Your Services", href: "/teacher/services", icon: TrendingUp },
];

const studentItems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Assignments", href: "/student/assignments", icon: PenTool },
  { name: "Quizzes", href: "/student/quizzes", icon: BookOpen },
  { name: "Certificates", href: "/student/certificates", icon: Award },
  { name: "Student Services", href: "/student/studentservices", icon: Settings },
];

export default function AppSidebar({ role, ...props }) {
  const { state } = useSidebar();
  const [openCourse, setOpenCourse] = useState(null);
  const [openBatch, setOpenBatch] = useState(null);
  const [openSection, setOpenSection] = useState(null);

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
              {item.subItems ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <div className="flex items-center px-2 py-2 text-primary hover:text-white transition-all duration-300 ease-in-out overflow-hidden">
                        <item.icon
                          className="mr-5 shrink-0"
                          style={{ height: 20, width: 20 }}
                        />
                        <span
                          className={`transition-opacity duration-300 truncate ${
                            state === "collapsed"
                              ? "opacity-0 hidden"
                              : "opacity-100"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="w-full max-w-[calc(100%-1rem)] mx-2">
                      {item.subItems.map((course) => (
                        <SidebarMenuSubItem key={course.name}>
                          <Collapsible
                            open={openCourse === course.name}
                            onOpenChange={() =>
                              setOpenCourse(
                                openCourse === course.name ? null : course.name
                              )
                            }
                          >
                            <CollapsibleTrigger asChild>
                              <SidebarMenuSubButton className="w-full whitespace-normal text-left">
                                <course.icon
                                  className=" shrink-0"
                                  style={{ height: 16, width: 16 }}
                                />
                                <span className="line-clamp-2">
                                  {course.name}
                                </span>
                              </SidebarMenuSubButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="w-full max-w-[calc(100%-1rem)] mx-2">
                                {course.batches.map((batch) => (
                                  <SidebarMenuSubItem key={batch.name}>
                                    <Collapsible
                                      open={openBatch === batch.name}
                                      onOpenChange={() =>
                                        setOpenBatch(
                                          openBatch === batch.name
                                            ? null
                                            : batch.name
                                        )
                                      }
                                    >
                                      <CollapsibleTrigger asChild>
                                        <SidebarMenuSubButton className="w-full">
                                          <Users
                                            style={{ height: 16, width: 16 }}
                                          />
                                          <span>{batch.name}</span>
                                        </SidebarMenuSubButton>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <SidebarMenuSub className="w-full max-w-[calc(100%-1rem)] mx-2">
                                          {batch.sections.map((section) => (
                                            <SidebarMenuSubItem
                                              key={section.name}
                                            >
                                              <Collapsible
                                                open={
                                                  openSection === section.name
                                                }
                                                onOpenChange={() =>
                                                  setOpenSection(
                                                    openSection === section.name
                                                      ? null
                                                      : section.name
                                                  )
                                                }
                                              >
                                                <CollapsibleTrigger asChild>
                                                  <SidebarMenuSubButton className="w-full">
                                                    <span>{section.name}</span>
                                                  </SidebarMenuSubButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                  <SidebarMenuSub className="w-full max-w-[calc(100%-0rem)] mx-2">
                                                    {section.subItems.map(
                                                      (subItem) => (
                                                        <SidebarMenuSubItem
                                                          key={subItem.name}
                                                        >
                                                          <SidebarMenuSubButton
                                                            asChild
                                                          >
                                                            <Link
                                                              to={subItem.href}
                                                              className="w-full flex items-center gap-2 overflow-visible"
                                                            >
                                                              <subItem.icon
                                                                className="shrink-0"
                                                                style={{
                                                                  height: 16,
                                                                  width: 16,
                                                                }}
                                                              />
                                                              <span className="truncate">
                                                                {subItem.name}
                                                              </span>
                                                            </Link>
                                                          </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                      )
                                                    )}
                                                  </SidebarMenuSub>
                                                </CollapsibleContent>
                                              </Collapsible>
                                            </SidebarMenuSubItem>
                                          ))}
                                        </SidebarMenuSub>
                                      </CollapsibleContent>
                                    </Collapsible>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
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
                        state === "collapsed"
                          ? "opacity-0 hidden"
                          : "opacity-100"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
