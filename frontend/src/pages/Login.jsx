import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("@shophub:token", response.data.token);
      localStorage.setItem("@shophub:user", JSON.stringify(response.data.user));

      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8">Login</h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer">
            Login
          </button>
        </form>

        <Link to="/" className="text-blue-600 inline-block mt-4">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export default Login;