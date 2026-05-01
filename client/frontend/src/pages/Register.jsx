 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#f5f7fb]">

      {/* Left Branding */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
        <h1 className="text-5xl font-bold leading-tight mb-5 tracking-tight">
          Build Your Workspace
        </h1>

        <p className="text-lg opacity-80 max-w-md leading-relaxed mb-10">
          Create your collaborative environment, onboard your team and manage delivery workflows with precision.
        </p>

        <div className="space-y-4 text-sm opacity-80">
          <div>• Admin & Member Role Based Access</div>
          <div>• Structured Project Collaboration</div>
          <div>• Smart Deliverable Assignment</div>
          <div>• Centralized Team Execution</div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.06)] w-full max-w-md p-9 border border-gray-100">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-500 mb-7">
            Join your team workspace and start collaborating.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

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

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
            >
              <option value="Admin">Admin / Manager</option>
              <option value="Member">Team Member</option>
            </select>

            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-2xl hover:opacity-95 transition font-medium"
            >
              Create Workspace Account
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-black">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;