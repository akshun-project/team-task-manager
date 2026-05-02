import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
  UserCircle2,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const adminMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Projects", path: "/projects", icon: <FolderKanban size={18} /> },
    { name: "My Tasks", path: "/my-tasks", icon: <CheckSquare size={18} /> },
  ];

  const memberMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "My Tasks", path: "/my-tasks", icon: <CheckSquare size={18} /> },
  ];

  const menus = user?.role === "Admin" ? adminMenus : memberMenus;

  return (
    <aside className="w-[260px] min-h-screen bg-white/90 backdrop-blur-xl border-r border-gray-200 px-5 py-7 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.04)]">
      {/* Top Branding */}
      <div>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-500 shadow-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute left-2 top-2 w-1 h-5 bg-white/90 rounded-full"></div>
            <div className="absolute left-5 top-4 w-1 h-3 bg-white/80 rounded-full"></div>
            <div className="absolute left-8 top-1.5 w-1 h-6 bg-white rounded-full"></div>

            <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white tracking-wide">
              TF
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              TaskFlow
            </h1>
            <p className="text-[11px] text-gray-500 mt-0.5 tracking-wide">
              {user?.role} Control Panel
            </p>
          </div>
        </div>

        <p className="text-[11px] uppercase text-gray-400 px-3 mb-3 tracking-[2px]">
          Navigation
        </p>

        <div className="space-y-2">
          {menus.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:translate-x-1"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-3xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <UserCircle2 size={34} className="text-gray-500" />
            <div>
              <h3 className="text-sm font-semibold">
                {user?.name || "Akshun"}
              </h3>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
