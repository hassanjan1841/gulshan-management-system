import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
const upcomingMeetings = [
  { id: 1, title: "Parent-Teacher Conference", date: "Tomorrow, 2:00 PM" },
  { id: 2, title: "Department Heads Meeting", date: "In 2 days, 10:00 AM" },
  {
    id: 3,
    title: "Student Council Assembly",
    date: "Next week, Monday 9:00 AM",
  },
];
export default function UpcomingMeetings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingMeetings.map((meeting, index) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{meeting.title}</p>
                <p className="text-sm text-muted-foreground">{meeting.date}</p>
              </div>
              <Award className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
