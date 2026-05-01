 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, CalendarDays } from "lucide-react";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-8 pt-6 pb-2 bg-[#f6f7fb]">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(15,23,42,0.05)] px-8 py-5 flex justify-between items-center gap-6">

        {/* Left Greeting */}
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            Welcome back, {user?.name}
          </h1>

          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <CalendarDays size={14} />
            <span>{today}</span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {user?.role === "Admin"
              ? "Manage project execution, monitor teams and drive productivity."
              : "Track assigned tasks and maintain your work momentum."}
          </p>
        </div>

        {/* Center Summary Chips */}
        <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
          <div className="px-4 py-2 rounded-2xl bg-[#f4f5f7] text-xs font-medium text-gray-700 border border-gray-200">
            Team Workspace
          </div>

          <div className="px-4 py-2 rounded-2xl bg-[#f4f5f7] text-xs font-medium text-gray-700 border border-gray-200">
            Productivity Mode
          </div>
        </div>

        {/* Right Profile */}
        <div className="flex items-center gap-4 relative">
          <div className="hidden md:flex px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium border border-indigo-100">
            Workspace Active
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-black text-white rounded-2xl px-4 py-2.5 hover:opacity-95 transition"
          >
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)}
            </div>

            <div className="text-left hidden md:block">
              <p className="text-sm leading-none">{user?.name}</p>
              <p className="text-[11px] opacity-70">{user?.role}</p>
            </div>

            <ChevronDown size={15} />
          </button>

          {open && (
            <div className="absolute right-0 top-16 w-52 bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 z-50">
              <div className="border-b pb-3 mb-3">
                <h3 className="font-semibold text-sm">{user?.name}</h3>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-[#f4f5f7] hover:bg-[#eceef2] rounded-2xl py-2.5 text-sm transition"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;