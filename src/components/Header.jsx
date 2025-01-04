import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Bell } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import ProfileSheet from "@/components/ProfileSheet";
import { useAuth } from "../context/authContext";
import { useLocation } from "react-router";

export default function Header() {
  const pathname = useLocation().pathname;

  const { currentUser } = useAuth();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {pathname !== "/teacher" && <SidebarTrigger className="-ml-1" />}
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="capitalize text-xl">
            {pathname !== "/teacher" ? "overview" : "Teacher"}
          </h1>
        </div>
        <div className="flex items-center justify-between gap-5">
          <ModeToggle />

          <div>
            <span>
              <Bell className="text-orange-300 cursor-pointer" />
            </span>
          </div>
          <div>
            <ProfileSheet data={currentUser} />
          </div>
        </div>
      </div>
    </header>
  );
}
