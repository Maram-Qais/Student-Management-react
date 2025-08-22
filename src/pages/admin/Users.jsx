import usersData from "../../data/users.json";
import DataTableWrapper from "../../components/DataTableWrapper";

export default function AdminUsers() {
  const columns = ["ID", "Email", "Role"];
  return <DataTableWrapper data={usersData} columns={columns} title="Users Management" />;
}
