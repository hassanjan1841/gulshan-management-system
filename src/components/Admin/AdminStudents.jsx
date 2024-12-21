import React from "react";

import AdminStudentCard from "./AdminStudentCard";

const AdminStudents = () => {
  const fetchStudents = async (page = 0, pageSize = 12) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalItems = 50;
    const data = Array.from({ length: pageSize }, (_, i) => ({
      id: page * pageSize + i + 1,
      name: `Student ${page * pageSize + i + 1}`,
      picture: `https://cdn5.vectorstock.com/i/1000x1000/52/54/male-student-graduation-avatar-profile-vector-12055254.jpg`,
      course: `Course ${Math.floor(Math.random() * 5) + 1}`,
      batch: `Batch ${Math.floor(Math.random() * 4) + 1}`,
      section: `Section ${String.fromCharCode(
        65 + Math.floor(Math.random() * 3)
      )}`,
      teacher: `Teacher ${Math.floor(Math.random() * 3) + 1}`,
      fatherName: `Father Name ${i + 1}`,
      age: 18 + Math.floor(Math.random() * 7),
      cnic: `12345-678901-${i}`,
      isEliminated: Math.random() < 0.1,
      isPassed: Math.random() > 0.5,
      education: "Bachelor's Degree",
    }));

    return {
      data,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  };

  const [students, setStudents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      const { data } = await fetchStudents();
      setStudents(data);
      setIsLoading(false);
    };
    loadStudents();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Students</h1>
      {isLoading ? (
        <div className="text-center">Loading students...</div>
      ) : (
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {students.map((student) => (
            <AdminStudentCard student={student} key={student._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
