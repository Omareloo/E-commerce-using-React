import { useEffect, useState } from "react";
import UsersTable from "../../../components/DashBoardComp/Users/UsersTable";
import { getAllUsers } from "../../../services/usersService";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Users</h2>
      <UsersTable users={users} />
    </div>
  );
}
