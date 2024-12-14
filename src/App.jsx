import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Admin from "./pages/admin/admin";

import { ThemeProvider } from "./components/theme-provider";

import StudentDashboard from "./components/StudentDashboard/studentDashboard";
import DashboardLayout from "./pages/student/DashboardLayout";
import StudentAssignment from "./components/StudentDashboard/StudentAssignment";
import TeacherDashboard from "./components/TeacherDashboard/TeachertDashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          {/* student routes */}
          <Route path="/student" element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="assignments" element={<StudentAssignment />} />
          </Route>
          {/* student routes end */}

          <Route path="/teacher" element={<DashboardLayout />}>
            <Route index element={<TeacherDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
