import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";

export default function ProfileSheet({ data }) {
  const [open, setOpen] = useState(false);
  const { setCurrentUser } = useAuth();
  console.log("profile pic in profilesheet=> ", data);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={data?.profilePic}
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback>
              {data?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="profile" className="mt-6 h-[calc(100vh-8rem)]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="mt-6 space-y-6 overflow-y-auto h-full pb-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={data?.profilePic}
                  alt={data?.full_name}
                  className="object-cover"
                />
                <AvatarFallback>
                  {data?.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{data?.full_name}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label>CNIC Number</Label>
                <div className="mt-1 font-medium">{data?.cnic}</div>
              </div>
              <div>
                <Label>Current Course</Label>
                <div className="mt-1 font-medium">{data?.section?.course}</div>
              </div>
              <div>
                <Label>Qualifications</Label>
                <div className="mt-1 font-medium">
                  {data?.role == "student"
                    ? data?.last_qualifications
                    : data?.qualifications}
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="mt-1 font-medium">{data?.email}</div>
              </div>
            </div>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                Cookies.set("token", "");
                setCurrentUser(null);
                setOpen(false);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </TabsContent>
          <TabsContent
            value="settings"
            className="mt-6 space-y-6 overflow-y-auto h-full pb-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive email notifications
                  </div>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue={data?.full_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={data?.email} />
              </div>
              <Button className="w-full">Save Changes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
