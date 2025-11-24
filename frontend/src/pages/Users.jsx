
import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      setMessage("Error fetching users");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/users/${editingId}`, form);
        setMessage("User updated!");
      } else {
        await axios.post("http://localhost:5000/api/users", form);
        setMessage("User created!");
      }
      setForm({ username: "", email: "", password: "" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setMessage("Error saving user");
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, email: user.email, password: user.password });
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setMessage("User deleted!");
      fetchUsers();
    } catch (err) {
      setMessage("Error deleting user");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">User Management</h2>
      {message && <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded font-bold hover:scale-105 transition-transform">
          {editingId ? "Update User" : "Add User"}
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gradient-to-r from-purple-300 to-pink-300">
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-purple-50">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600"
                >Edit</button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600"
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
