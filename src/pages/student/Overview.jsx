import { BookOpen, Calendar, Star } from "lucide-react";
import coursesData from "../../data/courses.json";
import gradesData from "../../data/grades.json";
import { useTheme } from "../../hooks/useTheme";
import OverviewPage from "../../components/OverviewPage";

export default function StudentOverview() {
  const { theme } = useTheme();

  const stats = [
    { title: "GPA", value: 3.8, icon: Star, color: "yellow" },
    { title: "Courses", value: coursesData.length, icon: BookOpen, color: "blue" },
    { title: "Completed", value: gradesData.length, icon: Calendar, color: "green" },
  ];

  const activities = gradesData.map(g => `✅ ${g.course} - Grade: ${g.grade}`);

  return <OverviewPage stats={stats} activities={activities} theme={theme} />;
}
