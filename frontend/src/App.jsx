import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./services/userService";
//devlopeped by push
const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setEditingUserId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !role.trim()) {
      alert("Please enter name and role");
      return;
    }

    const userData = {
      name: name,
      role: role,
    };

    if (editingUserId) {
      await updateUser(editingUserId, userData);
    } else {
      await createUser(userData);
    }

    resetForm();
    await loadUsers();
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setRole(user.role);
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
      return;
    }

    await deleteUser(userId);
    await loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <h1>Loading users...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>React + FastAPI App</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button type="submit" style={{ padding: "8px 14px" }}>
          {editingUserId ? "Update User" : "Add User"}
        </button>

        {editingUserId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ padding: "8px 14px", marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
        />
      ))}
    </div>
  );
};

export default App;