import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import NotAuthorized from './pages/NotAuthorized';
import HomeRedirect from "./components/HomeRedirect";
import NotFound from "./pages/NotFound";

// Admin
import AdminOverview from './pages/admin/Overview';
import Users from './pages/admin/Users';

// Teacher
import TeacherOverview from './pages/teacher/Overview';
import Courses from './pages/teacher/Courses';

// Student
import StudentOverview from './pages/student/Overview';
import StudentCalendar from './pages/student/StudentCalendar';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="Overview" replace />} />
          <Route path="Overview" element={<AdminOverview />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* Teacher */}
      <Route element={<ProtectedRoute allowedRoles={['Teacher']} />}>
        <Route path="/teacher" element={<DashboardLayout />}>
          <Route index element={<Navigate to="Overview" replace />} />
          <Route path="Overview" element={<TeacherOverview />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Route>

      {/* Student */}
      <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
        <Route path="/student" element={<DashboardLayout />}>
          <Route index element={<Navigate to="Overview" replace />} />
          <Route path="Overview" element={<StudentOverview />} />
          <Route path="calendar" element={<StudentCalendar />} />
        </Route>
      </Route>

      {/* Root + catch-all */}
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
