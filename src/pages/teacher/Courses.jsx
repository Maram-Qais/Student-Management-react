import coursesData from "../../data/courses.json";
import DataTableWrapper from "../../components/DataTableWrapper";

export default function TeacherCourses() {
  const columns = ["ID", "Name", "Students"];
  return <DataTableWrapper data={coursesData} columns={columns} title="Teacher Courses" />;
}
