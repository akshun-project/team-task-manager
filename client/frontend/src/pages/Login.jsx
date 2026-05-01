 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage({
        text: "Login successful. Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Login Failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#f5f7fb]">

      {/* Left Branding */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
        <h1 className="text-5xl font-bold leading-tight mb-5 tracking-tight">
          TaskFlow
        </h1>

        <p className="text-lg opacity-80 max-w-md leading-relaxed mb-10">
          Streamline team collaboration, assign deliverables, monitor execution and keep every project moving forward.
        </p>

        <div className="space-y-4 text-sm opacity-80">
          <div>• Centralized Project Workspaces</div>
          <div>• Smart Task Assignment & Tracking</div>
          <div>• Team Progress Monitoring</div>
          <div>• Productivity Focused Dashboard</div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.06)] w-full max-w-md p-9 border border-gray-100">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-7">
            Login to continue managing your workspace.
          </p>

          {message.text && (
            <div
              className={`mb-4 text-sm rounded-2xl px-4 py-3 border ${
                message.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3.5 rounded-2xl hover:opacity-95 transition font-medium disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Login to Workspace"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-black">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;