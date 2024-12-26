import "./App.css";
import Login from "./pages/Login";

import StudentDashboard from "./components/StudentDashboard/studentDashboard";
import DashboardLayout from "./pages/student/DashboardLayout";
import StudentAssignment from "./components/StudentDashboard/StudentAssignment";
import TeacherDashboard from "./components/TeacherDashboard/TeachertDashboard";
import StudentQuiz from "./components/StudentDashboard/StudentQuiz";
import StudentCertificate from "./components/StudentDashboard/StudentCertificate";
import TeacherAssignment from "./components/TeacherDashboard/TeacherAssignment";
import AssignmentDetail from "./components/TeacherDashboard/AssignmentDetail";
import TeacherServices from "./components/TeacherDashboard/TeacherServices";
import QuizTable from "./components/TeacherDashboard/QuizTable";
import QuizDetail from "./components/TeacherDashboard/QuizDetail";
import AdminLogin from "./components/Admin/AdminLogin";
import { useAuth } from "./context/authContext";
import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import AdminStudents from "./components/Admin/AdminStudents";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminCourses from "./components/Admin/AdminCourses";
import CourseDetails from "./components/Admin/CourseDetailSheet";
import AdminBatches from "./components/Admin/AdminBatches";

function App() {
  const { currentUser } = useAuth();
  console.log("currentUser", currentUser);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate(`/${currentUser.role}`);
  //   }else {
  //     navigate(`/`);
  //   }
  // }, [currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* student routes */}
      <Route path="/student" element={<DashboardLayout role={"student"} />}>
        <Route index element={<StudentDashboard />} />
        <Route path="assignments" element={<StudentAssignment />} />
        <Route path="quizzes" element={<StudentQuiz />} />
        <Route path="Certificates" element={<StudentCertificate />} />
      </Route>
      {/* student routes end */}

      <Route path="/teacher" element={<DashboardLayout role={"teacher"} />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="assignments" element={<TeacherAssignment />} />
        <Route path="assignments/:id" element={<AssignmentDetail />} />
        <Route path="quizzes" element={<QuizTable />} />
        <Route path="quizzes/:id" element={<QuizDetail />} />
        <Route path="services" element={<TeacherServices />} />
      </Route>

      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={<DashboardLayout role={"admin"} />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="batches" element={<AdminBatches />}/>
      </Route>
    </Routes>
  );
}

export default App;
