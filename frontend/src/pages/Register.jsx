import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post("/auth/register", form);

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
  console.error(error.response?.data || error);

  toast.error(
    error.response?.data?.message || "Error creating account."
  );
}
}

  return (
    <main className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase text-yellow-500">
            Join ShopHub
          </p>

          <h1 className="mt-2 text-4xl font-black text-black">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your account to start shopping and tracking your orders.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm"
        >
          <label className="mb-2 block text-sm font-bold text-black">
            Name
          </label>

          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          />

          <label className="mb-2 block text-sm font-bold text-black">
            Email
          </label>

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          />

          <label className="mb-2 block text-sm font-bold text-black">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            className="mb-5 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          />

          <button className="w-full cursor-pointer rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300">
            Create Account
          </button>
        </form>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            to="/"
            className="rounded-xl border border-gray-300 px-4 py-3 text-center font-bold text-black transition hover:bg-gray-100"
          >
            ← Back to Home
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-yellow-400 px-4 py-3 text-center font-bold text-black transition hover:bg-yellow-300"
          >
            Already have account?
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Register;