import { Users, BookOpen } from "lucide-react";
import coursesData from "../../data/courses.json";
import usersData from "../../data/users.json";
import { useTheme } from "../../hooks/useTheme";
import OverviewPage from "../../components/OverviewPage";

export default function TeacherOverview() {
  const { theme } = useTheme();

  const stats = [
    { title: "My Courses", value: coursesData.length, icon: BookOpen, color: "orange" },
    { title: "Total Students", value: usersData.filter(u => u.role === "Student").length, icon: Users, color: "blue" },
  ];

  const activities = [
    "✅ Created new assignment in Math 101",
    "✅ Grade submitted for student2",
    "✅ Updated course description"
  ];

  return <OverviewPage stats={stats} activities={activities} theme={theme} />;
}
