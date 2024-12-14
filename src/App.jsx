import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Admin from "./pages/admin/admin";
import Teacher from "./pages/teacher/teacher";
import { ThemeProvider } from "./components/theme-provider";
import StudentDashboard from "./components/UserDashboard/studentDashboard";
import StudentDashboardLayout from "./pages/student/StudentDashboardLayout";
import StudentAssignment from "./components/UserDashboard/StudentAssignment";
import StudentQuiz from "./components/UserDashboard/StudentQuiz";
import CertificateCard from "./components/UserDashboard/CertificateCard";
import StudentCertificate from "./components/UserDashboard/StudentCertificate";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          {/* student routes */}
          <Route path="/student" element={<StudentDashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="quizzes" element={<StudentQuiz />} />
            <Route path="Certificates" element={<StudentCertificate />} />
          </Route>
          {/* student routes end */}

          <Route path="/teacher" element={<Teacher />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
