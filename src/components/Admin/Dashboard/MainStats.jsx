import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserIcon as Male,
  UserIcon as Female,
} from "lucide-react";
import { motion } from "framer-motion";
const stats = [
  {
    title: "Total Students",
    value: "15,000",
    icon: Users,
    change: "+12%",
  },
  {
    title: "Total Teachers",
    value: "200",
    icon: GraduationCap,
    change: "+5%",
  },
  {
    title: "Total Courses",
    value: "45",
    icon: BookOpen,
    change: "+3%",
  },
  {
    title: "Total Batches",
    value: "120",
    icon: Users,
    change: "+8%",
  },
];
const MainStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
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
};

export default MainStats;
