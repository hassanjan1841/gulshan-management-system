import StudentNavbar from "./StudentNavbar";
import CourseOverview from "./StudentCourseOverview";
import RecentQuizResults from "./StudentRecentQuizResults";
import UpcomingAssignments from "./StudentUpcomingAssignments";


export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <StudentNavbar />
      <div className="mt-6">
        <CourseOverview />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UpcomingAssignments />
          <RecentQuizResults />
        </div>
      </main>
    </div>
  )
}

