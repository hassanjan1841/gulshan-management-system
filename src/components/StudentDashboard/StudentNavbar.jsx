import { FolderClock, GraduationCap, NotebookPen } from "lucide-react";
import DashboardInfoCard from "../dashboardInfoCard";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router";
export default function StudentNavbar() {
  const { id } = useParams();
  console.log("id in studentnavbar", id);
  const { currentUser } = useAuth();

  const course = currentUser?.courses.find((course) => course._id === id);

  const stats = [
    {
      title: "Instructor",
      value: "Imran Shah", // Assuming instructor name is static
      change: "N/A",
      icon: GraduationCap,
    },
    {
      title: "Batch",
      value: course?.batch?.title,
      change: "N/A",
      icon: GraduationCap,
    },
    {
      title: "Course",
      value: course?.course?.title,
      change: "N/A",
      icon: NotebookPen,
    },
    {
      title: "Section",
      value: course?.batch?.title,
      change: "N/A",
      icon: FolderClock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1 row-span-2 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 * 0.1 }}
        >
          <Card className="max-h-[400px] h-full min-h-[300px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center flex-col space-x-4">
              <img
                src={currentUser.profilePic}
                alt="Student"
                className="h-32 w-32 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="text-2xl font-bold">Student Name</div>
                <p className="text-sm text-muted-foreground">
                  Roll Number: 12345
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index + 1) * 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
