 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { CheckCircle2, Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [creatingAccount, setCreatingAccount] = useState(false);

  const [notify, setNotify] = useState({
    show: false,
    text: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const showNotification = (message) => {
    setNotify({ show: true, text: message });
    setTimeout(() => {
      setNotify({ show: false, text: "" });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setCreatingAccount(true);

    try {
      const { data } = await API.post("/auth/register", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showNotification("Account created successfully.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      alert(error.response?.data?.message || "Register Failed");
    } finally {
      setCreatingAccount(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#f5f7fb]">
      {notify.show && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          {notify.text}
        </div>
      )}

      {/* Left Branding */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
        <h1 className="text-5xl font-bold leading-tight mb-5 tracking-tight">
          Build Your Team Workspace
        </h1>

        <p className="text-lg opacity-80 max-w-md leading-relaxed mb-10">
          Create projects, assign responsibilities and manage your team's daily execution from one organized platform.
        </p>

        <div className="space-y-4 text-sm opacity-80">
          <div>• Role Based Admin & Member Access</div>
          <div>• Structured Project Allocation</div>
          <div>• Deadline Driven Task Monitoring</div>
          <div>• Smooth Team Collaboration Flow</div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.06)] w-full max-w-md p-9 border border-gray-100">
          <h2 className="text-3xl font-bold mb-5 tracking-tight">
            Create Account
          </h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              >
                <option value="Admin">Admin / Workspace Manager</option>
                <option value="Member">Team Member</option>
              </select>
 
            </div>

            <button
              type="submit"
              disabled={creatingAccount}
              className={`w-full text-white cursor-pointer py-3.5 rounded-2xl transition font-medium flex justify-center items-center gap-2 ${
                creatingAccount ? "bg-gray-500 cursor-not-allowed" : "bg-black"
              }`}
            >
              {creatingAccount && <Loader2 size={16} className="animate-spin" />}
              {creatingAccount ? "Creating account..." : "Create Workspace Account"}
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