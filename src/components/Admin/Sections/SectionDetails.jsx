"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Users, UserCheck } from "lucide-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSectionById } from "../../../services/api/sections";
import { Link, useParams } from "react-router";
import { UpdateSectionSheet } from "./UpdateSectionSheet";
import { useSectionContext } from "../../../context/sectionContext";

export default function SectionDetails() {
  const [isUpdateSheetOpen, setIsUpdateSheetOpen] = useState(false);
  const [section, setSection] = useState({});
    const { changingInSection, SetChangingInSection } = useSectionContext();

  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    const fetchSection = async () => {
      const sectionData = await getSectionById(id);
      console.log("sectionData", sectionData);
      if (sectionData) {
        setSection(sectionData);
      }
    };

    fetchSection();
  }, [id, changingInSection]);

  return (
    <div className="container mx-auto py-6">
      <Link
        to="/admin/dashboard/sections"
        className="flex items-center text-primary hover:underline mb-4"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Sections
      </Link>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="mr-2" size={24} />
              <p className="text-lg">{section?.teacherCount || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2" size={24} />
              <p className="text-lg">{section?.studentCount || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{section?.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Course
              </p>
              <p>{section?.course?.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Batch</p>
              <p>{section?.batch?.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Teacher
              </p>
              <p>{section?.teacher?.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Schedule
              </p>
              <p>
                {section?.days
                  ?.map((day) => day.charAt(0).toUpperCase())
                  .join(" ")}{" "}
                | {section?.startTime} - {section?.endTime}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary">{section?.status}</Badge>
            <Badge variant="outline">{section?.room}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => setIsUpdateSheetOpen(true)}>
            Edit Section
          </Button>
        </CardFooter>
      </Card>
      {isUpdateSheetOpen && (
        <UpdateSectionSheet
          section={section}
          onClose={() => setIsUpdateSheetOpen(false)}
        />
      )}
    </div>
  );
}
