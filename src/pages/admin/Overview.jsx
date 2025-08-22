import { Users, GraduationCap, BookOpen, Settings } from "lucide-react";
import usersData from "../../data/users.json";
import { useTheme } from "../../hooks/useTheme";
import OverviewPage from "../../components/OverviewPage";

export default function AdminOverview() {
  const { theme } = useTheme();

  const stats = [
    { title: "Students", value: usersData.filter(u => u.role === "Student").length, icon: GraduationCap, color: "blue" },
    { title: "Teachers", value: usersData.filter(u => u.role === "Teacher").length, icon: Users, color: "green" },
    { title: "Courses", value: 8, icon: BookOpen, color: "orange" },
    { title: "Sessions", value: 3, icon: Settings, color: "red" },
  ];

  const activities = [
    "✅ Student2 joined",
    "✅ Math 101 updated",
    "✅ Student2 added assignment"
  ];

  const extra = (
    <>
      <h2 className="text-sm font-semibold mb-2">Overview</h2>
      {[
        { label: "Server", status: "Online", color: "text-green-500" },
        { label: "DB", status: "Connected", color: "text-green-500" },
        { label: "Backup", status: "2h ago", color: "text-gray-400" }
      ].map(item => (
        <div key={item.label} className="flex justify-between">
          <span>{item.label}</span>
          <span className={item.color}>{item.status}</span>
        </div>
      ))}
    </>
  );

  return <OverviewPage stats={stats} activities={activities} extra={extra} theme={theme} />;
}
