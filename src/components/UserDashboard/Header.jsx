import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Bell, Settings } from "lucide-react";
import SearchInput from "../../components/SearchInput";
import AvatarWithMenu from "../../components/AvatarWithMenu";
import { ModeToggle } from "../mode-toggle";
import StudentProfileSheet from "./ProfileSheet";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="capitalize text-xl">overview</h1>
        </div>
        <div className="flex items-center justify-between gap-5">
          <ModeToggle />

          <div>
            <span>
              <Bell className="text-orange-300 cursor-pointer" />
            </span>
          </div>
          <div>
            <StudentProfileSheet />
          </div>
        </div>
      </div>
    </header>
  );
}
