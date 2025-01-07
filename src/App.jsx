import "@/App.css";
import Login from "@/pages/Login";

import StudentDashboard from "@/components/StudentDashboard/studentDashboard";
import DashboardLayout from "@/pages/student/DashboardLayout";
import StudentAssignment from "@/components/StudentDashboard/StudentAssignment";
import TeacherDashboard from "@/components/TeacherDashboard/TeachertDashboard";
import StudentQuiz from "@/components/StudentDashboard/StudentQuiz";
import StudentCertificate from "@/components/StudentDashboard/StudentCertificate";
import TeacherAssignment from "@/components/TeacherDashboard/TeacherAssignment";
import AssignmentDetail from "@/components/TeacherDashboard/AssignmentDetail";
import TeacherServices from "@/components/TeacherDashboard/TeacherServices";
import QuizTable from "@/components/TeacherDashboard/QuizTable";
import QuizDetail from "@/components/TeacherDashboard/QuizDetail";
import AdminLogin from "@/components/Admin/AdminLogin";
import { useAuth } from "@/context/authContext";
import { Route, Routes, useNavigate, useParams } from "react-router";
import AdminStudents from "@/components/Admin/AdminStudents";
import AdminCourses from "@/components/Admin/AdminCourses";
import CourseDetails from "@/components/Admin/CourseDetailSheet";
import AdminBatches from "@/components/Admin/AdminBatches";
import HomePage from "@/pages/homepage/HomePage";
import DashboardPage from "@/pages/admin/DashboardTry";
import StudentServices from "@/components/StudentDashboard/StudentServices";
import NotFound from "@/components/NotFound";
import BatchDetail from "@/components/Admin/BatchDetail";
import Register from "./pages/registration/Register";
import TeacherDashboardMain from "./components/TeacherDashboard/TeacherDashboardMain";
import StudentDashboardMain from "./components/StudentDashboard/studentDashboardMain";
import IdCard from "./pages/idcard/IdCard";
import { ToastContainer } from "react-toastify";

function App() {
  const { currentUser } = useAuth();
  console.log("currentUser", currentUser);
  const navigate = useNavigate();
  const params = useParams();
  console.log("params", params);

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate(`/${currentUser.role}`);
  //   }else {
  //     navigate(`/`);
  //   }
  // }, [currentUser]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/idcard" element={<IdCard />} />
        <Route path="*" element={<NotFound />} />

        {/* student routes */}
        <Route path="/student" element={<DashboardLayout role={"student"} />}>
          <Route index element={<StudentDashboardMain />} />
          <Route path="course/:id" element={<StudentDashboard />} />
          <Route path="assignments" element={<StudentAssignment />} />
          <Route path="quizzes" element={<StudentQuiz />} />
          <Route path="certificates" element={<StudentCertificate />} />
          <Route path="services" element={<StudentServices />} />
        </Route>
        {/* student routes end */}

        <Route path="/teacher" element={<DashboardLayout role={"teacher"} />}>
          <Route index element={<TeacherDashboardMain />} />
          <Route path="section/:id" element={<TeacherDashboard />} />
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
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="batches" element={<AdminBatches />} />
          <Route path="batches/:id" element={<BatchDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
