import StudentNavbar from "./StudentNavbar";
import CourseOverview from "./StudentCourseOverview";
import RecentQuizResults from "./StudentRecentQuizResults";
import UpcomingAssignments from "./StudentUpcomingAssignments";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <StudentNavbar />
      {/* <div className="mt-6">
        <CourseOverview />
      </div> */}
      <main className="mx-auto   py-12">
        <div className="flex justify-between gap-6 flex-wrap">
          <UpcomingAssignments />
          <RecentQuizResults />
        </div>
      </main>
    </div>
  );
}
