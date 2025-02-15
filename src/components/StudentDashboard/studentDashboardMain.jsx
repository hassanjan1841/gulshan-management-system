import { Link } from "react-router";
import CourseCard from "./CourseInfoCard";
import { useAuth } from "../../context/authContext";
import StudentWelcome from "./StudentWelcome";

export default function StudentDashboardMain() {
  const { currentUser } = useAuth();
  const courses = currentUser?.courses || [];

  const hasBatch = courses.some((course) => course.batch);
  console.log("hasb   ", hasBatch);
  if (!hasBatch) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
        <StudentWelcome />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {currentUser?.courses?.map((course) => (
          <Link key={course._id} to={`/student/course/${course._id}`}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
