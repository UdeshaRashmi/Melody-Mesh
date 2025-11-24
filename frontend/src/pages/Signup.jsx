import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      if (response.success) {
        setSuccess(true);
        // After successful signup, redirect to login page
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Signup failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form className="bg-white p-8 rounded shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Sign Up</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">Signup successful! Redirecting to login...</p>}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;