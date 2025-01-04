import CourseCard from "./CourseInfoCard";

export default function StudentDashboardMain() {
  const courses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      duration: "12 weeks",
      status: "Enrolled",
      batch: "Batch 11",
      city: "Karachi",
      campus: "Gulshan-e-Iqbal",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      duration: "8 weeks",
      status: "Enrolled",
      batch: "Batch 11",
      city: "Karachi",
      campus: "Gulshan-e-Iqbal",
    },
    // Add more courses as needed
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
