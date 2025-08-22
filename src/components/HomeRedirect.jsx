import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomeRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "Admin":
      return <Navigate to="/admin/overview" replace />;
    case "Teacher":
      return <Navigate to="/teacher/overview" replace />;
    case "Student":
      return <Navigate to="/student/overview" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}
